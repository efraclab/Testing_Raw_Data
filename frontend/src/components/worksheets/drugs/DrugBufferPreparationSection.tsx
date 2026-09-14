import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BufferPreparation as BufferPreparationModel } from "../../../preparation_models/drugs/BufferPreparation";
import BufferPreparationDetail from "../../sub-components/drugs/BufferPreparationDetail";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface DrugBufferPreparationSectionProps {
  parameterId: number;
  isVisible: boolean;
  preparations: BufferPreparationModel[];
  onVisibilityChange: (checked: boolean) => void;
  onAdd: (parameterId: number) => void;
  onRemove: (parameterId: number, bufferPrepId: number) => void;
  onStepChange: (
    parameterId: number,
    bufferPrepId: number,
    stepName: string,
    field: "value1" | "unit1" | "logBookID" | "solventChemical",
    newValue: string,
  ) => void;
}

const DrugBufferPreparationSection: React.FC<
  DrugBufferPreparationSectionProps
> = ({
  parameterId,
  isVisible,
  preparations,
  onVisibilityChange,
  onAdd,
  onRemove,
  onStepChange,
}) => {
  return (
    <>
      {/* Buffer Preparation Toggle */}
      <div className="mb-6 mt-4">
        <label className="flex items-center gap-4 cursor-pointer group relative">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-all duration-300" />

            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => onVisibilityChange(e.target.checked)}
              className="peer sr-only"
            />

            <div className="relative w-14 h-7 rounded-full border-2 border-emerald-200 bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-emerald-700 peer-checked:to-emerald-900 peer-checked:border-emerald-600 transition-all duration-300 shadow-inner group-hover:border-emerald-300">
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                animate={{ x: isVisible ? 28 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                {isVisible ? (
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
                Buffer Preparation
              </span>

              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-all duration-200 ${
                  isVisible
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                {isVisible ? "Active" : "Inactive"}
              </motion.span>
            </div>

            <p className="text-xs text-emerald-600/70">
              Toggle buffer preparation section
            </p>
          </div>
        </label>
      </div>

      {/* Buffer Preparation Section */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            className="mb-6 p-6 bg-white rounded-xl border-2 border-emerald-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full" />
                <div>
                  <h2 className="text-lg font-bold text-emerald-800 tracking-tight">
                    Buffer Preparations
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAdd(parameterId)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Buffer Preparation
                </button>
              </div>
            </div>

            <AnimatePresence>
              {preparations.map((bufferPrep) => (
                <div key={bufferPrep.id}>
                  <BufferPreparationDetail
                    buffer={bufferPrep}
                    onStepChange={(
                      bufferPrepId,
                      stepName,
                      field,
                      newValue,
                    ) =>
                      onStepChange(
                        parameterId,
                        bufferPrepId,
                        stepName,
                        field,
                        newValue,
                      )
                    }
                    onRemove={() => onRemove(parameterId, bufferPrep.id)}
                  />
                </div>
              ))}
            </AnimatePresence>

            {preparations.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl"
              >
                <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-3">
                  <Target className="w-10 h-10 text-emerald-400" />
                </div>

                <p className="text-base font-bold text-emerald-800 mb-1">
                  No buffer preparations added yet
                </p>

                <p className="text-sm text-emerald-600/80">
                  Click "Add Buffer Preparation" to begin
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DrugBufferPreparationSection;
