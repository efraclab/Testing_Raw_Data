import React from "react";
import { motion } from "framer-motion";

interface DrugParameterOverviewSectionProps {
  parameter: any;
  role: string;
  toggleParameterDetail: (parameterId: number) => void;
  formatDate: (value: any) => string;

  analyzedByPerParam: Record<number, any>;
  analyzedByNamePerParam: Record<number, string>;
  analysisStartDatePerParam: Record<number, any>;
  analysisCompletionDatePerParam: Record<number, any>;
  revisionStartDatePerParam: Record<number, any>;
  revisionCompletedDatePerParam: Record<number, any>;
  approvedByReviewerPerParam: Record<number, any>;
  approvedByReviewerNamePerParam: Record<number, string>;
  approvedAtReviewerPerParam: Record<number, any>;
  isLocked: boolean;
  handleReassignAnalyst: (parameterId: number) => void;
}

const DrugParameterOverviewSection: React.FC<
  DrugParameterOverviewSectionProps
> = ({
  parameter,
  role,
  toggleParameterDetail,
  formatDate,
  analyzedByPerParam,
  analyzedByNamePerParam,
  analysisStartDatePerParam,
  analysisCompletionDatePerParam,
  revisionStartDatePerParam,
  revisionCompletedDatePerParam,
  approvedByReviewerPerParam,
  approvedByReviewerNamePerParam,
  approvedAtReviewerPerParam,
  isLocked,
  handleReassignAnalyst,
}) => {
  return (
    <>
                          {/* Parameter detail header — dark gradient */}
                          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-900 px-6 py-4 border-b border-slate-800/30">
                            <div
                              className="absolute inset-0 opacity-[0.04] pointer-events-none"
                              style={{
                                backgroundImage: "radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)",
                                backgroundSize: "18px 18px",
                              }}
                            />
                            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
                            <div className="relative z-10 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="w-10 h-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center">
                                    <svg
                                      className="w-5 h-5 text-emerald-300"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-base font-bold text-white tracking-tight">
                                    Parameter Overview
                                  </h3>
                                  <p className="text-emerald-300/80 text-xs font-medium mt-0.5">
                                    Complete analysis information
                                  </p>
                                </div>
                              </div>
                              <motion.button
                                onClick={() =>
                                  toggleParameterDetail(parameter.id)
                                }
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/15 border border-white/20 hover:bg-white/25 transition-all duration-200"
                              >
                                <span className="text-white/80 text-lg font-bold">
                                  ✕
                                </span>
                              </motion.button>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6 bg-slate-50/50 space-y-6">
                            {/* Parameter Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="relative group"
                              >
                                <div className="relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-300">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                      Parameter Code
                                    </span>
                                  </div>
                                  <p className="text-lg font-bold text-slate-900">
                                    {parameter.paraCode}
                                  </p>
                                </div>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                              >
                                <div className="relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-300">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                      Parameter Name
                                    </span>
                                  </div>
                                  <p className="text-lg font-bold text-slate-900">
                                    {parameter.parameterName}
                                  </p>
                                </div>
                              </motion.div>
                            </div>

                            {role !== "Analyst" && (
                              <>
                                {analyzedByPerParam[parameter.id] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative group"
                                  >
                                    <div className="relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-300">
                                      <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                                          <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                                            Assigned Analyst
                                          </h4>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="relative">
                                          <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center ring-2 ring-emerald-200">
                                            <span className="text-white text-lg font-bold">
                                              {(analyzedByNamePerParam[parameter.id] || "A").charAt(0)}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex-1">
                                          <div className="font-semibold text-base text-slate-900 mb-1">
                                            {analyzedByNamePerParam[
                                              parameter.id
                                            ] || "Unknown"}
                                          </div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="inline-flex items-center px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800">
                                              <svg
                                                className="w-3 h-3 mr-1.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                                />
                                              </svg>
                                              {analyzedByPerParam[
                                                parameter.id
                                              ]}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </>
                            )}

                            {role === "QA" && (
                              <>
                                {analyzedByPerParam[parameter.id] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative group"
                                  >
                                    <div className="relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-300">
                                      <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                                          <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                                            Assigned Reviewer
                                          </h4>
                                        </div>
                                        {!isLocked && (
                                          <motion.button
                                            onClick={() =>
                                              handleReassignAnalyst(
                                                parameter.id,
                                              )
                                            }
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-white hover:border-emerald-300 transition-all duration-200 flex items-center gap-1.5"
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
                                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                              />
                                            </svg>
                                            Reassign
                                          </motion.button>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="relative">
                                          <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center ring-2 ring-emerald-200">
                                            <span className="text-white text-lg font-bold">
                                              {(approvedByReviewerNamePerParam[parameter.id] || "A").charAt(0)}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Analyst Info */}
                                        <div className="flex-1">
                                          <div className="font-semibold text-base text-slate-900 mb-1">
                                            {approvedByReviewerNamePerParam[
                                              parameter.id
                                            ] || "Unknown"}
                                          </div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="inline-flex items-center px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800">
                                              <svg
                                                className="w-3 h-3 mr-1.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                                />
                                              </svg>
                                              {approvedByReviewerPerParam[parameter.id]}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </>
                            )}

                            {/* Analysis Timeline Section */}
                            {(analysisStartDatePerParam[parameter.id] ||
                              analysisCompletionDatePerParam[parameter.id] ||
                              revisionStartDatePerParam[parameter.id] ||
                              revisionCompletedDatePerParam[parameter.id] ||
                              approvedByReviewerPerParam[parameter.id]) && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 }}
                                  className="relative group"
                                >
                                  <div className="relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-300">
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                                      <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-2">
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
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        Analysis Timeline
                                      </h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      {analysisStartDatePerParam[
                                        parameter.id
                                      ] && (
                                          <div className="bg-emerald-50 rounded-lg p-4 border border-slate-200 hover:border-emerald-300 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                  className="w-4 h-4 text-emerald-600"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                  />
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                  />
                                                </svg>
                                              </div>
                                              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                                Started
                                              </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">
                                              {
                                                formatDate(analysisStartDatePerParam[
                                                  parameter.id
                                                ])
                                              }
                                            </p>
                                          </div>
                                        )}

                                      {analysisCompletionDatePerParam[
                                        parameter.id
                                      ] && (
                                          <div className="bg-emerald-50 rounded-lg p-4 border border-slate-200 hover:border-emerald-300 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                  className="w-4 h-4 text-emerald-600"
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
                                              </div>
                                              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                                Completed
                                              </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">
                                              {
                                                formatDate(analysisCompletionDatePerParam[
                                                  parameter.id
                                                ])
                                              }
                                            </p>
                                          </div>
                                        )}

                                      {revisionStartDatePerParam[
                                        parameter.id
                                      ] && (
                                          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 hover:border-orange-300 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                              </div>
                                              <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                                                Revision Started
                                              </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">
                                              {formatDate(revisionStartDatePerParam[parameter.id])}
                                            </p>
                                          </div>
                                        )}

                                      {revisionCompletedDatePerParam[
                                        parameter.id
                                      ] && (
                                          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 hover:border-orange-300 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                              </div>
                                              <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                                                Revision Completed
                                              </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">
                                              {formatDate(revisionCompletedDatePerParam[parameter.id])}
                                            </p>
                                          </div>
                                        )}

                                      {approvedAtReviewerPerParam[
                                        parameter.id
                                      ] && (
                                          <div className="bg-emerald-50 rounded-lg p-4 border border-slate-200 hover:border-emerald-300 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                  className="w-4 h-4 text-emerald-600"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                  />
                                                </svg>
                                              </div>
                                              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                                Reviewed
                                              </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">
                                              {
                                                formatDate(approvedAtReviewerPerParam[
                                                  parameter.id
                                                ])
                                              }
                                            </p>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                          </div>


    </>
  );
};

export default DrugParameterOverviewSection;
