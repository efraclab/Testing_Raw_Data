import type { CalculationRelatedSubstance } from "../preparation_models/drugs/CalculationRelatedSubstance";
import { createNewCalculationRelatedSubstance } from "./drugWorksheetFactories";

export function useDrugRelatedSubstanceCalculationHandlers(ctx: any) {
  const { setCalculationsRelatedSubstancePerParam } = ctx;

    const handleAddCalculationRelatedSubstance = (parameterId: number) => {
      setCalculationsRelatedSubstancePerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationRelatedSubstance(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationRelatedSubstance = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsRelatedSubstancePerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationRelatedSubstanceFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationRelatedSubstance,
      value: string | number | null,
    ) => {
      setCalculationsRelatedSubstancePerParam((prev) => ({
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
    handleAddCalculationRelatedSubstance,
    handleRemoveCalculationRelatedSubstance,
    handleCalculationRelatedSubstanceFieldChange,
  };
}
