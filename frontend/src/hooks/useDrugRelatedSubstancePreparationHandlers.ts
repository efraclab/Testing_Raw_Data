import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationStep } from "../preparation_models/drugs/SamplePreparationStep";

export function useDrugRelatedSubstancePreparationHandlers(ctx: any) {
  const {
    setStandardPreparationRelatedSubstancePerParam,
    setSamplePreparationRelatedSubstancePerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // ======================== RELATED SUBSTANCE HANDLERS ========================

    const handleRemoveStandardPreparationRelatedSubstance = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationRelatedSubstancePerParam((prev) => {
        const standards = prev[parameterId] || [];
        const indexToRemove = standards.findIndex(
          (sp) => sp.id === standardPreparationId,
        );
        const removedPrep = standards[indexToRemove];

        const updatedStandards = standards
          .filter((dm) => dm.id !== standardPreparationId)
          .map((dm, index) => ({
            ...dm,
            label: `Standard Preparation ${1 + index}`,
          }));

        if (indexToRemove !== -1) {
          setSamplePreparationRelatedSubstancePerParam((prevSample) => {
            const samples = prevSample[parameterId] || [];
            const updatedSamples = samples
              .filter((_, idx) => idx !== indexToRemove)
              .map((sp, index) => ({
                ...sp,
                label: `Sample Preparation ${1 + index}`,
              }));
            return { ...prevSample, [parameterId]: updatedSamples };
          });

          if (removedPrep) {
            const fileKeyToRemove = prepFileKey(
              "related_substance",
              removedPrep.label,
            );
            setFilesPerParam((prevFiles) => {
              const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
              delete paramSlots[fileKeyToRemove];
              return { ...prevFiles, [parameterId]: paramSlots };
            });
          }
        }

        return { ...prev, [parameterId]: updatedStandards };
      });
    };

    const handleStandardPreparationRelatedSubstanceStepChange = (
      parameterId: number,
      standardPreparationId: number,
      stepName: StandardPreparationStep["name"],
      field:
        | "value1"
        | "value2"
        | "unit1"
        | "unit2"
        | "value3"
        | "unit3"
        | "logBookID"
        | "solventChemical",
      newValue: string,
    ) => {
      setStandardPreparationRelatedSubstancePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) => {
          if (sp.id === standardPreparationId) {
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

    const handleSamplePreparationRelatedSubstanceStepChange = (
      parameterId: number,
      samplePreparationId: number,
      stepName: SamplePreparationStep["name"],
      field:
        | "value"
        | "unit"
        | "value1"
        | "value2"
        | "unit1"
        | "unit2"
        | "logBookID"
        | "solventChemical",
      newValue: string,
    ) => {
      setSamplePreparationRelatedSubstancePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) => {
          if (sp.id === samplePreparationId) {
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
    handleRemoveStandardPreparationRelatedSubstance,
    handleStandardPreparationRelatedSubstanceStepChange,
    handleSamplePreparationRelatedSubstanceStepChange,
  };
}
