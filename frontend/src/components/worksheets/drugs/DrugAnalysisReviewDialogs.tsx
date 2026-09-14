import React from "react";
import { AnimatePresence } from "framer-motion";

import StartAnalysisDialog from "../../shared/StartAnalysisDialog";
import CompleteAnalysisDialog from "../../shared/CompleteAnalysisDialog";
import ApproveParameterDialog from "../../shared/ApproveParameterDialog";
import DisapproveParameterDialog from "../../shared/DisapproveParameterDialog";
import RevisionRequestDialog from "../../shared/RevisionRequestDialog";
import SubmitForQAReviewDialog from "../../shared/SubmitForQAReviewDialog";
import ApproveWorksheetDialog from "../../shared/ApproveWorksheetDialog";
import RevertApprovalDialog from "../../shared/RevertApprovalDialog";

interface DrugAnalysisReviewDialogsProps {
  showStartAnalysisDialog: boolean;
  parameterForAnalysis: any;
  isStartingAnalysis: boolean;
  setShowStartAnalysisDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setParameterForAnalysis: React.Dispatch<React.SetStateAction<any>>;
  handleConfirmStartAnalysis: (...args: any[]) => void;

  showCompleteAnalysisDialog: boolean;
  isCompletingAnalysis: boolean;
  setShowCompleteAnalysisDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmCompleteAnalysis: (...args: any[]) => void;

  showApproveDialog: boolean;
  showRevisionDialog: boolean;
  showDisapproveDialog: boolean;
  isApproving: boolean;
  isRequestingRevision: boolean;
  isDisapproving: boolean;
  revisionComments: string;
  setShowApproveDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRevisionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDisapproveDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setRevisionComments: React.Dispatch<React.SetStateAction<string>>;
  handleConfirmApprove: (...args: any[]) => void;
  handleConfirmRevision: (...args: any[]) => void;
  handleConfirmDisapprove: (...args: any[]) => void;

  showQARevisionDialog: boolean;
  isSubmittingRevision: boolean;
  parameterForApproval: any;
  setParameterForApproval: React.Dispatch<React.SetStateAction<any>>;
  setShowQARevisionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setQARevisionComments: React.Dispatch<React.SetStateAction<string>>;
  handleConfirmQARevision: (...args: any[]) => void;

  showSubmitForQADialog: boolean;
  isSubmittingForQA: boolean;
  worksheetId: any;
  addedParameters: any[];
  setShowSubmitForQADialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForQA: (...args: any[]) => void;

  showApproveWorksheetDialog: boolean;
  isApprovingWorksheet: boolean;
  setShowApproveWorksheetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleApproveWorksheet: (...args: any[]) => void;

  showRevertApprovalDialog: boolean;
  isRevertingApproval: boolean;
  setShowRevertApprovalDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleRevertApproval: (...args: any[]) => void;
}

const DrugAnalysisReviewDialogs: React.FC<
  DrugAnalysisReviewDialogsProps
