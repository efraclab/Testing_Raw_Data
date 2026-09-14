import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgTrash } from "react-icons/cg";
import CopyFromWorksheetDialog from "../../shared/Copyfromworksheetdialog.tsx";
import { formatDate } from "../../../utils/worksheetDateUtils";
import { Plus, Search, Target, ReferenceLoading, ReferenceError } from "../../shared/WorksheetUiHelpers";

interface DrugWorksheetResourcesSectionProps {
  parameterId: number;
  role: string;
  employeeId: string;
  worksheetId: any;
  worksheetInfo: any;

  isReferenceDataLoading: boolean;
  referenceDataError: any;

  instrumentRef: any;
  showInstrumentDropdown: boolean;
  setShowInstrumentDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  instrumentSearch: string;
  setInstrumentSearch: React.Dispatch<React.SetStateAction<string>>;
  instruments: any[];
  searchFilteredInstruments: any[];
  addedInstruments: Record<number, any[]>;
  handleAddInstrument: (...args: any[]) => void;
  handleRemoveInstrument: (...args: any[]) => void;

  chemicalRef: any;
  showChemicalDropdown: boolean;
  setShowChemicalDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  chemicalSearch: string;
  setChemicalSearch: React.Dispatch<React.SetStateAction<string>>;
  chemicals: any[];
  searchFilteredChemicals: any[];
  addedChemicals: Record<number, any[]>;
  handleAddChemical: (...args: any[]) => void;
  handleRemoveChemical: (...args: any[]) => void;

  standardRef: any;
  showStandardDropdown: boolean;
  setShowStandardDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  standardSearch: string;
  setStandardSearch: React.Dispatch<React.SetStateAction<string>>;
  standards: any[];
  searchFilteredStandards: any[];
  addedStandards: Record<number, any[]>;
  handleAddStandard: (...args: any[]) => void;
  handleRemoveStandard: (...args: any[]) => void;

  showCopyWorksheetDialog: boolean;
  setShowCopyWorksheetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleImportFromWorksheet: (...args: any[]) => void;

  columnRef: any;
  showColumnDropdown: boolean;
  setShowColumnDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  columnSearch: string;
  setColumnSearch: React.Dispatch<React.SetStateAction<string>>;
  columns: any[];
  searchFilteredColumns: any[];
  columnsPerParam: Record<number, string>;
  handleSelectColumn: (...args: any[]) => void;
}

const DrugWorksheetResourcesSection: React.FC<
  DrugWorksheetResourcesSectionProps
