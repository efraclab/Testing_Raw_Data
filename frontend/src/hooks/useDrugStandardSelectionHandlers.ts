import type { Standard } from "../preparation_models/Standard";
import {
  createNewStandardPreparation,
  createNewSamplePreparation,
  createNewSamplePreparationDisso,
  createNewDissoMediaPreparation,
  createNewSamplePreparationUC,
  createNewStandardPreparationHypromellose,
  createNewSamplePreparationHypromellose,
} from "./drugWorksheetFactories";

export function useDrugStandardSelectionHandlers(ctx: any) {
  const {
    currentParameterForStandardPrep,

    standardPreparationRelatedSubstancePerParam,
    samplePreparationRelatedSubstancePerParam,
    setStandardPreparationRelatedSubstancePerParam,
    setSamplePreparationRelatedSubstancePerParam,

    standardPreparationUCPerParam,
    samplePreparationUCPerParam,
    setStandardPreparationUCPerParam,
    setSamplePreparationUCPerParam,

    standardPreparationResidualSolventPerParam,
    samplePreparationRSPerParam,
    setStandardPreparationResidualSolventPerParam,
    setSamplePreparationRSPerParam,

    standardPreparationDissoPerParam,
    samplePreparationDissoPerParam,
    dissoMediaPerParam,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
    setDissoMediaPerParam,

    standardPreparationDissoProfilePerParam,
    samplePreparationDissoProfilePerParam,
    dissoMediaProfilePerParam,
    setStandardPreparationDissoProfilePerParam,
    setSamplePreparationDissoProfilePerParam,
    setDissoMediaProfilePerParam,

    standardPreparationHypromellosePerParam,
    samplePreparationHypromellosePerParam,
    setStandardPreparationHypromellosePerParam,
    setSamplePreparationHypromellosePerParam,

    standardPreparationAssayPerParam,
    setStandardPreparationAssayPerParam,

    setShowStandardSelectionDialog,
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setIsAddingHypromelloseStandard,
  } = ctx;

    const handleStandardSelectedForPreparation = (
      standard: Standard,
      isRS: boolean = false,
      isDisso: boolean = false,
      isUC: boolean = false,
      isDissoProfile: boolean = false,
      isRelatedSubstance: boolean = false,
      isHypromellose: boolean = false,
    ) => {
      if (currentParameterForStandardPrep === null) return;

      const parameterId = currentParameterForStandardPrep;

      if (isRelatedSubstance) {
        const currentStandards =
          standardPreparationRelatedSubstancePerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparation(newIndex);

        newStandardPrep.steps = newStandardPrep.steps.map((step) => {
          if (step.name === "Weighing") {
            return { ...step, solventChemical: standard.name };
          }
          return step;
        });

        setStandardPreparationRelatedSubstancePerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));

        const currentSamples =
          samplePreparationRelatedSubstancePerParam[parameterId] || [];
        const newSampleIndex = currentSamples.length;
        const newSamplePrep = createNewSamplePreparation(newSampleIndex);

        setSamplePreparationRelatedSubstancePerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentSamples,
            { ...newSamplePrep, assignedStandardId: standard.serialNo },
          ],
        }));
      } else if (isUC) {
        // UC Standard Preparation
        const currentStandards = standardPreparationUCPerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparation(newIndex);

        newStandardPrep.steps = newStandardPrep.steps.map((step) => {
          if (step.name === "Weighing") {
            return { ...step, solventChemical: standard.name };
          }
          return step;
        });

        setStandardPreparationUCPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));

        // UC Sample Preparation
        const currentSamples = samplePreparationUCPerParam[parameterId] || [];
        const newSampleIndex = currentSamples.length;
        const newSamplePrepUC = createNewSamplePreparationUC(newSampleIndex);

        setSamplePreparationUCPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentSamples,
            { ...newSamplePrepUC, assignedStandardId: standard.serialNo },
          ],
        }));
      } else if (isRS) {
        const currentStandards =
          standardPreparationResidualSolventPerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparation(newIndex);

        newStandardPrep.steps = newStandardPrep.steps.map((step) => {
          if (step.name === "Weighing") {
            return { ...step, solventChemical: standard.name };
          }
          return step;
        });

        setStandardPreparationResidualSolventPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));

        const currentSamples = samplePreparationRSPerParam[parameterId] || [];
        const newSampleIndex = currentSamples.length;
        const newSamplePrep = createNewSamplePreparation(newSampleIndex);

        setSamplePreparationRSPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentSamples,
            { ...newSamplePrep, assignedStandardId: standard.serialNo },
          ],
        }));
      } else if (isDisso) {
        const currentStandards =
          standardPreparationDissoPerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparation(newIndex);

        newStandardPrep.steps = newStandardPrep.steps.map((step) => {
          if (step.name === "Weighing") {
            return { ...step, solventChemical: standard.name };
          }
          return step;
        });

        setStandardPreparationDissoPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));

        const currentSamples = samplePreparationDissoPerParam[parameterId] || [];
        const newSampleIndex = currentSamples.length;
        const newSamplePrepDisso =
          createNewSamplePreparationDisso(newSampleIndex);

        setSamplePreparationDissoPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentSamples,
            { ...newSamplePrepDisso, assignedStandardId: standard.serialNo },
          ],
        }));

        // Automatically add Disso Media Preparation
        const currentDissoMedia = dissoMediaPerParam[parameterId] || [];
        const newDissoMediaIndex = currentDissoMedia.length;
        const newDissoMedia = createNewDissoMediaPreparation(newDissoMediaIndex);

        setDissoMediaPerParam((prev) => ({
          ...prev,
          [parameterId]: [...currentDissoMedia, newDissoMedia],
        }));
      } else if (isDissoProfile) {
        const currentStandards =
          standardPreparationDissoProfilePerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparation(newIndex);

        newStandardPrep.steps = newStandardPrep.steps.map((step) => {
          if (step.name === "Weighing") {
            return { ...step, solventChemical: standard.name };
          }
          return step;
        });

        setStandardPreparationDissoProfilePerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));

        const currentSamples =
          samplePreparationDissoProfilePerParam[parameterId] || [];
        const newSampleIndex = currentSamples.length;
        const newSamplePrepDisso =
          createNewSamplePreparationDisso(newSampleIndex);

        setSamplePreparationDissoProfilePerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentSamples,
            { ...newSamplePrepDisso, assignedStandardId: standard.serialNo },
          ],
        }));

        // Automatically add Disso Media Preparation for profile
        const currentDissoMediaProfile =
          dissoMediaProfilePerParam[parameterId] || [];
        const newDissoMediaProfileIndex = currentDissoMediaProfile.length;
        const newDissoMediaProfile = createNewDissoMediaPreparation(
          newDissoMediaProfileIndex,
        );

        setDissoMediaProfilePerParam((prev) => ({
          ...prev,
          [parameterId]: [...currentDissoMediaProfile, newDissoMediaProfile],
        }));
      } else if (isHypromellose) {
        const currentStandards =
          standardPreparationHypromellosePerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparationHypromellose(newIndex);

        setStandardPreparationHypromellosePerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));

        const currentSamples =
          samplePreparationHypromellosePerParam[parameterId] || [];
        const newSampleIndex = currentSamples.length;
        const newSamplePrep = createNewSamplePreparationHypromellose(newSampleIndex);

        setSamplePreparationHypromellosePerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentSamples,
            { ...newSamplePrep, assignedStandardId: standard.serialNo },
          ],
        }));
      } else {
        const currentStandards =
          standardPreparationAssayPerParam[parameterId] || [];
        const newIndex = currentStandards.length;
        const newStandardPrep = createNewStandardPreparation(newIndex);

        newStandardPrep.steps = newStandardPrep.steps.map((step) => {
          if (step.name === "Weighing") {
            return { ...step, solventChemical: standard.name };
          }
          return step;
        });

        setStandardPreparationAssayPerParam((prev) => ({
          ...prev,
          [parameterId]: [
            ...currentStandards,
            { ...newStandardPrep, assignedStandardId: standard.serialNo },
          ],
        }));
      }

      setShowStandardSelectionDialog(false);
      setCurrentParameterForStandardPrep(null);
      setIsAddingRSStandard(false);
      setIsAddingDissoStandard(false);
      setIsAddingUCStandard(false);
      setIsAddingDissoProfileStandard(false);
      setIsAddingHypromelloseStandard(false);
    };
    const handleStandardsSelectedForHypromellosePreparation = (
      standards: Standard[],
    ) => {
      if (currentParameterForStandardPrep === null || standards.length === 0) return;

      const parameterId = currentParameterForStandardPrep;
      const serialNos = standards.map((s) => s.serialNo);

      const currentStandards =
        standardPreparationHypromellosePerParam[parameterId] || [];
      const newIndex = currentStandards.length;
      const newStandardPrep = createNewStandardPreparationHypromellose(newIndex);

      setStandardPreparationHypromellosePerParam((prev) => ({
        ...prev,
        [parameterId]: [
          ...currentStandards,
          {
            ...newStandardPrep,
            assignedStandardId: serialNos[0],
            assignedStandardIds: serialNos,
          },
        ],
      }));

      const currentSamples =
        samplePreparationHypromellosePerParam[parameterId] || [];
      const newSampleIndex = currentSamples.length;
      const newSamplePrep = createNewSamplePreparationHypromellose(newSampleIndex);

      setSamplePreparationHypromellosePerParam((prev) => ({
        ...prev,
        [parameterId]: [
          ...currentSamples,
          {
            ...newSamplePrep,
            assignedStandardId: serialNos[0],
            assignedStandardIds: serialNos,
          },
        ],
      }));

      setShowStandardSelectionDialog(false);
      setCurrentParameterForStandardPrep(null);
      setIsAddingHypromelloseStandard(false);
    };

  return {
    handleStandardSelectedForPreparation,
    handleStandardsSelectedForHypromellosePreparation,
  };
}
