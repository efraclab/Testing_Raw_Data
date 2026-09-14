import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CgTrash } from "react-icons/cg";
import type { Standard } from "../../../preparation_models/Standard";
import type { WorksheetStandard } from "../../../models/WorksheetStandard";
import { formatDate } from "../../../utils/worksheetDateUtils";
import {
  Plus,
  Search,
  Target,
  ReferenceLoading,
  ReferenceError,
} from "../../shared/WorksheetUiHelpers";

interface DrugInternalStandardSectionProps {
  parameterId: number;
  isHypromelloseActive: boolean;
  isVisible: boolean;
  standards: Standard[];
  addedStandards: WorksheetStandard[];
  isReferenceDataLoading: boolean;
  referenceDataError: string | null;
  role: string;
  isFullyLocked: boolean;
  otherInfo: string;
  onVisibilityChange: (checked: boolean) => void;
  onAddStandard: (standard: WorksheetStandard) => void;
  onRemoveStandard: (parameterId: number, standardId: string) => void;
  onOtherInfoChange: (value: string) => void;
}

const DrugInternalStandardSection: React.FC<DrugInternalStandardSectionProps> = ({
  parameterId,
  isHypromelloseActive,
  isVisible,
  standards,
  addedStandards,
  isReferenceDataLoading,
  referenceDataError,
  role,
  isFullyLocked,
  otherInfo,
  onVisibilityChange,
  onAddStandard,
  onRemoveStandard,
  onOtherInfoChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableStandards = useMemo(() => {
    const filtered = standards.filter(
      (std) =>
        std.name.toLowerCase().includes(search.toLowerCase()) ||
        (std.make && std.make.toLowerCase().includes(search.toLowerCase())),
    );

    return filtered.filter(
      (std) => !addedStandards.find((added) => added.serialNo === std.serialNo),
    );
  }, [standards, addedStandards, search]);

  const handleAdd = (std: Standard) => {
    onAddStandard({
      id: null,
      parameterId,
      serialNo: std.serialNo,
      name: std.name,
      batchNo: std.batchNo ?? null,
      make: std.make ?? null,
      purity: std.purity ?? null,
      validity: std.validity ?? null,
    });
    setShowDropdown(false);
    setSearch("");
  };

  if (!isHypromelloseActive) return null;

  return (
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
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {isVisible ? (
                <svg
                  className="w-3 h-3 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </motion.div>
          </div>
        </div>
        <span className="text-sm font-bold text-emerald-900 tracking-tight">
          Internal Standard Preparation
        </span>
      </label>

      {isVisible && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight mb-3">
              <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full" />
              Internal Standard Details:
            </h3>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                disabled={
                  isReferenceDataLoading ||
                  !!referenceDataError ||
                  standards.length === 0
                }
                className="flex items-center gap-2 p-1.5 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                <Plus className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-80 bg-white border border-emerald-300 rounded-lg shadow-xl z-50"
                  >
                    <div className="p-2 border-b border-emerald-200">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search standards..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {availableStandards.map((std) => (
                        <button
                          key={std.serialNo}
                          onClick={() => handleAdd(std)}
                          className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                        >
                          <div className="font-semibold text-gray-900">{std.name}</div>
                          <div className="text-xs text-gray-600">
                            {std.make} • Purity: {std.purity}
                          </div>
                        </button>
                      ))}
                      {availableStandards.length === 0 && (
                        <div className="px-3 py-4 text-center text-gray-500 text-sm">
                          {search
                            ? "No matching standards"
                            : "All available standards added"}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {isReferenceDataLoading && <ReferenceLoading />}
          {referenceDataError && <ReferenceError error={referenceDataError} />}

          {!isReferenceDataLoading && !referenceDataError && (
            <>
              <table className="w-full border-collapse text-sm shadow-md">
                <thead>
                  <tr className="bg-emerald-100 border-2 border-emerald-500">
                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">Name of Standard</th>
                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">Purity</th>
                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">Make</th>
                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">Lot No./Batch No.</th>
                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">Validity</th>
                    {role === "Reviewer" && (
                      <th className="px-3 py-2 text-center font-bold w-20">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {addedStandards.length > 0 ? (
                      addedStandards.map((standard) => (
                        <motion.tr
                          key={standard.serialNo}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="border-2 border-emerald-500 hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-3 py-2 border-r-2 border-emerald-500">{standard.name || "---"}</td>
                          <td className="px-3 py-2 border-r-2 border-emerald-500">{standard.purity || "---"}</td>
                          <td className="px-3 py-2 border-r-2 border-emerald-500">{standard.make || "---"}</td>
                          <td className="px-3 py-2 border-r-2 border-emerald-500">{standard.batchNo || "---"}</td>
                          <td className="px-3 py-2 border-r-2 border-emerald-500">{formatDate(standard.validity)}</td>
                          <td className="px-3 py-2 text-center">
                            <motion.button
                              onClick={() => onRemoveStandard(parameterId, standard.serialNo)}
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              className="mx-2"
                            >
                              <CgTrash className="w-5 h-5 text-red-500" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr className="border-2 border-emerald-500">
                        <td
                          colSpan={role === "Reviewer" ? 6 : 5}
                          className="px-3 py-4 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Target className="w-8 h-8 opacity-30" />
                            <span>
                              {role === "Reviewer"
                                ? 'No internal standards added. Click "+" to add.'
                                : "No internal standards added yet."}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>

              <div className="mt-4">
                <label
                  htmlFor={`internal-standard-info-${parameterId}`}
                  className="block mb-2 text-sm font-semibold text-emerald-800"
                >
                  Internal Standard Preparation Information
                </label>
                <input
                  id={`internal-standard-info-${parameterId}`}
                  type="text"
                  value={otherInfo}
                  onChange={(e) => onOtherInfoChange(e.target.value)}
                  disabled={isFullyLocked}
                  placeholder="Enter internal standard preparation information..."
                  className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DrugInternalStandardSection;
