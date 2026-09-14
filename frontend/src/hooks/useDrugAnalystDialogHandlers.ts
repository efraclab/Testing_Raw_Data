import type { ParameterDetail } from "../models/ParameterDetail";

export function useDrugAnalystDialogHandlers(ctx: any) {
  const {
    addedParameters,
    setPendingParameter,
    setShowAnalystDialog,
    setAnalystMode,
  } = ctx;

    const handleAddParameter = (param: ParameterDetail) => {
      if (addedParameters.find((p) => p.paraCode === param.paraCode)) {
        return;
      }

      setPendingParameter(param);
      setShowAnalystDialog(true);
    };
    const handleReassignAnalyst = (paramId: number) => {
      const paramToReassign = addedParameters.find((p) => p.id === paramId);

      if (!paramToReassign) return;

      setAnalystMode("reassign");
      setPendingParameter(paramToReassign);
      setShowAnalystDialog(true);
    };

  return {
    handleAddParameter,
    handleReassignAnalyst,
  };
}
