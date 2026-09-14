import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiTestTube } from "react-icons/bi";
import type { BlankPreparation as BlankPreparationModel } from "../../../preparation_models/drugs/BlankPreparation";
import type { AttachedFile } from "../../../models/AttachedFile";
import BlankPreparation from "../../sub-components/drugs/BlankPreparation";
import BlankPreparationDetail from "../../sub-components/drugs/BlankPreparationDetail";
import WorksheetFileAttacher from "../../shared/WorksheetFileAttacher";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugBlankPreparationSectionProps {
  parameterId: number;
  isActive: boolean;
  isPreparationLocked: boolean;
  shouldDisableContent: boolean;
  canManagePrep: boolean;
  completedAt?: string | null;
  preparations: BlankPreparationModel[];
  files: AttachedFile[];
  isDialogOpen: boolean;
  editingId: string | null;
  onAddPreparation: (parameterId: number) => void;
  onEditPreparation: (parameterId: number, blankPrepId: string) => void;
  onRemovePreparation: (parameterId: number, blankPrepId: string) => void;
  onAddFiles: (newFiles: AttachedFile[]) => void;
  onRemoveFile: (index: number) => void;
  onComplete: () => void;
  onUnlock: () => void;
  onCloseDialog: () => void;
  onSavePreparation: (
    parameterId: number,
    label: string,
    content: string,
  ) => void;
}

const DrugBlankPreparationSection: React.FC<
  DrugBlankPreparationSectionProps
> = ({
  parameterId,
  isActive,
  isPreparationLocked,
  shouldDisableContent,
  canManagePrep,
  completedAt,
  preparations,
  files,
  isDialogOpen,
  editingId,
  onAddPreparation,
  onEditPreparation,
  onRemovePreparation,
  onAddFiles,
  onRemoveFile,
  onComplete,
  onUnlock,
  onCloseDialog,
  onSavePreparation,
}) => {
  const editingPreparation = editingId
    ? preparations.find((prep) => prep.id === editingId)
    : undefined;

  return (
    <>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 p-8 rounded-2xl border-2 border-emerald-200/50 bg-gradient-to-br from-emerald-50/40 via-white/60 to-emerald-50/40 backdrop-blur-sm shadow-sm hover:shadow-emerald-200/50 transition-all duration-500"
        >
          <div
            className={
              isPreparationLocked ? "pointer-events-none opacity-70" : ""
            }
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-tr-full -z-10" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                    <BiTestTube className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-emerald-900 tracking-tight">
                    Blank Preparation
                  </h2>
                  <p className="text-sm text-emerald-600/80 font-medium">
                    Custom Document Preparation
                  </p>
                </div>
              </div>

              <div className="px-4 py-1 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-full shadow-sm">
                <span className="text-xs font-bold text-emerald-800">
                  {preparations.length} Items
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full" />
                  Preparation Documents
                </h3>

                <button
                  onClick={() => onAddPreparation(parameterId)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm transform"
                >
                  <Plus className="w-4 h-4" />
                  Add Preparation
                </button>
              </div>

              <AnimatePresence>
                {preparations.map((blankPrep) => (
                  <div key={blankPrep.id}>
                    <BlankPreparationDetail
                      blankPreparation={blankPrep}
                      onEdit={(id) => onEditPreparation(parameterId, id)}
                      onRemove={(id) => onRemovePreparation(parameterId, id)}
                    />
                  </div>
                ))}
              </AnimatePresence>

              {preparations.length > 0 && (
                <div className="pointer-events-auto">
                  <WorksheetFileAttacher
                    files={files}
                    onAdd={onAddFiles}
                    onRemove={onRemoveFile}
                    preparationType="blank"
                    sectionLabel="Preparation Files"
                    isLocked={shouldDisableContent}
                  />
                </div>
              )}
            </div>

            {preparations.length > 0 &&
              (() => {
                const isGroupCompleted = !!completedAt;

                if (isPreparationLocked || isGroupCompleted) {
                  return (
                    <div className="mt-4 pointer-events-auto">
                      <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-emerald-800">
                            Blank Preparation Completed
                          </p>

                          {isGroupCompleted && completedAt && (
                            <p className="text-xs text-emerald-600">
                              Completed at{" "}
                              {new Date(completedAt).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {canManagePrep && (
                          <button
                            onClick={onUnlock}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-300 rounded-lg hover:bg-orange-100 transition-colors"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                              />
                            </svg>
                            Unlock Preparation
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                if (canManagePrep) {
                  return (
                    <div className="mt-4 pointer-events-auto">
                      <button
                        onClick={onComplete}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Mark Blank Preparation as Complete
                      </button>

                      <div className="flex items-center gap-3 px-5 py-3 mt-3 bg-amber-50 border-2 border-amber-200 rounded-xl">
                        <svg
                          className="w-5 h-5 text-amber-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <p className="text-sm text-amber-800">
                          <strong>Complete Preparation</strong> above once all
                          documents are finalized.
                        </p>
                      </div>
                    </div>
                  );
                }

                return null;
              })()}

            {preparations.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden text-center py-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl shadow-inner"
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative z-10">
                  <div className="inline-block p-5 bg-white rounded-full shadow-lg mb-4">
                    <Target className="w-14 h-14 text-emerald-400" />
                  </div>

                  <p className="text-lg font-bold text-emerald-800 mb-2">
                    No documents added yet
                  </p>

                  <p className="text-sm text-emerald-600/80 max-w-md mx-auto mb-4">
                    Click "Add Document" to create a blank preparation document
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 rounded-lg border border-emerald-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-xs font-semibold text-emerald-800">
                      Ready to start
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onCloseDialog();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="relative w-full h-full max-w-full max-h-full flex items-center justify-center p-4 sm:p-8"
            >
              <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-auto flex flex-col">
                <BlankPreparation
                  onClose={onCloseDialog}
                  onSave={(label, content) =>
                    onSavePreparation(parameterId, label, content)
                  }
                  existingContent={editingPreparation?.content || ""}
                  existingLabel={editingPreparation?.label || ""}
                  isEditing={editingId !== null}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DrugBlankPreparationSection;
