import { createNewSamplePreparationTitration } from "./drugWorksheetFactories";
import type { SamplePreparationTitrationStep } from "../preparation_models/drugs/SamplePreparationTitrationStep";

export function useDrugAssayFerrousFumaratePreparationHandlers(ctx: any) {
  const {
    setSamplePrepAssayFerrousFumaratePerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // Sample Preparation Assay (Ferrous Fumarate) Handlers
    const handleAddSamplePrepAssayFerrousFumaratePerParam = (
      parameterId: number,
    ) => {
      setSamplePrepAssayFerrousFumaratePerParam((prev) => {
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

    const handleRemoveSamplePrepAssayFerrousFumaratePerParam = (
      parameterId: number,
      samplePrepId: number,
    ) => {
      setSamplePrepAssayFerrousFumaratePerParam((prev) => {
        const removedPrep = (prev[parameterId] || []).find(
          (sp) => sp.id === samplePrepId,
        );
        const updated = (prev[parameterId] || [])
          .filter((sp) => sp.id !== samplePrepId)
          .map((sp, index) => ({
            ...sp,
            label: `Sample Preparation ${index + 1}`,
          }));
        if (removedPrep) {
          const fileKeyToRemove = prepFileKey(
            "assay_ferrous_fumarate",
            removedPrep.label,
          );
          setFilesPerParam((prevFiles) => {
            const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
            delete paramSlots[fileKeyToRemove];
            return { ...prevFiles, [parameterId]: paramSlots };
          });
        }
        return { ...prev, [parameterId]: updated };
      });
    };

    const handleSamplePrepAssayFerrousFumaratePerParamStepChange = (
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
      setSamplePrepAssayFerrousFumaratePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) => {
          if (sp.id === samplePrepId) {
            return {
              ...sp,
              steps: sp.steps.map((step) => {
                if (step.name === stepName) {
                  return { ...step, [field]: newValue };
                }
                return step;
              }),
            };
          }
          return sp;
        }),
      }));
    };

  return {
    handleAddSamplePrepAssayFerrousFumaratePerParam,
    handleRemoveSamplePrepAssayFerrousFumaratePerParam,
    handleSamplePrepAssayFerrousFumaratePerParamStepChange,
  };
}
