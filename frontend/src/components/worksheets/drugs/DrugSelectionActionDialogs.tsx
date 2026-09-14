import React from "react";
import { AnimatePresence } from "framer-motion";

import StandardSelectionDialog from "../../shared/StandardSelectionDialog";
import AnalystSelectionDialog from "../../shared/AnalystSelectionDialog";
import SubmitDialog from "../../shared/SubmitDialog";
import UnlockParameterDialog from "../../shared/UnlockParameterDialog";
import DeleteParameterDialog from "../../shared/DeleteParameterDialog";

interface DrugSelectionActionDialogsProps {
  showStandardSelectionDialog: boolean;
  setShowStandardSelectionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentParameterForStandardPrep: React.Dispatch<React.SetStateAction<any>>;
  setIsAddingRSStandard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddingDissoStandard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddingUCStandard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddingDissoProfileStandard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddingRelatedSubstanceStandard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddingHypromelloseStandard: React.Dispatch<React.SetStateAction<boolean>>;
  currentParameterForStandardPrep: any;
  getAvailableStandardsForParameter: (...args: any[]) => any[];
  isAddingRSStandard: boolean;
  isAddingDissoStandard: boolean;
  isAddingUCStandard: boolean;
  isAddingDissoProfileStandard: boolean;
  isAddingRelatedSubstanceStandard: boolean;
  isAddingHypromelloseStandard: boolean;
  handleStandardSelectedForPreparation: (...args: any[]) => void;
  handleStandardsSelectedForHypromellosePreparation: (...args: any[]) => void;

  showAnalystDialog: boolean;
  setShowAnalystDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setPendingParameter: React.Dispatch<React.SetStateAction<any>>;
  analysts: any[];
  handleAnalystSelected: (...args: any[]) => void;
  worksheetInfo: any;

  showSubmitDialog: boolean;
  isSubmitting: boolean;
  setShowSubmitDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForAnalysis: (...args: any[]) => void;
  addedParameters: any[];
  parameterStatusPerParam: Record<number, string>;

  showUnlockDialog: boolean;
  parameterToUnlock: any;
  isUnlocking: boolean;
  setShowUnlockDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setParameterToUnlock: React.Dispatch<React.SetStateAction<any>>;
  handleConfirmUnlock: (...args: any[]) => void;

  showDeleteDialog: boolean;
  parameterToDelete: any;
  isDeleting: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setParameterToDelete: React.Dispatch<React.SetStateAction<any>>;
  handleConfirmDelete: (...args: any[]) => void;
}

const DrugSelectionActionDialogs: React.FC<
  DrugSelectionActionDialogsProps
> = (props) => {
  const {
    showStandardSelectionDialog,
    setShowStandardSelectionDialog,
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setIsAddingRelatedSubstanceStandard,
    setIsAddingHypromelloseStandard,
    currentParameterForStandardPrep,
    getAvailableStandardsForParameter,
    isAddingRSStandard,
    isAddingDissoStandard,
    isAddingUCStandard,
    isAddingDissoProfileStandard,
    isAddingRelatedSubstanceStandard,
    isAddingHypromelloseStandard,
    handleStandardSelectedForPreparation,
    handleStandardsSelectedForHypromellosePreparation,
    showAnalystDialog,
    setShowAnalystDialog,
    setPendingParameter,
    analysts,
    handleAnalystSelected,
    worksheetInfo,
    showSubmitDialog,
    isSubmitting,
    setShowSubmitDialog,
    handleSubmitForAnalysis,
    addedParameters,
    parameterStatusPerParam,
    showUnlockDialog,
    parameterToUnlock,
    isUnlocking,
    setShowUnlockDialog,
    setParameterToUnlock,
    handleConfirmUnlock,
    showDeleteDialog,
    parameterToDelete,
    isDeleting,
    setShowDeleteDialog,
    setParameterToDelete,
    handleConfirmDelete,
  } = props;

  return (
    <>
          <StandardSelectionDialog
            isOpen={showStandardSelectionDialog}
            onClose={() => {
              setShowStandardSelectionDialog(false);
              setCurrentParameterForStandardPrep(null);
              setIsAddingRSStandard(false);
              setIsAddingDissoStandard(false);
              setIsAddingUCStandard(false);
              setIsAddingDissoProfileStandard(false);
              setIsAddingRelatedSubstanceStandard(false);
              setIsAddingHypromelloseStandard(false);
            }}
            availableStandards={
              currentParameterForStandardPrep !== null
                ? getAvailableStandardsForParameter(
                  currentParameterForStandardPrep,
                  isAddingRSStandard,
                  isAddingDissoStandard,
                  isAddingUCStandard,
                  isAddingDissoProfileStandard,
                  isAddingRelatedSubstanceStandard,
                  isAddingHypromelloseStandard,
                )
                : []
            }
            onSelectStandard={(standard) => {
              handleStandardSelectedForPreparation(
                standard,
                isAddingRSStandard,
                isAddingDissoStandard,
                isAddingUCStandard,
                isAddingDissoProfileStandard,
                isAddingRelatedSubstanceStandard,
                isAddingHypromelloseStandard,
              );
            }}
            multiSelect={isAddingHypromelloseStandard}
            defaultSelectedNames={
              isAddingHypromelloseStandard
                ? ["METHYL IODIDE", "2-IODOPROPANE"]
                : []
            }
            onSelectStandards={(standards) => {
              handleStandardsSelectedForHypromellosePreparation(standards);
            }}
          />

          <AnimatePresence>
            {showAnalystDialog && (
              <AnalystSelectionDialog
                isOpen={showAnalystDialog}
                onClose={() => {
                  setShowAnalystDialog(false);
                  setPendingParameter(null);
                }}
                analysts={analysts}
                onSelectAnalyst={handleAnalystSelected}
                lab={worksheetInfo?.sample.lab}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showSubmitDialog && (
              <SubmitDialog
                isOpen={showSubmitDialog}
                isSubmitting={isSubmitting}
                onClose={() => setShowSubmitDialog(false)}
                onConfirm={handleSubmitForAnalysis}
                createdParametersCount={
                  addedParameters.filter(
                    (param) =>
                      (
                        parameterStatusPerParam[param.id] || "created"
                      ).toLowerCase() === "created",
                  ).length
                }
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showUnlockDialog && parameterToUnlock && (
              <UnlockParameterDialog
                isOpen={showUnlockDialog}
                isUnlocking={isUnlocking}
                parameterName={parameterToUnlock.parameterName!}
                parameterCode={parameterToUnlock.paraCode!}
                onClose={() => {
                  setShowUnlockDialog(false);
                  setParameterToUnlock(null);
                }}
                onConfirm={handleConfirmUnlock}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDeleteDialog && parameterToDelete && (
              <DeleteParameterDialog
                isOpen={showDeleteDialog}
                isDeleting={isDeleting}
                parameterName={parameterToDelete.parameterName!}
                parameterCode={parameterToDelete.paraCode!}
                parameterStatus={
                  parameterStatusPerParam[parameterToDelete.id] || "created"
                }
                onClose={() => {
                  setShowDeleteDialog(false);
                  setParameterToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
              />
            )}
          </AnimatePresence>

    </>
  );
};

export default DrugSelectionActionDialogs;
