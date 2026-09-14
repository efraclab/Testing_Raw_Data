import type { DissoMediaPreparationStep } from "../preparation_models/drugs/DissoMediaPreparationStep";

export function useDrugDissolutionMediaHandlers(ctx: any) {
  const {
    setDissoMediaPerParam,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
  } = ctx;

    // Dissolution Media Preparation Handlers
    const handleRemoveDissoMedia = (
      parameterId: number,
      dissoMediaId: number,
    ) => {
      setDissoMediaPerParam((prev) => {
        const dissoMedias = prev[parameterId] || [];
        const indexToRemove = dissoMedias.findIndex(
          (dm) => dm.id === dissoMediaId,
        );

        const updated = dissoMedias
          .filter((dm) => dm.id !== dissoMediaId)
          .map((dm, index) => ({
            ...dm,
            label: `Dissolution Media Preparation ${index + 1}`,
          }));

        // Also remove the corresponding Standard and Sample preparations at the same index
        if (indexToRemove !== -1) {
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
        }

        return { ...prev, [parameterId]: updated };
      });
    };

    const handleDissoMediaStepChange = (
      parameterId: number,
      dissoMediaId: number,
      stepName: DissoMediaPreparationStep["name"],
      field: "value1" | "logBookID" | "unit1" | "solventChemical",
      newValue: string,
    ) => {
      setDissoMediaPerParam((prev) => ({
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

  return {
    handleRemoveDissoMedia,
    handleDissoMediaStepChange,
  };
}
