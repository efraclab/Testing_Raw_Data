import type { CalculationRS } from "../preparation_models/drugs/CalculationRS";
import { createNewCalculationRS } from "./drugWorksheetFactories";

export function useDrugResidualSolventCalculationHandlers(ctx: any) {
  const { setCalculationsRSPerParam } = ctx;

    const handleAddCalculationRS = (parameterId: number) => {
      setCalculationsRSPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationRS(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationRS = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsRSPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationRSFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationRS,
      value: string | number | null,
    ) => {
      setCalculationsRSPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) => {
          if (calc.id === calculationId) {
            return { ...calc, [field]: value };
          }
          return calc;
        }),
      }));
    };

  return {
    handleAddCalculationRS,
    handleRemoveCalculationRS,
    handleCalculationRSFieldChange,
  };
}
