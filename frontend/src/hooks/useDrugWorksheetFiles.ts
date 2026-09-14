import { useState } from "react";
import type { AttachedFile } from "../models/AttachedFile";
import type { WorksheetFileData } from "../models/WorksheetFileData";

const prepFileKey = (type: string | null, label: string | null) =>
  `${type ?? ""}|${label ?? ""}`;

const PARAM_LEVEL_KEY = "param_level";

export default function useDrugWorksheetFiles() {
  const [filesPerParam, setFilesPerParam] = useState<
    Record<number, Record<string, AttachedFile[]>>
  >({});

  const [showParamFiles, setShowParamFiles] = useState<Record<number, boolean>>(
    {},
  );

  const getFilesForPrep = (
    paramId: number,
    type: string | null,
    label: string | null,
  ): AttachedFile[] =>
    (filesPerParam[paramId] ?? {})[prepFileKey(type, label)] ?? [];

  const getParamLevelFiles = (paramId: number): AttachedFile[] =>
    (filesPerParam[paramId] ?? {})[PARAM_LEVEL_KEY] ?? [];

  const updateFilesForSlot = (
    paramId: number,
    slotKey: string,
    updater: (prev: AttachedFile[]) => AttachedFile[],
  ) => {
    setFilesPerParam((prev) => ({
      ...prev,
      [paramId]: {
        ...(prev[paramId] ?? {}),
        [slotKey]: updater((prev[paramId] ?? {})[slotKey] ?? []),
      },
    }));
  };

  const handleAddPrepFiles = (
    paramId: number,
    type: string | null,
    label: string | null,
    newFiles: AttachedFile[],
  ) => {
    const key = prepFileKey(type, label);
    updateFilesForSlot(paramId, key, (prev) => [...prev, ...newFiles]);
  };

  const handleRemovePrepFile = (
    paramId: number,
    type: string | null,
    label: string | null,
    index: number,
  ) => {
    const key = prepFileKey(type, label);
    updateFilesForSlot(paramId, key, (prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  const handleAddParamFiles = (paramId: number, newFiles: AttachedFile[]) => {
    updateFilesForSlot(paramId, PARAM_LEVEL_KEY, (prev) => [
      ...prev,
      ...newFiles,
    ]);
  };

  const handleRemoveParamFile = (paramId: number, index: number) => {
    updateFilesForSlot(paramId, PARAM_LEVEL_KEY, (prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  const collectFilesForParam = (paramId: number): WorksheetFileData[] => {
    const slots = filesPerParam[paramId] ?? {};
    const result: WorksheetFileData[] = [];

    for (const [slotKey, slotFiles] of Object.entries(slots)) {
      for (const f of slotFiles) {
        if (slotKey === PARAM_LEVEL_KEY) {
          result.push({
            id: f.id,
            preparationType: null,
            label: null,
            fileName: f.fileName,
            fileDataBase64: f.fileDataBase64,
          });
        } else {
          const separatorIdx = slotKey.indexOf("|");
          const type =
            separatorIdx >= 0 ? slotKey.slice(0, separatorIdx) : slotKey;
          const label =
            separatorIdx >= 0 ? slotKey.slice(separatorIdx + 1) : "";

          result.push({
            id: f.id,
            preparationType: type || null,
            label: label || null,
            fileName: f.fileName,
            fileDataBase64: f.fileDataBase64,
          });
        }
      }
    }

    return result;
  };

  return {
    prepFileKey,
    filesPerParam,
    setFilesPerParam,
    showParamFiles,
    setShowParamFiles,
    getFilesForPrep,
    getParamLevelFiles,
    updateFilesForSlot,
    handleAddPrepFiles,
    handleRemovePrepFile,
    handleAddParamFiles,
    handleRemoveParamFile,
    collectFilesForParam,
  };
}
