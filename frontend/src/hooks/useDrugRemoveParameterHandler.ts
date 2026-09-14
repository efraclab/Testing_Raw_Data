export function useDrugRemoveParameterHandler(ctx: any) {
  const {
    addedParameters,
    selectedParamsForDetail,
    setActivePreparationGroups,
    setAddedChemicals,
    setAddedInstruments,
    setAddedParameters,
    setAddedStandards,
    setAdditionalInfoPerParam,
    setAnalysisCompletionDatePerParam,
    setAnalysisStartDatePerParam,
    setAnalyzedByNamePerParam,
    setAnalyzedByPerParam,
    setApprovedAtPerParam,
    setApprovedByNamePerParam,
    setApprovedByPerParam,
    setCalculationsAssayFerrousFumaratePerParam,
    setCalculationsAssayHypromellosePerParam,
    setCalculationsAssayNitrosaminePerParam,
    setCalculationsAssayPerParam,
    setCalculationsDissoFerrousFumaratePerParam,
    setCalculationsDissoPerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
    setCalculationsRSPerParam,
    setCalculationsSulphatedAshPerParam,
    setCalculationsUCPerParam,
    setColumnsPerParam,
    setDiluentPerParam,
    setDissoMediaPerParam,
    setMobilePhasePerParam,
    setOtherInfoPerParam,
    setParameterStatusPerParam,
    setPreparationCompletedAtPerParam,
    setPreparationCompletedByPerParam,
    setRemarksByAnalystPerParam,
    setSamplePrepAssayFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
    setSamplePreparationDissoPerParam,
    setSamplePreparationHypromellosePerParam,
    setSamplePreparationLodPerParam,
    setSamplePreparationNitrosaminePerParam,
    setSamplePreparationPerParam,
    setSamplePreparationROIPerParam,
    setSamplePreparationRSPerParam,
    setSamplePreparationSulphatedAshPerParam,
    setSamplePreparationUCPerParam,
    setSelectedParamsForDetail,
    setShowAdditionalInfo,
    setShowBufferPreparation,
    setShowDiluentPreparation,
    setShowMobilePhasePreparation,
    setShowSystemSuitability,
    setStandardPreparationAssayPerParam,
    setStandardPreparationDissoPerParam,
    setStandardPreparationHypromellosePerParam,
    setStandardPreparationNitrosaminePerParam,
    setStandardPreparationResidualSolventPerParam,
    setStandardPreparationUCPerParam,
    setSystemSuitabilityPerParam,
  } = ctx;

    const handleRemoveParameter = (id: number) => {
      setAddedParameters(addedParameters.filter((p) => p.id !== id));
      setSelectedParamsForDetail(
        selectedParamsForDetail.filter((paramId) => paramId !== id),
      );

      // Clean up all related state
      const cleanupState = (setter: Function) => {
        setter((prev: any) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      };

      // Clean up all parameter-related states
      cleanupState(setAnalyzedByPerParam);
      cleanupState(setApprovedByPerParam);
      cleanupState(setAnalyzedByNamePerParam);
      cleanupState(setApprovedByNamePerParam);
      cleanupState(setAnalysisStartDatePerParam);
      cleanupState(setAnalysisCompletionDatePerParam);
      cleanupState(setApprovedAtPerParam);
      cleanupState(setParameterStatusPerParam);
      cleanupState(setAddedInstruments);
      cleanupState(setAddedChemicals);
      cleanupState(setAddedStandards);
      cleanupState(setColumnsPerParam);
      cleanupState(setDiluentPerParam);
      cleanupState(setOtherInfoPerParam);
      cleanupState(setAdditionalInfoPerParam);
      cleanupState(setShowAdditionalInfo);
      cleanupState(setCalculationsAssayPerParam);
      cleanupState(setCalculationsROIPerParam);
      cleanupState(setCalculationsLodPerParam);
      cleanupState(setCalculationsSulphatedAshPerParam);
      cleanupState(setCalculationsDissoPerParam);
      cleanupState(setStandardPreparationAssayPerParam);
      cleanupState(setSamplePreparationPerParam);
      cleanupState(setStandardPreparationDissoPerParam);
      cleanupState(setSamplePreparationDissoPerParam);
      cleanupState(setStandardPreparationResidualSolventPerParam);
      cleanupState(setSamplePreparationRSPerParam);
      cleanupState(setCalculationsRSPerParam);
      cleanupState(setSamplePreparationLodPerParam);
      cleanupState(setSamplePreparationROIPerParam);
      cleanupState(setSamplePreparationSulphatedAshPerParam);
      cleanupState(setActivePreparationGroups);
      cleanupState(setDissoMediaPerParam);
      cleanupState(setMobilePhasePerParam);
      cleanupState(setShowMobilePhasePreparation);
      cleanupState(setShowBufferPreparation);
      cleanupState(setSamplePrepAssayFerrousFumaratePerParam);
      cleanupState(setCalculationsAssayFerrousFumaratePerParam);
      cleanupState(setCalculationsDissoFerrousFumaratePerParam);
      cleanupState(setSamplePrepDissoFerrousFumaratePerParam);
      cleanupState(setSamplePreparationUCPerParam);
      cleanupState(setStandardPreparationUCPerParam);
      cleanupState(setCalculationsUCPerParam);
      cleanupState(setSamplePreparationHypromellosePerParam);
      cleanupState(setStandardPreparationHypromellosePerParam);
      cleanupState(setCalculationsAssayHypromellosePerParam);
      cleanupState(setSamplePreparationNitrosaminePerParam);
      cleanupState(setStandardPreparationNitrosaminePerParam);
      cleanupState(setCalculationsAssayNitrosaminePerParam);
      cleanupState(setShowDiluentPreparation);
      cleanupState(setShowSystemSuitability);
      cleanupState(setSystemSuitabilityPerParam);
      cleanupState(setRemarksByAnalystPerParam);
      cleanupState(setPreparationCompletedByPerParam);
      cleanupState(setPreparationCompletedAtPerParam);
    };

  return {
    handleRemoveParameter,
  };
}
