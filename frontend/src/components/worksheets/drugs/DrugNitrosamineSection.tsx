import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiTestTube } from "react-icons/bi";
import type { AttachedFile } from "../../../models/AttachedFile";
import type { WorksheetStandard } from "../../../models/WorksheetStandard";
import StandardPreparationNitrosamineDetail from "../../sub-components/drugs/StandardPreparationNitrosamineDetail";
import SamplePreparationNitrosamineDetail from "../../sub-components/drugs/SamplePreparationNitrosamineDetail";
import CalculationDetailAssayNitrosamine from "../../sub-components/drugs/CalculationDetailAssayNitrosamine";
import WorksheetFileAttacher from "../../shared/WorksheetFileAttacher";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugNitrosamineSectionProps {
  parameterId: number;
  isActive: boolean;
  isPreparationLocked: boolean;
  shouldDisableContent: boolean;
  canManagePrep: boolean;
  isFullyLocked: boolean;
  role: string;
  completedAt?: string | null;

  standardPreparations: any[];
  samplePreparations: any[];
  calculations: any[];
  assignedStandards: WorksheetStandard[];

  getFilesForPrep: (...args: any[]) => AttachedFile[];
  handleAddPrepFiles: (...args: any[]) => void;
  handleRemovePrepFile: (...args: any[]) => void;

  handleAddStandardPreparationNitrosamine: (parameterId: number) => void;
  handleRemoveStandardPreparationNitrosamine: (...args: any[]) => void;
  handleStandardPreparationNitrosamineStepChange: (...args: any[]) => void;
  handleStandardPreparationNitrosamineFieldChange: (...args: any[]) => void;
  handleAddStandardDilutionStage: (...args: any[]) => void;
  handleRemoveStandardDilutionStage: (...args: any[]) => void;

  handleRemoveSamplePreparationNitrosamine: (...args: any[]) => void;
  handleSamplePreparationNitrosamineStepChange: (...args: any[]) => void;
  handleSamplePreparationNitrosamineFieldChange: (...args: any[]) => void;
  handleAddSampleDilutionStage: (...args: any[]) => void;
  handleRemoveSampleDilutionStage: (...args: any[]) => void;

  handleAddCalculationAssayNitrosamine: (parameterId: number) => void;
  handleRemoveCalculationAssayNitrosamine: (...args: any[]) => void;
  handleCalculationAssayNitrosamineFieldChange: (...args: any[]) => void;

  onComplete: () => void;
  onUnlock: () => void;
}

