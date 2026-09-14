import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DrugAdditionalInfoSectionProps {
  parameterId: number;
  isVisible: boolean;
  value: string;
  onVisibilityChange: (checked: boolean) => void;
  onValueChange: (value: string) => void;
}

const DrugAdditionalInfoSection: React.FC<DrugAdditionalInfoSectionProps> = ({
  parameterId,
  isVisible,
  value,
  onVisibilityChange,
  onValueChange,
}) => {
  return (
    <>
      {/* Additional Info Toggle */}
      <div className="mb-6 mt-8">
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
                Additional Info
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
              Toggle additional info section
            </p>
          </div>
        </label>
      </div>

      {/* Additional Info Section */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            className="mb-6 p-6 bg-white rounded-xl border-2 border-emerald-200 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-full"></span>
              <h2 className="text-lg font-bold text-emerald-800 tracking-tight">
                Additional Info
              </h2>
            </div>

            <textarea
              id={`additional-info-${parameterId}`}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              rows={4}
              placeholder="Enter any additional information..."
              className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-y bg-white text-gray-700 placeholder-gray-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DrugAdditionalInfoSection;
