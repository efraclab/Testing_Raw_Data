import { createNewBufferPreparation } from "./drugWorksheetFactories";

export function useDrugBufferPreparationHandlers(ctx: any) {
  const {
    setBufferPreparationPerParam,
  } = ctx;

    // Buffer Preparation Handlers
    const handleAddBufferPreparation = (parameterId: number) => {
      setBufferPreparationPerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [...current, createNewBufferPreparation(current.length)],
        };
      });
    };

    const handleRemoveBufferPreparation = (
      parameterId: number,
      bufferPrepId: number,
    ) => {
      setBufferPreparationPerParam((prev) => {
        const updated = (prev[parameterId] || [])
          .filter((bp) => bp.id !== bufferPrepId)
          .map((bp, i) => ({ ...bp, label: `Buffer Preparation ${i + 1}` }));
        return { ...prev, [parameterId]: updated };
      });
    };

    const handleBufferPreparationStepChange = (
      parameterId: number,
      bufferPrepId: number,
      stepName: string,
      field: "value1" | "unit1" | "logBookID" | "solventChemical",
      newValue: string,
    ) => {
      setBufferPreparationPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((bp) => {
          if (bp.id !== bufferPrepId) return bp;
          return {
            ...bp,
            steps: bp.steps.map((step) =>
              step.name === stepName ? { ...step, [field]: newValue } : step,
            ),
          };
        }),
      }));
    };

  return {
    handleAddBufferPreparation,
    handleRemoveBufferPreparation,
    handleBufferPreparationStepChange,
  };
}
