import React from "react";
import { motion } from "framer-motion";
import { BsPlayFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";

interface DrugLockedParameterOverlayProps {
  parameterId: number;
  role: string;
  parameterStatusPerParam: Record<number, string>;
  addedParameters: any[];
  revisionStartedParams: Set<number>;
  remarksQAPerParam: Record<number, any>;
  remarksByReviewerPerParam: Record<number, any>;
  remarksByAnalystPerParam: Record<number, any>;
  worksheetInfo: any;

  handleInitiateUnlock: (...args: any[]) => void;
  handleStartAnalysis: (...args: any[]) => void;
  handleCompleteAnalysis: (...args: any[]) => void;
  handleRequestRevision: (...args: any[]) => void;
  handleStartRevision: (...args: any[]) => void;
  handleApprove: (...args: any[]) => void;
  handleInitiateDelete: (...args: any[]) => void;
}

const DrugLockedParameterOverlay: React.FC<
  DrugLockedParameterOverlayProps
> = (props) => {
  const {
    parameterId,
    role,
    parameterStatusPerParam,
    addedParameters,
    revisionStartedParams,
    remarksQAPerParam,
    remarksByReviewerPerParam,
    remarksByAnalystPerParam,
    worksheetInfo,
    handleInitiateUnlock,
    handleStartAnalysis,
    handleCompleteAnalysis,
    handleRequestRevision,
    handleStartRevision,
    handleApprove,
    handleInitiateDelete,
  } = props;

  const LockedParameterOverlay: React.FC<{ parameterId: number }> =
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

      // ========== ANALYST VIEW - CREATED (NO OVERLAY - FULLY EDITABLE) ==========
      if (role.toLowerCase() === "analyst" && isCreated) {
        return null; // No overlay needed, fully editable
      }

      // ========== ANALYST VIEW - ANALYSIS PENDING ==========
      if (role.toLowerCase() === "analyst" && isAnalysisPending && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600 animate-pulse"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      Analysis Pending - Ready to Start
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Click "Start Analysis" to begin working on this parameter
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

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        What happens when you start?
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            You'll gain full access to edit all preparations and
                            calculations
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            The parameter status will change to "Analysis
                            Started"
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            You must complete the entire analysis - no pausing
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            Click "Complete Analysis" when you're done with all
                            work
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-sm text-emerald-800">
                      <strong>Important:</strong> Once started, you cannot pause
                      or go back. Make sure you have all required materials and
                      time to complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== ANALYST VIEW - ANALYSIS STARTED (ACTIVE EDITING) ==========
      if (role.toLowerCase() === "analyst" && isAnalysisStarted && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600 animate-pulse"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      Analysis In Progress
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Work on your analysis and click complete when done
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

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Active Editing Mode
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            You have full editing access to all preparations and
                            calculations
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            Scroll down to work on parameter details,
                            preparations, and calculations
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            Click <strong>"Save Draft"</strong> frequently to
                            save your progress
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            When all work is complete, click{" "}
                            <strong>"Complete Analysis"</strong> above
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
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
                    <p className="text-sm text-emerald-800">
                      <strong>Before Completing:</strong> Verify all
                      preparations, calculations, and data are accurate. This
                      will submit your work to Reviewer for approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== ANALYST VIEW - ANALYSIS COMPLETED (AWAITING REVIEWER REVIEW) ==========
      if (role.toLowerCase() === "analyst" && isAnalysisCompleted && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Analysis Completed
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Your work has been submitted and is under review
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        What's Next?
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            Reviewer is currently reviewing your analysis
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            If approved, the parameter will be finalized
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            If revisions are needed, you'll regain editing
                            access
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            You can view all parameter details below while
                            waiting
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <p className="text-sm text-slate-700">
                      <strong>Status:</strong> Your analysis is locked for
                      review. No edits can be made until Reviewer provides
                      feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== ANALYST VIEW - ANALYSIS REVISION REQUESTED ==========
      if (role.toLowerCase() === "analyst" && isAnalysisRevision && param) {
        const qaRemarks = remarksQAPerParam[parameterId];
        const reviewerRemarks = remarksByReviewerPerParam[parameterId];
        const isFromQA = !!qaRemarks;
        const activeRemarks = isFromQA ? qaRemarks : reviewerRemarks;
        const senderLabel = isFromQA ? "QA" : "Reviewer";
        const accentColor = isFromQA ? "amber" : "orange";
        const isRevisionStarted = status === "analysis revision started" || revisionStartedParams.has(parameterId);

        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div
              className={`bg-gradient-to-r ${isFromQA ? "from-amber-50 via-amber-100 to-amber-50" : "from-orange-50 via-orange-100 to-orange-50"} px-6 py-5 border-b border-slate-200`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 ${isFromQA ? "bg-amber-100" : "bg-orange-100"} rounded-xl flex items-center justify-center`}
                    >
                      <svg
                        className={`w-6 h-6 ${isFromQA ? "text-amber-600" : "text-orange-600"} animate-pulse`}
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Revision Requested by {senderLabel}
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {isRevisionStarted
                        ? `Revision in progress — make your changes and click "Complete Revision" when done`
                        : `${senderLabel} has requested revisions. Click "Start Revision" to unlock editing`}
                    </p>
                  </div>
                </div>

                {isRevisionStarted ? (
                  <motion.button
                    onClick={() => handleCompleteAnalysis(param)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-5 py-2.5 bg-white/60 backdrop-blur-sm border ${isFromQA ? "border-amber-200 text-amber-700 hover:border-amber-300" : "border-orange-200 text-orange-700 hover:border-orange-300"} text-sm font-semibold rounded-lg hover:bg-white/80 transition-all flex items-center gap-2 shadow-sm`}
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

            <div className={`p-6 ${isFromQA ? "bg-amber-50" : "bg-orange-50"}`}>
              <div className="grid grid-cols-1 gap-4">
                {/* Revision Remarks — most prominent */}
                {activeRemarks ? (
                  <div
                    className={`bg-white border ${isFromQA ? "border-amber-200" : "border-orange-200"} rounded-xl p-5`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 ${isFromQA ? "bg-amber-50" : "bg-orange-50"} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <svg
                          className={`w-5 h-5 ${isFromQA ? "text-amber-600" : "text-orange-600"}`}
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
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-800 mb-2 flex items-center gap-2">
                          Revision Remarks
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${isFromQA ? "bg-amber-100 text-amber-700" : "bg-orange-100 text-orange-700"}`}
                          >
                            from {senderLabel}
                          </span>
                        </h4>
                        <p
                          className={`text-sm italic leading-relaxed px-4 py-3 rounded-lg border ${isFromQA ? "text-amber-900 bg-amber-50 border-amber-100" : "text-orange-900 bg-orange-50 border-orange-100"}`}
                        >
                          &ldquo;{activeRemarks}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-slate-400"
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
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-800 mb-1">
                          Revision Remarks
                        </h4>
                        <p className="text-sm text-slate-400 italic">
                          No remarks provided by {senderLabel}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        {isRevisionStarted ? "Revision Mode Active" : "Revision Pending — Action Required"}
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        {!isRevisionStarted ? (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-500 mt-1">•</span>
                              <span>Review {senderLabel}&apos;s feedback above carefully</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-500 mt-1">•</span>
                              <span>Click <strong>&quot;Start Revision&quot;</strong> to unlock the parameter for editing</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              <span>
                                Review {senderLabel}&apos;s feedback above and make
                                necessary corrections
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              <span>
                                You have full editing access to all preparations and
                                calculations
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              <span>
                                Click <strong>&quot;Save Draft&quot;</strong> to
                                save your changes
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              <span>
                                Click <strong>&quot;Complete Revision&quot;</strong>{" "}
                                when all changes are done
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`${isFromQA ? "bg-amber-50 border-amber-200" : "bg-orange-50 border-orange-200"} border rounded-xl p-4`}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 ${isFromQA ? "text-amber-600" : "text-orange-600"} flex-shrink-0 mt-0.5`}
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
                    <p
                      className={`text-sm ${isFromQA ? "text-amber-800" : "text-orange-800"}`}
                    >
                      <strong>Tip:</strong> Carefully review all sections to
                      ensure accuracy before resubmitting. Your work will be
                      sent back to {senderLabel} for re-approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== ANALYST VIEW - APPROVED ==========
      if (role.toLowerCase() === "analyst" && isApproved && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Parameter Approved - Well Done!
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Your analysis has been reviewed and approved by Reviewer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-1">
                        Status: Approved
                      </h4>
                      <p className="text-sm text-slate-600">
                        This parameter has been finalized and approved. All data
                        is now locked.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-1">
                        View Only Access
                      </h4>
                      <p className="text-sm text-slate-600">
                        You can view all parameter details below, but cannot
                        make any changes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== Reviewer VIEW - CREATED ==========
      if (role.toLowerCase() === "reviewer" && isCreated && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-slate-600"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Parameter in Draft Mode
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      This parameter is being prepared and has not been
                      submitted yet
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
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

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Current Status
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            This parameter is in draft mode and being set up
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            It has not been submitted for analysis yet
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            Once submitted, it will be assigned for analysis
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    <p className="text-sm text-slate-700">
                      <strong>Available Actions:</strong> You can delete this
                      parameter if it's no longer needed. View details below.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== Reviewer VIEW - ANALYSIS PENDING OR STARTED ==========
      if (
        role.toLowerCase() === "reviewer" &&
        (isAnalysisPending || isAnalysisStarted) &&
        param
      ) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-slate-600"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {isAnalysisStarted
                        ? "Analysis In Progress"
                        : "Awaiting Analysis"}
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Status:{" "}
                      <span className="uppercase font-semibold">{status}</span>
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

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Why is this locked?
                      </h4>
                      <p className="text-sm text-slate-600">
                        {isAnalysisStarted
                          ? "This parameter is currently under active analysis. The analyst is working on it."
                          : "This parameter has been submitted for analysis. To maintain data integrity, modifications are restricted."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        {canUnlock
                          ? "Unlock Available"
                          : "Need to make changes?"}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {canUnlock ? (
                          <>
                            You can unlock this parameter to make changes. Click{" "}
                            <strong>"Unlock"</strong> to revert to draft status.
                          </>
                        ) : isAnalysisStarted ? (
                          <>
                            Analysis is in progress. Contact the analyst or
                            delete the parameter if necessary.
                          </>
                        ) : (
                          <>
                            Contact the assigned analyst to discuss
                            modifications or wait until analysis is complete.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-slate-100 border border-slate-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Available Actions:
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1.5">
                      {canUnlock && (
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5" />
                          <span>
                            <strong>Unlock:</strong> Revert to draft status for
                            editing
                          </span>
                        </li>
                      )}
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5" />
                        <span>
                          <strong>Delete:</strong> Permanently remove this
                          parameter
                          {isAnalysisStarted &&
                            " (will disrupt ongoing analysis)"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5" />
                        <span>
                          <strong>View:</strong> You can still view all
                          parameter details below
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== REVIEWER VIEW - ANALYSIS COMPLETED (AWAITING APPROVAL) ==========
      if (role.toLowerCase() === "reviewer" && isAnalysisCompleted && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600 animate-pulse"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Analysis Completed
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
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

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Review Actions Available
                      </h4>
                      <p className="text-sm text-slate-600">
                        <strong>Approve:</strong> If all data is accurate and
                        complete, approve to finalize the parameter.
                        <br />
                        <br />
                        <strong>Request Revision:</strong> If changes are
                        needed, send it back to the analyst with feedback.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Review Guidelines
                      </h4>
                      <p className="text-sm text-slate-600">
                        Carefully review all preparations, calculations, and
                        data. Scroll through the parameter details below to
                        verify accuracy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <p className="text-sm text-emerald-800">
                    <strong>Reminder:</strong> Your decision will be final.
                    Approved parameters cannot be edited. Parameters sent for
                    revision will return to the analyst.
                  </p>
                </div>
              </div>

              {/* Analyst Comment submitted with analysis completion */}
              {remarksByAnalystPerParam[parameterId] && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-gray-500"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-gray-700 mb-1">
                        Analyst Comment
                      </h4>
                      <p className="text-sm italic text-gray-800 bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
                        &ldquo;{remarksByAnalystPerParam[parameterId]}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      // ========== REVIEWER VIEW - ANALYSIS REVISION ==========
      if (role.toLowerCase() === "reviewer" && isAnalysisRevision && param) {
        const qaRemarks = remarksQAPerParam[parameterId];
        const reviewerRemarks = remarksByReviewerPerParam[parameterId];
        const isFromQA = !!qaRemarks;
        const activeRemarks = isFromQA ? qaRemarks : reviewerRemarks;
        const senderLabel = isFromQA ? "QA" : "Reviewer (You)";

        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Revision In Progress
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Analyst is working on the requested revisions
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg">
                  <span className="text-sm font-semibold text-emerald-800">
                    AWAITING REVISION
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 gap-4">
                {/* Revision Remarks — show what was sent */}
                {activeRemarks ? (
                  <div className="bg-white border border-emerald-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-emerald-600"
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
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-800 mb-2 flex items-center gap-2">
                          Revision Remarks Sent
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800">
                            from {senderLabel}
                          </span>
                        </h4>
                        <p className="text-sm italic leading-relaxed px-4 py-3 rounded-lg border text-emerald-900 bg-emerald-50 border-emerald-100">
                          &ldquo;{activeRemarks}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-slate-400"
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
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-800 mb-1">
                          Revision Remarks
                        </h4>
                        <p className="text-sm text-slate-400 italic">
                          No remarks were provided with this revision request.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Current Status
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            {isFromQA ? "QA" : "You"} requested revisions on
                            this parameter
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            The analyst is currently making the necessary
                            changes
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>
                            Once complete, it will be resubmitted for your
                            review
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>You can view all parameter details below</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5"
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
                    <p className="text-sm text-slate-700">
                      <strong>Please wait:</strong> The parameter will return to
                      &quot;Analysis Completed&quot; status once the analyst
                      finishes the revisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ========== Reviewer VIEW - APPROVED ==========
      if (role.toLowerCase() === "reviewer" && isApproved && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Parameter Approved & Finalized
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      This parameter has been reviewed and approved
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-1">
                        Status: Approved
                      </h4>
                      <p className="text-sm text-slate-600">
                        This parameter has been finalized and approved. All data
                        is now locked and cannot be modified.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-1">
                        View Only Access
                      </h4>
                      <p className="text-sm text-slate-600">
                        You can view all parameter details, preparations, and
                        calculations below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviewer Remarks on Approval */}
            {remarksByReviewerPerParam[parameterId] && (
              <div className="mx-6 mb-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-600"
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
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-blue-800 mb-1">
                      Reviewer Remarks
                    </h4>
                    <p className="text-sm italic text-blue-900 bg-blue-100 rounded-lg px-3 py-2 border border-blue-200">
                      &ldquo;{remarksByReviewerPerParam[parameterId]}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Analyst Comment */}
            {remarksByAnalystPerParam[parameterId] && (
              <div className="mx-6 mb-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-gray-500"
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
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1">
                      Analyst Comment
                    </h4>
                    <p className="text-sm italic text-gray-800 bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
                      &ldquo;{remarksByAnalystPerParam[parameterId]}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      // If none of the conditions match, return null (no overlay)

      // ========== QA VIEW - APPROVED (Reviewer approved, pending QA worksheet approval) ==========
      if (role.toLowerCase() === "qa" && isApproved && param) {
        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-600"
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
                    <h3 className="text-lg font-bold text-slate-800">
                      {worksheetInfo?.sample.status === "Approved"
                        ? "Worksheet Approved & Finalized"
                        : "Reviewer Approved — Pending QA Worksheet Approval"}
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {worksheetInfo?.sample.status === "Approved"
                        ? "This worksheet has been fully approved by QA. All data is locked."
                        : "You can return this parameter for revision, or approve the entire worksheet once all parameters are reviewed"}
                    </p>
                  </div>
                </div>
                {worksheetInfo?.sample.status !== "Approved" && (
                  <motion.button
                    onClick={() => handleRequestRevision(param)}
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
        );
      }

      // ========== QA VIEW - ANALYSIS REVISION (parameter sent back by QA or Reviewer) ==========
      if (role.toLowerCase() === "qa" && isAnalysisRevision && param) {
        const qaRemarks = remarksQAPerParam[parameterId];
        const reviewerRemarks = remarksByReviewerPerParam[parameterId];
        const isFromQA = !!qaRemarks;
        const activeRemarks = isFromQA ? qaRemarks : reviewerRemarks;
        const senderLabel = isFromQA ? "QA" : "Reviewer";
        const accentColor = isFromQA ? "amber" : "slate";

        return (
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            {/* Header */}
            <div
              className={`bg-gradient-to-r ${isFromQA ? "from-amber-50 via-amber-100 to-amber-50" : "from-slate-50 via-slate-100 to-slate-50"} px-6 py-5 border-b border-slate-200`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${isFromQA ? "bg-amber-100" : "bg-slate-200"} rounded-xl flex items-center justify-center`}
                  >
                    <svg
                      className={`w-6 h-6 ${isFromQA ? "text-amber-600" : "text-slate-600"} animate-pulse`}
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
                    <h3 className="text-lg font-bold text-slate-800">
                      Revision In Progress — Returned by {senderLabel}
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Analyst is working on the requested revisions
                    </p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 bg-white/60 backdrop-blur-sm border ${isFromQA ? "border-amber-200" : "border-slate-300"} rounded-lg`}
                >
                  <span
                    className={`text-sm font-semibold ${isFromQA ? "text-amber-700" : "text-slate-600"} uppercase tracking-wider`}
                  >
                    AWAITING REVISION
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className={`p-6 ${isFromQA ? "bg-amber-50" : "bg-slate-50"}`}>
              <div className="grid grid-cols-1 gap-4">
                {/* Remarks Card — most prominent */}
                {activeRemarks ? (
                  <div
                    className={`bg-white border ${isFromQA ? "border-amber-200" : "border-slate-200"} rounded-xl p-5`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 ${isFromQA ? "bg-amber-50" : "bg-slate-100"} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <svg
                          className={`w-5 h-5 ${isFromQA ? "text-amber-600" : "text-slate-600"}`}
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
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-800 mb-2 flex items-center gap-2">
                          Revision Remarks
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${isFromQA ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-600"}`}
                          >
                            from {senderLabel}
                          </span>
                        </h4>
                        <p
                          className={`text-sm italic leading-relaxed px-4 py-3 rounded-lg border ${isFromQA ? "text-amber-900 bg-amber-50 border-amber-100" : "text-slate-700 bg-slate-50 border-slate-100"}`}
                        >
                          &ldquo;{activeRemarks}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-slate-400"
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
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-800 mb-1">
                          Revision Remarks
                        </h4>
                        <p className="text-sm text-slate-400 italic">
                          No remarks provided by {senderLabel}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Info Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-slate-500"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800 mb-2">
                        Current Status
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span
                            className={`${isFromQA ? "text-amber-500" : "text-slate-400"} mt-1`}
                          >
                            •
                          </span>
                          <span>
                            {senderLabel} returned this parameter for revision
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className={`${isFromQA ? "text-amber-500" : "text-slate-400"} mt-1`}
                          >
                            •
                          </span>
                          <span>
                            The analyst is currently making the necessary
                            changes
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className={`${isFromQA ? "text-amber-500" : "text-slate-400"} mt-1`}
                          >
                            •
                          </span>
                          <span>
                            Once complete, it will be resubmitted for Reviewer
                            approval
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className={`${isFromQA ? "text-amber-500" : "text-slate-400"} mt-1`}
                          >
                            •
                          </span>
                          <span>You can view all parameter details below</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Wait notice */}
                <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5"
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
                    <p className="text-sm text-slate-700">
                      <strong>Please wait:</strong> The parameter will return to
                      &quot;Analysis Completed&quot; status once the analyst
                      finishes the revisions and the Reviewer re-approves it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return null;
    },
    (prevProps, nextProps) => {
      return (
        prevProps.parameterId === nextProps.parameterId &&
        (parameterStatusPerParam[prevProps.parameterId] || "") ===
        (parameterStatusPerParam[nextProps.parameterId] || "")
      );
    },
  );

  LockedParameterOverlay.displayName = "LockedParameterOverlay";

  return <LockedParameterOverlay parameterId={parameterId} />;
};

export default DrugLockedParameterOverlay;
