import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiTestTube } from "react-icons/bi";
import {
  PREPARATION_GROUPS,
} from "./drugWorksheetConfig";
import {
  Plus,
  Check,
  Target,
} from "../../shared/WorksheetUiHelpers";

interface PreparationGroupOption {
  id: string;
  label: string;
}

interface DrugPreparationsManagementSectionProps {
  parameterId: number;
  isLocked: boolean;
  activeGroups: string[];
  availableGroups: PreparationGroupOption[];
  onToggleGroup: (parameterId: number, groupId: string) => void;
}

const DrugPreparationsManagementSection: React.FC<
  DrugPreparationsManagementSectionProps
> = ({
  parameterId,
  isLocked,
  activeGroups,
  availableGroups,
  onToggleGroup,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLocked) {
      setIsDropdownOpen(false);
    }
  }, [isLocked]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueActiveGroups = Array.from(new Set(activeGroups || []));
  const uniqueAvailableGroups = Array.from(
    new Map((availableGroups || []).map((group) => [group.id, group])).values(),
  );

  const visibleActiveGroups = uniqueActiveGroups.filter(
    (groupId) => groupId !== "mobilePhase" && groupId !== "dissoMedia",
  );

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 via-emerald-50 to-emerald-50 border border-emerald-200 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg">
              <BiTestTube className="w-6 h-6 text-white" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-900 tracking-tight">
              Preparations Management
            </h3>
            <p className="text-xs text-emerald-600 font-medium">
              Configure analysis preparations for this parameter
            </p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => {
              if (!isLocked) {
                setIsDropdownOpen((prev) => !prev);
              }
            }}
            title={
              isLocked
                ? "Preparations are locked while this parameter is under Reviewer review."
                : "Add or change preparation groups"
            }
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
            <span className="relative z-10">
              {isLocked ? "Preparations Locked" : "Add Preparations"}
            </span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && !isLocked && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-72 bg-white border border-emerald-300 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
              >
                {uniqueAvailableGroups.map((group) => {
                  const isActive = uniqueActiveGroups.includes(group.id);

                  return (
                    <button
                      key={group.id}
                      onClick={() => onToggleGroup(parameterId, group.id)}
                      className="w-full text-left px-3 py-3 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                          {group.label}
                        </span>

                        {isActive && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {visibleActiveGroups.length > 0 ? (
          <motion.div
            key="active-preparations-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
            layout
          >
            <div className="flex items-center gap-3 my-4">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent" />

              <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-900 rounded-full shadow-lg">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Preparation Group
                </span>
              </div>

              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent" />
            </div>

            <motion.div layout>
              <div className="flex flex-wrap gap-3">
                {visibleActiveGroups.map((groupId) => {
                  const group =
                    PREPARATION_GROUPS[
                      groupId as keyof typeof PREPARATION_GROUPS
                    ];

                  if (!group) return null;

                  return (
                    <motion.div
                      key={groupId}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileHover={{ scale: 1.05 }}
                      className="group relative inline-flex items-center gap-3 py-2 px-4 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-400 border-2 rounded-lg font-semibold shadow-lg shadow-emerald-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="flex items-center gap-3 relative z-10">
                        <span className="font-bold text-sm">{group.label}</span>
                      </div>

                      <motion.button
                        disabled={isLocked}
                        onClick={() => {
                          if (!isLocked) {
                            onToggleGroup(parameterId, groupId);
                          }
                        }}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative z-10 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-red-500 text-gray-600 hover:text-white transition-all font-bold border-1 border-white/50 hover:border-red-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-800"
                        title={`Remove ${group.label} group`}
                      >
                        <span className="text-[9px] text-white inline-flex items-center justify-center h-full w-full">
                          ✕
                        </span>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-gradient-to-r from-emerald-50 via-emerald-50 to-emerald-50 border-2 border-emerald-200 rounded-xl shadow-inner"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-lg">💡</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-emerald-800 font-semibold mb-1">
                      Quick Guide
                    </p>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Click the{" "}
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full text-red-500 font-bold mx-1">
                        ✕
                      </span>{" "}
                      button to remove a preparation group and all its data. Use{" "}
                      <strong>"Add Preparation"</strong> to enable more groups.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-state-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl border-2 border-dashed border-gray-300 shadow-inner"
            layout
          >
            <div className="inline-block">
              <Target className="w-14 h-14 text-gray-300" />
            </div>

            <p className="text-base font-bold text-gray-800 mb-2">
              No preparation groups configured yet
            </p>

            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {isLocked ? (
                <>
                  This parameter is currently locked for review. Preparation
                  groups cannot be added or changed by the Reviewer.
                </>
              ) : (
                <>
                  Click the{" "}
                  <strong className="text-emerald-800">
                    "Add Preparation"
                  </strong>{" "}
                  button above to select preparation groups for this parameter
                </>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DrugPreparationsManagementSection;
