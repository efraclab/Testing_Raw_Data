import React from "react";
import { AnimatePresence } from "framer-motion";
import CompletePreparationDialog from "../../shared/CompletePreparationDialog";
import UnlockPreparationDialog from "../../shared/UnlockPreparationDialog";

interface DrugPreparationDialogsProps {
  showCompletePreparationDialog: boolean;
  isCompletingPreparation: boolean;
  paramForPreparation: any;
  setShowCompletePreparationDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setParamForPreparation: React.Dispatch<React.SetStateAction<any>>;
  handleConfirmCompletePreparation: (...args: any[]) => void;

  showUnlockPreparationDialog: boolean;
  isUnlockingPreparation: boolean;
  setShowUnlockPreparationDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmUnlockPreparation: (...args: any[]) => void;

  showCompleteGroupPrepDialog: boolean;
  groupPrepDialogParam: any;
  isCompletingGroupPrep: boolean;
  setShowCompleteGroupPrepDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupPrepDialogParam: React.Dispatch<React.SetStateAction<any>>;
  setGroupPrepDialogKey: React.Dispatch<React.SetStateAction<string>>;
  handleConfirmCompleteGroupPrep: (...args: any[]) => void;

  showUnlockGroupPrepDialog: boolean;
  isUnlockingGroupPrep: boolean;
  setShowUnlockGroupPrepDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmUnlockGroupPrep: (...args: any[]) => void;
}

const DrugPreparationDialogs: React.FC<DrugPreparationDialogsProps> = ({
  showCompletePreparationDialog,
  isCompletingPreparation,
  paramForPreparation,
  setShowCompletePreparationDialog,
  setParamForPreparation,
  handleConfirmCompletePreparation,
  showUnlockPreparationDialog,
  isUnlockingPreparation,
  setShowUnlockPreparationDialog,
  handleConfirmUnlockPreparation,
  showCompleteGroupPrepDialog,
  groupPrepDialogParam,
  isCompletingGroupPrep,
  setShowCompleteGroupPrepDialog,
  setGroupPrepDialogParam,
  setGroupPrepDialogKey,
  handleConfirmCompleteGroupPrep,
  showUnlockGroupPrepDialog,
  isUnlockingGroupPrep,
  setShowUnlockGroupPrepDialog,
  handleConfirmUnlockGroupPrep,
}) => {
  return (
    <>
          {/* Complete Preparation Dialog */}
          <AnimatePresence>
            {showCompletePreparationDialog && paramForPreparation && (
              <CompletePreparationDialog
                isOpen={showCompletePreparationDialog}
                isCompleting={isCompletingPreparation}
                parameterName={paramForPreparation.parameterName!}
                parameterCode={paramForPreparation.paraCode!}
                onClose={() => {
                  setShowCompletePreparationDialog(false);
                  setParamForPreparation(null);
                }}
                onConfirm={handleConfirmCompletePreparation}
              />
            )}
          </AnimatePresence>

          {/* Unlock Preparation Dialog */}
          <AnimatePresence>
            {showUnlockPreparationDialog && paramForPreparation && (
              <UnlockPreparationDialog
                isOpen={showUnlockPreparationDialog}
                isUnlocking={isUnlockingPreparation}
                parameterName={paramForPreparation.parameterName!}
                parameterCode={paramForPreparation.paraCode!}
                onClose={() => {
                  setShowUnlockPreparationDialog(false);
                  setParamForPreparation(null);
                }}
                onConfirm={handleConfirmUnlockPreparation}
              />
            )}
          </AnimatePresence>

          {/* Group Complete Preparation Dialog */}
          <AnimatePresence>
            {showCompleteGroupPrepDialog && groupPrepDialogParam && (
              <CompletePreparationDialog
                isOpen={showCompleteGroupPrepDialog}
                isCompleting={isCompletingGroupPrep}
                parameterName={groupPrepDialogParam.parameterName!}
                parameterCode={groupPrepDialogParam.paraCode!}
                onClose={() => {
                  setShowCompleteGroupPrepDialog(false);
                  setGroupPrepDialogParam(null);
                  setGroupPrepDialogKey("");
                }}
                onConfirm={handleConfirmCompleteGroupPrep}
              />
            )}
          </AnimatePresence>

          {/* Group Unlock Preparation Dialog */}
          <AnimatePresence>
            {showUnlockGroupPrepDialog && groupPrepDialogParam && (
              <UnlockPreparationDialog
                isOpen={showUnlockGroupPrepDialog}
                isUnlocking={isUnlockingGroupPrep}
                parameterName={groupPrepDialogParam.parameterName!}
                parameterCode={groupPrepDialogParam.paraCode!}
                onClose={() => {
                  setShowUnlockGroupPrepDialog(false);
                  setGroupPrepDialogParam(null);
                  setGroupPrepDialogKey("");
                }}
                onConfirm={handleConfirmUnlockGroupPrep}
              />
            )}
          </AnimatePresence>

    </>
  );
};

export default DrugPreparationDialogs;
