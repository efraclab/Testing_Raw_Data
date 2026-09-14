import type { SamplePreparationLodStep } from "../preparation_models/drugs/SamplePreparationLodStep";
import { createNewSamplePreparationLod } from "./drugWorksheetFactories";

export function useDrugLodPreparationHandlers(ctx: any) {
  const {
    setSamplePreparationLodPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // LOD Handlers
    const handleAddSamplePreparationLod = (parameterId: number) => {
      setSamplePreparationLodPerParam((prev) => {
        const currentSamples = prev[parameterId] || [];
        const newIndex = currentSamples.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentSamples,
            createNewSamplePreparationLod(newIndex),
          ],
        };
      });
    };

    const handleRemoveSamplePreparationLod = (
      parameterId: number,
      samplePreparationLodId: number,
    ) => {
      setSamplePreparationLodPerParam((prev) => {
        const removedPrep = (prev[parameterId] || []).find(
          (spl) => spl.id === samplePreparationLodId,
        );
        const updatedSamples = (prev[parameterId] || [])
          .filter((spl) => spl.id !== samplePreparationLodId)
          .map((spl, index) => ({
            ...spl,
            label: `Sample Preparation ${1 + index}`,
          }));
        if (removedPrep) {
          const fileKeyToRemove = prepFileKey("lod", removedPrep.label);
          setFilesPerParam((prevFiles) => {
            const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
            delete paramSlots[fileKeyToRemove];
            return { ...prevFiles, [parameterId]: paramSlots };
          });
        }
        return { ...prev, [parameterId]: updatedSamples };
      });
    };

    const handleSamplePreparationLodStepChange = (
      parameterId: number,
      samplePreparationLodId: number,
      stepName: SamplePreparationLodStep["name"],
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
      setSamplePreparationLodPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spl) => {
          if (spl.id === samplePreparationLodId) {
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
    handleAddSamplePreparationLod,
    handleRemoveSamplePreparationLod,
    handleSamplePreparationLodStepChange,
  };
}
