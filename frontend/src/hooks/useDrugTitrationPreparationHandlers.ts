// file: frontend/src/hooks/useDrugTitrationPreparationHandlers.ts
//
// Dedicated Standard + Sample Preparation handlers for the new
// "Assay by Titration" template - following the exact same pattern as
// useDrugAssayFerrousFumaratePreparationHandlers.ts, just with its own
// state instead of sharing anyone else's.
//
// Standard Preparation reuses the same generic StandardPreparation model
// every other calc type uses (see StandardPreparation.ts).
// Sample Preparation reuses SamplePreparationTitration - the same shared
// step model Ferrous Fumarate uses, via the same factory function.

import {
  createNewSamplePreparationTitration,
  createNewStandardPreparation,
} from "./drugWorksheetFactories";
import type { SamplePreparationTitrationStep } from "../preparation_models/drugs/SamplePreparationTitrationStep";
import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";

export function useDrugTitrationPreparationHandlers(ctx: any) {
  const {
    setStandardPreparationTitrationPerParam,
    setSamplePreparationTitrationPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

  // --- Standard Preparation ---

  const handleAddStandardPreparationTitration = (parameterId: number) => {
    setStandardPreparationTitrationPerParam((prev: any) => {
      const current = prev[parameterId] || [];
      const newIndex = current.length;
      return {
        ...prev,
        [parameterId]: [...current, createNewStandardPreparation(newIndex)],
      };
    });
  };

  const handleRemoveStandardPreparationTitration = (
    parameterId: number,
    standardPrepId: number,
  ) => {
    setStandardPreparationTitrationPerParam((prev: any) => {
      const removedPrep = (prev[parameterId] || []).find(
        (sp: any) => sp.id === standardPrepId,
      );
      const updated = (prev[parameterId] || [])
        .filter((sp: any) => sp.id !== standardPrepId)
        .map((sp: any, index: number) => ({
          ...sp,
          label: `Standard Preparation ${index + 1}`,
        }));
      if (removedPrep) {
        const fileKeyToRemove = prepFileKey("assay_titration_standard", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleStandardPreparationTitrationStepChange = (
    parameterId: number,
    standardPrepId: number,
    stepName: StandardPreparationStep["name"],
    field:
      | "value1"
      | "value2"
      | "unit1"
      | "unit2"
      | "logBookID"
      | "solventChemical",
    newValue: string,
  ) => {
    setStandardPreparationTitrationPerParam((prev: any) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).map((sp: any) => {
        if (sp.id !== standardPrepId) return sp;
        return {
          ...sp,
          steps: sp.steps.map((step: any) =>
            step.name === stepName ? { ...step, [field]: newValue } : step,
          ),
        };
      }),
    }));
  };

  // --- Sample Preparation ---

  const handleAddSamplePreparationTitration = (parameterId: number) => {
    setSamplePreparationTitrationPerParam((prev: any) => {
      const current = prev[parameterId] || [];
      const newIndex = current.length;
      return {
        ...prev,
        [parameterId]: [
          ...current,
          createNewSamplePreparationTitration(newIndex),
        ],
      };
    });
  };

  const handleRemoveSamplePreparationTitration = (
    parameterId: number,
    samplePrepId: number,
  ) => {
    setSamplePreparationTitrationPerParam((prev: any) => {
      const removedPrep = (prev[parameterId] || []).find(
        (sp: any) => sp.id === samplePrepId,
      );
      const updated = (prev[parameterId] || [])
        .filter((sp: any) => sp.id !== samplePrepId)
        .map((sp: any, index: number) => ({
          ...sp,
          label: `Sample Preparation ${index + 1}`,
        }));
      if (removedPrep) {
        const fileKeyToRemove = prepFileKey("assay_titration_sample", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleSamplePreparationTitrationStepChange = (
    parameterId: number,
    samplePrepId: number,
    stepName: SamplePreparationTitrationStep["name"],
    field:
      | "value1"
      | "value2"
      | "value3"
      | "logBookID"
      | "unit1"
      | "unit2"
      | "unit3"
      | "solventChemical",
    newValue: string,
  ) => {
    setSamplePreparationTitrationPerParam((prev: any) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).map((sp: any) => {
        if (sp.id !== samplePrepId) return sp;
        return {
          ...sp,
          steps: sp.steps.map((step: any) =>
            step.name === stepName ? { ...step, [field]: newValue } : step,
          ),
        };
      }),
    }));
  };

  return {
    handleAddStandardPreparationTitration,
    handleRemoveStandardPreparationTitration,
    handleStandardPreparationTitrationStepChange,
    handleAddSamplePreparationTitration,
    handleRemoveSamplePreparationTitration,
    handleSamplePreparationTitrationStepChange,
  };
}