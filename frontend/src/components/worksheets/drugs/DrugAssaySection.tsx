import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiTestTube } from "react-icons/bi";
import type { AttachedFile } from "../../../models/AttachedFile";
import type { WorksheetStandard } from "../../../models/WorksheetStandard";
import type { ParameterDetail } from "../../../models/ParameterDetail";
import type { StandardPreparation } from "../../../preparation_models/drugs/StandardPreparation";
import type { StandardPreparationStep } from "../../../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparation } from "../../../preparation_models/drugs/SamplePreparation";
import type { SamplePreparationStep } from "../../../preparation_models/drugs/SamplePreparationStep";
import type { CalculationAssay } from "../../../preparation_models/drugs/CalculationAssay";
import StandardPreparationDetail from "../../sub-components/drugs/StandardPreparationDetail";
import SamplePreparationDetail from "../../sub-components/drugs/SamplePreparationDetail";
import CalculationDetailAssay from "../../sub-components/drugs/CalculationDetailAssay";
import WorksheetFileAttacher from "../../shared/WorksheetFileAttacher";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugAssaySectionProps {
  parameterId: number;
  isActive: boolean;
  isPreparationLocked: boolean;
  shouldDisableContent: boolean;
  canManagePrep: boolean;
  isFullyLocked: boolean;
  role: string;
  completedAt?: string | null;
  standardPreparations: StandardPreparation[];
  samplePreparations: SamplePreparation[];
  calculations: CalculationAssay[];
  assignedStandards: WorksheetStandard[];

  getFilesForPrep: (
    parameterId: number,
    preparationType: string,
    sectionLabel: string,
  ) => AttachedFile[];
  handleAddPrepFiles: (
    parameterId: number,
    preparationType: string,
    sectionLabel: string,
    newFiles: AttachedFile[],
  ) => void;
  handleRemovePrepFile: (
    parameterId: number,
    preparationType: string,
    sectionLabel: string,
    index: number,
  ) => void;

  handleAddStandardPreparation: (parameterId: number) => void;
  handleRemoveStandardPreparation: (
    parameterId: number,
    standardPreparationId: number,
  ) => void;
  handleStandardPreparationStepChange: (
    parameterId: number,
    standardPreparationId: number,
    stepName: StandardPreparationStep["name"],
    field:
      | "value"
      | "unit"
      | "value1"
      | "value2"
      | "unit1"
      | "unit2"
      | "logBookID"
      | "solventChemical",
    newValue: string,
  ) => void;

  handleAddSamplePreparation: (parameterId: number) => void;
  handleRemoveSamplePreparation: (
    parameterId: number,
    samplePreparationId: number,
  ) => void;
  handleSamplePreparationStepChange: (
    parameterId: number,
    samplePreparationId: number,
    stepName: SamplePreparationStep["name"],
    field:
      | "value1"
      | "value2"
      | "unit1"
      | "unit2"
      | "logBookID"
      | "solventChemical",
    newValue: string,
  ) => void;

  handleAddCalculationAssay: (parameterId: number) => void;
  handleRemoveCalculationAssay: (
    parameterId: number,
    calculationId: number,
  ) => void;
  handleCalculationAssayFieldChange: (
    parameterId: number,
    calculationId: number,
    field: keyof CalculationAssay,
    value: string | number | null,
  ) => void;

  onComplete: () => void;
  onUnlock: () => void;
}

