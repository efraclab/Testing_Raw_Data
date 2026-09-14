import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationUCStep } from "../preparation_models/drugs/SamplePreparationUCStep";

export function useDrugUniformityPreparationHandlers(ctx: any) {
  const {
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setShowStandardSelectionDialog,
    setStandardPreparationUCPerParam,
    setSamplePreparationUCPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    const handleAddStandardPreparationUC = (parameterId: number) => {
      setCurrentParameterForStandardPrep(parameterId);
      setIsAddingRSStandard(false);
      setIsAddingDissoStandard(false);
      setIsAddingUCStandard(true); // Add new flag
      setShowStandardSelectionDialog(true);
    };
    const handleRemoveStandardPreparationUC = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationUCPerParam((prev) => {
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
          setSamplePreparationUCPerParam((prevSample) => {
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
              "uniformity_of_content",
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
    const handleStandardPreparationUCStepChange = (
      parameterId: number,
      standardPreparationId: number,
      stepName: StandardPreparationStep["name"],
      field:
        | "value1"
        | "unit1"
        | "value2"
        | "unit2"
        | "logBookID"
        | "solventChemical",
      newValue: string,
    ) => {
      setStandardPreparationUCPerParam((prev) => ({
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
    const handleRemoveSamplePreparationUC = (
      parameterId: number,
      samplePreparationId: number,
    ) => {
      setSamplePreparationUCPerParam((prev) => {
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
          setStandardPreparationUCPerParam((prevStandard) => {
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
    const handleSamplePreparationUCStepChange = (
      parameterId: number,
      samplePreparationUCId: number,
      stepName: SamplePreparationUCStep["name"],
      field:
        | "value1"
        | "unit1"
        | "value2"
        | "unit2"
        | "value3"
        | "unit3"
        | "value4"
        | "unit4",
      newValue: string,
    ) => {
      setSamplePreparationUCPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spl) => {
          if (spl.id === samplePreparationUCId) {
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
    handleAddStandardPreparationUC,
    handleRemoveStandardPreparationUC,
    handleStandardPreparationUCStepChange,
    handleRemoveSamplePreparationUC,
    handleSamplePreparationUCStepChange,
  };
}
