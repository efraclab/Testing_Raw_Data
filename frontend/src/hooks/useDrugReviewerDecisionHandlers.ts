import type { ParameterDetail } from "../models/ParameterDetail";
import { updateParameter, insertWorksheetLog } from "../services/api";

export function useDrugReviewerDecisionHandlers(ctx: any) {
  const {
    parameterForApproval,
    setParameterForApproval,

    setShowApproveDialog,
    setShowRevisionDialog,
    setShowDisapproveDialog,

    setIsApproving,
    setIsDisapproving,
    setIsRequestingRevision,

    setParameterStatusPerParam,
    setApprovedByPerParam,
    setApprovedAtPerParam,
    setRemarksQAPerParam,
    setRemarksByReviewerPerParam,

    setRevisionComments,

    setToastMessage,
    setShowToast,

    worksheetId,
    employeeId,
    role,
  } = ctx;

    const handleApprove = (param: ParameterDetail) => {
      setParameterForApproval(param);
      setShowApproveDialog(true);
    };

    const handleRequestRevision = (param: ParameterDetail) => {
      setParameterForApproval(param);
      setShowRevisionDialog(true);
    };

    const handleConfirmApprove = async (remarks: string) => {
      if (!parameterForApproval) return;

      setIsApproving(true);
      try {
        const updatedParam = {
          ...parameterForApproval,
          status: "Approved",
          approvedByReviewer: employeeId,
          approvedAtReviewer: new Date().toISOString(),
          remarksByQA: null, // Clear QA remarks when Reviewer re-approves
          remarksByReviewer: remarks || null,
        };

        const response = await updateParameter(
          parameterForApproval.id,
          updatedParam,
        );

        if (response && response.parameterId) {
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: "Approved",
          }));

          setApprovedByPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: employeeId,
          }));

          setApprovedAtPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: updatedParam.approvedAtReviewer,
          }));

          // Clear QA remarks locally when Reviewer re-approves
          setRemarksQAPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: null,
          }));

          // Save reviewer remarks
          setRemarksByReviewerPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: remarks || null,
          }));

          setToastMessage("Parameter approved successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
          await insertWorksheetLog({
            worksheetId,
            parameterId: parameterForApproval.id,
            action: "Parameter Approved",
            remarks: remarks || "Parameter approved by Reviewer",
            employeeId,
            role,
          });
          setShowApproveDialog(false);
          setParameterForApproval(null);
        } else {
          setToastMessage("Failed to approve parameter!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
        }
      } catch (error) {
        setToastMessage(`Error approving parameter:${error}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsApproving(false);
      }
    };

    const handleConfirmDisapprove = async () => {
      if (!parameterForApproval) return;

      setIsDisapproving(true);
      try {
        const updatedParam = {
          ...parameterForApproval,
          status: "Disapproved",
          approvedByReviewer: employeeId,
          approvedAtReviewer: new Date().toISOString(),
        };

        const response = await updateParameter(
          parameterForApproval.id,
          updatedParam,
        );

        if (response && response.parameterId) {
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: "Disapproved",
          }));

          setApprovedByPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: employeeId,
          }));

          setApprovedAtPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: updatedParam.approvedAtReviewer,
          }));

          setToastMessage("Parameter disapproved successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
          await insertWorksheetLog({
            worksheetId,
            parameterId: parameterForApproval.id,
            action: "Parameter Disapproved",
            remarks: "Parameter disapproved by Reviewer",
            employeeId,
            role,
          });
          setShowDisapproveDialog(false);
          setParameterForApproval(null);
        } else {
          setToastMessage("Failed to disapprove parameter!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
        }
      } catch (error) {
        setToastMessage(`Error while disapproving parameter: ${error}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsDisapproving(false);
      }
    };

    const handleConfirmRevision = async (comments: string) => {
      setIsRequestingRevision(true);
      try {
        const updatedParam = {
          ...parameterForApproval,
          status: "Analysis Revision",
          analysisCompletionDate: new Date().toISOString(),
          revisionComments: comments,
          remarksByReviewer: comments,
        };

        const response = await updateParameter(
          parameterForApproval?.id!,
          updatedParam!,
        );

        if (response && response.parameterId) {
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterForApproval?.id!]: "Analysis Revision",
          }));

          setRemarksByReviewerPerParam((prev) => ({
            ...prev,
            [parameterForApproval?.id!]: comments,
          }));

          setToastMessage("Revision requested successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
          await insertWorksheetLog({
            worksheetId,
            parameterId: parameterForApproval?.id,
            action: "Revision Requested",
            remarks: comments || "Revision requested by Reviewer",
            employeeId,
            role,
          });
          setShowRevisionDialog(false);
          setParameterForApproval(null);
          setRevisionComments("");
        } else {
          setToastMessage("Failed to request revision!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
        }
      } catch (error) {
        setToastMessage(`Error requesting revision: ${error}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsRequestingRevision(false);
      }
    };

  return {
    handleApprove,
    handleRequestRevision,
    handleConfirmApprove,
    handleConfirmDisapprove,
    handleConfirmRevision,
  };
}
