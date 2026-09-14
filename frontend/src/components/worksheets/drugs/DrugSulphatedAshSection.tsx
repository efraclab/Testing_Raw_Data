
import { motion, AnimatePresence } from "framer-motion";
import { BiTestTube } from "react-icons/bi";
import type { AttachedFile } from "../../../models/AttachedFile";
import type { SamplePreparationSulphatedAsh } from "../../../preparation_models/drugs/SamplePreparationSulphatedAsh";
import type { SamplePreparationSulphatedAshStep } from "../../../preparation_models/drugs/SamplePreparationSulphatedAshStep";
import type { CalculationSulphatedAsh } from "../../../preparation_models/drugs/CalculationSulphatedAsh";
import SamplePreparationSulphatedAshDetail from "../../sub-components/drugs/SamplePreparationSulphatedAshDetail";
import CalculationDetailSulphatedAsh from "../../sub-components/drugs/CalculationDetailSulphatedAsh";
import WorksheetFileAttacher from "../../shared/WorksheetFileAttacher";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugSulphatedAshSectionProps {
  parameterId: number;
  isActive: boolean;
  isPreparationLocked: boolean;
  shouldDisableContent: boolean;
  canManagePrep: boolean;
  isFullyLocked: boolean;
  role: string;
  completedAt?: string | null;
  samplePreparations: SamplePreparationSulphatedAsh[];
  calculations: CalculationSulphatedAsh[];

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

  handleAddSamplePreparationSulphatedAsh: (parameterId: number) => void;
  handleRemoveSamplePreparationSulphatedAsh: (
    parameterId: number,
    samplePreparationSulphatedAshId: number,
  ) => void;
  handleSamplePreparationSulphatedAshStepChange: (
    parameterId: number,
    samplePreparationSulphatedAshId: number,
    stepName: SamplePreparationSulphatedAshStep["name"],
    field:
      | "value1"
      | "value2"
      | "value3"
      | "unit1"
      | "unit2"
      | "unit3"
      | "logBookID",
    newValue: string,
  ) => void;

  handleAddCalculationSulphatedAsh: (parameterId: number) => void;
  handleRemoveCalculationSulphatedAsh: (
    parameterId: number,
    calculationId: number,
  ) => void;
  handleCalculationSulphatedAshFieldChange: (
    parameterId: number,
    calculationId: number,
    field: keyof CalculationSulphatedAsh,
    value: string | number | null,
  ) => void;

  onComplete: () => void;
  onUnlock: () => void;
}

const DrugSulphatedAshSection: React.FC<
  DrugSulphatedAshSectionProps
