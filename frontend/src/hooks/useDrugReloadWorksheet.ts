import { loadDrugWorksheetData } from "./drugWorksheetLoader";

export function useDrugReloadWorksheet(ctx: any) {
  const {
    worksheetId,
    employeeId,
    role,
    department,
    setError,
    setWorksheetInfo,
    setRegistrationNo,
    setSamplesData,
    setAddedParameters,
    setSelectedParamsForDetail,
    setFilesPerParam,
    setShowParamFiles,
    restoreWorksheetToState,
    setIsLoading,
  } = ctx;

    const reloadWorksheet = async () => {
      if (!worksheetId) {
        setError("No worksheet ID provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { worksheetData, samples } = await loadDrugWorksheetData({
          worksheetId,
          employeeId,
          role,
          department,
        });

        setWorksheetInfo(worksheetData);
        setRegistrationNo(worksheetData.sample.registrationNo);
        setSamplesData(samples);

        setAddedParameters([]);
        setSelectedParamsForDetail([]);
        setFilesPerParam({});
        setShowParamFiles({});

        restoreWorksheetToState(worksheetData);
      } catch (err: any) {
        setError(err.message || "Failed to reload worksheet");
      } finally {
        setIsLoading(false);
      }
    };

  return {
    reloadWorksheet,
  };
}
