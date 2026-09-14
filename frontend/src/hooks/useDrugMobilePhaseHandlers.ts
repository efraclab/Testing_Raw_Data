import type { MobilePhasePreparation } from "../preparation_models/drugs/MobilePhasePreparation";

export function useDrugMobilePhaseHandlers(ctx: any) {
  const {
    setShowMobilePhaseDialog,
    setEditingMobilePhasePrepId,
    editingMobilePhasePrepId,
    setMobilePhasePerParam,
  } = ctx;

    const handleAddMobilePhase = (parameterId: number) => {
      setShowMobilePhaseDialog((prev) => ({ ...prev, [parameterId]: true }));
      setEditingMobilePhasePrepId(null);
    };

    const handleEditMobilePhase = (parameterId: number, id: string) => {
      setEditingMobilePhasePrepId(id);
      setShowMobilePhaseDialog((prev) => ({ ...prev, [parameterId]: true }));
    };

    const handleSaveMobilePhase = (
      parameterId: number,
      _label: string,
      content: string,
    ) => {
      if (editingMobilePhasePrepId) {
        setMobilePhasePerParam((prev) => ({
          ...prev,
          [parameterId]: (prev[parameterId] || []).map((mp) =>
            mp.id === editingMobilePhasePrepId ? { ...mp, content } : mp,
          ),
        }));
      } else {
        setMobilePhasePerParam((prev) => {
          const current = prev[parameterId] || [];
          const newItem: MobilePhasePreparation = {
            id: String(Date.now()),
            label: `Mobile Phase Preparation ${current.length + 1}`,
            content,
          };
          return { ...prev, [parameterId]: [...current, newItem] };
        });
      }
      setShowMobilePhaseDialog((prev) => ({ ...prev, [parameterId]: false }));
      setEditingMobilePhasePrepId(null);
    };

    const handleRemoveMobilePhase = (
      parameterId: number,
      mobilePhaseId: string,
    ) => {
      setMobilePhasePerParam((prev) => {
        const updated = (prev[parameterId] || [])
          .filter((mp) => mp.id !== mobilePhaseId)
          .map((mp, index) => ({
            ...mp,
            label: `Mobile Phase Preparation ${index + 1}`,
          }));
        return { ...prev, [parameterId]: updated };
      });
    };

  return {
    handleAddMobilePhase,
    handleEditMobilePhase,
    handleSaveMobilePhase,
    handleRemoveMobilePhase,
  };
}