> = ({
  parameterId,
  isActive,
  isPreparationLocked,
  shouldDisableContent,
  canManagePrep,
  isFullyLocked,
  role,
  completedAt,
  samplePreparations,
  calculations,
  getFilesForPrep,
  handleAddPrepFiles,
  handleRemovePrepFile,
  handleAddSamplePreparationSulphatedAsh,
  handleRemoveSamplePreparationSulphatedAsh,
  handleSamplePreparationSulphatedAshStepChange,
  handleAddCalculationSulphatedAsh,
  handleRemoveCalculationSulphatedAsh,
  handleCalculationSulphatedAshFieldChange,
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
                                      <h2 className="text-xl font-bold text-emerald-900 tracking-tight">
                                        Sulphated Ash Analysis
                                      </h2>
                                      <p className="text-sm text-emerald-600/80 font-medium">
                                        Sulphated Ash - Sample & Calculations
                                      </p>
                                    </div>
                                  </div>

                                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-full shadow-sm">
                                    <span className="text-xs font-bold text-emerald-800">
                                      {(
                                        samplePreparations || []
                                      ).length +
                                        (
                                          calculations || []
                                        ).length}{" "}
                                      Items
                                    </span>
                                  </div>
                                </div>

                                {/* Sample Preparation for Sulphated Ash */}
                                <div className="mb-8">
                                  <div className="flex items-center justify-between mb-4 px-2">
                                    <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight">
                                      <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full"></span>
                                      Sample Preparations for Sulphated Ash
                                    </h3>
                                    <button
                                      onClick={() =>
                                        handleAddSamplePreparationSulphatedAsh(
                                          parameterId,
                                        )
                                      }
                                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg transform text-sm"
                                    >
                                      <Plus className="w-4 h-4" />
                                      Add Preparation
                                    </button>
                                  </div>

                                  <AnimatePresence>
                                    {(
                                      samplePreparations || []
                                    ).map((samplePreparationSulphatedAsh) => (
                                      <div key={samplePreparationSulphatedAsh.id}>
                                        <SamplePreparationSulphatedAshDetail
                                          samplePreparationSulphatedAsh={
                                            samplePreparationSulphatedAsh
                                          }
                                          onStepChange={(
                                            samplePreparationSulphatedAshId,
                                            stepName,
                                            field,
                                            newValue,
                                          ) =>
                                            handleSamplePreparationSulphatedAshStepChange(
                                              parameterId,
                                              samplePreparationSulphatedAshId,
                                              stepName,
                                              field,
                                              newValue,
                                            )
                                          }
                                          onRemove={() =>
                                            handleRemoveSamplePreparationSulphatedAsh(
                                              parameterId,
                                              samplePreparationSulphatedAsh.id,
                                            )
                                          }
                                          role={role}
                                        />
                                      </div>
                                    ))}
                                  </AnimatePresence>
                                </div>
                                {(
                                  samplePreparations || []
                                ).length > 0 && (
                                    <div className="pointer-events-auto">
                                      <WorksheetFileAttacher
                                        files={getFilesForPrep(
                                          parameterId,
                                          "sulphated_ash",
                                          "Preparation Files",
                                        )}
                                        onAdd={(newFiles) =>
                                          handleAddPrepFiles(
                                            parameterId,
                                            "sulphated_ash",
                                            "Preparation Files",
                                            newFiles,
                                          )
                                        }
                                        onRemove={(index) =>
                                          handleRemovePrepFile(
                                            parameterId,
                                            "sulphated_ash",
                                            "Preparation Files",
                                            index,
                                          )
                                        }
                                        preparationType="sulphated_ash"
                                        sectionLabel="Preparation Files"
                                        isLocked={shouldDisableContent}
                                      />
                                    </div>
                                  )}

                                {(
                                  samplePreparations || []
                                ).length === 0 && (
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
                                          No sample preparations added yet
                                        </p>
                                        <p className="text-sm text-emerald-600/80 max-w-md mx-auto mb-4">
                                          Click the add button to create Sulphated Ash
                                          sample preparation
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

                              {/* ── Sulphated Ash Complete Preparation Banner ── */}
                              {canManagePrep &&
                                (
                                  samplePreparations || []
                                ).length > 0 &&
                                (() => {
                                  // Prep complete/unlock shown when canManagePrep is true (role-aware + status-aware).
                                  const canManage = true;
                                  const isGroupCompleted =
                                    !!completedAt;
                                  return (
                                    <div className="mt-4 pointer-events-auto opacity-100">
                                      {isGroupCompleted ? (
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
                                              Sulphated Ash Preparation Completed
                                            </p>
                                            <p className="text-xs text-emerald-600">
                                              Completed at{" "}
                                              {new Date(
                                                completedAt,
                                              ).toLocaleString()}
                                            </p>
                                          </div>
                                          {canManage && (
                                            <button
                                              onClick={() =>
                                                handleInitiateUnlockGroupPrep(
                                                  selectedParam,
                                                  "sulphated_ash",
                                                )
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
                                      ) : canManage ? (
                                        <button
                                          onClick={() =>
                                            handleInitiateCompleteGroupPrep(
                                              selectedParam,
                                              "sulphated_ash",
                                            )
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
                                          Mark Sulphated Ash Preparation as Complete
                                        </button>
                                      ) : null}
                                    </div>
                                  );
                                })()}

                              {canManagePrep &&
                                (
                                  samplePreparations || []
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

                              {samplePreparations
                                ?.length > 0 &&
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

                                      {/* Calculations for Sulphated Ash */}
                                      <div className="relative p-6 rounded-xl border border-emerald-200/30 bg-white/50 backdrop-blur-sm shadow-lg">
                                        <div className="flex items-center justify-between mb-6 px-2">
                                          <h3 className="text-lg font-bold flex items-center gap-3 tracking-tight">
                                            <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-600 to-emerald-900 rounded-full"></span>
                                            <span className="text-emerald-900">
                                              Calculations for Sulphated Ash
                                            </span>
                                          </h3>
                                          <motion.button
                                            onClick={() =>
                                              handleAddCalculationSulphatedAsh(
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
                                            <CalculationDetailSulphatedAsh
                                              key={calculation.id}
                                              calculation={calculation}
                                              samplePreparations={
                                                samplePreparations || []
                                              }
                                              onFieldChange={(
                                                calculationId,
                                                field,
                                                value,
                                              ) =>
                                                handleCalculationSulphatedAshFieldChange(
                                                  parameterId,
                                                  calculationId,
                                                  field,
                                                  value,
                                                )
                                              }
                                              onRemove={() =>
                                                handleRemoveCalculationSulphatedAsh(
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
                                                  No Sulphated Ash calculations added
                                                  yet
                                                </p>
                                                <p className="text-xs text-emerald-600/80 max-w-sm mx-auto">
                                                  Click "Add Ash Calculation" to begin
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

export default DrugSulphatedAshSection;