> = ({
  showStartAnalysisDialog,
  parameterForAnalysis,
  isStartingAnalysis,
  setShowStartAnalysisDialog,
  setParameterForAnalysis,
  handleConfirmStartAnalysis,

  showCompleteAnalysisDialog,
  isCompletingAnalysis,
  setShowCompleteAnalysisDialog,
  handleConfirmCompleteAnalysis,

  showApproveDialog,
  showRevisionDialog,
  showDisapproveDialog,
  isApproving,
  isRequestingRevision,
  isDisapproving,
  revisionComments,
  setShowApproveDialog,
  setShowRevisionDialog,
  setShowDisapproveDialog,
  setRevisionComments,
  handleConfirmApprove,
  handleConfirmRevision,
  handleConfirmDisapprove,

  showQARevisionDialog,
  isSubmittingRevision,
  parameterForApproval,
  setParameterForApproval,
  setShowQARevisionDialog,
  setQARevisionComments,
  handleConfirmQARevision,

  showSubmitForQADialog,
  isSubmittingForQA,
  worksheetId,
  addedParameters,
  setShowSubmitForQADialog,
  handleSubmitForQA,

  showApproveWorksheetDialog,
  isApprovingWorksheet,
  setShowApproveWorksheetDialog,
  handleApproveWorksheet,

  showRevertApprovalDialog,
  isRevertingApproval,
  setShowRevertApprovalDialog,
  handleRevertApproval,
}) => {
  return (
    <>
          {/* Start Analysis Dialog */}
          <AnimatePresence>
            {showStartAnalysisDialog && parameterForAnalysis && (
              <StartAnalysisDialog
                isOpen={showStartAnalysisDialog}
                isStarting={isStartingAnalysis}
                parameterName={parameterForAnalysis.parameterName!}
                parameterCode={parameterForAnalysis.paraCode!}
                onClose={() => {
                  setShowStartAnalysisDialog(false);
                  setParameterForAnalysis(null);
                }}
                onConfirm={handleConfirmStartAnalysis}
              />
            )}
          </AnimatePresence>

          {/* Complete Analysis Dialog */}
          <AnimatePresence>
            {showCompleteAnalysisDialog && parameterForAnalysis && (
              <CompleteAnalysisDialog
                isOpen={showCompleteAnalysisDialog}
                isCompleting={isCompletingAnalysis}
                parameterName={parameterForAnalysis.parameterName!}
                parameterCode={parameterForAnalysis.paraCode!}
                onClose={() => {
                  setShowCompleteAnalysisDialog(false);
                  setParameterForAnalysis(null);
                }}
                onConfirm={handleConfirmCompleteAnalysis}
              />
            )}
          </AnimatePresence>
          {/* Reviewer Approve Dialog */}
          <AnimatePresence>
            {showApproveDialog && parameterForApproval && (
              <ApproveParameterDialog
                isOpen={showApproveDialog}
                isApproving={isApproving}
                parameterName={parameterForApproval.parameterName!}
                parameterCode={parameterForApproval.paraCode!}
                onClose={() => {
                  setShowApproveDialog(false);
                  setParameterForApproval(null);
                }}
                onConfirm={handleConfirmApprove}
              />
            )}
          </AnimatePresence>

          {/* Reviewer Disapprove Dialog */}
          <AnimatePresence>
            {showDisapproveDialog && parameterForApproval && (
              <DisapproveParameterDialog
                isOpen={showDisapproveDialog}
                isDisapproving={isDisapproving}
                parameterName={parameterForApproval.parameterName!}
                parameterCode={parameterForApproval.paraCode!}
                onClose={() => {
                  setShowDisapproveDialog(false);
                  setParameterForApproval(null);
                }}
                onConfirm={handleConfirmDisapprove}
              />
            )}
          </AnimatePresence>

          {/* Reviewer Revision Dialog */}
          <AnimatePresence>
            {showRevisionDialog && parameterForApproval && (
              <RevisionRequestDialog
                isOpen={showRevisionDialog}
                isRequesting={isRequestingRevision}
                parameterName={parameterForApproval.parameterName!}
                parameterCode={parameterForApproval.paraCode!}
                onClose={() => {
                  setShowRevisionDialog(false);
                  setParameterForApproval(null);
                  setRevisionComments("");
                }}
                onConfirm={(comments: string) => handleConfirmRevision(comments)}
              />
            )}
          </AnimatePresence>

          {/* QA Revision Dialog */}

          <AnimatePresence>
            {showQARevisionDialog && parameterForApproval && (
              <RevisionRequestDialog
                isOpen={showQARevisionDialog}
                isRequesting={isSubmittingRevision}
                parameterName={parameterForApproval.parameterName!}
                parameterCode={parameterForApproval.paraCode!}
                onClose={() => {
                  setShowQARevisionDialog(false);
                  setParameterForApproval(null);
                  setQARevisionComments("");
                }}
                onConfirm={(comments: string) =>
                  handleConfirmQARevision(comments)
                }
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSubmitForQADialog && (
              <SubmitForQAReviewDialog
                isOpen={showSubmitForQADialog}
                isSubmitting={isSubmittingForQA}
                worksheetId={worksheetId}
                totalParameters={addedParameters.length}
                onClose={() => setShowSubmitForQADialog(false)}
                onConfirm={handleSubmitForQA}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showApproveWorksheetDialog && (
              <ApproveWorksheetDialog
                isOpen={showApproveWorksheetDialog}
                isApproving={isApprovingWorksheet}
                worksheetId={worksheetId}
                totalParameters={addedParameters.length}
                onClose={() => setShowApproveWorksheetDialog(false)}
                onConfirm={handleApproveWorksheet}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRevertApprovalDialog && (
              <RevertApprovalDialog
                isOpen={showRevertApprovalDialog}
                isReverting={isRevertingApproval}
                worksheetId={worksheetId}
                onClose={() => setShowRevertApprovalDialog(false)}
                onConfirm={handleRevertApproval}
              />
            )}
          </AnimatePresence>


    </>
  );
};

export default DrugAnalysisReviewDialogs;
