import type { ParameterDetail } from "../models/ParameterDetail";
import { updateParameter, insertWorksheetLog } from "../services/api";

export function useDrugQaRevisionHandlers(ctx: any) {
  const {
    parameterForApproval,
    setParameterForApproval,
    setShowQARevisionDialog,
    setIsQARequestingRevision,
    setParameterStatusPerParam,
    setRemarksQAPerParam,
    setQARevisionComments,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  } = ctx;

    // ===== QA HANDLERS =====
    const handleQARequestRevision = (param: ParameterDetail) => {
      setParameterForApproval(param);
      setShowQARevisionDialog(true);
    };

    const handleConfirmQARevision = async (comments: string) => {
      if (!parameterForApproval) return;

      setIsQARequestingRevision(true);
      try {
        const updatedParam = {
          ...parameterForApproval,
          status: "Analysis Revision",
          remarksByQA: comments,
        };

        const response = await updateParameter(
          parameterForApproval.id,
          updatedParam,
        );

        if (response && response.parameterId) {
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: "Analysis Revision",
          }));
          setRemarksQAPerParam((prev) => ({
            ...prev,
            [parameterForApproval.id]: comments,
          }));

          setToastMessage("Revision requested by QA successfully!");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          await insertWorksheetLog({
            worksheetId,
            parameterId: parameterForApproval.id,
            action: "QA Revision Requested",
            remarks: comments || "Revision requested by QA",
            employeeId,
            role,
          });
          setShowQARevisionDialog(false);
          setParameterForApproval(null);
          setQARevisionComments("");
        } else {
          setToastMessage("Failed to request QA revision!");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        }
      } catch (error) {
        setToastMessage(`Error requesting QA revision: ${error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsQARequestingRevision(false);
      }
    };

  return {
    handleQARequestRevision,
    handleConfirmQARevision,
  };
}
