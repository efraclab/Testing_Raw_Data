import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SystemSuitabilityDetail from "../../sub-components/drugs/SystemSuitabilityDetail";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugSystemSuitabilitySectionProps {
  parameterId: number;
  showSystemSuitability: Record<number, boolean>;
  setShowSystemSuitability: React.Dispatch<React.SetStateAction<any>>;
  systemSuitabilityPerParam: Record<number, any[]>;
  setSystemSuitabilityPerParam: React.Dispatch<React.SetStateAction<any>>;
  createNewSystemSuitability: (...args: any[]) => any;
}

const DrugSystemSuitabilitySection: React.FC<
  DrugSystemSuitabilitySectionProps
> = ({
  parameterId,
  showSystemSuitability,
  setShowSystemSuitability,
  systemSuitabilityPerParam,
  setSystemSuitabilityPerParam,
  createNewSystemSuitability,
}) => {
  return (
    <>
                          {/* System Suitability Toggle */}
                          <div className="mb-6">
                            <label className="flex items-center gap-4 cursor-pointer group relative">
                              <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-all duration-300" />

                                <input
                                  type="checkbox"
                                  checked={
                                    showSystemSuitability[parameterId] || false
                                  }
                                  onChange={(e) => {
                                    setShowSystemSuitability((prev) => ({
                                      ...prev,
                                      [parameterId]: e.target.checked,
                                    }));
                                    if (
                                      e.target.checked &&
                                      (!systemSuitabilityPerParam[
                                        parameterId
                                      ] ||
                                        systemSuitabilityPerParam[parameterId]
                                          .length === 0)
                                    ) {
                                      // Initialize with one system suitability
                                      setSystemSuitabilityPerParam((prev) => ({
                                        ...prev,
                                        [parameterId]: [
                                          createNewSystemSuitability(0),
                                        ],
                                      }));
                                    } else if (!e.target.checked) {
                                      // Clear system suitability data
                                      setSystemSuitabilityPerParam((prev) => {
                                        const { [parameterId]: _, ...rest } =
                                          prev;
                                        return rest;
                                      });
                                    }
                                  }}
                                  className="peer sr-only"
                                />

                                <div className="relative w-14 h-7 rounded-full border-2 border-emerald-200 bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-emerald-700 peer-checked:to-emerald-900 peer-checked:border-emerald-600 transition-all duration-300 shadow-inner group-hover:border-emerald-300">
                                  <motion.div
                                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                                    animate={{
                                      x: showSystemSuitability[parameterId]
                                        ? 28
                                        : 0,
                                    }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                  >
                                    {/* Icon inside thumb */}
                                    {showSystemSuitability[parameterId] ? (
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
                                    System Suitabilities
                                  </span>

                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`px-2 py-0.2 text-[10px] font-medium rounded-full transition-all duration-200 ${showSystemSuitability[parameterId]
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                      : "bg-gray-100 text-gray-500 border border-gray-200"
                                      }`}
                                  >
                                    {showSystemSuitability[parameterId]
                                      ? "Active"
                                      : "Inactive"}
                                  </motion.span>
                                </div>

                                <p className="text-xs text-emerald-600/70">
                                  Toggle system suitability section
                                </p>
                              </div>
                            </label>
                          </div>

                          {/* System Suitability Section (Conditional) */}
                          <AnimatePresence>
                            {showSystemSuitability[parameterId] && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 0 }}
                                className="mb-6 p-6 bg-white rounded-xl border-2 border-emerald-200 shadow-lg"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight">
                                    <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                                    System Suitability
                                  </h3>
                                  <button
                                    onClick={() => {
                                      const current =
                                        systemSuitabilityPerParam[
                                        parameterId
                                        ] || [];
                                      const newIndex = current.length;
                                      setSystemSuitabilityPerParam((prev) => ({
                                        ...prev,
                                        [parameterId]: [
                                          ...current,
                                          createNewSystemSuitability(newIndex),
                                        ],
                                      }));
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm transform"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add System Suitability
                                  </button>
                                </div>

                                <AnimatePresence>
                                  {(
                                    systemSuitabilityPerParam[parameterId] ||
                                    []
                                  ).map((systemSuitability) => (
                                    <SystemSuitabilityDetail
                                      key={systemSuitability.id}
                                      systemSuitability={systemSuitability}
                                      onStepChange={(
                                        systemSuitabilityId,
                                        stepName,
                                        field,
                                        newValue,
                                      ) => {
                                        setSystemSuitabilityPerParam((prev) => ({
                                          ...prev,
                                          [parameterId]: (
                                            prev[parameterId] || []
                                          ).map((ss) => {
                                            if (ss.id === systemSuitabilityId) {
                                              return {
                                                ...ss,
                                                steps: ss.steps.map((step) => {
                                                  if (step.name === stepName) {
                                                    return {
                                                      ...step,
                                                      [field]: newValue,
                                                    };
                                                  }
                                                  return step;
                                                }),
                                              };
                                            }
                                            return ss;
                                          }),
                                        }));
                                      }}
                                      onAddStep={(
                                        systemSuitabilityId,
                                        stepName,
                                        limitType,
                                      ) => {
                                        setSystemSuitabilityPerParam((prev) => ({
                                          ...prev,
                                          [parameterId]: (
                                            prev[parameterId] || []
                                          ).map((ss) => {
                                            if (ss.id === systemSuitabilityId) {
                                              // Check if step already exists
                                              const stepExists = ss.steps.some(
                                                (step) => step.name === stepName,
                                              );
                                              if (stepExists) {
                                                return ss;
                                              }
                                              return {
                                                ...ss,
                                                steps: [
                                                  ...ss.steps,
                                                  {
                                                    name: stepName,
                                                    limitType,
                                                    value1: "",
                                                    value2: "",
                                                    value3: "",
                                                    value4: "",
                                                  },
                                                ],
                                              };
                                            }
                                            return ss;
                                          }),
                                        }));
                                      }}
                                      onRemoveStep={(
                                        systemSuitabilityId,
                                        stepName,
                                      ) => {
                                        setSystemSuitabilityPerParam((prev) => ({
                                          ...prev,
                                          [parameterId]: (
                                            prev[parameterId] || []
                                          ).map((ss) => {
                                            if (ss.id === systemSuitabilityId) {
                                              return {
                                                ...ss,
                                                steps: ss.steps.filter(
                                                  (step) => step.name !== stepName,
                                                ),
                                              };
                                            }
                                            return ss;
                                          }),
                                        }));
                                      }}
                                      onRemove={() => {
                                        setSystemSuitabilityPerParam((prev) => {
                                          const updated = (
                                            prev[parameterId] || []
                                          )
                                            .filter(
                                              (ss) =>
                                                ss.id !== systemSuitability.id,
                                            )
                                            .map((ss, index) => ({
                                              ...ss,
                                              label: `System Suitability ${index + 1}`,
                                            }));
                                          return {
                                            ...prev,
                                            [parameterId]: updated,
                                          };
                                        });
                                      }}
                                    />
                                  ))}
                                </AnimatePresence>

                                {(systemSuitabilityPerParam[parameterId] || [])
                                  .length === 0 && (
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
                                          No system suitability added yet
                                        </p>
                                        <p className="text-sm text-emerald-600/80 max-w-md mx-auto mb-4">
                                          Click "Add System Suitability" to create
                                          system suitability parameters
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                              </motion.div>
                            )}
                          </AnimatePresence>


    </>
  );
};

export default DrugSystemSuitabilitySection;
