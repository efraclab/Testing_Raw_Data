import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationStep } from "../preparation_models/drugs/SamplePreparationStep";

export function useDrugResidualSolventPreparationHandlers(ctx: any) {
  const {
    setStandardPreparationResidualSolventPerParam,
    setSamplePreparationRSPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    const handleRemoveStandardPreparationRS = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationResidualSolventPerParam((prev) => {
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
          setSamplePreparationRSPerParam((prevSample) => {
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
              "residual_solvent",
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
    const handleStandardPreparationRSStepChange = (
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
      setStandardPreparationResidualSolventPerParam((prev) => ({
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
    const handleRemoveSamplePreparationRS = (
      parameterId: number,
      samplePreparationId: number,
    ) => {
      setSamplePreparationRSPerParam((prev) => {
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
          setStandardPreparationResidualSolventPerParam((prevStandard) => {
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
    const handleSamplePreparationRSStepChange = (
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
      setSamplePreparationRSPerParam((prev) => ({
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
    handleRemoveStandardPreparationRS,
    handleStandardPreparationRSStepChange,
    handleRemoveSamplePreparationRS,
    handleSamplePreparationRSStepChange,
  };
}
