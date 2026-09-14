import type { WorksheetStandard } from "../models/WorksheetStandard";
import type { WorksheetInstrument } from "../models/WorksheetInstrument";
import type { WorksheetChemical } from "../models/WorksheetChemical";

export function useDrugReferenceResourceSelection(ctx: any) {
  const {
    instruments,
    instrumentSearch,
    chemicals,
    chemicalSearch,
    standards,
    standardSearch,
    columns,
    columnSearch,
    setColumnsPerParam,
    setShowColumnDropdown,
    setColumnSearch,
    setAddedInstruments,
    setShowInstrumentDropdown,
    setInstrumentSearch,
    formatDate,
    setAddedChemicals,
    setShowChemicalDropdown,
    setChemicalSearch,
    setAddedStandards,
    setShowStandardDropdown,
    setStandardSearch,
    setAddedInternalStandards,
    setToastMessage,
  } = ctx;

  // Instrument/Chemical/Standard Handlers
  const searchFilteredInstruments = instruments.filter(
    (inst) =>
      inst.name.toLowerCase().includes(instrumentSearch.toLowerCase()) ||
      inst
        .instrumentTag!.toLowerCase()
        .includes(instrumentSearch.toLowerCase()),
  );

  const searchFilteredChemicals = chemicals.filter(
    (chem) =>
      chem.name.toLowerCase().includes(chemicalSearch.toLowerCase()) ||
      (chem.make &&
        chem.make.toLowerCase().includes(chemicalSearch.toLowerCase())),
  );

  const searchFilteredStandards = standards.filter(
    (std) =>
      std.name.toLowerCase().includes(standardSearch.toLowerCase()) ||
      (std.make &&
        std.make.toLowerCase().includes(standardSearch.toLowerCase())),
  );


  const searchFilteredColumns = columns.filter(
    (col) =>
      col.columnNameWithDimension
        .toLowerCase()
        .includes(columnSearch.toLowerCase()) ||
      col.columnCode.toLowerCase().includes(columnSearch.toLowerCase()) ||
      (col.make &&
        col.make.toLowerCase().includes(columnSearch.toLowerCase())),
  );

  const handleSelectColumn = (parameterId: number, columnCode: string) => {
    setColumnsPerParam((prev) => ({
      ...prev,
      [parameterId]: columnCode,
    }));
    setShowColumnDropdown(false);
    setColumnSearch("");
  };

  const handleAddInstrument = (instrument: WorksheetInstrument) => {
    const normalized: WorksheetInstrument = {
      ...instrument,
      calibrationDoneDate: instrument.calibrationDoneDate ? formatDate(instrument.calibrationDoneDate) : instrument.calibrationDoneDate,
      calibrationDueDate: instrument.calibrationDueDate ? formatDate(instrument.calibrationDueDate) : instrument.calibrationDueDate,
    };
    setAddedInstruments((prev) => ({
      ...prev,
      [instrument.parameterId]: [...(prev[instrument.parameterId] || []), normalized],
    }));
    setShowInstrumentDropdown(false);
    setInstrumentSearch("");
  };

  const handleRemoveInstrument = (
    parameterId: number,
    instrumentId: string,
  ) => {
    setAddedInstruments((prev) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).filter(
        (inst) => inst.instrumentId !== instrumentId,
      ),
    }));
  };

  const handleAddChemical = (chemical: WorksheetChemical) => {
    const normalized: WorksheetChemical = {
      ...chemical,
      expDate: chemical.expDate ? formatDate(chemical.expDate) : chemical.expDate,
    };
    setAddedChemicals((prev) => ({
      ...prev,
      [chemical.parameterId]: [...(prev[chemical.parameterId] || []), normalized],
    }));
    setShowChemicalDropdown(false);
    setChemicalSearch("");
  };

  const handleRemoveChemical = (parameterId: number, chemicalId: string) => {
    setAddedChemicals((prev) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).filter(
        (chem) => chem.slno !== chemicalId,
      ),
    }));
  };

  const handleAddStandard = (standard: WorksheetStandard) => {
    setAddedStandards((prev) => ({
      ...prev,
      [standard.parameterId]: [...(prev[standard.parameterId] || []), standard],
    }));
    setShowStandardDropdown(false);
    setStandardSearch("");
  };

  const handleRemoveStandard = (parameterId: number, standardId: string) => {
    setAddedStandards((prev) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).filter(
        (std) => std.serialNo !== standardId,
      ),
    }));
  };

  // Internal Standard Preparation (Hypromellose only) - independent pool, same source data
  const handleAddInternalStandard = (standard: WorksheetStandard) => {
    setAddedInternalStandards((prev) => ({
      ...prev,
      [standard.parameterId]: [...(prev[standard.parameterId] || []), standard],
    }));
  };

  const handleRemoveInternalStandard = (
    parameterId: number,
    standardId: string,
  ) => {
    setAddedInternalStandards((prev) => ({
      ...prev,
      [parameterId]: (prev[parameterId] || []).filter(
        (std) => std.serialNo !== standardId,
      ),
    }));
  };


  const handleImportFromWorksheet = (
    paramId: number,
    data: {
      instruments: WorksheetInstrument[];
      chemicals: WorksheetChemical[];
      standards: WorksheetStandard[];
    },
  ) => {
    if (!paramId) return;

    if (data.instruments.length > 0) {
      setAddedInstruments((prev: any) => {
        const existingIds = new Set(
          (prev[paramId] || []).map((i: WorksheetInstrument) => i.instrumentId),
        );
        const toAdd = data.instruments.filter(
          (i) => !existingIds.has(i.instrumentId),
        );
        return { ...prev, [paramId]: [...(prev[paramId] || []), ...toAdd] };
      });
    }

    if (data.chemicals.length > 0) {
      setAddedChemicals((prev: any) => {
        const existingIds = new Set(
          (prev[paramId] || []).map((c: WorksheetChemical) => c.slno),
        );
        const toAdd = data.chemicals.filter((c) => !existingIds.has(c.slno));
        return { ...prev, [paramId]: [...(prev[paramId] || []), ...toAdd] };
      });
    }

    if (data.standards.length > 0) {
      setAddedStandards((prev: any) => {
        const existingIds = new Set(
          (prev[paramId] || []).map((s: WorksheetStandard) => s.serialNo),
        );
        const toAdd = data.standards.filter(
          (s) => !existingIds.has(s.serialNo),
        );
        return { ...prev, [paramId]: [...(prev[paramId] || []), ...toAdd] };
      });
    }

    setToastMessage("Details copied from worksheet successfully");
  };

  return {
    searchFilteredInstruments,
    searchFilteredChemicals,
    searchFilteredStandards,
    searchFilteredColumns,
    handleSelectColumn,
    handleAddInstrument,
    handleRemoveInstrument,
    handleAddChemical,
    handleRemoveChemical,
    handleAddStandard,
    handleRemoveStandard,
    handleAddInternalStandard,
    handleRemoveInternalStandard,
    handleImportFromWorksheet,
  };
}
