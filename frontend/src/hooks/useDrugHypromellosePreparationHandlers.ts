import type { StandardPreparationHypromelloseStep } from "../preparation_models/drugs/Standardpreparationhypromellosestep.ts";
import type { SamplePreparationHypromelloseStep } from "../preparation_models/drugs/Samplepreparationhypromellosestep.ts";

export function useDrugHypromellosePreparationHandlers(ctx: any) {
  const {
    setStandardPreparationHypromellosePerParam,
    setSamplePreparationHypromellosePerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // Hypromellose Standard Preparation Handlers
    const handleRemoveStandardPreparationHypromellose = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationHypromellosePerParam((prev) => {
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
          setSamplePreparationHypromellosePerParam((prevSample) => {
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
            const fileKeyToRemove = prepFileKey("hypromellose", removedPrep.label);
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

    const handleStandardPreparationHypromelloseStepChange = (
      parameterId: number,
      standardPreparationId: number,
      stepName: StandardPreparationHypromelloseStep["name"],
      field:
        | "value1"
        | "unit1"
        | "value2"
        | "unit2"
        | "logBookID"
        | "solventChemical",
      newValue: string,
    ) => {
      setStandardPreparationHypromellosePerParam((prev) => ({
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

    // Hypromellose Sample Preparation Handlers
    const handleRemoveSamplePreparationHypromellose = (
      parameterId: number,
      samplePreparationId: number,
    ) => {
      setSamplePreparationHypromellosePerParam((prev) => {
        const samples = prev[parameterId] || [];
        const indexToRemove = samples.findIndex(
          (sp) => sp.id === samplePreparationId,
        );

        const updatedSamples = samples
          .filter((sp) => sp.id !== samplePreparationId)
          .map((sp, index) => ({
            ...sp,
            label: `Sample Preparation ${1 + index}`,
          }));

        if (indexToRemove !== -1) {
          setStandardPreparationHypromellosePerParam((prevStandard) => {
            const standards = prevStandard[parameterId] || [];
            const updatedStandards = standards
              .filter((_, idx) => idx !== indexToRemove)
              .map((sp, index) => ({
                ...sp,
                label: `Standard Preparation ${1 + index}`,
              }));
            return { ...prevStandard, [parameterId]: updatedStandards };
          });
        }

        return { ...prev, [parameterId]: updatedSamples };
      });
    };

    const handleSamplePreparationHypromelloseStepChange = (
      parameterId: number,
      samplePreparationId: number,
      stepName: SamplePreparationHypromelloseStep["name"],
      field:
        | "value1"
        | "unit1"
        | "value2"
        | "unit2"
        | "logBookID"
        | "solventChemical",
      newValue: string,
    ) => {
      setSamplePreparationHypromellosePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spl) => {
          if (spl.id === samplePreparationId) {
            return {
              ...spl,
              steps: spl.steps.map((step) => {
                if (step.name === stepName) {
                  return { ...step, [field]: newValue };
                }
                return step;
              }),
            };
          }
          return spl;
        }),
      }));
    };

  return {
    handleRemoveStandardPreparationHypromellose,
    handleStandardPreparationHypromelloseStepChange,
    handleRemoveSamplePreparationHypromellose,
    handleSamplePreparationHypromelloseStepChange,
  };
}