const DrugAssaySection: React.FC<DrugAssaySectionProps> = ({
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
  handleAddStandardPreparation,
  handleRemoveStandardPreparation,
  handleStandardPreparationStepChange,
  handleAddSamplePreparation,
  handleRemoveSamplePreparation,
  handleSamplePreparationStepChange,
  handleAddCalculationAssay,
  handleRemoveCalculationAssay,
  handleCalculationAssayFieldChange,
  onComplete,
  onUnlock,
}) => {
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
                                  isPreparationLocked
                                    ? "pointer-events-none opacity-70"
                                    : ""
                                }
                              >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full -z-10" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-tr-full -z-10" />

                                {/* Card Header */}
                                <div className="flex items-center justify-between mb-8">
                                  <div className="flex items-center gap-4">
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                                      <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                                        <BiTestTube className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                    <div>
                                      <h2 className="text-xl font-bold text-emerald-800 tracking-tight">
                                        Assay Analysis
                                      </h2>
                                      <p className="text-sm text-emerald-600/80 font-medium">
                                        Standard, Sample & Calculations
                                      </p>
                                    </div>
                                  </div>

                                  <div className="px-4 py-1 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-full shadow-sm">
                                    <span className="text-xs font-bold text-emerald-800">
                                      {(
                                        standardPreparations || []
                                      ).length +
                                        (
                                          samplePreparations || []
                                        ).length +
                                        (
                                          calculations || []
                                        ).length}{" "}
                                      Items
                                    </span>
                                  </div>
                                </div>

                                {/* Standard & Sample Preparations Section */}
                                <div className="mb-8">
                                  {/* Standard Preparations Sub-section */}
                                  <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4 px-2">
                                      <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight">
                                        <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full"></span>
                                        Standard Preparations
                                      </h3>
                                      <button
                                        onClick={() =>
                                          handleAddStandardPreparation(parameterId)
                                        }
                                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                                      >
                                        <Plus className="w-4 h-4" />
                                        Add Standard Preparation
                                      </button>
                                    </div>

                                    <AnimatePresence>
                                      {(
                                        standardPreparations
                                      ).map((standardPreparation: any) => {
                                        const assignedStandard = (
                                          assignedStandards
                                        ).find(
                                          (std) =>
                                            std.serialNo === standardPreparation.assignedStandardId,
                                        );
                                        return (
                                          <div key={standardPreparation.id} className="mb-6">
                                            <StandardPreparationDetail
                                              standardPreparation={standardPreparation}
                                              assignedStandard={assignedStandard || null}
                                              onStepChange={(
                                                standardPreparationId,
                                                stepName,
                                                field,
                                                newValue,
                                              ) =>
                                                handleStandardPreparationStepChange(
                                                  parameterId,
                                                  standardPreparationId,
                                                  stepName,
                                                  field,
                                                  newValue,
                                                )
                                              }
                                              onRemove={() =>
                                                handleRemoveStandardPreparation(
                                                  parameterId,
                                                  standardPreparation.id,
                                                )
                                              }
                                              role={role}
                                            />
                                          </div>
                                        );
                                      })}
                                    </AnimatePresence>

                                    {(standardPreparations).length === 0 && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative overflow-hidden text-center py-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl shadow-inner"
                                      >
                                        <div className="relative z-10">
                                          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-3">
                                            <Target className="w-10 h-10 text-emerald-400" />
                                          </div>
                                          <p className="text-base font-bold text-emerald-800 mb-1">
                                            No standard preparations added yet
                                          </p>
                                          <p className="text-sm text-emerald-600/80 max-w-md mx-auto">
                                            Click "Add Standard Preparation" to get started
                                          </p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>

                                  {/* Sample Preparations Sub-section */}
                                  <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4 px-2">
                                      <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight">
                                        <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full"></span>
                                        Sample Preparations
                                      </h3>
                                      <button
                                        onClick={() =>
                                          handleAddSamplePreparation(parameterId)
                                        }
                                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                                      >
                                        <Plus className="w-4 h-4" />
                                        Add Sample Preparation
                                      </button>
                                    </div>

                                    <AnimatePresence>
                                      {(
                                        samplePreparations
                                      ).map((samplePreparation: any) => {
                                        const assignedStandard = (
                                          assignedStandards
                                        ).find(
                                          (std) =>
                                            std.serialNo === samplePreparation.assignedStandardId,
                                        );
                                        return (
                                          <div key={samplePreparation.id} className="mb-6">
                                            <SamplePreparationDetail
                                              samplePreparation={samplePreparation}
                                              assignedStandard={assignedStandard || null}
                                              onStepChange={(
                                                samplePreparationId,
                                                stepName,
                                                field,
                                                newValue,
                                              ) =>
                                                handleSamplePreparationStepChange(
                                                  parameterId,
                                                  samplePreparationId,
                                                  stepName,
                                                  field,
                                                  newValue,
                                                )
                                              }
                                              onRemove={() =>
                                                handleRemoveSamplePreparation(
                                                  parameterId,
                                                  samplePreparation.id,
                                                )
                                              }
                                              role={role}
                                            />
                                          </div>
                                        );
                                      })}
                                    </AnimatePresence>

                                    {(samplePreparations).length === 0 && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative overflow-hidden text-center py-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl shadow-inner"
                                      >
                                        <div className="relative z-10">
                                          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-3">
                                            <Target className="w-10 h-10 text-emerald-400" />
                                          </div>
                                          <p className="text-base font-bold text-emerald-800 mb-1">
                                            No sample preparations added yet
                                          </p>
                                          <p className="text-sm text-emerald-600/80 max-w-md mx-auto">
                                            Click "Add Sample Preparation" to get started
                                          </p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>

                                  {(
                                    standardPreparations
                                  ).length > 0 && (
                                      <div className="pointer-events-auto">
                                        <WorksheetFileAttacher
                                          files={getFilesForPrep(
                                            parameterId,
                                            "assay",
                                            "Preparation Files",
                                          )}
                                          onAdd={(newFiles) =>
                                            handleAddPrepFiles(
                                              parameterId,
                                              "assay",
                                              "Preparation Files",
                                              newFiles,
                                            )
                                          }
                                          onRemove={(index) =>
                                            handleRemovePrepFile(
                                              parameterId,
                                              "assay",
                                              "Preparation Files",
                                              index,
                                            )
                                          }
                                          preparationType="assay"
                                          sectionLabel="Preparation Files"
                                          isLocked={shouldDisableContent}
                                        />
                                      </div>
                                    )}
                                </div>
                              </div>

                              {/* ── Complete Preparation Banner / Button ── */}
                              {canManagePrep &&
                                (() => {
                                  // Prep complete/unlock shown when canManagePrep is true (role-aware + status-aware).
                                  const hasPrepData =
                                    (standardPreparations).length > 0 ||
                                    (samplePreparations).length > 0;
                                  const isPrepCompleted = !!completedAt;

                                  if (!hasPrepData) return null;

                                  return (
                                    <div className="mt-5 pointer-events-auto opacity-100">
                                      {isPrepCompleted ? (
                                        /* ── Completed Banner ── */
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
                                              Preparation Completed
                                            </p>
                                            <p className="text-xs text-emerald-600">
                                              Completed at{" "}
                                              {completedAt
                                                ? new Date(completedAt).toLocaleString()
                                                : ""}
                                            </p>
                                          </div>
                                          {true && (
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
                                          )}
                                        </div>
                                      ) : true ? (
                                        /* ── Complete button (only when allowed) ── */
                                        <button
                                          onClick={() =>
                                            onComplete()
                                          }
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
                                          Mark Assay Preparation as Complete
                                        </button>
                                      ) : null}
                                    </div>
                                  );
                                })()}

                              {standardPreparations
                                ?.length > 0 &&
                                samplePreparations?.length >
                                0 &&
                                !completedAt &&
                                !canManagePrep && (
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

                              {standardPreparations
                                ?.length > 0 &&
                                samplePreparations?.length >
                                0 &&
                                completedAt && (
                                  <div
                                    className={
                                      isFullyLocked
                                        ? "pointer-events-none opacity-70"
                                        : ""
                                    }
                                  >
                                    <>
                                      {/* Visual Separator */}
                                      <div className="flex items-center gap-4 my-8">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                                        <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-100 rounded-lg border border-emerald-300/50 shadow-sm">
                                          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            Calculations
                                          </span>
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                                      </div>

                                      {/* Calculations Section */}
                                      <div className="relative p-6 rounded-xl border border-emerald-200/30 bg-white/50 backdrop-blur-sm shadow-lg">
                                        <div className="flex items-center justify-between mb-6 px-2">
                                          <h3 className="text-lg font-bold flex items-center gap-3 tracking-tight">
                                            <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-600 to-emerald-900 rounded-full"></span>
                                            <span className="text-emerald-900">
                                              Calculations for Assay
                                            </span>
                                          </h3>
                                          <motion.button
                                            onClick={() =>
                                              handleAddCalculationAssay(
                                                parameterId,
                                              )
                                            }
                                            whileHover={{ scale: 1 }}
                                            whileTap={{ scale: 1 }}
                                            className="flex items-center gap-1.5 p-2.5 bg-gradient-to-r from-emerald-600 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl text-xs"
                                          >
                                            <Plus className="w-4 h-4" />
                                            Add Calculation
                                          </motion.button>
                                        </div>

                                        <AnimatePresence>
                                          {(
                                            calculations || []
                                          ).map((calculation) => (
                                            <CalculationDetailAssay
                                              key={calculation.id}
                                              calculation={calculation}
                                              standardPreparations={
                                                standardPreparations || []
                                              }
                                              samplePreparations={
                                                samplePreparations || []
                                              }
                                              onFieldChange={(
                                                calculationId,
                                                field,
                                                value,
                                              ) =>
                                                handleCalculationAssayFieldChange(
                                                  parameterId,
                                                  calculationId,
                                                  field,
                                                  value,
                                                )
                                              }
                                              onRemove={() =>
                                                handleRemoveCalculationAssay(
                                                  parameterId,
                                                  calculation.id,
                                                )
                                              }
                                              role={role}
                                            />
                                          ))}
                                        </AnimatePresence>

                                        {(
                                          calculations || []
                                        ).length === 0 && (
                                            <motion.div
                                              initial={{ opacity: 0, scale: 0.95 }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              className="relative overflow-hidden text-center py-12 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl shadow-inner"
                                            >
                                              <div className="absolute inset-0 opacity-5">
                                                <div className="absolute top-0 left-1/4 w-48 h-48 bg-emerald-500 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
                                              </div>

                                              <div className="relative z-10">
                                                <div className="inline-block p-4 bg-white rounded-full shadow-md mb-3">
                                                  <Target className="w-10 h-10 text-emerald-400" />
                                                </div>
                                                <p className="font-semibold text-base text-emerald-800 mb-1">
                                                  No calculations added yet
                                                </p>
                                                <p className="text-xs text-emerald-600/80 max-w-sm mx-auto">
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

export default DrugAssaySection;