> = (props) => {
  const {
    parameterId,
    role,
    employeeId,
    worksheetId,
    worksheetInfo,
    isReferenceDataLoading,
    referenceDataError,
    instrumentRef,
    showInstrumentDropdown,
    setShowInstrumentDropdown,
    instrumentSearch,
    setInstrumentSearch,
    instruments,
    searchFilteredInstruments,
    addedInstruments,
    handleAddInstrument,
    handleRemoveInstrument,
    chemicalRef,
    showChemicalDropdown,
    setShowChemicalDropdown,
    chemicalSearch,
    setChemicalSearch,
    chemicals,
    searchFilteredChemicals,
    addedChemicals,
    handleAddChemical,
    handleRemoveChemical,
    standardRef,
    showStandardDropdown,
    setShowStandardDropdown,
    standardSearch,
    setStandardSearch,
    standards,
    searchFilteredStandards,
    addedStandards,
    handleAddStandard,
    handleRemoveStandard,
    showCopyWorksheetDialog,
    setShowCopyWorksheetDialog,
    handleImportFromWorksheet,
    columnRef,
    showColumnDropdown,
    setShowColumnDropdown,
    columnSearch,
    setColumnSearch,
    columns,
    searchFilteredColumns,
    columnsPerParam,
    handleSelectColumn,
  } = props;

  return (
    <>
                          {/* Copy from another worksheet */}
                          <div className="mb-4 flex justify-end">
                            <button
                              onClick={() => setShowCopyWorksheetDialog(true)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-emerald-400 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm text-xs"
                            >
                              Copy from Worksheet
                            </button>
                          </div>

                          {/* Instruments Details */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight mb-3">
                                <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                                Instruments Details:
                              </h3>

                              <div className="relative" ref={instrumentRef}>
                                <button
                                  onClick={() =>
                                    setShowInstrumentDropdown(
                                      !showInstrumentDropdown,
                                    )
                                  }
                                  disabled={
                                    isReferenceDataLoading ||
                                    !!referenceDataError ||
                                    instruments.length === 0
                                  }
                                  className="flex items-center gap-2 p-1.5 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>

                                <AnimatePresence>
                                  {showInstrumentDropdown && (
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
                                            placeholder="Search instruments..."
                                            value={instrumentSearch}
                                            onChange={(e) =>
                                              setInstrumentSearch(e.target.value)
                                            }
                                            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="max-h-64 overflow-y-auto">
                                        {searchFilteredInstruments
                                          .filter(
                                            (inst) =>
                                              !addedInstruments[
                                                parameterId
                                              ]?.find(
                                                (added) => added.instrumentId === inst.id,
                                              ),
                                          )
                                          .map((inst) => (
                                            <button
                                              key={inst.id}
                                              onClick={() =>
                                                handleAddInstrument(
                                                  {
                                                    id: null,
                                                    parameterId: parameterId,
                                                    instrumentId: inst.id,
                                                    name: inst.name,
                                                    instrumentTag: inst.instrumentTag ?? null,
                                                    make: inst.make ?? null,
                                                    calibrationDoneDate: inst.calibrationDoneDate ?? null,
                                                    calibrationDueDate: inst.calibrationDueDate ?? null,
                                                  },
                                                )
                                              }
                                              className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                                            >
                                              <div className="font-semibold text-gray-900">
                                                {inst.name}
                                              </div>
                                              <div className="text-xs text-gray-600">
                                                {inst.instrumentTag!}
                                              </div>
                                            </button>
                                          ))}
                                        {searchFilteredInstruments.filter(
                                          (inst) =>
                                            !addedInstruments[
                                              parameterId
                                            ]?.find(
                                              (added) => added.instrumentId === inst.id,
                                            ),
                                        ).length === 0 && (
                                            <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                              {instrumentSearch
                                                ? "No matching instruments"
                                                : "All available instruments added"}
                                            </div>
                                          )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>

                            {isReferenceDataLoading && <ReferenceLoading />}
                            {referenceDataError && (
                              <ReferenceError error={referenceDataError} />
                            )}

                            {!isReferenceDataLoading && !referenceDataError && (
                              <table className="w-full border-collapse text-sm shadow-md">
                                <thead>
                                  <tr className="bg-emerald-100 border-2 border-emerald-500">
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Instrument Tag
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Instrument Name
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Calibration Done On
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Calibration Due On
                                    </th>
                                    {role === "Reviewer" && (
                                      <th className="px-3 py-2 text-center font-bold w-20">
                                        Action
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <AnimatePresence>
                                    {addedInstruments[parameterId]?.length >
                                      0 ? (
                                      addedInstruments[parameterId].map(
                                        (instrument) => (
                                          <motion.tr
                                            key={instrument.instrumentId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="border-2 border-emerald-500 hover:bg-emerald-50 transition-colors"
                                          >
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {instrument.instrumentTag! || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {instrument.name || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {formatDate(instrument.calibrationDoneDate)}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {formatDate(instrument.calibrationDueDate)}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                              <motion.button
                                                onClick={() =>
                                                  handleRemoveInstrument(
                                                    parameterId,
                                                    instrument.instrumentId!,
                                                  )
                                                }
                                                whileHover={{
                                                  scale: 1.1,
                                                  rotate: 10,
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                className="mx-2"
                                              >
                                                <CgTrash className="w-5 h-5 text-red-500" />
                                              </motion.button>
                                            </td>
                                          </motion.tr>
                                        ),
                                      )
                                    ) : (
                                      <tr className="border-2 border-emerald-500">
                                        <td
                                          colSpan={role === "Reviewer" ? 5 : 4}
                                          className="px-3 py-4 text-center text-gray-500"
                                        >
                                          <div className="flex flex-col items-center gap-2">
                                            <Target className="w-8 h-8 opacity-30" />
                                            <span>
                                              {role === "Reviewer"
                                                ? 'No instruments added. Click "Add Instrument" to add.'
                                                : "No instruments added yet."}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </AnimatePresence>
                                </tbody>
                              </table>
                            )}
                          </div>

                          {/* Chemicals Used - Dynamic with Add/Remove */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight mb-3">
                                <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                                Reagents and Chemicals Details:
                              </h3>

                              <div className="relative" ref={chemicalRef}>
                                <button
                                  onClick={() =>
                                    setShowChemicalDropdown(!showChemicalDropdown)
                                  }
                                  disabled={
                                    isReferenceDataLoading ||
                                    !!referenceDataError ||
                                    chemicals.length === 0
                                  }
                                  className="flex items-center gap-2 p-1.5 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>

                                <AnimatePresence>
                                  {showChemicalDropdown && (
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
                                            placeholder="Search chemicals..."
                                            value={chemicalSearch}
                                            onChange={(e) =>
                                              setChemicalSearch(e.target.value)
                                            }
                                            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="max-h-64 overflow-y-auto">
                                        {searchFilteredChemicals
                                          .filter(
                                            (chem) =>
                                              !addedChemicals[
                                                parameterId
                                              ]?.find(
                                                (added) => added.slno === chem.slno,
                                              ),
                                          )
                                          .map((chem) => (
                                            <button
                                              key={chem.slno}
                                              onClick={() =>
                                                handleAddChemical(
                                                  {
                                                    id: null,
                                                    parameterId: parameterId,
                                                    slno: chem.slno,
                                                    name: chem.name,
                                                    code: chem.code ?? null,
                                                    make: chem.make ?? null,
                                                    batchNo: chem.batchNo ?? null,
                                                    expDate: chem.exp_Date ?? null,
                                                  },
                                                )
                                              }
                                              className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                                            >
                                              <div className="font-semibold text-gray-900">
                                                {chem.name}
                                              </div>
                                              <div className="text-xs text-gray-600">
                                                {chem.make} • Batch: {chem.batchNo}
                                              </div>
                                            </button>
                                          ))}
                                        {searchFilteredChemicals.filter(
                                          (chem) =>
                                            !addedChemicals[parameterId]?.find(
                                              (added) => added.slno === chem.slno,
                                            ),
                                        ).length === 0 && (
                                            <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                              {chemicalSearch
                                                ? "No matching chemicals"
                                                : "All available chemicals added"}
                                            </div>
                                          )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>

                            {isReferenceDataLoading && <ReferenceLoading />}
                            {referenceDataError && (
                              <ReferenceError error={referenceDataError} />
                            )}

                            {!isReferenceDataLoading && !referenceDataError && (
                              <table className="w-full border-collapse text-sm shadow-md">
                                <thead>
                                  <tr className="bg-emerald-100 border-2 border-emerald-500">
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Name of Solvents
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Code
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Make
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Lot No./Batch No.
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Validity
                                    </th>
                                    {role === "Reviewer" && (
                                      <th className="px-3 py-2 text-center font-bold w-20">
                                        Action
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <AnimatePresence>
                                    {addedChemicals[parameterId]?.length >
                                      0 ? (
                                      addedChemicals[parameterId].map(
                                        (chemical) => (
                                          <motion.tr
                                            key={chemical.slno}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="border-2 border-emerald-500 hover:bg-emerald-50 transition-colors"
                                          >
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {chemical.name || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {chemical.code || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {chemical.make || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {chemical.batchNo || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {formatDate(chemical.expDate)}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                              <motion.button
                                                onClick={() =>
                                                  handleRemoveChemical(
                                                    parameterId,
                                                    chemical.slno,
                                                  )
                                                }
                                                whileHover={{
                                                  scale: 1.1,
                                                  rotate: 10,
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                className="mx-2"
                                              >
                                                <CgTrash className="w-5 h-5 text-red-500" />
                                              </motion.button>
                                            </td>
                                          </motion.tr>
                                        ),
                                      )
                                    ) : (
                                      <tr className="border-2 border-emerald-500">
                                        <td
                                          colSpan={role === "Reviewer" ? 5 : 4}
                                          className="px-3 py-4 text-center text-gray-500"
                                        >
                                          <div className="flex flex-col items-center gap-2">
                                            <Target className="w-8 h-8 opacity-30" />
                                            <span>
                                              {role === "Reviewer"
                                                ? 'No chemicals added. Click "Add Chemical" to add.'
                                                : "No chemicals added yet."}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </AnimatePresence>
                                </tbody>
                              </table>
                            )}
                          </div>

                          {/* Standards Used - Dynamic with Add/Remove */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight mb-3">
                                <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                                Standards Details:
                              </h3>

                              <div className="relative" ref={standardRef}>
                                <button
                                  onClick={() =>
                                    setShowStandardDropdown(!showStandardDropdown)
                                  }
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
                                  {showStandardDropdown && (
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
                                            value={standardSearch}
                                            onChange={(e) =>
                                              setStandardSearch(e.target.value)
                                            }
                                            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="max-h-64 overflow-y-auto">
                                        {searchFilteredStandards
                                          .filter(
                                            (std) =>
                                              !addedStandards[
                                                parameterId
                                              ]?.find(
                                                (added) =>
                                                  added.serialNo === std.serialNo,
                                              ),
                                          )
                                          .map((std) => (
                                            <button
                                              key={std.serialNo}
                                              onClick={() =>
                                                handleAddStandard(
                                                  {
                                                    id: null,
                                                    parameterId: parameterId,
                                                    serialNo: std.serialNo,
                                                    name: std.name,
                                                    batchNo: std.batchNo ?? null,
                                                    make: std.make ?? null,
                                                    purity: std.purity ?? null,
                                                    validity: std.validity ?? null,
                                                  },
                                                )
                                              }
                                              className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                                            >
                                              <div className="font-semibold text-gray-900">
                                                {std.name}
                                              </div>
                                              <div className="text-xs text-gray-600">
                                                {std.make} • Purity: {std.purity}
                                              </div>
                                            </button>
                                          ))}
                                        {searchFilteredStandards.filter(
                                          (std) =>
                                            !addedStandards[parameterId]?.find(
                                              (added) =>
                                                added.serialNo === std.serialNo,
                                            ),
                                        ).length === 0 && (
                                            <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                              {standardSearch
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
                            {referenceDataError && (
                              <ReferenceError error={referenceDataError} />
                            )}

                            {!isReferenceDataLoading && !referenceDataError && (
                              <table className="w-full border-collapse text-sm shadow-md">
                                <thead>
                                  <tr className="bg-emerald-100 border-2 border-emerald-500">
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Name of Standard
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Purity
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Make
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Lot No./Batch No.
                                    </th>
                                    <th className="px-3 py-2 border-r-2 border-emerald-500 text-left font-bold">
                                      Validity
                                    </th>
                                    {role === "Reviewer" && (
                                      <th className="px-3 py-2 text-center font-bold w-20">
                                        Action
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <AnimatePresence>
                                    {addedStandards[parameterId]?.length >
                                      0 ? (
                                      addedStandards[parameterId].map(
                                        (standard) => (
                                          <motion.tr
                                            key={standard.serialNo}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="border-2 border-emerald-500 hover:bg-emerald-50 transition-colors"
                                          >
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {standard.name || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {standard.purity || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {standard.make || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {standard.batchNo || "---"}
                                            </td>
                                            <td className="px-3 py-2 border-r-2 border-emerald-500">
                                              {formatDate(standard.validity)}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                              <motion.button
                                                onClick={() =>
                                                  handleRemoveStandard(
                                                    parameterId,
                                                    standard.serialNo,
                                                  )
                                                }
                                                whileHover={{
                                                  scale: 1.1,
                                                  rotate: 10,
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                className="mx-2"
                                              >
                                                <CgTrash className="w-5 h-5 text-red-500" />
                                              </motion.button>
                                            </td>
                                          </motion.tr>
                                        ),
                                      )
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
                                                ? 'No standards added. Click "Add Standard" to add.'
                                                : "No standards added yet."}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </AnimatePresence>
                                </tbody>
                              </table>
                            )}
                          </div>

                          <CopyFromWorksheetDialog
                            isOpen={showCopyWorksheetDialog}
                            onClose={() => setShowCopyWorksheetDialog(false)}
                            currentWorksheetId={worksheetId}
                            sampleName={worksheetInfo?.sample?.sampleName}
                            targetParameterId={parameterId}
                            fetchRequest={{ employeeId, role }}
                            includeStandards={true}
                            existingInstrumentIds={(addedInstruments[parameterId] || []).map((i) => i.instrumentId)}
                            existingChemicalIds={(addedChemicals[parameterId] || []).map((c) => c.slno)}
                            existingStandardIds={(addedStandards[parameterId] || []).map((s) => s.serialNo)}
                            referenceInstruments={instruments}
                            referenceChemicals={chemicals}
                            referenceStandards={standards}
                            onImport={(data) => handleImportFromWorksheet(parameterId, data)}
                          />

                                                    {/* Column Details */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2.5 tracking-tight mb-3">
                                <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                                Column Details:
                              </h3>

                              <div className="relative" ref={columnRef}>
                                <button
                                  onClick={() =>
                                    setShowColumnDropdown(!showColumnDropdown)
                                  }
                                  disabled={
                                    isReferenceDataLoading ||
                                    !!referenceDataError ||
                                    columns.length === 0
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                >
                                  <Search className="w-4 h-4" />
                                  <span>
                                    {columnsPerParam[parameterId]
                                      ? columnsPerParam[parameterId]
                                      : "Select Column"}
                                  </span>
                                </button>

                                <AnimatePresence>
                                  {showColumnDropdown && (
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
                                            placeholder="Search columns..."
                                            value={columnSearch}
                                            onChange={(e) =>
                                              setColumnSearch(e.target.value)
                                            }
                                            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="max-h-64 overflow-y-auto">
                                        {searchFilteredColumns.map((col) => (
                                          <button
                                            key={col.columnCode}
                                            onClick={() =>
                                              handleSelectColumn(
                                                parameterId,
                                                col.columnCode,
                                              )
                                            }
                                            className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-emerald-200 last:border-b-0 transition-colors text-sm"
                                          >
                                            <div className="font-semibold text-gray-900">
                                              {col.columnCode}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                              {col.columnNameWithDimension}
                                            </div>
                                          </button>
                                        ))}
                                        {searchFilteredColumns.length === 0 && (
                                          <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                            {columnSearch
                                              ? "No matching columns"
                                              : "No columns available"}
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>


    </>
  );
};

export default DrugWorksheetResourcesSection;
