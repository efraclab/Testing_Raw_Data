import type { ParameterDetail } from "../models/ParameterDetail";
import { updateParameter, insertWorksheetLog } from "../services/api";

export function useDrugPreparationCompletionHandlers(ctx: any) {
  const {
    paramForPreparation,
    setParamForPreparation,
    setShowCompletePreparationDialog,
    setShowUnlockPreparationDialog,
    setIsCompletingPreparation,
    setIsUnlockingPreparation,

    groupPrepDialogParam,
    setGroupPrepDialogParam,
    groupPrepDialogKey,
    setGroupPrepDialogKey,
    setShowCompleteGroupPrepDialog,
    setShowUnlockGroupPrepDialog,
    setIsCompletingGroupPrep,
    setIsUnlockingGroupPrep,

    buildFullParamPayload,
    setPreparationCompletedByPerParam,
    setPreparationCompletedAtPerParam,
    setGroupPrepCompletedAtPerParam,

    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  } = ctx;

    // ── Complete Preparation handlers ──
    const handleInitiateCompletePreparation = (param: ParameterDetail) => {
      setParamForPreparation(param);
      setShowCompletePreparationDialog(true);
    };

    const handleConfirmCompletePreparation = async () => {
      if (!paramForPreparation) return;
      setIsCompletingPreparation(true);
      try {
        const paramId = paramForPreparation.id;
        const completedBy = employeeId;
        const completedAt = new Date().toISOString();
        const paramData = buildFullParamPayload(paramId, {
          preparationCompletedBy: completedBy,
          preparationCompletedAt: completedAt,
        });
        if (paramData) {
          const response = await updateParameter(paramId, paramData);
          if (response && response.parameterId) {
            setPreparationCompletedByPerParam((prev) => ({
              ...prev,
              [paramId]: completedBy,
            }));
            setPreparationCompletedAtPerParam((prev) => ({
              ...prev,
              [paramId]: completedAt,
            }));
            setToastMessage("Preparation marked as complete!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
            await insertWorksheetLog({
              worksheetId,
              parameterId: paramId,
              action: "Preparation Completed",
              remarks: `Preparation completed for parameter "${paramForPreparation.parameterName}"`,
              employeeId,
              role,
            });
          } else {
            setToastMessage("Failed to complete preparation!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }
        }
      } catch (error) {
        setToastMessage(`Error completing preparation: ${error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsCompletingPreparation(false);
        setShowCompletePreparationDialog(false);
        setParamForPreparation(null);
      }
    };

    // ── Unlock Preparation handlers ──
    const handleInitiateUnlockPreparation = (param: ParameterDetail) => {
      setParamForPreparation(param);
      setShowUnlockPreparationDialog(true);
    };

    const handleConfirmUnlockPreparation = async () => {
      if (!paramForPreparation) return;
      setIsUnlockingPreparation(true);
      try {
        const paramId = paramForPreparation.id;
        const paramData = buildFullParamPayload(paramId, {
          preparationCompletedBy: null,
          preparationCompletedAt: null,
        });
        if (paramData) {
          const response = await updateParameter(paramId, paramData);
          if (response && response.parameterId) {
            setPreparationCompletedByPerParam((prev) => {
              const { [paramId]: _, ...r } = prev;
              return r;
            });
            setPreparationCompletedAtPerParam((prev) => {
              const { [paramId]: _, ...r } = prev;
              return r;
            });
            setToastMessage("Preparation unlocked successfully!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
            await insertWorksheetLog({
              worksheetId,
              parameterId: paramId,
              action: "Preparation Unlocked",
              remarks: `Preparation unlocked for parameter "${paramForPreparation.parameterName}"`,
              employeeId,
              role,
            });
          } else {
            setToastMessage("Failed to unlock preparation!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }
        }
      } catch (error) {
        setToastMessage(`Error unlocking preparation: ${error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsUnlockingPreparation(false);
        setShowUnlockPreparationDialog(false);
        setParamForPreparation(null);
      }
    };
    // ── Per-group Preparation handlers ──
    const handleInitiateCompleteGroupPrep = (
      param: ParameterDetail,
      groupKey: string,
    ) => {
      setGroupPrepDialogParam(param);
      setGroupPrepDialogKey(groupKey);
      setShowCompleteGroupPrepDialog(true);
    };

    const handleConfirmCompleteGroupPrep = async () => {
      if (!groupPrepDialogParam) return;
      setIsCompletingGroupPrep(true);
      try {
        const paramId = groupPrepDialogParam.id;
        const completedBy = employeeId;
        const completedAt = new Date().toISOString();
        // Use the same preparationCompletedBy/At fields as the main prep complete.
        // groupPrepDialogKey identifies which group triggered it (for UI/toast only).
        const paramData = buildFullParamPayload(paramId, {
          preparationCompletedBy: completedBy,
          preparationCompletedAt: completedAt,
        });
        if (paramData) {
          const response = await updateParameter(paramId, paramData);
          if (response && response.parameterId) {
            setPreparationCompletedByPerParam((prev) => ({
              ...prev,
              [paramId]: completedBy,
            }));
            setPreparationCompletedAtPerParam((prev) => ({
              ...prev,
              [paramId]: completedAt,
            }));
            // Also update local groupPrepCompletedAt so the UI reflects this group as done
            setGroupPrepCompletedAtPerParam((prev) => ({
              ...prev,
              [paramId]: {
                ...(prev[paramId] || {}),
                [groupPrepDialogKey]: completedAt,
              },
            }));
            setToastMessage(
              `${groupPrepDialogKey.toUpperCase()} preparation marked as complete!`,
            );
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
            await insertWorksheetLog({
              worksheetId,
              parameterId: paramId,
              action: "Preparation Completed",
              remarks: `${groupPrepDialogKey} preparation completed for parameter "${groupPrepDialogParam.parameterName}"`,
              employeeId,
              role,
            });
          } else {
            setToastMessage("Failed to complete preparation!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }
        }
      } catch (error) {
        setToastMessage(`Error completing preparation: ${error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsCompletingGroupPrep(false);
        setShowCompleteGroupPrepDialog(false);
        setGroupPrepDialogParam(null);
        setGroupPrepDialogKey("");
      }
    };

    const handleInitiateUnlockGroupPrep = (
      param: ParameterDetail,
      groupKey: string,
    ) => {
      setGroupPrepDialogParam(param);
      setGroupPrepDialogKey(groupKey);
      setShowUnlockGroupPrepDialog(true);
    };

    const handleConfirmUnlockGroupPrep = async () => {
      if (!groupPrepDialogParam) return;
      setIsUnlockingGroupPrep(true);
      try {
        const paramId = groupPrepDialogParam.id;
        // Clear preparationCompletedBy/At — same field as the main prep unlock.
        const paramData = buildFullParamPayload(paramId, {
          preparationCompletedBy: null,
          preparationCompletedAt: null,
        });
        if (paramData) {
          const response = await updateParameter(paramId, paramData);
          if (response && response.parameterId) {
            setPreparationCompletedByPerParam((prev) => {
              const { [paramId]: _, ...r } = prev;
              return r;
            });
            setPreparationCompletedAtPerParam((prev) => {
              const { [paramId]: _, ...r } = prev;
              return r;
            });
            // Also clear local groupPrepCompletedAt for this group so UI updates
            setGroupPrepCompletedAtPerParam((prev) => {
              const g = { ...(prev[paramId] || {}) };
              delete g[groupPrepDialogKey];
              return { ...prev, [paramId]: g };
            });
            setToastMessage(
              `${groupPrepDialogKey.toUpperCase()} preparation unlocked!`,
            );
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
            await insertWorksheetLog({
              worksheetId,
              parameterId: paramId,
              action: "Group Preparation Unlocked",
              remarks: `${groupPrepDialogKey} preparation unlocked for parameter "${groupPrepDialogParam.parameterName}"`,
              employeeId,
              role,
            });
          } else {
            setToastMessage("Failed to unlock preparation!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }
        }
      } catch (error) {
        setToastMessage(`Error unlocking preparation: ${error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsUnlockingGroupPrep(false);
        setShowUnlockGroupPrepDialog(false);
        setGroupPrepDialogParam(null);
        setGroupPrepDialogKey("");
      }
    };

  return {
    handleInitiateCompletePreparation,
    handleConfirmCompletePreparation,
    handleInitiateUnlockPreparation,
    handleConfirmUnlockPreparation,
    handleInitiateCompleteGroupPrep,
    handleConfirmCompleteGroupPrep,
    handleInitiateUnlockGroupPrep,
    handleConfirmUnlockGroupPrep,
  };
}
