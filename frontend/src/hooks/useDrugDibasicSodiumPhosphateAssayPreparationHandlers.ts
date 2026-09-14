// file: frontend/src/hooks/useDrugDibasicSodiumPhosphateAssayPreparationHandlers.ts
//
// Dedicated Standard + Sample Preparation handlers for
// "Dibasic Sodium Phosphate Assay" - kept fully separate from Titration.
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

export function useDrugDibasicSodiumPhosphateAssayPreparationHandlers(ctx: any) {
  const {
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam,
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

  // --- Standard Preparation ---

  const handleAddStandardPreparationDibasicSodiumPhosphateAssay = (parameterId: number) => {
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => {
      const current = prev[parameterId] || [];
      const newIndex = current.length;
      return {
        ...prev,
        [parameterId]: [...current, createNewStandardPreparation(newIndex)],
      };
    });
  };

  const handleRemoveStandardPreparationDibasicSodiumPhosphateAssay = (
    parameterId: number,
    standardPrepId: number,
  ) => {
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => {
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
        const fileKeyToRemove = prepFileKey("dibasic_sodium_phosphate_assay_standard", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleStandardPreparationDibasicSodiumPhosphateAssayStepChange = (
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
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => ({
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

  const handleAddSamplePreparationDibasicSodiumPhosphateAssay = (parameterId: number) => {
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => {
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

  const handleRemoveSamplePreparationDibasicSodiumPhosphateAssay = (
    parameterId: number,
    samplePrepId: number,
  ) => {
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => {
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
        const fileKeyToRemove = prepFileKey("dibasic_sodium_phosphate_assay_sample", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleSamplePreparationDibasicSodiumPhosphateAssayStepChange = (
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
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => ({
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
    handleAddStandardPreparationDibasicSodiumPhosphateAssay,
    handleRemoveStandardPreparationDibasicSodiumPhosphateAssay,
    handleStandardPreparationDibasicSodiumPhosphateAssayStepChange,
    handleAddSamplePreparationDibasicSodiumPhosphateAssay,
    handleRemoveSamplePreparationDibasicSodiumPhosphateAssay,
    handleSamplePreparationDibasicSodiumPhosphateAssayStepChange,
  };
}