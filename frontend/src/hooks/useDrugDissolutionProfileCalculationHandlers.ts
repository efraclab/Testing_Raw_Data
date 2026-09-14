import type { CalculationDissoProfile } from "../preparation_models/drugs/CalculationDissoProfile";
import { createNewCalculationDissoProfile } from "./drugWorksheetFactories";

export function useDrugDissolutionProfileCalculationHandlers(ctx: any) {
  const { setCalculationsDissoProfilePerParam } = ctx;

    const handleAddCalculationDissoProfile = (parameterId: number) => {
      setCalculationsDissoProfilePerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationDissoProfile(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationDissoProfile = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsDissoProfilePerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationDissoProfileFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationDissoProfile,
      value: string | number | null,
    ) => {
      setCalculationsDissoProfilePerParam((prev) => ({
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
    handleAddCalculationDissoProfile,
    handleRemoveCalculationDissoProfile,
    handleCalculationDissoProfileFieldChange,
  };
}
