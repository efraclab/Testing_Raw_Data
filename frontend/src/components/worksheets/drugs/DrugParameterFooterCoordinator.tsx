import React from "react";
import DrugSystemSuitabilitySection from "./DrugSystemSuitabilitySection";
import DrugParameterFilesSection from "./DrugParameterFilesSection";
import DrugBottomParameterActionBar from "./DrugBottomParameterActionBar";

interface DrugParameterFooterCoordinatorProps {
  ctx: any;
}

const DrugParameterFooterCoordinator: React.FC<
  DrugParameterFooterCoordinatorProps
> = ({ ctx }) => {
  const {
    selectedParam,
    isLocked,
    isFullyLocked,
    showSystemSuitability,
    setShowSystemSuitability,
    systemSuitabilityPerParam,
    setSystemSuitabilityPerParam,
    createNewSystemSuitability,
    shouldDisableContent,
    showParamFiles,
    setShowParamFiles,
    getParamLevelFiles,
    updateFilesForSlot,
    handleAddParamFiles,
    handleRemoveParamFile,
    role,
    parameterStatusPerParam,
    addedParameters,
    revisionStartedParams,
    remarksQAPerParam,
    remarksByReviewerPerParam,
    approvedByQAPerParam,
    handleInitiateUnlock,
    handleStartAnalysis,
    handleCompleteAnalysis,
    handleRequestRevision,
    handleStartRevision,
    handleApprove,
    handleQARequestRevision,
    handleInitiateDelete,
  } = ctx;

  return (
    <>
                        <div
                          className={
                            isFullyLocked ? "pointer-events-none opacity-70" : ""
                          }
                        >
                          <DrugSystemSuitabilitySection
                            parameterId={selectedParam.id}
                            showSystemSuitability={showSystemSuitability}
                            setShowSystemSuitability={setShowSystemSuitability}
                            systemSuitabilityPerParam={systemSuitabilityPerParam}
                            setSystemSuitabilityPerParam={
                              setSystemSuitabilityPerParam
                            }
                            createNewSystemSuitability={
                              createNewSystemSuitability
                            }
                          />

                          <DrugParameterFilesSection
                            parameterId={selectedParam.id}
                            shouldDisableContent={shouldDisableContent}
                            showParamFiles={showParamFiles}
                            setShowParamFiles={setShowParamFiles}
                            getParamLevelFiles={getParamLevelFiles}
                            updateFilesForSlot={updateFilesForSlot}
                            handleAddParamFiles={handleAddParamFiles}
                            handleRemoveParamFile={handleRemoveParamFile}
                          />
                        </div>

                        {isLocked && (
                          <DrugBottomParameterActionBar
                            parameterId={selectedParam.id}
                            role={role}
                            parameterStatusPerParam={parameterStatusPerParam}
                            addedParameters={addedParameters}
                            revisionStartedParams={revisionStartedParams}
                            remarksQAPerParam={remarksQAPerParam}
                            remarksByReviewerPerParam={remarksByReviewerPerParam}
                            approvedByQAPerParam={approvedByQAPerParam}
                            handleInitiateUnlock={handleInitiateUnlock}
                            handleStartAnalysis={handleStartAnalysis}
                            handleCompleteAnalysis={handleCompleteAnalysis}
                            handleRequestRevision={handleRequestRevision}
                            handleStartRevision={handleStartRevision}
                            handleApprove={handleApprove}
                            handleQARequestRevision={handleQARequestRevision}
                            handleInitiateDelete={handleInitiateDelete}
                          />
                        )}
    </>
  );
};

export default DrugParameterFooterCoordinator;
