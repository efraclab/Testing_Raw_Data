import type { BlankPreparation as BlankPreparationModel } from "../preparation_models/drugs/BlankPreparation";

type DialogState = Record<number, boolean>;
type BlankPrepState = Record<number, BlankPreparationModel[]>;

export function useDrugBlankPreparationHandlers(ctx: any) {
  const {
    editingBlankPrepId,
    setEditingBlankPrepId,
    setShowBlankPreparationDialog,
    setBlankPreparationPerParam,
  } = ctx;

  // Blank Preparation Handlers
  const handleAddBlankPreparation = (parameterId: number) => {
    setShowBlankPreparationDialog((prev: DialogState) => ({
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
    setShowBlankPreparationDialog((prev: DialogState) => ({
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
      setBlankPreparationPerParam((prev: BlankPrepState) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((prep) =>
          String(prep.id) === String(editingBlankPrepId)
            ? { ...prep, label, content }
            : prep,
        ),
      }));
    } else {
      // Add new blank preparation
      const newBlankPrep: BlankPreparationModel = {
        id: `blank_${Date.now()}`,
        label,
        content,
      };

      setBlankPreparationPerParam((prev: BlankPrepState) => ({
        ...prev,
        [parameterId]: [...(prev[parameterId] || []), newBlankPrep],
      }));
    }

    setShowBlankPreparationDialog((prev: DialogState) => ({
      ...prev,
      [parameterId]: false,
    }));
    setEditingBlankPrepId(null);
  };

  const handleRemoveBlankPreparation = (
    parameterId: number,
    blankPrepId: string,
  ) => {
    setBlankPreparationPerParam((prev: BlankPrepState) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).filter(
        (prep) => String(prep.id) !== String(blankPrepId),
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