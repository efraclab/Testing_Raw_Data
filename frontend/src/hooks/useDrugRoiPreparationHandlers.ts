import type { SamplePreparationROIStep } from "../preparation_models/drugs/SamplePreparationROIStep";
import { createNewSamplePreparationROI } from "./drugWorksheetFactories";

export function useDrugRoiPreparationHandlers(ctx: any) {
  const {
    setSamplePreparationROIPerParam,
    prepFileKey,
    setFilesPerParam,
  } = ctx;

    // ROI Handlers
    const handleAddSamplePreparationROI = (parameterId: number) => {
      setSamplePreparationROIPerParam((prev) => {
        const currentSamples = prev[parameterId] || [];
        const newIndex = currentSamples.length;
        return {
          ...prev,
          [parameterId]: [
            ...currentSamples,
            createNewSamplePreparationROI(newIndex),
          ],
        };
      });
    };

    const handleRemoveSamplePreparationROI = (
      parameterId: number,
      samplePreparationROIId: number,
    ) => {
      setSamplePreparationROIPerParam((prev) => {
        const removedPrep = (prev[parameterId] || []).find(
          (spl) => spl.id === samplePreparationROIId,
        );
        const updatedSamples = (prev[parameterId] || [])
          .filter((spl) => spl.id !== samplePreparationROIId)
          .map((spl, index) => ({
            ...spl,
            label: `Sample Preparation ${1 + index}`,
          }));
        if (removedPrep) {
          const fileKeyToRemove = prepFileKey("roi", removedPrep.label);
          setFilesPerParam((prevFiles) => {
            const paramSlots = { ...(prevFiles[parameterId] ?? {}) };
            delete paramSlots[fileKeyToRemove];
            return { ...prevFiles, [parameterId]: paramSlots };
          });
        }
        return { ...prev, [parameterId]: updatedSamples };
      });
    };

    const handleSamplePreparationROIStepChange = (
      parameterId: number,
      samplePreparationROIId: number,
      stepName: SamplePreparationROIStep["name"],
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
      setSamplePreparationROIPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((spl) => {
          if (spl.id === samplePreparationROIId) {
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
    handleAddSamplePreparationROI,
    handleRemoveSamplePreparationROI,
    handleSamplePreparationROIStepChange,
  };
}
