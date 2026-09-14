import type { CalculationSulphatedAsh } from "../preparation_models/drugs/CalculationSulphatedAsh";
import { createNewCalculationSulphatedAsh } from "./drugWorksheetFactories";

export function useDrugSulphatedAshCalculationHandlers(ctx: any) {
  const { setCalculationsSulphatedAshPerParam } = ctx;

    // Calculation Handlers - Sulphated Ash
    const handleAddCalculationSulphatedAsh = (parameterId: number) => {
      setCalculationsSulphatedAshPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationSulphatedAsh(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationSulphatedAsh = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsSulphatedAshPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationSulphatedAshFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationSulphatedAsh,
      value: string | number | null,
    ) => {
      setCalculationsSulphatedAshPerParam((prev) => ({
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
    handleAddCalculationSulphatedAsh,
    handleRemoveCalculationSulphatedAsh,
    handleCalculationSulphatedAshFieldChange,
  };
}
