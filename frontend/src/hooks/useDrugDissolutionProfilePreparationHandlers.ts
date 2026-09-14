import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationDissoStep } from "../preparation_models/drugs/SamplePreparationDissoStep";
import type { DissoMediaPreparationStep } from "../preparation_models/drugs/DissoMediaPreparationStep";

export function useDrugDissolutionProfilePreparationHandlers(ctx: any) {
  const {
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setShowStandardSelectionDialog,
    setStandardPreparationDissoProfilePerParam,
    setSamplePreparationDissoProfilePerParam,
    setDissoMediaProfilePerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // Dissolution Profile Handlers
    const handleAddStandardPreparationDissoProfile = (parameterId: number) => {
      setCurrentParameterForStandardPrep(parameterId);
      setIsAddingRSStandard(false);
      setIsAddingDissoStandard(false);
      setIsAddingUCStandard(false);
      setIsAddingDissoProfileStandard(true);
      setShowStandardSelectionDialog(true);
    };

    const handleRemoveStandardPreparationDissoProfile = (
      parameterId: number,
      standardPreparationId: number,
    ) => {
      setStandardPreparationDissoProfilePerParam((prev) => {
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
          setSamplePreparationDissoProfilePerParam((prevSample) => {
            const samples = prevSample[parameterId] || [];
            const updatedSamples = samples
              .filter((_, idx) => idx !== indexToRemove)
              .map((sp, index) => ({
                ...sp,
                label: `Sample Preparation ${1 + index}`,
              }));
            return { ...prevSample, [parameterId]: updatedSamples };
          });

          setDissoMediaProfilePerParam((prevDissoMedia) => {
            const dissoMedias = prevDissoMedia[parameterId] || [];
            const updatedDissoMedias = dissoMedias
              .filter((_, idx) => idx !== indexToRemove)
              .map((dm, index) => ({
                ...dm,
                label: `Dissolution Media Preparation ${1 + index}`,
              }));
            return { ...prevDissoMedia, [parameterId]: updatedDissoMedias };
          });

          if (removedPrep) {
            const fileKeyToRemove = prepFileKey(
              "dissolution_profile",
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

    const handleStandardPreparationDissoProfileStepChange = (
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
      setStandardPreparationDissoProfilePerParam((prev) => ({
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

    const handleRemoveSamplePreparationDissoProfile = (
      parameterId: number,
      samplePreparationDissoProfileId: number,
    ) => {
      setSamplePreparationDissoProfilePerParam((prev) => {
        const samples = prev[parameterId] || [];
        const indexToRemove = samples.findIndex(
          (sp) => sp.id === samplePreparationDissoProfileId,
        );

        const updatedSamples = samples
          .filter((sp) => sp.id !== samplePreparationDissoProfileId)
          .map((sp, index) => ({
            ...sp,
            label: `Sample Preparation ${1 + index}`,
          }));

        if (indexToRemove !== -1) {
          setStandardPreparationDissoProfilePerParam((prevStandard) => {
            const standards = prevStandard[parameterId] || [];
            const updatedStandards = standards
              .filter((_, idx) => idx !== indexToRemove)
              .map((sp, index) => ({
                ...sp,
                label: `Standard Preparation ${1 + index}`,
              }));
            return { ...prevStandard, [parameterId]: updatedStandards };
          });

          setDissoMediaProfilePerParam((prevDissoMedia) => {
            const dissoMedias = prevDissoMedia[parameterId] || [];
            const updatedDissoMedias = dissoMedias
              .filter((_, idx) => idx !== indexToRemove)
              .map((dm, index) => ({
                ...dm,
                label: `Dissolution Media Preparation ${index + 1}`,
              }));
            return { ...prevDissoMedia, [parameterId]: updatedDissoMedias };
          });
        }

        return { ...prev, [parameterId]: updatedSamples };
      });
    };

    const handleSamplePreparationDissoProfileStepChange = (
      parameterId: number,
      samplePreparationDissoProfileId: number,
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
      setSamplePreparationDissoProfilePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spl) => {
          if (spl.id === samplePreparationDissoProfileId) {
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

    const handleDissoMediaProfileStepChange = (
      parameterId: number,
      dissoMediaId: number,
      stepName: DissoMediaPreparationStep["name"],
      field: "value1" | "unit1" | "logBookID" | "solventChemical",
      newValue: string,
    ) => {
      setDissoMediaProfilePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((dm) => {
          if (dm.id === dissoMediaId) {
            return {
              ...dm,
              steps: dm.steps.map((step) => {
                if (step.name === stepName) {
                  return { ...step, [field]: newValue };
                }
                return step;
              }),
            };
          }
          return dm;
        }),
      }));
    };

    const handleRemoveDissoMediaProfile = (
      parameterId: number,
      dissoMediaId: number,
    ) => {
      setDissoMediaProfilePerParam((prev) => {
        const updated = (prev[parameterId] || [])
          .filter((dm) => dm.id !== dissoMediaId)
          .map((dm, index) => ({
            ...dm,
            label: `Dissolution Media Preparation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updated };
      });
    };

  return {
    handleAddStandardPreparationDissoProfile,
    handleRemoveStandardPreparationDissoProfile,
    handleStandardPreparationDissoProfileStepChange,
    handleRemoveSamplePreparationDissoProfile,
    handleSamplePreparationDissoProfileStepChange,
    handleDissoMediaProfileStepChange,
    handleRemoveDissoMediaProfile,
  };
}
