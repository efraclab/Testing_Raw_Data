import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, X, AlertTriangle, Loader2, ShieldAlert } from "lucide-react";

interface RevertApprovalDialogProps {
  isOpen: boolean;
  isReverting: boolean;
  worksheetId: string;
  onClose: () => void;
  onConfirm: () => void;
}

const RevertApprovalDialog: React.FC<RevertApprovalDialogProps> = ({
  isOpen,
  isReverting,
  worksheetId,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => !isReverting && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-700 to-slate-900 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Revert QA Approval</h3>
                  <p className="text-sm text-rose-200 mt-0.5">Undo the final approval on this worksheet</p>
                </div>
                {!isReverting && (
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Worksheet Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Worksheet ID</span>
                  <p className="text-sm text-slate-900 font-semibold font-mono">{worksheetId}</p>
                </div>
              </div>

              {/* Status change */}
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                  </div>
                  <p className="text-sm text-rose-900 leading-relaxed">
                    Status will change from{" "}
                    <span className="inline-flex items-center mx-0.5 px-1.5 py-0.5 bg-emerald-100 border border-emerald-300 rounded text-[10px] font-semibold text-emerald-700">
                      APPROVED
                    </span>{" "}
                    back to{" "}
                    <span className="inline-flex items-center mx-0.5 px-1.5 py-0.5 bg-violet-100 border border-violet-300 rounded text-[10px] font-semibold text-violet-700">
                      SUBMITTED FOR QA REVIEW
                    </span>
                    . The approval signature (who approved it, and when) will be cleared.
                  </p>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    QA will need to <strong>re-review and re-approve</strong> this worksheet before it can be finalized again.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-50 px-6 py-4 flex gap-3 border-t border-slate-200">
              <button
                onClick={onClose}
                disabled={isReverting}
                className="flex-1 px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isReverting}
                className="flex-1 px-6 py-2.5 bg-gradient-to-r from-rose-700 to-slate-800 text-white font-medium rounded-lg hover:from-rose-800 hover:to-slate-900 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isReverting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Reverting...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Yes, Revert Approval</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevertApprovalDialog;