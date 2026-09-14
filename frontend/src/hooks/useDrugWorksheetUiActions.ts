export function useDrugWorksheetUiActions(ctx: any) {
  const {
    onPrint,
    worksheetInfo,
    analysts,
    samplesData,
    setSelectedParamsForDetail,
  } = ctx;

    const handlePrintClick = () => {
      // samplesData is an array so always truthy — guard with .length
      if (onPrint && worksheetInfo && analysts && samplesData?.length) {
        onPrint(worksheetInfo, analysts, samplesData[0]);
      }
    };

    const toggleParameterDetail = (id: number) => {
      setSelectedParamsForDetail((prev) =>
        prev.includes(id)
          ? prev.filter((paramId) => paramId !== id)
          : [...prev, id],
      );
    };

  return {
    handlePrintClick,
    toggleParameterDetail,
  };
}
