import {
  createNewStandardPreparationNitrosamine,
  createNewSamplePreparationNitrosamine,
} from "./drugWorksheetFactories";

export function useDrugNitrosaminePreparationHandlers(ctx: any) {
  const {
    standardPreparationNitrosaminePerParam,
    samplePreparationNitrosaminePerParam,
    setStandardPreparationNitrosaminePerParam,
    setSamplePreparationNitrosaminePerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // Nitrosamine Standard/Sample Preparation Handlers
    const handleAddStandardPreparationNitrosamine = (parameterId: number) => {
      const currentStandards =
        standardPreparationNitrosaminePerParam[parameterId] || [];
      const newIndex = currentStandards.length;
      const newStandardPrep = createNewStandardPreparationNitrosamine(newIndex);

      setStandardPreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: [...currentStandards, newStandardPrep],
      }));

      const currentSamples =
        samplePreparationNitrosaminePerParam[parameterId] || [];
      const newSampleIndex = currentSamples.length;
      const newSamplePrep = createNewSamplePreparationNitrosamine(newSampleIndex);

      setSamplePreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: [...currentSamples, newSamplePrep],
      }));
    };

    const handleRemoveStandardPreparationNitrosamine = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationNitrosaminePerParam((prev) => {
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
          setSamplePreparationNitrosaminePerParam((prevSample) => {
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
            const fileKeyToRemove = prepFileKey("nitrosamine", removedPrep.label);
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

    const handleStandardPreparationNitrosamineFieldChange = (
      parameterId: number,
      standardPreparationId: number,
      field: "batchNo" | "purity" | "weightTaken" | "weightTakenUnit",
      newValue: string,
    ) => {
      setStandardPreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === standardPreparationId ? { ...sp, [field]: newValue } : sp,
        ),
      }));
    };

    const handleStandardPreparationNitrosamineStepChange = (
      parameterId: number,
      standardPreparationId: number,
      stepName: string,
      field: "value1" | "unit1" | "value2" | "unit2",
      newValue: string,
    ) => {
      setStandardPreparationNitrosaminePerParam((prev) => ({
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

    const handleAddStandardDilutionStage = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === standardPreparationId
            ? { ...sp, steps: [...sp.steps, { name: `Dilution ${sp.steps.length + 1}` }] }
            : sp,
        ),
      }));
    };

    const handleRemoveStandardDilutionStage = (
      parameterId: number,
      standardPreparationId: number,
      stepName: string,
    ) => {
      setStandardPreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === standardPreparationId
            ? { ...sp, steps: sp.steps.filter((s) => s.name !== stepName) }
            : sp,
        ),
      }));
    };

    const handleRemoveSamplePreparationNitrosamine = (
      parameterId: number,
      samplePreparationId: number,
    ) => {
      setSamplePreparationNitrosaminePerParam((prev) => {
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
          setStandardPreparationNitrosaminePerParam((prevStandard) => {
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

    const handleSamplePreparationNitrosamineFieldChange = (
      parameterId: number,
      samplePreparationId: number,
      field: "sampleWeight" | "sampleWeightUnit",
      newValue: string,
    ) => {
      setSamplePreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === samplePreparationId ? { ...sp, [field]: newValue } : sp,
        ),
      }));
    };

    const handleSamplePreparationNitrosamineStepChange = (
      parameterId: number,
      samplePreparationId: number,
      stepName: string,
      field: "value1" | "unit1" | "value2" | "unit2",
      newValue: string,
    ) => {
      setSamplePreparationNitrosaminePerParam((prev) => ({
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

    const handleAddSampleDilutionStage = (
      parameterId: number,
      samplePreparationId: number,
    ) => {
      setSamplePreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === samplePreparationId
            ? { ...sp, steps: [...sp.steps, { name: `Dilution ${sp.steps.length + 1}` }] }
            : sp,
        ),
      }));
    };

    const handleRemoveSampleDilutionStage = (
      parameterId: number,
      samplePreparationId: number,
      stepName: string,
    ) => {
      setSamplePreparationNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((sp) =>
          sp.id === samplePreparationId
            ? { ...sp, steps: sp.steps.filter((s) => s.name !== stepName) }
            : sp,
        ),
      }));
    };

  return {
    handleAddStandardPreparationNitrosamine,
    handleRemoveStandardPreparationNitrosamine,
    handleStandardPreparationNitrosamineFieldChange,
    handleStandardPreparationNitrosamineStepChange,
    handleAddStandardDilutionStage,
    handleRemoveStandardDilutionStage,
    handleRemoveSamplePreparationNitrosamine,
    handleSamplePreparationNitrosamineFieldChange,
    handleSamplePreparationNitrosamineStepChange,
    handleAddSampleDilutionStage,
    handleRemoveSampleDilutionStage,
  };
}
