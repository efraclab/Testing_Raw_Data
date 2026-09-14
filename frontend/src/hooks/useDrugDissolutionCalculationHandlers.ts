import type { CalculationDisso } from "../preparation_models/drugs/CalculationDisso";
import { createNewCalculationDisso } from "./drugWorksheetFactories";

export function useDrugDissolutionCalculationHandlers(ctx: any) {
  const { setCalculationsDissoPerParam } = ctx;

    const handleAddCalculationDisso = (parameterId: number) => {
      setCalculationsDissoPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationDisso(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationDisso = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsDissoPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationDissoFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationDisso,
      value: string | number | null,
    ) => {
      setCalculationsDissoPerParam((prev) => ({
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
    handleAddCalculationDisso,
    handleRemoveCalculationDisso,
    handleCalculationDissoFieldChange,
  };
}
