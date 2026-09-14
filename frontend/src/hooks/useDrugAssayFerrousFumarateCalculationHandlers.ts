import type { CalculationAssayFerrousFumarate } from "../preparation_models/drugs/CalculationAssayFerrousFumarate";
import { createNewAssayCalculationFerrousFumarate } from "./drugWorksheetFactories";

export function useDrugAssayFerrousFumarateCalculationHandlers(ctx: any) {
  const {
    setCalculationsAssayFerrousFumaratePerParam,
  } = ctx;

    // Ferrous Fumarate Calculation Handlers
    const handleAddCalculationFerrousFumarate = (parameterId: number) => {
      setCalculationsAssayFerrousFumaratePerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [
            ...current,
            createNewAssayCalculationFerrousFumarate(current.length),
          ],
        };
      });
    };

    const handleRemoveCalculationFerrousFumarate = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsAssayFerrousFumaratePerParam((prev) => {
        const updated = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({ ...calc, label: `Calculation ${index + 1}` }));
        return { ...prev, [parameterId]: updated };
      });
    };

    const handleCalculationFerrousFumarateFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationAssayFerrousFumarate,
      value: string | null,
    ) => {
      setCalculationsAssayFerrousFumaratePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) =>
          calc.id === calculationId ? { ...calc, [field]: value } : calc,
        ),
      }));
    };

  return {
    handleAddCalculationFerrousFumarate,
    handleRemoveCalculationFerrousFumarate,
    handleCalculationFerrousFumarateFieldChange,
  };
}