const DrugNitrosamineSection: React.FC<DrugNitrosamineSectionProps> = ({
  parameterId,
  isActive,
  isPreparationLocked,
  shouldDisableContent,
  canManagePrep,
  isFullyLocked,
  role,
  completedAt,
  standardPreparations,
  samplePreparations,
  calculations,
  assignedStandards,
  getFilesForPrep,
  handleAddPrepFiles,
  handleRemovePrepFile,
  handleAddStandardPreparationNitrosamine,
  handleRemoveStandardPreparationNitrosamine,
  handleStandardPreparationNitrosamineStepChange,
  handleStandardPreparationNitrosamineFieldChange,
  handleAddStandardDilutionStage,
  handleRemoveStandardDilutionStage,
  handleRemoveSamplePreparationNitrosamine,
  handleSamplePreparationNitrosamineStepChange,
  handleSamplePreparationNitrosamineFieldChange,
  handleAddSampleDilutionStage,
  handleRemoveSampleDilutionStage,
  handleAddCalculationAssayNitrosamine,
  handleRemoveCalculationAssayNitrosamine,
  handleCalculationAssayNitrosamineFieldChange,
  onComplete,
  onUnlock,
}) => {
  return (
    <>
      {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="relative mb-10 p-8 rounded-2xl border-2 border-teal-200/50 bg-gradient-to-br from-teal-50/40 via-white/60 to-teal-50/40 backdrop-blur-sm shadow-sm hover:shadow-teal-200/50 transition-all duration-500"
                            >
                              <div
                                className={
                                  isPreparationLocked
                                    ? "pointer-events-none opacity-70"
                                    : ""
                                }
                              >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-400/10 to-transparent rounded-bl-full -z-10" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/10 to-transparent rounded-tr-full -z-10" />

                                <div className="flex items-center justify-between mb-8">
                                  <div className="flex items-center gap-4">
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full" />
                                      <div className="relative w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                                        <BiTestTube className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                    <div>
                                      <h2 className="text-xl font-bold text-teal-900 tracking-tight">
                                        N-Nitrosamine Impurities
                                      </h2>
                                      <p className="text-sm text-teal-600/80 font-medium">
                                        Standard, Sample & Calculations
                                      </p>
                                    </div>
                                  </div>

                                  <div className="px-4 py-1 bg-gradient-to-r from-teal-50 to-teal-50 border border-teal-200 rounded-full shadow-sm">
                                    <span className="text-xs font-bold text-teal-800">
                                      {(
                                        standardPreparations
                                      ).length +
                                        (
                                          samplePreparations
                                        ).length +
                                        (
                                          calculations
                                        ).length}{" "}
                                      Items
                                    </span>
                                  </div>
                                </div>

                                <div className="mb-8">
                                  <div className="flex items-center justify-between mb-4 px-2">
                                    <h3 className="text-lg font-bold text-teal-800 flex items-center gap-2.5 tracking-tight">
                                      <span className="w-1.5 h-6 bg-gradient-to-b from-teal-700 to-teal-900 rounded-full"></span>
                                      Standard & Sample Preparations for N-Nitrosamine Impurities
                                    </h3>
                                    <button
                                      onClick={() =>
                                        handleAddStandardPreparationNitrosamine(
                                          parameterId,
                                        )
                                      }
                                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-900 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm transform"
                                    >
                                      <Plus className="w-4 h-4" />
                                      Add Preparation
                                    </button>
                                  </div>

                                  <AnimatePresence>
                                    {(
                                      standardPreparations
                                    ).map((standardPreparation, idx: number) => {
                                      const prepAny = standardPreparation as any;
                                      const idsToMatch: string[] =
                                        Array.isArray(prepAny.assignedStandardIds) &&
                                          prepAny.assignedStandardIds.length > 0
                                          ? prepAny.assignedStandardIds
                                          : [prepAny.assignedStandardId].filter(Boolean);
                                      const matchedAssignedStandards = (assignedStandards || []).filter(
                                         (std) => idsToMatch.includes(std.serialNo),
                                       );

                                      const correspondingSample =
                                        (samplePreparations)[idx];

                                      return (
                                        <div
                                          key={standardPreparation.id}
                                          className="mb-6"
                                        >
                                          <StandardPreparationNitrosamineDetail
                                            standardPreparation={standardPreparation}
                                            assignedStandards={matchedAssignedStandards}
                                            onFieldChange={(
                                              standardPreparationId,
                                              field,
                                              newValue,
                                            ) =>
                                              handleStandardPreparationNitrosamineFieldChange(
                                                parameterId,
                                                standardPreparationId,
                                                field,
                                                newValue,
                                              )
                                            }
                                            onStepChange={(
                                              standardPreparationId,
                                              stepName,
                                              field,
                                              newValue,
                                            ) =>
                                              handleStandardPreparationNitrosamineStepChange(
                                                parameterId,
                                                standardPreparationId,
                                                stepName,
                                                field,
                                                newValue,
                                              )
                                            }
                                            onAddStage={(standardPreparationId) =>
                                              handleAddStandardDilutionStage(
                                                parameterId,
                                                standardPreparationId,
                                              )
                                            }
                                            onRemoveStage={(
                                              standardPreparationId,
                                              stepName,
                                            ) =>
                                              handleRemoveStandardDilutionStage(
                                                parameterId,
                                                standardPreparationId,
                                                stepName,
                                              )
                                            }
                                            onRemove={() =>
                                              handleRemoveStandardPreparationNitrosamine(
                                                parameterId,
                                                standardPreparation.id,
                                              )
                                            }
                                            role={role}
                                          />

                                          {correspondingSample && (
                                            <div className="mt-4">
                                              <SamplePreparationNitrosamineDetail
                                                samplePreparation={correspondingSample}
                                                assignedStandards={matchedAssignedStandards}
                                                onFieldChange={(
                                                  samplePreparationId,
                                                  field,
                                                  newValue,
                                                ) =>
                                                  handleSamplePreparationNitrosamineFieldChange(
                                                    parameterId,
                                                    samplePreparationId,
                                                    field,
                                                    newValue,
                                                  )
                                                }
                                                onStepChange={(
                                                  samplePreparationId,
                                                  stepName,
                                                  field,
                                                  newValue,
                                                ) =>
                                                  handleSamplePreparationNitrosamineStepChange(
                                                    parameterId,
                                                    samplePreparationId,
                                                    stepName,
                                                    field,
                                                    newValue,
                                                  )
                                                }
                                                onAddStage={(samplePreparationId) =>
                                                  handleAddSampleDilutionStage(
                                                    parameterId,
                                                    samplePreparationId,
                                                  )
                                                }
                                                onRemoveStage={(
                                                  samplePreparationId,
                                                  stepName,
                                                ) =>
                                                  handleRemoveSampleDilutionStage(
                                                    parameterId,
                                                    samplePreparationId,
                                                    stepName,
                                                  )
                                                }
                                                onRemove={() =>
                                                  handleRemoveSamplePreparationNitrosamine(
                                                    parameterId,
                                                    correspondingSample.id,
                                                  )
                                                }
                                                role={role}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </AnimatePresence>
                                </div>
                                {(
                                  standardPreparations
                                ).length > 0 && (
                                    <div className="pointer-events-auto">
                                      <WorksheetFileAttacher
                                        files={getFilesForPrep(
                                          parameterId,
                                          "nitrosamine",
                                          "Preparation Files",
                                        )}
                                        onAdd={(newFiles) =>
                                          handleAddPrepFiles(
                                            parameterId,
                                            "nitrosamine",
                                            "Preparation Files",
                                            newFiles,
                                          )
                                        }
                                        onRemove={(index) =>
                                          handleRemovePrepFile(
                                            parameterId,
                                            "nitrosamine",
                                            "Preparation Files",
                                            index,
                                          )
                                        }
                                        preparationType="nitrosamine"
                                        sectionLabel="Preparation Files"
                                        isLocked={shouldDisableContent}
                                      />
                                    </div>
                                  )}

                                {(
                                  standardPreparations
                                ).length === 0 && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="relative overflow-hidden text-center py-16 bg-gradient-to-br from-teal-50 via-white to-teal-50 border-2 border-dashed border-teal-300 rounded-2xl shadow-inner"
                                    >
                                      <div className="relative z-10">
                                        <div className="inline-block p-5 bg-white rounded-full shadow-lg mb-4">
                                          <Target className="w-14 h-14 text-teal-400" />
                                        </div>
                                        <p className="text-lg font-bold text-teal-800 mb-2">
                                          No preparations added yet
                                        </p>
                                        <p className="text-sm text-teal-600/80 max-w-md mx-auto mb-4">
                                          Click "Add Preparation" to create your first
                                          Standard and Sample preparation for
                                          Nitrosamine
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                              </div>

                              {/* ── Nitrosamine Complete Preparation Banner ── */}
                              {canManagePrep &&
                                (
                                  standardPreparations
                                ).length > 0 &&
                                (() => {
                                  const isGroupCompleted =
                                    !!completedAt;
                                  return (
                                    <div className="mt-4 pointer-events-auto opacity-100">
                                      {isGroupCompleted ? (
                                        <div className="flex items-center gap-3 px-5 py-3 bg-teal-50 border border-teal-200 rounded-xl">
                                          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
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
                                            <p className="text-sm font-semibold text-teal-800">
                                              N-Nitrosamine Preparation Completed
                                            </p>
                                            <p className="text-xs text-teal-600">
                                              Completed at{" "}
                                              {new Date(
                                                completedAt,
                                              ).toLocaleString()}
                                            </p>
                                          </div>
                                          <button
                                            onClick={() =>
                                              onUnlock()
                                            }
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
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            onComplete()
                                          }
                                          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
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
                                          Mark N-Nitrosamine Preparation as Complete
                                        </button>
                                      )}
                                    </div>
                                  );
                                })()}

                              {(
                                standardPreparations
                              ).length > 0 &&
                                !completedAt && (
                                  <div className="flex items-center gap-3 px-5 py-3 mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
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
                                      <strong>Complete Preparation</strong> above to
                                      unlock the Calculations section.
                                    </p>
                                  </div>
                                )}

                              {standardPreparations?.length > 0 &&
                                completedAt && (
                                  <div
                                    className={
                                      isFullyLocked
                                        ? "pointer-events-none opacity-70"
                                        : ""
                                    }
                                  >
                                    <>
                                      <div className="flex items-center gap-4 my-8">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
                                        <div className="px-4 py-2 bg-gradient-to-r from-teal-100 to-teal-100 rounded-lg border border-teal-300/50 shadow-sm">
                                          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                                            Calculations
                                          </span>
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
                                      </div>

                                      <div className="relative p-6 rounded-xl border border-teal-200/30 bg-white/50 backdrop-blur-sm shadow-lg">
                                        <div className="flex items-center justify-between mb-6 px-2">
                                          <h3 className="text-lg font-bold flex items-center gap-3 tracking-tight">
                                            <span className="w-1.5 h-6 bg-gradient-to-b from-teal-600 to-teal-900 rounded-full"></span>
                                            <span className="text-teal-900">
                                              Calculations for N-Nitrosamine Impurities
                                            </span>
                                          </h3>
                                          <motion.button
                                            onClick={() =>
                                              handleAddCalculationAssayNitrosamine(
                                                parameterId,
                                              )
                                            }
                                            whileHover={{ scale: 1 }}
                                            whileTap={{ scale: 1 }}
                                            className="flex items-center gap-1.5 p-2.5 bg-gradient-to-r from-teal-900 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl text-xs"
                                          >
                                            <Plus className="w-4 h-4" />
                                            Add Calculation
                                          </motion.button>
                                        </div>
                                        <AnimatePresence>
                                          {(
                                            calculations
                                          ).map((calculation) => (
                                            <CalculationDetailAssayNitrosamine
                                              key={calculation.id}
                                              calculation={calculation}
                                              standardPreparations={
                                                standardPreparations
                                              }
                                              samplePreparations={
                                                samplePreparations
                                              }
                                              onFieldChange={(
                                                calculationId,
                                                field,
                                                value,
                                              ) =>
                                                handleCalculationAssayNitrosamineFieldChange(
                                                  parameterId,
                                                  calculationId,
                                                  field,
                                                  value,
                                                )
                                              }
                                              onRemove={() =>
                                                handleRemoveCalculationAssayNitrosamine(
                                                  parameterId,
                                                  calculation.id,
                                                )
                                              }
                                              role={role}
                                            />
                                          ))}
                                        </AnimatePresence>
                                        {(
                                          calculations
                                        ).length === 0 && (
                                            <motion.div
                                              initial={{ opacity: 0, scale: 0.95 }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              className="relative overflow-hidden text-center py-12 bg-gradient-to-br from-teal-50 via-white to-teal-50 border-2 border-dashed border-teal-300 rounded-xl shadow-inner"
                                            >
                                              <div className="relative z-10">
                                                <div className="inline-block p-4 bg-white rounded-full shadow-md mb-3">
                                                  <Target className="w-10 h-10 text-teal-400" />
                                                </div>
                                                <p className="font-semibold text-base text-teal-800 mb-1">
                                                  No N-Nitrosamine calculations added
                                                  yet
                                                </p>
                                                <p className="text-xs text-teal-600/80 max-w-sm mx-auto">
                                                  Click "Add Calculation" to begin
                                                </p>
                                              </div>
                                            </motion.div>
                                          )}
                                      </div>
                                    </>
                                  </div>
                                )}
                            </motion.div>
                          )}


    </>
  );
};

export default DrugNitrosamineSection;
