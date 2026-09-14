import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AttachedFile } from "../../../models/AttachedFile";
import WorksheetFileAttacher from "../../shared/WorksheetFileAttacher";

interface DrugParameterFilesSectionProps {
  parameterId: number;
  shouldDisableContent: boolean;

  showParamFiles: Record<number, boolean>;
  setShowParamFiles: React.Dispatch<React.SetStateAction<any>>;

  getParamLevelFiles: (parameterId: number) => AttachedFile[];
  updateFilesForSlot: (...args: any[]) => void;
  handleAddParamFiles: (parameterId: number, files: AttachedFile[]) => void;
  handleRemoveParamFile: (parameterId: number, index: number) => void;
}

const DrugParameterFilesSection: React.FC<
  DrugParameterFilesSectionProps
> = ({
  parameterId,
  shouldDisableContent,
  showParamFiles,
  setShowParamFiles,
  getParamLevelFiles,
  updateFilesForSlot,
  handleAddParamFiles,
  handleRemoveParamFile,
}) => {
  return (
    <>
                          {/* Parameter Files Toggle */}
                          <div className="mb-6 mt-4">
                            <label className="flex items-center gap-4 cursor-pointer group relative">
                              <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-all duration-300" />

                                <input
                                  type="checkbox"
                                  checked={
                                    showParamFiles[parameterId] || false
                                  }
                                  onChange={(e) => {
                                    setShowParamFiles((prev) => ({
                                      ...prev,
                                      [parameterId]: e.target.checked,
                                    }));
                                    if (!e.target.checked) {
                                      // Clear param-level files when toggled off
                                      updateFilesForSlot(
                                        parameterId,
                                        PARAM_LEVEL_KEY,
                                        () => [],
                                      );
                                    }
                                  }}
                                  className="peer sr-only"
                                />

                                <div className="relative w-14 h-7 rounded-full border-2 border-emerald-200 bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-emerald-700 peer-checked:to-emerald-900 peer-checked:border-emerald-600 transition-all duration-300 shadow-inner group-hover:border-emerald-300">
                                  <motion.div
                                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                                    animate={{
                                      x: showParamFiles[parameterId] ? 28 : 0,
                                    }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                  >
                                    {showParamFiles[parameterId] ? (
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
                                    Parameter Files
                                  </span>

                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`px-2 py-0.2 text-[10px] font-medium rounded-full transition-all duration-200 ${showParamFiles[parameterId]
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                      : "bg-gray-100 text-gray-500 border border-gray-200"
                                      }`}
                                  >
                                    {showParamFiles[parameterId]
                                      ? "Active"
                                      : "Inactive"}
                                  </motion.span>
                                </div>

                                <p className="text-xs text-emerald-600/70">
                                  Attach additional files for this parameter
                                </p>
                              </div>
                            </label>
                          </div>

                          {/* Parameter Files Section (Conditional) */}
                          <AnimatePresence>
                            {showParamFiles[parameterId] && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 0 }}
                                className="mb-6 p-6 bg-white rounded-xl border-2 border-emerald-200 shadow-lg"
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                                  <h3 className="text-lg font-bold text-emerald-800 tracking-tight">
                                    Parameter Files
                                  </h3>
                                </div>
                                <div className="pointer-events-auto">
                                  <WorksheetFileAttacher
                                    files={getParamLevelFiles(parameterId)}
                                    onAdd={(newFiles) =>
                                      handleAddParamFiles(
                                        parameterId,
                                        newFiles,
                                      )
                                    }
                                    onRemove={(index) =>
                                      handleRemoveParamFile(parameterId, index)
                                    }
                                    preparationType={null}
                                    sectionLabel="Other Files"
                                    isForPrep={false}
                                    isLocked={shouldDisableContent}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

    </>
  );
};

export default DrugParameterFilesSection;
