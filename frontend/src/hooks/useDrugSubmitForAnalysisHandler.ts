import {
  updateWorksheet,
  updateParameter,
  insertWorksheetLog,
} from "../services/api";

export function useDrugSubmitForAnalysisHandler(ctx: any) {
  const {
    setIsSubmitting,
    collectFormDataForAPI,
    worksheetInfo,
    parameterStatusPerParam,
    setToastMessage,
    setShowToast,
    setShowSubmitDialog,
    worksheetId,
    setWorksheetInfo,
    setParameterStatusPerParam,
    employeeId,
    role,
  } = ctx;

    const handleSubmitForAnalysis = async () => {
      setIsSubmitting(true);

      // await handleSaveDraft();

      try {
        const worksheetData = collectFormDataForAPI();

        if (!worksheetData || !Array.isArray(worksheetData.parameters)) {
          throw new Error("Worksheet parameter data is not available");
        }

        const statusMap = parameterStatusPerParam ?? {};
        const currentWorksheetStatus = worksheetInfo?.sample?.status;

        const createdParameters = worksheetData?.parameters?.filter(
          (param: any) =>
            (statusMap[param.id] || param.status || "created").toLowerCase() ===
            "created",
        );

        if (createdParameters.length === 0) {
          setToastMessage("No parameters with 'created' status to submit");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
          setIsSubmitting(false);
          setShowSubmitDialog(false);
          return;
        }

        // Update parameter status to "Analysis Pending"
        const updatedParameters = createdParameters.map((param: any) => ({
          ...param,
          status: "Analysis Pending",
        }));

        if (currentWorksheetStatus === "Draft") {
          // If worksheet is Draft, update entire worksheet status
          const updatedWorksheetData = {
            ...worksheetData,
            parameters: worksheetData?.parameters?.map((param: any) => {
              const isCreated =
                (statusMap[param.id] || param.status || "created").toLowerCase() ===
                "created";
              return {
                ...param,
                status: isCreated ? "Analysis Pending" : param.status,
              };
            }),
            documentInfo: {
              ...worksheetData?.documentInfo,
              status: "Submitted For Analysis",
            },
          };

          const response = await updateWorksheet(
            worksheetId,
            updatedWorksheetData,
          );

          if (response && response.worksheetId) {
            setWorksheetInfo((prev: any) =>
              prev
                ? {
                  ...prev,
                  sample: {
                    ...prev.sample,
                    status: "Submitted For Analysis",
                  },
                }
                : null,
            );

            // Update parameter statuses in local state
            updatedParameters.forEach((param: any) => {
              setParameterStatusPerParam((prev: any) => ({
                ...prev,
                [param.id]: "Analysis Pending",
              }));
            });

            setToastMessage("Worksheet submitted for analysis successfully!");
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 4000);
            await insertWorksheetLog({
              worksheetId,
              action: "Submitted For Analysis",
              remarks: "Worksheet submitted for analysis",
              employeeId,
              role,
            });
          } else {
            setToastMessage("Failed to submit worksheet!");
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 4000);
          }
        } else if (currentWorksheetStatus === "Submitted For Analysis") {
          // If already submitted, only update individual parameters
          for (const param of updatedParameters) {
            const response = await updateParameter(param.id, param);

            if (response && response.parameterId) {
              // Update local state for this parameter
              setParameterStatusPerParam((prev: any) => ({
                ...prev,
                [param.id]: "Analysis Pending",
              }));
            } else {
              setToastMessage(
                `Failed to update parameter ${param.parameterName}`,
              );
              setShowToast(true);
              setTimeout(() => {
                setShowToast(false);
              }, 4000);
              setIsSubmitting(false);
              setShowSubmitDialog(false);
              return;
            }
          }
          setToastMessage("Parameters submitted for analysis successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);
          await insertWorksheetLog({
            worksheetId,
            action: "Parameters Submitted For Analysis",
            remarks: `${updatedParameters.length} parameter(s) submitted for analysis`,
            employeeId,
            role,
          });
        }

        setShowSubmitDialog(false);
      } catch (err: any) {
        setToastMessage(`Failed to submit: ${err.message}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsSubmitting(false);
      }
    };

  return {
    handleSubmitForAnalysis,
  };
}
