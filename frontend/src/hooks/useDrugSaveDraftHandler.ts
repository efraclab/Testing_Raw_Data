import { updateWorksheet, updateParameter } from "../services/api";

export function useDrugSaveDraftHandler(ctx: any) {
  const {
    setIsSaving,
    collectFormDataForAPI,
    role,
    worksheetId,
    setToastMessage,
    setShowToast,
    setSaveSuccess,
    reloadWorksheet,
  } = ctx;

    const handleSaveDraft = async () => {
      setIsSaving(true);
      const worksheetData = collectFormDataForAPI();

      try {
        // Reviewer/QA must save the worksheet-level fields first.
        if (role === "Reviewer" || role === "QA") {
          const worksheetResponse = await updateWorksheet(
            worksheetId,
            worksheetData,
          );
          if (!worksheetResponse?.worksheetId) {
            throw new Error("Worksheet-level draft data could not be saved.");
          }
        }

        // The table, internal-standard input, Additional Info, preparations,
        // calculations and files are parameter-level data. Save every parameter
        // for every role, including Reviewer and QA.
        const parameterResponses = [];
        for (const param of worksheetData.parameters || []) {
          const response = await updateParameter(param.id, param);
          parameterResponses.push(response);
        }

        const allParametersSaved = parameterResponses.every(
          (response) => response?.parameterId,
        );
        if (!allParametersSaved) {
          throw new Error("One or more parameter details could not be saved.");
        }

        setToastMessage(`Draft saved successfully: ${worksheetId}`);
        setShowToast(true);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        await reloadWorksheet();
      } catch (err: any) {
        setToastMessage(`Failed to save draft: ${err.message}`);
        console.error("Save draft error:", err);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsSaving(false);
      }
    };

  return {
    handleSaveDraft,
  };
}
