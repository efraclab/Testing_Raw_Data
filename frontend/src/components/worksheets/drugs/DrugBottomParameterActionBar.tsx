import React from "react";
import { motion } from "framer-motion";
import { BsPlayFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";

interface DrugBottomParameterActionBarProps {
  parameterId: number;
  role: string;
  parameterStatusPerParam: Record<number, string>;
  addedParameters: any[];
  revisionStartedParams: Set<number>;
  remarksQAPerParam: Record<number, any>;
  remarksByReviewerPerParam: Record<number, any>;
  approvedByQAPerParam: Record<number, any>;

  handleInitiateUnlock: (...args: any[]) => void;
  handleStartAnalysis: (...args: any[]) => void;
  handleCompleteAnalysis: (...args: any[]) => void;
  handleRequestRevision: (...args: any[]) => void;
  handleStartRevision: (...args: any[]) => void;
  handleApprove: (...args: any[]) => void;
  handleQARequestRevision: (...args: any[]) => void;
  handleInitiateDelete: (...args: any[]) => void;
}

const DrugBottomParameterActionBar: React.FC<
  DrugBottomParameterActionBarProps
> = (props) => {
  const {
    parameterId,
    role,
    parameterStatusPerParam,
    addedParameters,
    revisionStartedParams,
    remarksQAPerParam,
    remarksByReviewerPerParam,
    approvedByQAPerParam,
    handleInitiateUnlock,
    handleStartAnalysis,
    handleCompleteAnalysis,
    handleRequestRevision,
    handleStartRevision,
    handleApprove,
    handleQARequestRevision,
    handleInitiateDelete,
  } = props;

  const BottomParameterActionBar: React.FC<{ parameterId: number }> =
    React.memo(
      ({ parameterId }) => {
        const status = (
          parameterStatusPerParam[parameterId] || "Created"
        ).toLowerCase();
        const canUnlock = status === "analysis pending";
        const isAnalysisStarted = status === "analysis started";
        const isAnalysisPending = status === "analysis pending";
        const isAnalysisCompleted = status === "analysis completed";
        const isAnalysisRevision = status === "analysis revision" || status === "analysis revision started";
        const isApproved = status === "approved";
        const isCreated = status === "created";
        const param = addedParameters.find((p) => p.id === parameterId);

        // ========== ANALYST VIEW - CREATED (NO BAR) ==========
        if (role.toLowerCase() === "analyst" && isCreated) {
          return null; // No action bar needed for created status
        }

        // ========== ANALYST VIEW - ANALYSIS PENDING ==========
        if (role.toLowerCase() === "analyst" && isAnalysisPending && param) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Analysis Pending - Ready to Start
                      </h4>
                      <p className="text-xs text-slate-600">
                        Click "Start Analysis" to begin working on this
                        parameter
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleStartAnalysis(param)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-emerald-300 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <BsPlayFill className="w-5 h-5" />
                    Start Analysis
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== ANALYST VIEW - ANALYSIS STARTED ==========
        if (role.toLowerCase() === "analyst" && isAnalysisStarted && param) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Analysis In Progress
                      </h4>
                      <p className="text-xs text-slate-600">
                        Complete your analysis and click on Complete button
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleCompleteAnalysis(param)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-emerald-300 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
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
                    Complete Analysis
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== ANALYST VIEW - ANALYSIS COMPLETED ==========
        if (role.toLowerCase() === "analyst" && isAnalysisCompleted && param) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Analysis Completed
                      </h4>
                      <p className="text-xs text-slate-600">
                        Your work has been submitted and is under review
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== ANALYST VIEW - ANALYSIS REVISION ==========
        if (role.toLowerCase() === "analyst" && isAnalysisRevision && param) {
          const qaRemarks = remarksQAPerParam[parameterId];
          const reviewerRemarks = remarksByReviewerPerParam[parameterId];
          const isFromQA = !!qaRemarks;
          const isRevisionStarted = status === "analysis revision started" || revisionStartedParams.has(parameterId);
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Revision Requested {isFromQA ? "by QA" : "by Reviewer"}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {isRevisionStarted
                          ? "Revision in progress — make your changes and complete when done"
                          : isFromQA
                            ? "QA has requested revisions. Click \"Start Revision\" to begin editing"
                            : "Reviewer has requested revisions. Click \"Start Revision\" to begin editing"}
                      </p>
                    </div>
                  </div>

                  {isRevisionStarted ? (
                    <motion.button
                      onClick={() => handleCompleteAnalysis(param)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-emerald-300 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Complete Revision
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => handleStartRevision(param)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-2.5 bg-gradient-to-r ${isFromQA ? "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" : "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"} text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shadow-md`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Start Revision
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Remarks Block */}
              {(qaRemarks || reviewerRemarks) && (
                <div
                  className={`px-6 py-4 border-t ${isFromQA ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFromQA ? "text-amber-500" : "text-slate-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${isFromQA ? "text-amber-600" : "text-slate-500"}`}
                      >
                        {isFromQA ? "QA Remarks" : "Reviewer Remarks"}
                      </span>
                      <p
                        className={`mt-1 text-sm italic leading-relaxed ${isFromQA ? "text-amber-900" : "text-slate-700"}`}
                      >
                        &ldquo;{isFromQA ? qaRemarks : reviewerRemarks}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        }
        if (role.toLowerCase() === "analyst" && isApproved && param) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Parameter Approved - Well Done!
                      </h4>
                      <p className="text-xs text-slate-600">
                        Your analysis has been reviewed and approved by HOD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== reviewer VIEW - CREATED ==========
        if (role.toLowerCase() === "reviewer" && isCreated && param) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Parameter in Draft Mode
                      </h4>
                      <p className="text-xs text-slate-600">
                        This parameter is being prepared and has not been
                        submitted yet
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleInitiateDelete(param)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-red-200 text-red-700 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-red-300 transition-all flex items-center gap-2 shadow-sm"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== reviewer VIEW - ANALYSIS PENDING OR STARTED ==========
        if (
          role.toLowerCase() === "reviewer" &&
          (isAnalysisPending || isAnalysisStarted) &&
          param
        ) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {isAnalysisStarted
                          ? "Analysis In Progress"
                          : "Awaiting Analysis"}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Status:{" "}
                        <span className="uppercase font-semibold">
                          {status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {canUnlock && (
                      <motion.button
                        onClick={() => handleInitiateUnlock(param)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-emerald-300 transition-all flex items-center gap-2 shadow-sm"
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
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                        Unlock
                      </motion.button>
                    )}

                    <motion.button
                      onClick={() => handleInitiateDelete(param)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-red-200 text-red-700 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-red-300 transition-all flex items-center gap-2 shadow-sm"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== reviewer VIEW - ANALYSIS COMPLETED ==========
        if (role.toLowerCase() === "reviewer" && isAnalysisCompleted && param) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Analysis Completed
                      </h4>
                      <p className="text-xs text-slate-600">
                        Review the analysis and approve or request revisions
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleApprove(param)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-emerald-300 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <MdDone className="w-4 h-4" />
                      Approve
                    </motion.button>

                    <motion.button
                      onClick={() => handleRequestRevision(param)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-emerald-300 transition-all flex items-center gap-2 shadow-sm"
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Request Revision
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }

        // ========== reviewer VIEW - ANALYSIS REVISION ==========
        if (role.toLowerCase() === "reviewer" && isAnalysisRevision && param) {
          const qaRemarks = remarksQAPerParam[parameterId];
          const reviewerRemarks = remarksByReviewerPerParam[parameterId];
          const isFromQA = !!qaRemarks;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Revision In Progress —{" "}
                        {isFromQA ? "Returned by QA" : "Requested by You"}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Analyst is working on the requested revisions
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg">
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      Awaiting Revision
                    </span>
                  </div>
                </div>
              </div>

              {/* Remarks Block */}
              {(qaRemarks || reviewerRemarks) && (
                <div
                  className={`px-6 py-4 border-t ${isFromQA ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFromQA ? "text-amber-500" : "text-slate-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${isFromQA ? "text-amber-600" : "text-slate-500"}`}
                      >
                        {isFromQA ? "QA Remarks" : "Your Remarks"}
                      </span>
                      <p
                        className={`mt-1 text-sm italic leading-relaxed ${isFromQA ? "text-amber-900" : "text-slate-700"}`}
                      >
                        &ldquo;{isFromQA ? qaRemarks : reviewerRemarks}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        }

        if (param) {
          const isQAApproved = !!approvedByQAPerParam[parameterId];
          const isReviewerApproved = isApproved;
          const isAnalysisRevisionState = isAnalysisRevision;

          // ── STAGE 3: Fully QA Approved (final) ──────────────────────
          if (isQAApproved) {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-xl overflow-hidden border border-emerald-200 shadow-lg bg-white"
              >
                <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Approved & Finalized
                        </h4>
                        <p className="text-xs text-slate-600">
                          This parameter has been fully approved. All data is
                          locked.
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-100 border border-emerald-300 rounded-lg">
                      <span className="text-xs font-semibold text-emerald-800">
                        QA Approved
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          // ── STAGE 2: Reviewer Approved — Awaiting QA ────────────────
          if (isReviewerApproved) {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
              >
                <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Approved by Reviewer — Awaiting QA Approval
                        </h4>
                        <p className="text-xs text-slate-600">
                          {role.toLowerCase() === "qa"
                            ? "You can return this parameter for revision, or approve the entire worksheet once all parameters are reviewed"
                            : "Awaiting QA validation"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {role.toLowerCase() === "qa" && (
                        <motion.button
                          onClick={() => handleQARequestRevision(param)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-amber-200 text-amber-700 text-sm font-semibold rounded-lg hover:bg-white/80 hover:border-amber-300 transition-all flex items-center gap-2 shadow-sm"
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
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Return for Revision
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          // ── STAGE 1: Revision In Progress ──
          if (isAnalysisRevisionState) {
            const qaRemarks = remarksQAPerParam[parameterId];
            const reviewerRemarks = remarksByReviewerPerParam[parameterId];
            const isFromQA = !!qaRemarks;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
              >
                <div className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-amber-600 animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Revision In Progress —{" "}
                          {isFromQA ? "Returned by QA" : "Returned by Reviewer"}
                        </h4>
                        <p className="text-xs text-slate-600">
                          Analyst is working on revisions
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-lg">
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        Awaiting Revision
                      </span>
                    </div>
                  </div>
                </div>
                {(qaRemarks || reviewerRemarks) && (
                  <div
                    className={`px-6 py-4 border-t ${isFromQA ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFromQA ? "text-amber-500" : "text-slate-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${isFromQA ? "text-amber-600" : "text-slate-500"}`}
                        >
                          {isFromQA ? "QA Remarks" : "Reviewer Remarks"}
                        </span>
                        <p
                          className={`mt-1 text-sm italic leading-relaxed ${isFromQA ? "text-amber-900" : "text-slate-700"}`}
                        >
                          &ldquo;{isFromQA ? qaRemarks : reviewerRemarks}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          }

          // ── STAGE 0: Pending Reviewer Approval ──────────────────────
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white"
            >
              <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-slate-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Pending Reviewer Approval
                    </h4>
                    <p className="text-xs text-slate-600">
                      Status:{" "}
                      <span className="uppercase font-semibold">{status}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }
        // If none of the conditions match, return null (no action bar)
        return null;
      },
      (prevProps, nextProps) => {
        return prevProps.parameterId === nextProps.parameterId;
      },
    );
  return <BottomParameterActionBar parameterId={parameterId} />;

};

export default DrugBottomParameterActionBar;
