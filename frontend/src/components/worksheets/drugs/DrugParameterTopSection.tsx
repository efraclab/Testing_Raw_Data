import React from "react";
import DrugParameterOverviewSection from "./DrugParameterOverviewSection";
import DrugLockedParameterOverlay from "./DrugLockedParameterOverlay";
import DrugWorksheetResourcesSection from "./DrugWorksheetResourcesSection";

interface DrugParameterTopSectionProps {
  ctx: any;
}

const DrugParameterTopSection: React.FC<DrugParameterTopSectionProps> = ({ ctx }) => {
  const {
    selectedParam,
    role,
    toggleParameterDetail,
    formatDate,
    analyzedByPerParam,
    analyzedByNamePerParam,
    analysisStartDatePerParam,
    analysisCompletionDatePerParam,
    revisionStartDatePerParam,
    revisionCompletedDatePerParam,
    approvedByReviewerPerParam,
    approvedByReviewerNamePerParam,
    approvedAtReviewerPerParam,
    isLocked,
    parameterStatusPerParam,
    addedParameters,
    revisionStartedParams,
    remarksQAPerParam,
    remarksByReviewerPerParam,
    remarksByAnalystPerParam,
    worksheetInfo,
    handleInitiateUnlock,
    handleStartAnalysis,
    handleCompleteAnalysis,
    handleRequestRevision,
    handleStartRevision,
    handleApprove,
    handleInitiateDelete,
    handleReassignAnalyst,
    isPreparationLocked,
    employeeId,
    worksheetId,
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
  } = ctx;

  return (
    <>
                          <DrugParameterOverviewSection
                            parameter={selectedParam}
                            role={role}
                            toggleParameterDetail={toggleParameterDetail}
                            formatDate={formatDate}
                            analyzedByPerParam={analyzedByPerParam}
                            analyzedByNamePerParam={analyzedByNamePerParam}
                            analysisStartDatePerParam={analysisStartDatePerParam}
                            analysisCompletionDatePerParam={
                              analysisCompletionDatePerParam
                            }
                            revisionStartDatePerParam={revisionStartDatePerParam}
                            revisionCompletedDatePerParam={
                              revisionCompletedDatePerParam
                            }
                            approvedByReviewerPerParam={
                              approvedByReviewerPerParam
                            }
                            approvedByReviewerNamePerParam={
                              approvedByReviewerNamePerParam
                            }
                            approvedAtReviewerPerParam={
                              approvedAtReviewerPerParam
                            }
                            isLocked={isLocked}
                            handleReassignAnalyst={handleReassignAnalyst}
                          />

                        {isLocked && (
                          <DrugLockedParameterOverlay
                            parameterId={selectedParam.id}
                            role={role}
                            parameterStatusPerParam={parameterStatusPerParam}
                            addedParameters={addedParameters}
                            revisionStartedParams={revisionStartedParams}
                            remarksQAPerParam={remarksQAPerParam}
                            remarksByReviewerPerParam={remarksByReviewerPerParam}
                            remarksByAnalystPerParam={remarksByAnalystPerParam}
                            worksheetInfo={worksheetInfo}
                            handleInitiateUnlock={handleInitiateUnlock}
                            handleStartAnalysis={handleStartAnalysis}
                            handleCompleteAnalysis={handleCompleteAnalysis}
                            handleRequestRevision={handleRequestRevision}
                            handleStartRevision={handleStartRevision}
                            handleApprove={handleApprove}
                            handleInitiateDelete={handleInitiateDelete}
                          />
                        )}

                        <div
                          className={
                            isPreparationLocked
                              ? "pointer-events-none opacity-70"
                              : ""
                          }
                        >
                          <DrugWorksheetResourcesSection
                            parameterId={selectedParam.id}
                            role={role}
                            employeeId={employeeId}
                            worksheetId={worksheetId}
                            worksheetInfo={worksheetInfo}
                            isReferenceDataLoading={isReferenceDataLoading}
                            referenceDataError={referenceDataError}

                            instrumentRef={instrumentRef}
                            showInstrumentDropdown={showInstrumentDropdown}
                            setShowInstrumentDropdown={setShowInstrumentDropdown}
                            instrumentSearch={instrumentSearch}
                            setInstrumentSearch={setInstrumentSearch}
                            instruments={instruments}
                            searchFilteredInstruments={searchFilteredInstruments}
                            addedInstruments={addedInstruments}
                            handleAddInstrument={handleAddInstrument}
                            handleRemoveInstrument={handleRemoveInstrument}

                            chemicalRef={chemicalRef}
                            showChemicalDropdown={showChemicalDropdown}
                            setShowChemicalDropdown={setShowChemicalDropdown}
                            chemicalSearch={chemicalSearch}
                            setChemicalSearch={setChemicalSearch}
                            chemicals={chemicals}
                            searchFilteredChemicals={searchFilteredChemicals}
                            addedChemicals={addedChemicals}
                            handleAddChemical={handleAddChemical}
                            handleRemoveChemical={handleRemoveChemical}

                            standardRef={standardRef}
                            showStandardDropdown={showStandardDropdown}
                            setShowStandardDropdown={setShowStandardDropdown}
                            standardSearch={standardSearch}
                            setStandardSearch={setStandardSearch}
                            standards={standards}
                            searchFilteredStandards={searchFilteredStandards}
                            addedStandards={addedStandards}
                            handleAddStandard={handleAddStandard}
                            handleRemoveStandard={handleRemoveStandard}

                            showCopyWorksheetDialog={showCopyWorksheetDialog}
                            setShowCopyWorksheetDialog={setShowCopyWorksheetDialog}
                            handleImportFromWorksheet={handleImportFromWorksheet}

                            columnRef={columnRef}
                            showColumnDropdown={showColumnDropdown}
                            setShowColumnDropdown={setShowColumnDropdown}
                            columnSearch={columnSearch}
                            setColumnSearch={setColumnSearch}
                            columns={columns}
                            searchFilteredColumns={searchFilteredColumns}
                            columnsPerParam={columnsPerParam}
                            handleSelectColumn={handleSelectColumn}
                          />
                        </div>
    </>
  );
};

export default DrugParameterTopSection;
