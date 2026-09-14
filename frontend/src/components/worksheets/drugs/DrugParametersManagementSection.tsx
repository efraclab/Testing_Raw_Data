import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoFlask } from "react-icons/io5";
import { CgTrash } from "react-icons/cg";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugParametersManagementSectionProps {
  role: string;
  worksheetInfo: any;
  availableToAdd: any[];
  showParameterDropdown: boolean;
  setShowParameterDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddParameter: (...args: any[]) => void;

  addedParameters: any[];
  isParameterLocked: (parameterId: number) => boolean;
  parameterStatusPerParam: Record<number, string>;
  selectedParamsForDetail: number[];
  toggleParameterDetail: (parameterId: number) => void;

  analyzedByPerParam: Record<number, any>;
  analyzedByNamePerParam: Record<number, string>;

  setParameterToDelete: React.Dispatch<React.SetStateAction<any>>;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isSaving: boolean;
}

const DrugParametersManagementSection: React.FC<
  DrugParametersManagementSectionProps
> = (props) => {
  const {
    role,
    worksheetInfo,
    availableToAdd,
    showParameterDropdown,
    setShowParameterDropdown,
    handleAddParameter,
    addedParameters,
    isParameterLocked,
    parameterStatusPerParam,
    selectedParamsForDetail,
    toggleParameterDetail,
    analyzedByPerParam,
    analyzedByNamePerParam,
    setParameterToDelete,
    setShowDeleteDialog,
    isSaving,
  } = props;

  return (
    <>
              <div className="my-6 rounded-xl shadow-xl border border-emerald-900/30">
                {/* Section header */}
                <div className="relative rounded-xl px-5 py-4 bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900">
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
                  <div className="relative flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
                        <IoFlask className="w-5 h-5 text-emerald-300" />
                      </div>
                      <span>Parameters Management</span>
                    </h3>

                    {role === "Reviewer" &&
                      worksheetInfo?.sample.status !== "Approved" && (
                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowParameterDropdown(!showParameterDropdown)
                            }
                            disabled={availableToAdd.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            Add Parameter
                          </button>

                          <AnimatePresence>
                            {showParameterDropdown && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-72 bg-white border border-emerald-300 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
                              >
                                {availableToAdd.map((param) => (
                                  <button
                                    key={param.paraCode}
                                    onClick={() =>
                                      handleAddParameter({
                                        paraCode: param.paraCode,
                                        methodName: param.methodName,
                                        methodCode: param.methodCode,
                                        parameterName: param.parameter,
                                        id: 0,
                                        instruments: [],
                                        chemicals: [],
                                        standards: [],
                                        preparations: [],
                                        calculations: [],
                                        files: [],
                                        preparationCompletedBy: null,
                                        preparationCompletedAt: null,
                                        remarksByAnalyst: null,
                                        analyzedBy: null,
                                        approvedByReviewer: null,
                                        analyzedByName: null,
                                        approvedByReviewerName: null,
                                        analysisStartDate: null,
                                        analysisCompletionDate: null,
                                        approvedAtReviewer: null,
                                        approvedByQAName: null,
                                        approvedByQA: null,
                                        approvedAtQA: null,
                                        remarksByReviewer: null,
                                        remarksByQA: null,
                                        status: null,
                                        submittedQaByName: null,
                                        submittedQaBy: null,
                                        additional_info: null
                                      })
                                    }
                                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                                  >
                                    <div className="font-semibold text-gray-900">
                                      {param.parameter}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {param.paraCode} • {param.methodName}
                                    </div>
                                  </button>
                                ))}
                                {availableToAdd.length === 0 && (
                                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                    All parameters have been added
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                  </div>

                  <AnimatePresence>
                    {addedParameters.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {addedParameters.map((param) => {
                          const isLocked = isParameterLocked(param.id);
                          const status =
                            parameterStatusPerParam[param.id] || "created";

                          // Add these to your status constants (around line 350)
                          const STATUS_COLORS = {
                            created: {
                              bg: "bg-emerald-100",
                              border: "border-emerald-300",
                              text: "text-emerald-800",
                              label: "CREATED",
                            },
                            "analysis pending": {
                              bg: "bg-emerald-100",
                              border: "border-emerald-300",
                              text: "text-emerald-800",
                              label: "ANALYSIS PENDING",
                            },
                            "analysis started": {
                              bg: "bg-emerald-100",
                              border: "border-emerald-300",
                              text: "text-emerald-800",
                              label: "ANALYSIS STARTED",
                            },
                            "analysis completed": {
                              bg: "bg-emerald-100",
                              border: "border-emerald-300",
                              text: "text-emerald-800",
                              label: "ANALYSIS COMPLETED",
                            },
                            approved: {
                              bg: "bg-emerald-100",
                              border: "border-emerald-300",
                              text: "text-emerald-800",
                              label: "APPROVED",
                            },
                            "analysis revision": {
                              bg: "bg-orange-100",
                              border: "border-orange-300",
                              text: "text-orange-800",
                              label: "REVISION REQUESTED",
                            },
                            "analysis revision started": {
                              bg: "bg-orange-100",
                              border: "border-orange-300",
                              text: "text-orange-800",
                              label: "REVISION IN PROGRESS",
                            },
                            disapproved: {
                              bg: "bg-red-100",
                              border: "border-red-300",
                              text: "text-red-700",
                              label: "DISAPPROVED",
                            },
                          };

                          const currentStatus =
                            STATUS_COLORS[
                            status.toLowerCase() as keyof typeof STATUS_COLORS
                            ] || STATUS_COLORS.created;

                          return (
                            <motion.div
                              key={param.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className={`relative flex items-center justify-between mt-5 p-4 rounded-xl shadow-inner transition-all duration-300 ${isLocked
                                ? "bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-2 border-slate-300"
                                : "bg-gradient-to-r from-emerald-50 via-emerald-50 to-emerald-50 border-2 border-emerald-200"
                                }`}
                            >
                              {/* Locked Overlay Effect */}
                              {isLocked && (
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-slate-300/30 backdrop-blur-[1px] rounded-xl pointer-events-none">
                                  <div className="absolute top-2 right-2">
                                    <motion.div
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      transition={{ type: "spring", duration: 0.6 }}
                                      className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center shadow-lg"
                                    >
                                      <svg
                                        className="w-4 h-4 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </motion.div>
                                  </div>
                                </div>
                              )}

                              <div className="flex-1 relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                  <div
                                    className={`font-semibold text-sm ${isLocked ? "text-slate-700" : "text-emerald-800"
                                      }`}
                                  >
                                    {param.parameterName}
                                  </div>

                                  {/* Status Badge */}
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 ${currentStatus.bg} ${currentStatus.border} border-2 rounded-full shadow-sm`}
                                  >
                                    <span
                                      className={`text-xs font-bold ${currentStatus.text} uppercase tracking-wide`}
                                    >
                                      {currentStatus.label}
                                    </span>
                                  </motion.div>

                                  {/* Locked Badge */}
                                  {isLocked && (
                                    <motion.div
                                      initial={{ scale: 0, x: -10 }}
                                      animate={{ scale: 1, x: 0 }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 border-2 border-slate-400 rounded-full shadow-sm"
                                    >
                                      <svg
                                        className="w-3 h-3 text-slate-700"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                        LOCKED
                                      </span>
                                    </motion.div>
                                  )}
                                </div>

                                <div
                                  className={`text-xs ${isLocked ? "text-slate-600" : "text-emerald-600"
                                    }`}
                                >
                                  {param.paraCode} • {param.methodName}
                                </div>

                                {analyzedByPerParam[param.id] && (
                                  <div
                                    className={`mt-1 text-xs font-medium ${isLocked ? "text-slate-700" : "text-emerald-800"
                                      }`}
                                  >
                                    Assigned to: {analyzedByNamePerParam[param.id]}
                                  </div>
                                )}

                                {/* Locked Message */}
                                {isLocked && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 flex items-center gap-2 text-xs text-slate-600 bg-slate-200/50 px-3 py-1.5 rounded-lg"
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
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span className="font-medium">
                                      This parameter is locked and cannot be modified
                                      during analysis
                                    </span>
                                  </motion.div>
                                )}
                              </div>

                              <div className="flex gap-2 relative z-10">
                                <button
                                  onClick={() => toggleParameterDetail(param.id)}
                                  className={`
                            group relative inline-flex items-center gap-2 px-3 py-1.5 
                            rounded-md border text-xs font-semibold tracking-tight transition-all duration-200
                            ${selectedParamsForDetail.includes(param.id)
                                      ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 shadow-sm"
                                      : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 shadow-sm"
                                    }
                          `}
                                >
                                  {/* The "Dot" Indicator - Classic status signal */}
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${selectedParamsForDetail.includes(param.id)
                                      ? "bg-emerald-500 animate-pulse"
                                      : "bg-emerald-500"
                                      }`}
                                  />

                                  <span>
                                    {selectedParamsForDetail.includes(param.id)
                                      ? "CLICK TO HIDE"
                                      : "CLICK TO VIEW"}
                                  </span>

                                  {/* Subtle chevron icon for a classic feel */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-3 w-3 transition-transform duration-200 ${selectedParamsForDetail.includes(param.id)
                                      ? "rotate-180"
                                      : ""
                                      }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </button>

                                {role === "Reviewer" && !isLocked && (
                                  <motion.button
                                    onClick={() => {
                                      setShowDeleteDialog(true);
                                      setParameterToDelete(param);
                                    }}
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="mx-2"
                                  >
                                    <CgTrash className="w-5 h-5 text-red-500" />
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {addedParameters.length === 0 && (
                    <motion.div
                      key="empty-state-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 text-gray-500 mt-4 bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-100 rounded-2xl border-2 border-dashed border-gray-300 shadow-inner"
                      layout
                    >
                      <div className="inline-block">
                        <Target className="w-14 h-14 text-gray-300" />
                      </div>
                      <p className="text-base font-bold text-gray-800 mb-2">
                        No parameters added yet
                      </p>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        {role === "Reviewer"
                          ? 'Click the "Add Parameters" button above to add parameters'
                          : "Reviewer will add parameters for analysis"}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isSaving && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full"
                    />
                    <span className="text-sm font-semibold text-emerald-800">
                      Saving parameter assignment to database...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>


    </>
  );
};

export default DrugParametersManagementSection;
