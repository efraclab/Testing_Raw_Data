import type { ParameterDetail } from "../models/ParameterDetail";
import { updateParameter, insertWorksheetLog } from "../services/api";

export function useDrugAnalysisLifecycleHandlers(ctx: any) {
  const {
    parameterForAnalysis,
    setParameterForAnalysis,
    setShowStartAnalysisDialog,
    setShowCompleteAnalysisDialog,
    setIsStartingAnalysis,
    setIsCompletingAnalysis,
    setParameterStatusPerParam,
    setAnalysisStartDatePerParam,
    setAnalysisCompletionDatePerParam,
    setRevisionCompletedDatePerParam,
    setRemarksByAnalystPerParam,
    parameterStatusPerParam,
    revisionStartedParams,
    setRevisionStartedParams,
    collectFormDataForAPI,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  } = ctx;

    // Handle start analysis button click
    const handleStartAnalysis = (param: ParameterDetail) => {
      setParameterForAnalysis(param);
      setShowStartAnalysisDialog(true);
    };

    // Handle confirm start analysis
    const handleConfirmStartAnalysis = async () => {
      if (!parameterForAnalysis) return;

      setIsStartingAnalysis(true);
      try {
        // Update parameter status to "Analysis Started"
        const updatedParam = {
          ...parameterForAnalysis,
          status: "Analysis Started",
          analysisStartDate: new Date().toISOString(), // Current date
        };

        const response = await updateParameter(
          parameterForAnalysis.id,
          updatedParam,
        );

        if (response && response.parameterId) {
          // Update local state
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterForAnalysis.id]: "Analysis Started",
          }));

          setAnalysisStartDatePerParam((prev) => ({
            ...prev,
            [parameterForAnalysis.id]: updatedParam.analysisStartDate,
          }));

          setToastMessage(
            "Analysis started successfully! You can now proceed with the analysis.",
          );
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
          await insertWorksheetLog({
            worksheetId,
            parameterId: parameterForAnalysis.id,
            action: "Analysis Started",
            remarks: `Analysis started for parameter "${parameterForAnalysis.parameterName}"`,
            employeeId,
            role,
          });
          setShowStartAnalysisDialog(false);
          setParameterForAnalysis(null);
        } else {
          setToastMessage("Failed to start analysis!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
        }
      } catch (error) {
        setToastMessage(`Error starting analysis: ${error}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsStartingAnalysis(false);
      }
    };

    // Handle complete analysis button click
    const handleCompleteAnalysis = (param: ParameterDetail) => {
      const currentWorksheetData = collectFormDataForAPI();

      const curParam = currentWorksheetData.parameters?.filter(
        (parameter) => parameter.id === param.id,
      )[0];

      setParameterForAnalysis(curParam ?? param);
      setShowCompleteAnalysisDialog(true);
    };

    // Handle confirm complete analysis
    const handleConfirmCompleteAnalysis = async (comment: string) => {
      if (!parameterForAnalysis) return;

      setIsCompletingAnalysis(true);
      try {
        const prevStatus = (
          parameterStatusPerParam[parameterForAnalysis.id] || ""
        ).toLowerCase();
        const wasRevision =
          prevStatus === "analysis revision started" ||
          prevStatus === "analysis revision" ||
          revisionStartedParams.has(parameterForAnalysis.id);

        const completionDate = new Date().toISOString();

        const updatedParam = {
          ...parameterForAnalysis,
          status: "Analysis Completed",
          analysisCompletionDate: completionDate,
          ...(wasRevision && { revisionCompletedDate: completionDate }),
          remarksByAnalyst: comment || null,
        };

        const response = await updateParameter(
          parameterForAnalysis.id,
          updatedParam,
        );

        if (response && response.parameterId) {
          // Update local state
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [parameterForAnalysis.id]: "Analysis Completed",
          }));

          setAnalysisCompletionDatePerParam((prev) => ({
            ...prev,
            [parameterForAnalysis.id]: completionDate,
          }));

          if (wasRevision) {
            setRevisionCompletedDatePerParam((prev) => ({
              ...prev,
              [parameterForAnalysis.id]: completionDate,
            }));
            // Clear the optimistic revision-started flag
            setRevisionStartedParams(prev => {
              const next = new Set(prev);
              next.delete(parameterForAnalysis.id);
              return next;
            });
          }

          if (comment) {
            setRemarksByAnalystPerParam((prev) => ({
              ...prev,
              [parameterForAnalysis.id]: comment,
            }));
          }

          setToastMessage(
            wasRevision
              ? "Revision completed successfully! Resubmitted to Reviewer."
              : "Analysis completed successfully! Submitted for Reviewer approval.",
          );
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);

          await insertWorksheetLog({
            worksheetId,
            parameterId: parameterForAnalysis.id,
            action: wasRevision
              ? "Analysis Completed After Revision"
              : "Analysis Completed",
            remarks: comment || (wasRevision
              ? "Analysis completed after revision"
              : "Analysis completed"),
            employeeId,
            role,
          });

          setShowCompleteAnalysisDialog(false);
          setParameterForAnalysis(null);
        } else {
          setToastMessage("Failed to complete analysis!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
        }
      } catch (error) {
        setToastMessage(`Error completing analysis: ${error}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsCompletingAnalysis(false);
      }
    };

  return {
    handleStartAnalysis,
    handleConfirmStartAnalysis,
    handleCompleteAnalysis,
    handleConfirmCompleteAnalysis,
  };
}
