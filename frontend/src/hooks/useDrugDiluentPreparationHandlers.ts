import type { DiluentPreparation } from "../preparation_models/drugs/DiluentPreparation";

export function useDrugDiluentPreparationHandlers(ctx: any) {
  const {
    setShowDiluentPrepDialog,
    setEditingDiluentPrepId,
    editingDiluentPrepId,
    setDiluentPreparationsPerParam,
  } = ctx;

    // Diluent Preparation (blank-sheet style) Handlers
    const handleAddDiluentPrep = (parameterId: number) => {
      setShowDiluentPrepDialog((prev) => ({ ...prev, [parameterId]: true }));
      setEditingDiluentPrepId(null);
    };

    const handleEditDiluentPrep = (parameterId: number, id: string) => {
      setEditingDiluentPrepId(id);
      setShowDiluentPrepDialog((prev) => ({ ...prev, [parameterId]: true }));
    };

    const handleSaveDiluentPrep = (
      parameterId: number,
      _label: string,
      content: string,
    ) => {
      if (editingDiluentPrepId) {
        setDiluentPreparationsPerParam((prev) => ({
          ...prev,
          [parameterId]: (prev[parameterId] || []).map((d) =>
            d.id === editingDiluentPrepId ? { ...d, content } : d,
          ),
        }));
      } else {
        setDiluentPreparationsPerParam((prev) => {
          const current = prev[parameterId] || [];
          const newPrep: DiluentPreparation = {
            id: `diluent_${Date.now()}`,
            label: `Diluent Preparation ${current.length + 1}`,
            content,
          };
          return { ...prev, [parameterId]: [...current, newPrep] };
        });
      }
      setShowDiluentPrepDialog((prev) => ({ ...prev, [parameterId]: false }));
      setEditingDiluentPrepId(null);
    };

    const handleRemoveDiluentPrep = (parameterId: number, id: string) => {
      setDiluentPreparationsPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || [])
          .filter((d) => d.id !== id)
          .map((d, index) => ({
            ...d,
            label: `Diluent Preparation ${index + 1}`,
          })),
      }));
    };

  return {
    handleAddDiluentPrep,
    handleEditDiluentPrep,
    handleSaveDiluentPrep,
    handleRemoveDiluentPrep,
  };
}
