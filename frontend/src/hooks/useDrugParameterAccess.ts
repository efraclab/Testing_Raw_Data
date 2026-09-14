import { useCallback } from "react";

export function useDrugParameterAccess(
  role: string,
  parameterStatusPerParam: Record<number, string>,
  revisionStartedParams: Set<number>,
) {
  const isParameterLocked = useCallback(
    (parameterId: number): boolean => {
      const status = (
        parameterStatusPerParam[parameterId] || "created"
      ).toLowerCase();

      return [
        "analysis pending",
        "analysis started",
        "analysis completed",
        "analysis revision",
        "analysis revision started",
        "approved",
      ].includes(status);
    },
    [parameterStatusPerParam],
  );

  const isParameterEditableForAnalyst = useCallback(
    (parameterId: number): boolean => {
      if (role !== "Analyst") return false;

      const status = (
        parameterStatusPerParam[parameterId] || "created"
      ).toLowerCase();

      return (
        ["created", "analysis started", "analysis revision started"].includes(
          status,
        ) || revisionStartedParams.has(parameterId)
      );
    },
    [role, parameterStatusPerParam, revisionStartedParams],
  );

  return {
    isParameterLocked,
    isParameterEditableForAnalyst,
  };
}
