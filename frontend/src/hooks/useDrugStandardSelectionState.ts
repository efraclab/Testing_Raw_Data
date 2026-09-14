import { useState } from "react";

export function useDrugStandardSelectionState() {
  const [showStandardSelectionDialog, setShowStandardSelectionDialog] =
    useState(false);
  const [currentParameterForStandardPrep, setCurrentParameterForStandardPrep] =
    useState<number | null>(null);

  const [isAddingRSStandard, setIsAddingRSStandard] = useState(false);
  const [isAddingDissoStandard, setIsAddingDissoStandard] = useState(false);
  const [isAddingUCStandard, setIsAddingUCStandard] = useState(false);
  const [isAddingDissoProfileStandard, setIsAddingDissoProfileStandard] =
    useState(false);
  const [
    isAddingRelatedSubstanceStandard,
    setIsAddingRelatedSubstanceStandard,
  ] = useState(false);
  const [isAddingHypromelloseStandard, setIsAddingHypromelloseStandard] =
    useState(false);

  return {
    showStandardSelectionDialog,
    setShowStandardSelectionDialog,
    currentParameterForStandardPrep,
    setCurrentParameterForStandardPrep,
    isAddingRSStandard,
    setIsAddingRSStandard,
    isAddingDissoStandard,
    setIsAddingDissoStandard,
    isAddingUCStandard,
    setIsAddingUCStandard,
    isAddingDissoProfileStandard,
    setIsAddingDissoProfileStandard,
    isAddingRelatedSubstanceStandard,
    setIsAddingRelatedSubstanceStandard,
    isAddingHypromelloseStandard,
    setIsAddingHypromelloseStandard,
  };
}
