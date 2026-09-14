import type { SamplePreparationTitrationStep } from "../preparation_models/drugs/SamplePreparationTitrationStep";
import { createNewSamplePreparationTitration } from "./drugWorksheetFactories";

export function useDrugDissolutionFerrousFumaratePreparationHandlers(ctx: any) {
  const {
    setSamplePrepDissoFerrousFumaratePerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // Sample Preparation Dissolution (Ferrous Fumarate) Handlers
    const handleAddSamplePrepDissoFerrousFumarate = (parameterId: number) => {
      setSamplePrepDissoFerrousFumaratePerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [
            ...current,
            createNewSamplePreparationTitration(current.length),
          ],
        };
      });
    };

    const handleRemoveSamplePrepDissoFerrousFumarate = (
      parameterId: number,
      samplePrepId: number,
    ) => {
      setSamplePrepDissoFerrousFumaratePerParam((prev) => {
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
            "dissolution_ferrous_fumarate",
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

    const handleSamplePrepDissoFerrousFumarateStepChange = (
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
      setSamplePrepDissoFerrousFumaratePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === samplePrepId
            ? {
              ...sp,
              steps: sp.steps.map((step) =>
                step.name === stepName ? { ...step, [field]: newValue } : step,
              ),
            }
            : sp,
        ),
      }));
    };

  return {
    handleAddSamplePrepDissoFerrousFumarate,
    handleRemoveSamplePrepDissoFerrousFumarate,
    handleSamplePrepDissoFerrousFumarateStepChange,
  };
}
