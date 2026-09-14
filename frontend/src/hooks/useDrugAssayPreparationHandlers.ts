// file: frontend/src/hooks/useDrugAssayPreparationHandlers.ts
//
// RECONSTRUCTED - the original version of this file was accidentally
// overwritten during this session (my mistake, not caught in time despite
// three warning signs). This is rebuilt from confirmed real evidence:
//   - The exact arguments DrugWorksheet.tsx passes into this hook
//   - The exact handler names DrugAssaySection.tsx calls
//   - The confirmed sibling pattern in useDrugAssayFerrousFumaratePreparationHandlers.ts
//
// It is very likely close to the original, but is NOT guaranteed identical -
// if Assay preparation behaves differently after this (e.g. a validation
// rule, a slightly different reset behavior), that's the most likely place
// a subtle difference from the original would show up. Please review this
// against your own memory of how "Add Standard Preparation" used to behave
// before trusting it fully.

import { createNewSamplePreparation } from "./drugWorksheetFactories";
import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationStep } from "../preparation_models/drugs/SamplePreparationStep";

export function useDrugAssayPreparationHandlers(ctx: any) {
  const {
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setShowStandardSelectionDialog,
    setSamplePreparationPerParam,
    setStandardPreparationAssayPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

  // --- Standard Preparation ---
  //
  // "Add Standard Preparation" opens the shared standard-selection dialog
  // rather than creating a blank preparation directly - this is inferred
  // from the fact that this hook is handed setCurrentParameterForStandardPrep
  // and setShowStandardSelectionDialog, which only make sense if adding a
  // standard preparation means "pick a standard first". The actual
  // StandardPreparation object (with the chosen assignedStandardId) then
  // gets created elsewhere, by handleStandardSelectedForPreparation, once
  // the user picks from that dialog - that function lives outside this
  // hook (seen passed directly into DrugSelectionActionDialogs in
  // DrugWorksheet.tsx, not returned from this hook).
  //
  // setIsAddingRSStandard(false) / setIsAddingDissoStandard(false) reset
  // sibling flags so the shared dialog knows THIS is the Assay flow, not
  // the Related Substance or Dissolution one reusing the same dialog.

  const handleAddStandardPreparation = (parameterId: number) => {
    setCurrentParameterForStandardPrep(parameterId);
    setIsAddingRSStandard(false);
    setIsAddingDissoStandard(false);
    setShowStandardSelectionDialog(true);
  };

  const handleRemoveStandardPreparation = (
    parameterId: number,
    standardPrepId: number,
  ) => {
    setStandardPreparationAssayPerParam((prev: any) => {
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
        const fileKeyToRemove = prepFileKey("assay_standard", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleStandardPreparationStepChange = (
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
    setStandardPreparationAssayPerParam((prev: any) => ({
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
  //
  // Unlike Standard Preparation, Sample Preparation has no assignedStandardId
  // (see SamplePreparation.ts), so it can be created directly - no dialog
  // needed, matching the useDrugAssayFerrousFumaratePreparationHandlers.ts
  // pattern exactly.

  const handleAddSamplePreparation = (parameterId: number) => {
    setSamplePreparationPerParam((prev: any) => {
      const current = prev[parameterId] || [];
      const newIndex = current.length;
      return {
        ...prev,
        [parameterId]: [...current, createNewSamplePreparation(newIndex)],
      };
    });
  };

  const handleRemoveSamplePreparation = (
    parameterId: number,
    samplePrepId: number,
  ) => {
    setSamplePreparationPerParam((prev: any) => {
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
        const fileKeyToRemove = prepFileKey("assay_sample", removedPrep.label);
        setFilesPerParam((prevFiles: any) => {
          const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
          delete paramSlots[fileKeyToRemove];
          return { ...prevFiles, [parameterId]: paramSlots };
        });
      }
      return { ...prev, [parameterId]: updated };
    });
  };

  const handleSamplePreparationStepChange = (
    parameterId: number,
    samplePrepId: number,
    stepName: SamplePreparationStep["name"],
    field:
      | "value1"
      | "value2"
      | "unit1"
      | "unit2"
      | "logBookID"
      | "solventChemical",
    newValue: string,
  ) => {
    setSamplePreparationPerParam((prev: any) => ({
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
    handleAddStandardPreparation,
    handleRemoveStandardPreparation,
    handleStandardPreparationStepChange,
    handleAddSamplePreparation,
    handleRemoveSamplePreparation,
    handleSamplePreparationStepChange,
  };
}