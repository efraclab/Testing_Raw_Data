import type { CalculationUC } from "../preparation_models/drugs/CalculationUC";
import { createNewCalculationUC } from "./drugWorksheetFactories";

export function useDrugUniformityCalculationHandlers(ctx: any) {
  const { setCalculationsUCPerParam } = ctx;

    // UC Calculation Handlers
    const handleAddCalculationUC = (parameterId: number) => {
      setCalculationsUCPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationUC(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationUC = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsUCPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationUCFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationUC,
      value: string | number | null,
    ) => {
      setCalculationsUCPerParam((prev) => ({
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
    handleAddCalculationUC,
    handleRemoveCalculationUC,
    handleCalculationUCFieldChange,
  };
}
