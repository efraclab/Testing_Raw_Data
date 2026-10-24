// file: frontend/src/hooks/useWorksheetAutoSave.ts
//
// ONE shared auto-save hook for Drug, Metal and Micro worksheets.
//
// What it does
//   - every `intervalMs` it snapshots the form (collectFormDataForAPI)
//   - if the snapshot changed AND the analyst has been idle for `idleMs`,
//     it saves silently (same API calls as "Save Draft", but NO reload,
//     NO toast, so open panels and typing are never disturbed)
//   - it also saves when the tab is hidden / window loses focus
//   - it warns before closing the tab with unsaved changes
//
// Safety rules
//   - nothing is saved until `enabled` is true (worksheet loaded)
//   - a baseline snapshot is taken ~800 ms after load / reload, never saved
//   - never two saves at once, never while a manual save/submit is running
//   - if the server rejects a save, status becomes "error" and it retries

import { useCallback, useEffect, useRef, useState } from "react";
import { updateWorksheet, updateParameter } from "../services/api";

export type AutoSaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

interface Args {
  /** true only when the worksheet is loaded and can be edited. */
  enabled: boolean;
  /** collectFormDataForAPI from the worksheet. */
  collect: () => any;
  role: string;
  worksheetId: string;
  /** true while a manual save / submit / approve is running. */
  isBusy?: boolean;
  /** change this after the worksheet is reloaded (pass worksheetInfo). */
  resetKey?: unknown;
  intervalMs?: number;
  idleMs?: number;
}

export function useWorksheetAutoSave({
  enabled,
  collect,
  role,
  worksheetId,
  isBusy = false,
  resetKey,
  intervalMs = 5000,
  idleMs = 3000,
}: Args) {
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const lastSavedHash = useRef<string | null>(null);
  const lastSeenHash = useRef<string | null>(null);
  const lastChangeAt = useRef(0);
  const savingRef = useRef(false);

  const collectRef = useRef(collect);
  const busyRef = useRef(isBusy);
  const enabledRef = useRef(enabled);
  const roleRef = useRef(role);
  const idRef = useRef(worksheetId);
  collectRef.current = collect;
  busyRef.current = isBusy;
  enabledRef.current = enabled;
  roleRef.current = role;
  idRef.current = worksheetId;

  const snapshot = useCallback((): string | null => {
    try {
      return JSON.stringify(collectRef.current());
    } catch {
      return null;
    }
  }, []);

  // Silent save: same calls as handleSaveDraft, awaited, no reload, no toast.
  const saveSilently = useCallback(async () => {
    const data = collectRef.current();
    if (!data) throw new Error("No form data");

    if (roleRef.current === "Reviewer" || roleRef.current === "QA") {
      const res = await updateWorksheet(idRef.current, data);
      if (!res || !res.worksheetId) throw new Error("Auto-save rejected");
    } else {
      const params: any[] = data.parameters || [];
      const results = await Promise.all(
        params.map((p) => updateParameter(p.id, p)),
      );
      if (results.some((r: any) => !r || !r.parameterId)) {
        throw new Error("Auto-save rejected");
      }
    }
  }, []);

  // New baseline after load / reload (give restore time to settle).
  useEffect(() => {
    lastSavedHash.current = null;
    lastSeenHash.current = null;
    setStatus("idle");
    if (!enabled) return;
    const t = window.setTimeout(() => {
      const h = snapshot();
      if (h !== null && lastSavedHash.current === null) {
        lastSavedHash.current = h;
        lastSeenHash.current = h;
      }
    }, 800);
    return () => window.clearTimeout(t);
  }, [resetKey, enabled, snapshot]);

  const check = useCallback(
    async (force: boolean) => {
      if (!enabledRef.current || busyRef.current || savingRef.current) return;

      const hash = snapshot();
      if (hash === null) return;

      if (lastSavedHash.current === null) {
        lastSavedHash.current = hash; // fallback baseline
        lastSeenHash.current = hash;
        return;
      }

      if (hash !== lastSeenHash.current) {
        lastSeenHash.current = hash;
        lastChangeAt.current = Date.now();
      }

      if (hash === lastSavedHash.current) {
        setStatus((s) => (s === "dirty" || s === "error" ? "idle" : s));
        return;
      }

      setStatus((s) => (s === "saving" ? s : "dirty"));
      if (!force && Date.now() - lastChangeAt.current < idleMs) return;

      savingRef.current = true;
      setStatus("saving");
      try {
        await saveSilently();
        lastSavedHash.current = hash;
        setLastSavedAt(new Date());
        setStatus("saved");
      } catch (err) {
        console.error("Auto-save failed", err);
        setStatus("error"); // retried on next check
      } finally {
        savingRef.current = false;
      }
    },
    [snapshot, saveSilently, idleMs],
  );

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => void check(false), intervalMs);
    return () => window.clearInterval(id);
  }, [enabled, intervalMs, check]);

  useEffect(() => {
    if (!enabled) return;
    const onHide = () => {
      if (document.visibilityState === "hidden") void check(true);
    };
    const onBlur = () => void check(true);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("blur", onBlur);
    };
  }, [enabled, check]);

  useEffect(() => {
    if (!enabled) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      const h = snapshot();
      if (h !== null && lastSavedHash.current !== null && h !== lastSavedHash.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [enabled, snapshot]);

  return { status, lastSavedAt };
}