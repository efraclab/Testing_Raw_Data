import { updateWorksheet, insertWorksheetLog } from "../services/api";

export function useDrugSubmitForQaHandler(ctx: any) {
  const {
    collectFormDataForAPI,
    worksheetId,
    employeeId,
    role,
    setWorksheetInfo,
    setToastMessage,
    setShowToast,
    setShowSubmitForQADialog,
    setIsSubmittingForQA,
  } = ctx;

    const handleSubmitForQA = async () => {
      setIsSubmittingForQA(true);
      try {
        const worksheetData = collectFormDataForAPI();
        const now = new Date().toISOString();

        const updatedWorksheetData = {
          ...worksheetData,
          documentInfo: {
            ...worksheetData?.documentInfo,
            status: "Submitted For QA Review",
            submittedQaBy: employeeId,
            submittedQaAt: now,
          },
        };

        const response = await updateWorksheet(worksheetId, updatedWorksheetData);

        if (response && response.worksheetId) {
          setWorksheetInfo((prev) =>
            prev
              ? {
                ...prev,
                sample: {
                  ...prev.sample,
                  status: "Submitted For QA Review",
                  submittedQaBy: employeeId,
                  submittedQaAt: now,
                },
              }
              : null,
          );

          setToastMessage("Worksheet submitted for QA Review successfully!");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          await insertWorksheetLog({
            worksheetId,
            action: "Submitted For QA Review",
            remarks: "Worksheet submitted for QA review",
            employeeId,
            role,
          });
          setShowSubmitForQADialog(false);
        } else {
          throw new Error("Failed to submit worksheet for QA Review");
        }
      } catch (error: any) {
        console.error("Error submitting for QA:", error);
        setToastMessage(`Error: ${error.message || error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsSubmittingForQA(false);
      }
    };

  return {
    handleSubmitForQA,
  };
}
