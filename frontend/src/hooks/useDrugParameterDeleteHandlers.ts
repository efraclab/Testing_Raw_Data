import type { ParameterDetail } from "../models/ParameterDetail";
import { deleteParameter, insertWorksheetLog } from "../services/api";

export function useDrugParameterDeleteHandlers(ctx: any) {
  const {
    parameterToDelete,
    setParameterToDelete,
    setShowDeleteDialog,
    setIsDeleting,
    handleRemoveParameter,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  } = ctx;

    const handleInitiateDelete = (param: ParameterDetail) => {
      setParameterToDelete(param);
      setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
      if (!parameterToDelete) return;

      setIsDeleting(true);

      try {
        await deleteParameter(parameterToDelete.id);
        handleRemoveParameter(parameterToDelete.id);
        setShowDeleteDialog(false);
        setToastMessage("Parameter deleted successfully!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
        await insertWorksheetLog({
          worksheetId,
          parameterId: parameterToDelete.id,
          action: "Parameter Deleted",
          remarks: `Parameter "${parameterToDelete.parameterName}" (${parameterToDelete.paraCode}) deleted`,
          employeeId,
          role,
        });
      } catch (error) {
        setToastMessage("Failed to delete parameter!");

        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } finally {
        setIsDeleting(false);
      }
    };

  return {
    handleInitiateDelete,
    handleConfirmDelete,
  };
}
