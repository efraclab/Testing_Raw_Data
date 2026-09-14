import type { CalculationDissoFerrousFumarate } from "../preparation_models/drugs/CalculationDissoFerrousFumarate";
import { createNewCalculationDissoFerrousFumarate } from "./drugWorksheetFactories";

export function useDrugDissolutionFerrousFumarateCalculationHandlers(ctx: any) {
  const { setCalculationsDissoFerrousFumaratePerParam } = ctx;

    // Dissolution Ferrous Fumarate Calculation Handlers
    const handleAddCalculationDissoFerrousFumarate = (parameterId: number) => {
      setCalculationsDissoFerrousFumaratePerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [
            ...current,
            createNewCalculationDissoFerrousFumarate(current.length),
          ],
        };
      });
    };

    const handleRemoveCalculationDissoFerrousFumarate = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsDissoFerrousFumaratePerParam((prev) => {
        const updated = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({ ...calc, label: `Calculation ${index + 1}` }));
        return { ...prev, [parameterId]: updated };
      });
    };

    const handleCalculationDissoFerrousFumarateFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationDissoFerrousFumarate,
      value: string | null,
    ) => {
      setCalculationsDissoFerrousFumaratePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) =>
          calc.id === calculationId ? { ...calc, [field]: value } : calc,
        ),
      }));
    };

  return {
    handleAddCalculationDissoFerrousFumarate,
    handleRemoveCalculationDissoFerrousFumarate,
    handleCalculationDissoFerrousFumarateFieldChange,
  };
}
