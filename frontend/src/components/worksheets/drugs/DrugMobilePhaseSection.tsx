import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MobilePhasePreparation } from "../../../preparation_models/drugs/MobilePhasePreparation";
import MobilePhasePreparationDetail from "../../sub-components/drugs/MobilePhasePreparationDetail";
import PreparationEditorDialog from "../../sub-components/drugs/PreparationEditorDialog";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugMobilePhaseSectionProps {
  parameterId: number;
  isVisible: boolean;
  preparations: MobilePhasePreparation[];
  isDialogOpen: boolean;
  editingId: string | null;
  onVisibilityChange: (checked: boolean) => void;
  onAdd: (parameterId: number) => void;
  onEdit: (parameterId: number, id: string) => void;
  onRemove: (parameterId: number, id: string) => void;
  onCloseDialog: () => void;
  onSave: (parameterId: number, label: string, content: string) => void;
}

const DrugMobilePhaseSection: React.FC<DrugMobilePhaseSectionProps> = ({
  parameterId,
  isVisible,
  preparations,
  isDialogOpen,
  editingId,
  onVisibilityChange,
  onAdd,
  onEdit,
  onRemove,
  onCloseDialog,
  onSave,
}) => {
  const editingPreparation = editingId
    ? preparations.find((mp) => mp.id === editingId)
    : undefined;

  return (
    <>
      {/* Mobile Phase Preparation Toggle */}
      <div className="mb-6 mt-4">
        <label className="flex items-center gap-4 cursor-pointer group relative">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-all duration-300" />

            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => onVisibilityChange(e.target.checked)}
              className="peer sr-only"
            />

            <div className="relative w-14 h-7 rounded-full border-2 border-emerald-200 bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-emerald-700 peer-checked:to-emerald-900 peer-checked:border-emerald-600 transition-all duration-300 shadow-inner group-hover:border-emerald-300">
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                animate={{ x: isVisible ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isVisible ? (
                  <svg
                    className="w-3 h-3 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </motion.div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-emerald-800 group-hover:text-emerald-800 transition-colors duration-200">
                Mobile Phase Preparation
              </span>

              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-all duration-200 ${
                  isVisible
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                {isVisible ? "Active" : "Inactive"}
              </motion.span>
            </div>

            <p className="text-xs text-emerald-600/70">
              Toggle mobile phase preparation section
            </p>
          </div>
        </label>
      </div>

      {/* Mobile Phase Preparation Section */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            className="mb-6 p-6 bg-white rounded-xl border-2 border-emerald-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight">
                <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full" />
                Mobile Phase Preparations
              </h3>

              <button
                onClick={() => onAdd(parameterId)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm transform"
              >
                <Plus className="w-4 h-4" />
                Add Mobile Phase
              </button>
            </div>

            <AnimatePresence>
              {preparations.map((mobilePhase) => (
                <div key={mobilePhase.id}>
                  <MobilePhasePreparationDetail
                    mobilePhasePreparation={mobilePhase}
                    onEdit={(id) => onEdit(parameterId, id)}
                    onRemove={(id) => onRemove(parameterId, id)}
                  />
                </div>
              ))}
            </AnimatePresence>

            {preparations.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden text-center py-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl shadow-inner"
              >
                <div className="relative z-10">
                  <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
                    <Target className="w-12 h-12 text-emerald-400" />
                  </div>

                  <p className="text-lg font-bold text-emerald-800 mb-2">
                    No mobile phase preparations added yet
                  </p>

                  <p className="text-sm text-emerald-600/80 max-w-md mx-auto mb-4">
                    Click "Add Mobile Phase" to create mobile phase preparations
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Phase Preparation Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <PreparationEditorDialog
            title={
              editingId
                ? editingPreparation?.label ?? "Mobile Phase Preparation"
                : `Mobile Phase Preparation ${preparations.length + 1}`
            }
            onClose={onCloseDialog}
            onSave={(content) => onSave(parameterId, "", content)}
            existingContent={editingId ? editingPreparation?.content : undefined}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DrugMobilePhaseSection;
