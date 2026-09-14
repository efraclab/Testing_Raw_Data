import { useCallback, useEffect, useRef, useState } from "react";
import type { Column } from "../preparation_models/Column";
import { getColumns } from "../services/api";

export function useDrugReferenceResourceUi() {
  const [showInstrumentDropdown, setShowInstrumentDropdown] = useState(false);
  const [showChemicalDropdown, setShowChemicalDropdown] = useState(false);
  const [showStandardDropdown, setShowStandardDropdown] = useState(false);
  const [showCopyWorksheetDialog, setShowCopyWorksheetDialog] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  const [instrumentSearch, setInstrumentSearch] = useState("");
  const [chemicalSearch, setChemicalSearch] = useState("");
  const [standardSearch, setStandardSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState("");

  const [columns, setColumns] = useState<Column[]>([]);

  const instrumentRef = useRef<HTMLDivElement>(null);
  const chemicalRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getColumns()
      .then((data) => setColumns(data))
      .catch((err) => console.warn("Failed to load columns:", err));
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      instrumentRef.current &&
      !instrumentRef.current.contains(event.target as Node)
    ) {
      setShowInstrumentDropdown(false);
    }

    if (
      chemicalRef.current &&
      !chemicalRef.current.contains(event.target as Node)
    ) {
      setShowChemicalDropdown(false);
    }

    if (
      standardRef.current &&
      !standardRef.current.contains(event.target as Node)
    ) {
      setShowStandardDropdown(false);
    }

    if (
      columnRef.current &&
      !columnRef.current.contains(event.target as Node)
    ) {
      setShowColumnDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return {
    showInstrumentDropdown,
    setShowInstrumentDropdown,
    showChemicalDropdown,
    setShowChemicalDropdown,
    showStandardDropdown,
    setShowStandardDropdown,
    showCopyWorksheetDialog,
    setShowCopyWorksheetDialog,
    showColumnDropdown,
    setShowColumnDropdown,
    instrumentSearch,
    setInstrumentSearch,
    chemicalSearch,
    setChemicalSearch,
    standardSearch,
    setStandardSearch,
    columnSearch,
    setColumnSearch,
    columns,
    instrumentRef,
    chemicalRef,
    standardRef,
    columnRef,
  };
}
