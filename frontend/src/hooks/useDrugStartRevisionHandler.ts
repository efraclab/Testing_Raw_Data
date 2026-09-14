import type { ParameterDetail } from "../models/ParameterDetail";
import { updateParameter, insertWorksheetLog } from "../services/api";

export function useDrugStartRevisionHandler(ctx: any) {
  const {
    setRevisionStartedParams,
    setParameterStatusPerParam,
    setRevisionStartDatePerParam,
    worksheetId,
    employeeId,
    role,
    setToastMessage,
    setShowToast,
  } = ctx;

    const handleStartRevision = async (param: ParameterDetail) => {
      const parameterId = param.id;
      const revisionStartDate = new Date().toISOString();

      // Optimistically unlock the UI immediately
      setRevisionStartedParams(prev => new Set([...prev, parameterId]));

      try {
        const updatedParam = {
          ...param,
          status: "Analysis Revision Started",
          revisionStartDate,
        };

        const response = await updateParameter(parameterId, updatedParam);

        if (response && response.parameterId) {
          setParameterStatusPerParam(prev => ({
            ...prev,
            [parameterId]: "Analysis Revision Started",
          }));
          setRevisionStartDatePerParam(prev => ({
            ...prev,
            [parameterId]: revisionStartDate,
          }));
          await insertWorksheetLog({
            worksheetId,
            parameterId,
            action: "Revision Started",
            remarks: "Analyst started revision — parameter unlocked for editing",
            employeeId,
            role,
          });
          setToastMessage("Revision started. Parameter is now unlocked for editing.");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        } else {
          // Rollback on failure
          setRevisionStartedParams(prev => {
            const next = new Set(prev); next.delete(parameterId); return next;
          });
          setToastMessage("Failed to start revision. Please try again.");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        }
      } catch (error) {
        // Rollback on error
        setRevisionStartedParams(prev => {
          const next = new Set(prev); next.delete(parameterId); return next;
        });
        setToastMessage(`Error starting revision: ${error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }
    };

  return {
    handleStartRevision,
  };
}
