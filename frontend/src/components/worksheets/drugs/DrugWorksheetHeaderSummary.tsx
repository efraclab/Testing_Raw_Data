import React from "react";
import { motion } from "framer-motion";

interface DrugWorksheetHeaderSummaryProps {
  isLoading: boolean;
  error: any;
  worksheetInfo: any;
  worksheetId: any;
  displayStatus: string;
  registrationNo: string;
  allParameters: any[];
  formatDate: (value: any) => string;
  testsRequiredDisplay: string;
  methodsRequiredDisplay: string;
}

const DrugWorksheetHeaderSummary: React.FC<
  DrugWorksheetHeaderSummaryProps
> = ({
  isLoading,
  error,
  worksheetInfo,
  worksheetId,
  displayStatus,
  registrationNo,
  allParameters,
  formatDate,
  testsRequiredDisplay,
  methodsRequiredDisplay,
}) => {
  if (!worksheetInfo?.sample) {
    return null;
  }

  return (
    <>
            {/* Add after the error state check (around line 2830) */}
            {!isLoading &&
              !error &&
              worksheetInfo?.sample?.status.toLowerCase() === "approved" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 relative overflow-hidden rounded-2xl"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-1000 to-slate-800" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/50 via-emerald-500/50 to-emerald-400/50 animate-pulse" />

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                  {/* Content */}
                  <div className="relative px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl" />
                        <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/40">
                          <svg
                            className="w-10 h-10 text-white"
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
                      </motion.div>

                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                          Worksheet Approved & Finalized
                        </h2>
                        <p className="text-emerald-50 text-sm font-medium">
                          This worksheet has been reviewed and approved. All data is
                          locked and finalized.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            <div className="my-4 border border-emerald-900/40 mb-6 rounded-xl overflow-hidden shadow-xl">
              <div className="relative flex justify-between items-center px-6 py-5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-900 overflow-hidden">
                {/* Dot grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.045] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                {/* Glow blobs */}
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-12 w-28 h-28 rounded-full bg-teal-300/10 blur-2xl pointer-events-none" />
                <div className="relative flex items-center gap-4">
                  <h1 className="flex items-baseline gap-3 tracking-wide text-white">
                    <span className="text-sm font-semibold">Worksheet ID:</span>
                    <span className="text-2xl font-extrabold">{worksheetId}</span>
                  </h1>

                  {displayStatus && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="ml-4"
                    >
                      {displayStatus.toLowerCase() === "approved" ? (
                        <div className="relative">
                          <div className="relative px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.div>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                              Approved
                            </span>
                          </div>
                        </div>
                      ) : displayStatus.toLowerCase() ===
                        "submitted for analysis" ? (
                        <div className="relative px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="text-xs font-bold text-white uppercase tracking-wide">
                            In Analysis
                          </span>
                        </div>
                      ) : displayStatus.toLowerCase() === "pending for review" ? (
                        <div className="relative px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center gap-2">
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.8, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                          </motion.div>
                          <span className="text-xs font-bold text-white uppercase tracking-wide">
                            Pending For Review
                          </span>
                        </div>
                      ) : (
                        <div className="relative px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-xs font-bold text-white uppercase tracking-wide">
                            {displayStatus}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            <div className="my-4 border border-emerald-900/30 rounded-xl overflow-hidden shadow-md">
              <div className="relative grid grid-cols-2 border-b border-white/10 text-sm bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="relative flex items-center px-4 py-3 border-r border-white/10">
                  <span className="font-bold mr-2 text-emerald-300 text-xs uppercase tracking-wider">
                    Registration No:
                  </span>
                  <span className="font-semibold text-white text-sm">
                    {worksheetInfo
                      ? worksheetInfo?.sample?.registrationNo
                      : registrationNo || "---"}
                  </span>
                </div>
                <div className="relative flex items-center px-4 py-3">
                  <span className="font-bold mr-2 text-emerald-300 text-xs uppercase tracking-wider">
                    Sample Name:
                  </span>
                  <span className="font-semibold text-white text-sm">
                    {worksheetInfo?.sample?.sampleName || "---"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 text-sm bg-white">
                <div className="flex items-center px-4 py-3 border-r border-emerald-100">
                  <span className="font-bold mr-2 text-emerald-800">
                    Number of Parameters:
                  </span>
                  <span className="font-semibold text-slate-700">
                    {allParameters.length}
                  </span>
                </div>
                <div className="flex items-center px-4 py-3">
                  <span className="font-bold mr-2 text-emerald-800">Due Date:</span>
                  <span className="font-semibold text-slate-700">
                    {formatDate(worksheetInfo?.sample?.dueDate) || "---"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-0 my-8">
              <div className="my-4 border border-emerald-900/30 mb-6 rounded-xl overflow-hidden shadow-md">
                <table className="w-full border-collapse text-sm shadow-md rounded-xl overflow-hidden">
                  <tbody>
                    <tr className="border-b border-emerald-900/20 hover:bg-emerald-50 transition-colors">
                      <td className="w-10 px-4 py-4 border-r border-emerald-900/20 font-bold text-center bg-gradient-to-br from-emerald-700 to-emerald-900 text-emerald-200">
                        1
                      </td>
                      <td className="w-1/3 px-4 py-4 border-r border-emerald-100 font-bold bg-gradient-to-r from-emerald-50 to-white text-emerald-800">
                        Sample Particulars (All relevant information received with
                        sample to be entered):
                      </td>
                      <td className="px-3 py-3 font-medium">
                        {worksheetInfo?.sample?.sampleName || "---"}
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-900/20 hover:bg-emerald-50 transition-colors">
                      <td className="w-10 px-4 py-4 border-r border-emerald-900/20 font-bold text-center bg-gradient-to-br from-emerald-700 to-emerald-900 text-emerald-200">
                        2
                      </td>
                      <td className="w-1/3 px-4 py-4 border-r border-emerald-100 font-bold bg-gradient-to-r from-emerald-50 to-white text-emerald-800">
                        Test(s) required (all tests and condition to be entered):
                      </td>
                      <td className="px-3 py-3 font-medium">
                        {testsRequiredDisplay || "No parameters added"}
                      </td>
                    </tr>
                    <tr className="hover:bg-emerald-50 transition-colors">
                      <td className="w-10 px-4 py-4 border-r border-emerald-900/20 font-bold text-center bg-gradient-to-br from-emerald-700 to-emerald-900 text-emerald-200">
                        3
                      </td>
                      <td className="w-1/3 px-4 py-4 border-r border-emerald-100 font-bold bg-gradient-to-r from-emerald-50 to-white text-emerald-800">
                        Method(s) of Analysis / Testing
                      </td>
                      <td className="px-3 py-3 h-16 font-medium">
                        {methodsRequiredDisplay || "No methods"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
    </>
  );
};

export default DrugWorksheetHeaderSummary;
