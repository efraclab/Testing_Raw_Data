import type { ParameterDetail } from "../models/ParameterDetail";
import { updateParameter } from "../services/api";

export function useDrugParameterUnlockHandlers(ctx: any) {
  const {
    parameterToUnlock,
    setParameterToUnlock,
    setShowUnlockDialog,
    setIsUnlocking,
    setParameterStatusPerParam,
    setToastMessage,
    setShowToast,
  } = ctx;

    const handleInitiateUnlock = (param: ParameterDetail) => {
      setParameterToUnlock(param);
      setShowUnlockDialog(true);
    };
    const handleConfirmUnlock = async () => {
      if (!parameterToUnlock) return;

      setIsUnlocking(true);

      try {
        // Update parameter status to "created"
        const updatedParam = {
          ...parameterToUnlock,
          status: "created",
          analyzedBy: null,
          analyzedByName: null,
          analysisStartDate: null,
        };

        const response = await updateParameter(
          parameterToUnlock.id,
          updatedParam,
        );

        if (response && response.parameterId) {
          // Update local state
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterToUnlock.id]: "created",
          }));

          setToastMessage("Parameter unlocked successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);

          setShowUnlockDialog(false);
          setParameterToUnlock(null);
        } else {
          setToastMessage("Failed to unlock parameter!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
        }
      } catch (error) {
        setToastMessage(`Error unlocking parameter:${error}`);

        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsUnlocking(false);
      }
    };

  return {
    handleInitiateUnlock,
    handleConfirmUnlock,
  };
}
