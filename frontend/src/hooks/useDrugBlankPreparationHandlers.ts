import type { BlankPreparation as BlankPreparationModel } from "../preparation_models/drugs/BlankPreparation";

export function useDrugBlankPreparationHandlers(ctx: any) {
  const {
    editingBlankPrepId,
    setEditingBlankPrepId,
    setShowBlankPreparationDialog,
    setBlankPreparationPerParam,
  } = ctx;

    // Blank Preparation Handlers
    const handleAddBlankPreparation = (parameterId: number) => {
      setShowBlankPreparationDialog((prev) => ({
        ...prev,
        [parameterId]: true,
      }));
      setEditingBlankPrepId(null);
    };

    const handleEditBlankPreparation = (
      parameterId: number,
      blankPrepId: string,
    ) => {
      setEditingBlankPrepId(blankPrepId);
      setShowBlankPreparationDialog((prev) => ({
        ...prev,
        [parameterId]: true,
      }));
    };

    const handleSaveBlankPreparation = (
      parameterId: number,
      label: string,
      content: string,
    ) => {
      if (editingBlankPrepId) {
        // Update existing blank preparation
        setBlankPreparationPerParam((prev) => ({
          ...prev,
          [parameterId]: (prev[parameterId] || []).map((prep) =>
            prep.id === editingBlankPrepId ? { ...prep, label, content } : prep,
          ),
        }));
      } else {
        // Add new blank preparation
        const newBlankPrep: BlankPreparationModel = {
          id: `blank_${Date.now()}`,
          label,
          content,
        };

        setBlankPreparationPerParam((prev) => ({
          ...prev,
          [parameterId]: [...(prev[parameterId] || []), newBlankPrep],
        }));
      }

      setShowBlankPreparationDialog((prev) => ({
        ...prev,
        [parameterId]: false,
      }));
      setEditingBlankPrepId(null);
    };

    const handleRemoveBlankPreparation = (
      parameterId: number,
      blankPrepId: string,
    ) => {
      setBlankPreparationPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).filter(
          (prep) => prep.id !== blankPrepId,
        ),
      }));
    };

  return {
    handleAddBlankPreparation,
    handleEditBlankPreparation,
    handleSaveBlankPreparation,
    handleRemoveBlankPreparation,
  };
}
