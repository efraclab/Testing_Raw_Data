import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationDissoStep } from "../preparation_models/drugs/SamplePreparationDissoStep";

export function useDrugDissolutionPreparationHandlers(ctx: any) {
  const {
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingUCStandard,
    setIsAddingDissoStandard,
    setShowStandardSelectionDialog,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
    setDissoMediaPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    const handleRemoveSamplePreparationDisso = (
      parameterId: number,
      samplePreparationDissoId: number,
    ) => {
      setSamplePreparationDissoPerParam((prev) => {
        const samples = prev[parameterId] || [];
        const indexToRemove = samples.findIndex(
          (sp) => sp.id === samplePreparationDissoId,
        );
        const removedPrep = samples[indexToRemove];

        const updatedSamples = samples
          .filter((sp) => sp.id !== samplePreparationDissoId)
          .map((sp, index) => ({
            ...sp,
            label: `Sample Preparation ${1 + index}`,
          }));

        if (indexToRemove !== -1) {
          // Remove corresponding Standard preparation
          setStandardPreparationDissoPerParam((prevStandard) => {
            const standards = prevStandard[parameterId] || [];
            const updatedStandards = standards
              .filter((_, idx) => idx !== indexToRemove)
              .map((sp, index) => ({
                ...sp,
                label: `Standard Preparation ${1 + index}`,
              }));
            return { ...prevStandard, [parameterId]: updatedStandards };
          });

          // Remove corresponding Disso Media preparation
          setDissoMediaPerParam((prevDissoMedia) => {
            const dissoMedias = prevDissoMedia[parameterId] || [];
            const updatedDissoMedias = dissoMedias
              .filter((_, idx) => idx !== indexToRemove)
              .map((dm, index) => ({
                ...dm,
                label: `Dissolution Media Preparation ${index + 1}`,
              }));
            return { ...prevDissoMedia, [parameterId]: updatedDissoMedias };
          });

          // Remove files tied to this preparation's slot
          if (removedPrep) {
            const fileKeyToRemove = prepFileKey(
              "dissolution",
              `Preparation Files ${indexToRemove + 1}`,
            );
            setFilesPerParam((prevFiles) => {
              const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
              delete paramSlots[fileKeyToRemove];
              return { ...prevFiles, [parameterId]: paramSlots };
            });
          }
        }

        return { ...prev, [parameterId]: updatedSamples };
      });
    };
    const handleSamplePreparationDissoStepChange = (
      parameterId: number,
      samplePreparationDissoId: number,
      stepName: SamplePreparationDissoStep["name"],
      field:
        | "id"
        | "value1"
        | "value2"
        | "value3"
        | "unit1"
        | "unit2"
        | "unit3"
        | "solventChemical",
      newValue: string,
    ) => {
      setSamplePreparationDissoPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spl) => {
          if (spl.id === samplePreparationDissoId) {
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
    const handleAddStandardPreparationDisso = (parameterId: number) => {
      setCurrentParameterForStandardPrep(parameterId);
      setIsAddingRSStandard(false);
      setIsAddingUCStandard(false);
      setIsAddingDissoStandard(true);
      setShowStandardSelectionDialog(true);
    };
    const handleRemoveStandardPreparationDisso = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationDissoPerParam((prev) => {
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
          // Remove corresponding sample preparation
          setSamplePreparationDissoPerParam((prevSample) => {
            const samples = prevSample[parameterId] || [];
            const updatedSamples = samples
              .filter((_, idx) => idx !== indexToRemove)
              .map((sp, index) => ({
                ...sp,
                label: `Sample Preparation ${1 + index}`,
              }));
            return { ...prevSample, [parameterId]: updatedSamples };
          });

          // Remove corresponding disso media preparation
          setDissoMediaPerParam((prevDissoMedia) => {
            const dissoMedias = prevDissoMedia[parameterId] || [];
            const updatedDissoMedias = dissoMedias
              .filter((_, idx) => idx !== indexToRemove)
              .map((dm, index) => ({
                ...dm,
                label: `Dissolution Media Preparation ${1 + index}`,
              }));
            return { ...prevDissoMedia, [parameterId]: updatedDissoMedias };
          });

          // Remove files tied to this preparation
          if (removedPrep) {
            const fileKeyToRemove = prepFileKey("dissolution", removedPrep.label);
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
    const handleStandardPreparationDissoStepChange = (
      parameterId: number,
      standardPreparationId: number,
      stepName: StandardPreparationStep["name"],
      field:
        | "value1"
        | "unit1"
        | "value2"
        | "value3"
        | "unit3"
        | "unit2"
        | "logBookID"
        | "solventChemical",
      newValue: string,
    ) => {
      setStandardPreparationDissoPerParam((prev) => ({
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

  return {
    handleRemoveSamplePreparationDisso,
    handleSamplePreparationDissoStepChange,
    handleAddStandardPreparationDisso,
    handleRemoveStandardPreparationDisso,
    handleStandardPreparationDissoStepChange,
  };
}
