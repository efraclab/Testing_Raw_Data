export function useDrugStandardPreparationDialogHandlers(ctx: any) {
  const {
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setIsAddingRelatedSubstanceStandard,
    setIsAddingHypromelloseStandard,
    setShowStandardSelectionDialog,
  } = ctx;

    const handleAddStandardPreparationRS = (parameterId: number) => {
      setCurrentParameterForStandardPrep(parameterId);
      setIsAddingRSStandard(true);
      setIsAddingDissoStandard(false);
      setIsAddingUCStandard(false);
      setShowStandardSelectionDialog(true);
    };
    const handleAddStandardPreparationRelatedSubstance = (
      parameterId: number,
    ) => {
      setCurrentParameterForStandardPrep(parameterId);
      setIsAddingRSStandard(false);
      setIsAddingDissoStandard(false);
      setIsAddingUCStandard(false);
      setIsAddingDissoProfileStandard(false);
      setIsAddingRelatedSubstanceStandard(true);
      setShowStandardSelectionDialog(true);
    };
    const handleAddStandardPreparationHypromellose = (parameterId: number) => {
      setCurrentParameterForStandardPrep(parameterId);
      setIsAddingRSStandard(false);
      setIsAddingDissoStandard(false);
      setIsAddingUCStandard(false);
      setIsAddingDissoProfileStandard(false);
      setIsAddingRelatedSubstanceStandard(false);
      setIsAddingHypromelloseStandard(true);
      setShowStandardSelectionDialog(true);
    };

  return {
    handleAddStandardPreparationRS,
    handleAddStandardPreparationRelatedSubstance,
    handleAddStandardPreparationHypromellose,
  };
}
