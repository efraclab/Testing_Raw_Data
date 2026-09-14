import type { SamplePreparationSulphatedAshStep } from "../preparation_models/drugs/SamplePreparationSulphatedAshStep";
import { createNewSamplePreparationSulphatedAsh } from "./drugWorksheetFactories";

export function useDrugSulphatedAshPreparationHandlers(ctx: any) {
  const {
    setSamplePreparationSulphatedAshPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // Sulphated Ash Handlers
    const handleAddSamplePreparationSulphatedAsh = (parameterId: number) => {
      setSamplePreparationSulphatedAshPerParam((prev) => {
        const currentSamples = prev[parameterId] || [];
        const newIndex = currentSamples.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentSamples,
            createNewSamplePreparationSulphatedAsh(newIndex),
          ],
        };
      });
    };

    const handleRemoveSamplePreparationSulphatedAsh = (
      parameterId: number,
      samplePreparationSulphatedAshId: number,
    ) => {
      setSamplePreparationSulphatedAshPerParam((prev) => {
        const removedPrep = (prev[parameterId] || []).find(
          (spsa) => spsa.id === samplePreparationSulphatedAshId,
        );
        const updatedSamples = (prev[parameterId] || [])
          .filter((spsa) => spsa.id !== samplePreparationSulphatedAshId)
          .map((spsa, index) => ({
            ...spsa,
            label: `Sample Preparation ${1 + index}`,
          }));
        if (removedPrep) {
          const fileKeyToRemove = prepFileKey("sulphated_ash", removedPrep.label);
          setFilesPerParam((prevFiles) => {
            const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
            delete paramSlots[fileKeyToRemove];
            return { ...prevFiles, [parameterId]: paramSlots };
          });
        }
        return { ...prev, [parameterId]: updatedSamples };
      });
    };

    const handleSamplePreparationSulphatedAshStepChange = (
      parameterId: number,
      samplePreparationSulphatedAshId: number,
      stepName: SamplePreparationSulphatedAshStep["name"],
      field:
        | "value1"
        | "value2"
        | "value3"
        | "unit1"
        | "unit2"
        | "unit3"
        | "logBookID",
      newValue: string,
    ) => {
      setSamplePreparationSulphatedAshPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spsa) => {
          if (spsa.id === samplePreparationSulphatedAshId) {
            return {
              ...spsa,
              steps: spsa.steps.map((step) => {
                if (step.name === stepName) {
                  return { ...step, [field]: newValue };
                }
                return step;
              }),
            };
          }
          return spsa;
        }),
      }));
    };

  return {
    handleAddSamplePreparationSulphatedAsh,
    handleRemoveSamplePreparationSulphatedAsh,
    handleSamplePreparationSulphatedAshStepChange,
  };
}
