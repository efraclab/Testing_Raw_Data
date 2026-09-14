import React from "react";
import DrugInternalStandardSection from "./DrugInternalStandardSection";
import DrugAdditionalInfoSection from "./DrugAdditionalInfoSection";
import DrugBufferPreparationSection from "./DrugBufferPreparationSection";
import DrugMobilePhaseSection from "./DrugMobilePhaseSection";
import DrugDiluentPreparationSection from "./DrugDiluentPreparationSection";
import DrugPreparationsManagementSection from "./DrugPreparationsManagementSection";
import DrugBlankPreparationSection from "./DrugBlankPreparationSection";

interface DrugParameterPreparationCoordinatorProps {
  ctx: any;
}

const DrugParameterPreparationCoordinator: React.FC<
  DrugParameterPreparationCoordinatorProps
> = ({ ctx }) => {
  const {
    selectedParam,
    role,
    isFullyLocked,
    isPreparationLocked,
    shouldDisableContent,
    canManagePrep,
    activePreparationGroups,
    standards,
    addedInternalStandards,
    isReferenceDataLoading,
    referenceDataError,
    showInternalStandardPreparation,
    setShowInternalStandardPreparation,
    otherInfoPerParam,
    setOtherInfoPerParam,
    handleAddInternalStandard,
    handleRemoveInternalStandard,
    showAdditionalInfo,
    setShowAdditionalInfo,
    additionalInfoPerParam,
    setAdditionalInfoPerParam,
    showBufferPreparation,
    setShowBufferPreparation,
    bufferPreparationPerParam,
    setBufferPreparationPerParam,
    handleAddBufferPreparation,
    handleRemoveBufferPreparation,
    handleBufferPreparationStepChange,
    showMobilePhasePreparation,
    setShowMobilePhasePreparation,
    mobilePhasePerParam,
    handleAddMobilePhase,
    handleRemoveMobilePhase,
    showMobilePhaseDialog,
    setShowMobilePhaseDialog,
    editingMobilePhasePrepId,
    setEditingMobilePhasePrepId,
    handleEditMobilePhase,
    handleSaveMobilePhase,
    showDiluentPreparation,
    setShowDiluentPreparation,
    setDiluentPerParam,
    diluentPreparationsPerParam,
    setDiluentPreparationsPerParam,
    handleAddDiluentPrep,
    handleRemoveDiluentPrep,
    showDiluentPrepDialog,
    setShowDiluentPrepDialog,
    editingDiluentPrepId,
    setEditingDiluentPrepId,
    handleEditDiluentPrep,
    handleSaveDiluentPrep,
    getAvailablePreparationGroups,
    handleTogglePreparationGroup,
    groupPrepCompletedAtPerParam,
    blankPreparationPerParam,
    getFilesForPrep,
    showBlankPreparationDialog,
    setShowBlankPreparationDialog,
    editingBlankPrepId,
    setEditingBlankPrepId,
    handleAddBlankPreparation,
    handleEditBlankPreparation,
    handleRemoveBlankPreparation,
    handleAddPrepFiles,
    handleRemovePrepFile,
    handleInitiateCompleteGroupPrep,
    handleInitiateUnlockGroupPrep,
    handleSaveBlankPreparation,
  } = ctx;

  return (
    <>
                          <DrugInternalStandardSection
                            parameterId={selectedParam.id}
                            isHypromelloseActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("hypromellose")}
                            isVisible={
                              showInternalStandardPreparation[selectedParam.id] || false
                            }
                            standards={standards}
                            addedStandards={
                              addedInternalStandards[selectedParam.id] || []
                            }
                            isReferenceDataLoading={isReferenceDataLoading}
                            referenceDataError={referenceDataError}
                            role={role}
                            isFullyLocked={isFullyLocked}
                            otherInfo={otherInfoPerParam[selectedParam.id] || ""}
                            onVisibilityChange={(checked) =>
                              setShowInternalStandardPreparation((prev) => ({
                                ...prev,
                                [selectedParam.id]: checked,
                              }))
                            }
                            onAddStandard={handleAddInternalStandard}
                            onRemoveStandard={handleRemoveInternalStandard}
                            onOtherInfoChange={(value) =>
                              setOtherInfoPerParam((prev) => ({
                                ...prev,
                                [selectedParam.id]: value,
                              }))
                            }
                          />

                          <DrugAdditionalInfoSection
                            parameterId={selectedParam.id}
                            isVisible={showAdditionalInfo[selectedParam.id] || false}
                            value={additionalInfoPerParam[selectedParam.id] || ""}
                            onVisibilityChange={(checked) => {
                              setShowAdditionalInfo((prev) => ({
                                ...prev,
                                [selectedParam.id]: checked,
                              }));

                              if (!checked) {
                                setAdditionalInfoPerParam((prev) => ({
                                  ...prev,
                                  [selectedParam.id]: "",
                                }));
                              }
                            }}
                            onValueChange={(value) =>
                              setAdditionalInfoPerParam((prev) => ({
                                ...prev,
                                [selectedParam.id]: value,
                              }))
                            }
                          />

                          <DrugBufferPreparationSection
                            parameterId={selectedParam.id}
                            isVisible={
                              showBufferPreparation[selectedParam.id] || false
                            }
                            preparations={
                              bufferPreparationPerParam[selectedParam.id] || []
                            }
                            onVisibilityChange={(checked) => {
                              setShowBufferPreparation((prev) => ({
                                ...prev,
                                [selectedParam.id]: checked,
                              }));

                              if (!checked) {
                                setBufferPreparationPerParam((prev) => ({
                                  ...prev,
                                  [selectedParam.id]: [],
                                }));
                              }
                            }}
                            onAdd={handleAddBufferPreparation}
                            onRemove={handleRemoveBufferPreparation}
                            onStepChange={handleBufferPreparationStepChange}
                          />

                          <DrugMobilePhaseSection
                            parameterId={selectedParam.id}
                            isVisible={
                              showMobilePhasePreparation[selectedParam.id] || false
                            }
                            preparations={
                              mobilePhasePerParam[selectedParam.id] || []
                            }
                            isDialogOpen={
                              showMobilePhaseDialog[selectedParam.id] || false
                            }
                            editingId={editingMobilePhasePrepId}
                            onVisibilityChange={(checked) =>
                              setShowMobilePhasePreparation((prev) => ({
                                ...prev,
                                [selectedParam.id]: checked,
                              }))
                            }
                            onAdd={handleAddMobilePhase}
                            onEdit={handleEditMobilePhase}
                            onRemove={handleRemoveMobilePhase}
                            onCloseDialog={() => {
                              setShowMobilePhaseDialog((prev) => ({
                                ...prev,
                                [selectedParam.id]: false,
                              }));
                              setEditingMobilePhasePrepId(null);
                            }}
                            onSave={handleSaveMobilePhase}
                          />

                          <DrugDiluentPreparationSection
                            parameterId={selectedParam.id}
                            isVisible={
                              showDiluentPreparation[selectedParam.id] || false
                            }
                            preparations={
                              diluentPreparationsPerParam[selectedParam.id] || []
                            }
                            isDialogOpen={
                              showDiluentPrepDialog[selectedParam.id] || false
                            }
                            editingId={editingDiluentPrepId}
                            onVisibilityChange={(checked) => {
                              setShowDiluentPreparation((prev) => ({
                                ...prev,
                                [selectedParam.id]: checked,
                              }));

                              if (!checked) {
                                setDiluentPerParam((prev) => ({
                                  ...prev,
                                  [selectedParam.id]: "",
                                }));

                                setDiluentPreparationsPerParam((prev) => ({
                                  ...prev,
                                  [selectedParam.id]: [],
                                }));
                              }
                            }}
                            onAdd={handleAddDiluentPrep}
                            onEdit={handleEditDiluentPrep}
                            onRemove={handleRemoveDiluentPrep}
                            onCloseDialog={() => {
                              setShowDiluentPrepDialog((prev) => ({
                                ...prev,
                                [selectedParam.id]: false,
                              }));
                              setEditingDiluentPrepId(null);
                            }}
                            onSave={handleSaveDiluentPrep}
                          />

                          <DrugPreparationsManagementSection
                            parameterId={selectedParam.id}
                            isLocked={isPreparationLocked}
                            activeGroups={
                              activePreparationGroups[selectedParam.id] || []
                            }
                            availableGroups={getAvailablePreparationGroups()}
                            onToggleGroup={handleTogglePreparationGroup}
                          />

                        <DrugBlankPreparationSection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("blankPreparation")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          completedAt={
                            groupPrepCompletedAtPerParam[selectedParam.id]?.[
                              "blankPreparation"
                            ] || null
                          }
                          preparations={
                            blankPreparationPerParam[selectedParam.id] || []
                          }
                          files={getFilesForPrep(
                            selectedParam.id,
                            "blank",
                            "Preparation Files",
                          )}
                          isDialogOpen={
                            showBlankPreparationDialog[selectedParam.id] || false
                          }
                          editingId={editingBlankPrepId}
                          onAddPreparation={handleAddBlankPreparation}
                          onEditPreparation={handleEditBlankPreparation}
                          onRemovePreparation={handleRemoveBlankPreparation}
                          onAddFiles={(newFiles) =>
                            handleAddPrepFiles(
                              selectedParam.id,
                              "blank",
                              "Preparation Files",
                              newFiles,
                            )
                          }
                          onRemoveFile={(index) =>
                            handleRemovePrepFile(
                              selectedParam.id,
                              "blank",
                              "Preparation Files",
                              index,
                            )
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "blankPreparation",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "blankPreparation",
                            )
                          }
                          onCloseDialog={() => {
                            setShowBlankPreparationDialog((prev) => ({
                              ...prev,
                              [selectedParam.id]: false,
                            }));
                            setEditingBlankPrepId(null);
                          }}
                          onSavePreparation={handleSaveBlankPreparation}
                        />

    </>
  );
};

export default DrugParameterPreparationCoordinator;
