// file: frontend/src/hooks/useDrugBetadexPreparationHandlers.ts
//
// Dedicated Standard + Sample Preparation handlers for
// "Betadex - Batch Analysis" - kept fully separate from Titration.
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

export function useDrugBetadexPreparationHandlers(ctx: any) {
  const {
    setStandardPreparationBetadexPerParam,
    setSamplePreparationBetadexPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

  // --- Standard Preparation ---

  const handleAddStandardPreparationBetadex = (parameterId: number) => {
    setStandardPreparationBetadexPerParam((prev: any) => {
      const current = prev[parameterId] || [];
      const newIndex = current.length;
      return {
        ...prev,
        [parameterId]: [...current, createNewStandardPreparation(newIndex)],
      };
    });
  };

  const handleRemoveStandardPreparationBetadex = (
    parameterId: number,
    standardPrepId: number,
  ) => {
    setStandardPreparationBetadexPerParam((prev: any) => {
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
        const fileKeyToRemove = prepFileKey("betadex_batch_analysis_standard", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleStandardPreparationBetadexStepChange = (
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
    setStandardPreparationBetadexPerParam((prev: any) => ({
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

  const handleAddSamplePreparationBetadex = (parameterId: number) => {
    setSamplePreparationBetadexPerParam((prev: any) => {
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

  const handleRemoveSamplePreparationBetadex = (
    parameterId: number,
    samplePrepId: number,
  ) => {
    setSamplePreparationBetadexPerParam((prev: any) => {
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
        const fileKeyToRemove = prepFileKey("betadex_batch_analysis_sample", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleSamplePreparationBetadexStepChange = (
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
    setSamplePreparationBetadexPerParam((prev: any) => ({
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
    handleAddStandardPreparationBetadex,
    handleRemoveStandardPreparationBetadex,
    handleStandardPreparationBetadexStepChange,
    handleAddSamplePreparationBetadex,
    handleRemoveSamplePreparationBetadex,
    handleSamplePreparationBetadexStepChange,
  };
}