import type { CalculationAssay } from "../preparation_models/drugs/CalculationAssay";
import type { CalculationLod } from "../preparation_models/drugs/CalculationLod";
import type { CalculationROI } from "../preparation_models/drugs/CalculationROI";
import {
  createNewCalculationAssay,
  createNewCalculationLod,
  createNewCalculationROI,
} from "./drugWorksheetFactories";

export function useDrugBasicCalculationHandlers(ctx: any) {
  const {
    setCalculationsAssayPerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
  } = ctx;

    // Calculation Handlers - Assay
    const handleAddCalculationAssay = (parameterId: number) => {
      setCalculationsAssayPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationAssay(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationAssay = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsAssayPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({ ...calc, label: `Calculation ${index + 1}` }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationAssayFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationAssay,
      value: string | number | null,
    ) => {
      setCalculationsAssayPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) => {
          if (calc.id === calculationId) {
            return { ...calc, [field]: value };
          }
          return calc;
        }),
      }));
    };

    // Calculation Handlers - LOD
    const handleAddCalculationLod = (parameterId: number) => {
      setCalculationsLodPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationLod(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationLod = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsLodPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationLodFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationLod,
      value: string | number | null,
    ) => {
      setCalculationsLodPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) => {
          if (calc.id === calculationId) {
            return { ...calc, [field]: value };
          }
          return calc;
        }),
      }));
    };

    // Calculation Handlers - ROI
    const handleAddCalculationROI = (parameterId: number) => {
      setCalculationsROIPerParam((prev) => {
        const currentCalculations = prev[parameterId] || [];
        const newIndex = currentCalculations.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentCalculations,
            createNewCalculationROI(newIndex),
          ],
        };
      });
    };

    const handleRemoveCalculationROI = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsROIPerParam((prev) => {
        const updatedCalculations = (prev[parameterId] || [])
          .filter((calc) => calc.id !== calculationId)
          .map((calc, index) => ({
            ...calc,
            label: `Calculation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updatedCalculations };
      });
    };

    const handleCalculationROIFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationROI,
      value: string | number | null,
    ) => {
      setCalculationsROIPerParam((prev) => ({
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
    handleAddCalculationAssay,
    handleRemoveCalculationAssay,
    handleCalculationAssayFieldChange,
    handleAddCalculationLod,
    handleRemoveCalculationLod,
    handleCalculationLodFieldChange,
    handleAddCalculationROI,
    handleRemoveCalculationROI,
    handleCalculationROIFieldChange,
  };
}
