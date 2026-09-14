import React from "react";
import DrugDissolutionProfileSection from "./DrugDissolutionProfileSection";
import DrugDissolutionSection from "./DrugDissolutionSection";
import DrugHypromelloseSection from "./DrugHypromelloseSection";
import DrugNitrosamineSection from "./DrugNitrosamineSection";
import DrugRelatedSubstanceSection from "./DrugRelatedSubstanceSection";
import DrugResidualSolventSection from "./DrugResidualSolventSection";
import DrugUniformityOfContentSection from "./DrugUniformityOfContentSection";

interface DrugAdvancedAnalysisGroupsCoordinatorProps {
  ctx: any;
}

const DrugAdvancedAnalysisGroupsCoordinator: React.FC<
  DrugAdvancedAnalysisGroupsCoordinatorProps
> = ({ ctx }) => {
  const {
    activePreparationGroups,
    addedStandards,
    calculations,
    calculationsAssayHypromellosePerParam,
    calculationsAssayNitrosaminePerParam,
    calculationsDissoPerParam,
    calculationsDissoProfilePerParam,
    calculationsRSPerParam,
    calculationsRelatedSubstancePerParam,
    calculationsUCPerParam,
    canManagePrep,
    completedAt,
    dissoMediaProfilePerParam,
    getFilesForPrep,
    groupPrepCompletedAtPerParam,
    handleAddCalculationAssayHypromellose,
    handleAddCalculationAssayNitrosamine,
    handleAddCalculationDisso,
    handleAddCalculationDissoProfile,
    handleAddCalculationRS,
    handleAddCalculationRelatedSubstance,
    handleAddCalculationUC,
    handleAddPrepFiles,
    handleAddSampleDilutionStage,
    handleAddStandardDilutionStage,
    handleAddStandardPreparationDisso,
    handleAddStandardPreparationDissoProfile,
    handleAddStandardPreparationHypromellose,
    handleAddStandardPreparationNitrosamine,
    handleAddStandardPreparationRS,
    handleAddStandardPreparationRelatedSubstance,
    handleAddStandardPreparationUC,
    handleCalculationAssayHypromelloseFieldChange,
    handleCalculationAssayNitrosamineFieldChange,
    handleCalculationDissoFieldChange,
    handleCalculationDissoProfileFieldChange,
    handleCalculationRSFieldChange,
    handleCalculationRelatedSubstanceFieldChange,
    handleCalculationUCFieldChange,
    handleDissoMediaProfileStepChange,
    handleInitiateCompleteGroupPrep,
    handleInitiateUnlockGroupPrep,
    handleRemoveCalculationAssayHypromellose,
    handleRemoveCalculationAssayNitrosamine,
    handleRemoveCalculationDisso,
    handleRemoveCalculationDissoProfile,
    handleRemoveCalculationRS,
    handleRemoveCalculationRelatedSubstance,
    handleRemoveCalculationUC,
    handleRemoveDissoMediaProfile,
    handleRemovePrepFile,
    handleRemoveSampleDilutionStage,
    handleRemoveSamplePreparationDissoProfile,
    handleRemoveSamplePreparationHypromellose,
    handleRemoveSamplePreparationNitrosamine,
    handleRemoveSamplePreparationRS,
    handleRemoveSamplePreparationUC,
    handleRemoveStandardDilutionStage,
    handleRemoveStandardPreparationDisso,
    handleRemoveStandardPreparationDissoProfile,
    handleRemoveStandardPreparationHypromellose,
    handleRemoveStandardPreparationNitrosamine,
    handleRemoveStandardPreparationRS,
    handleRemoveStandardPreparationRelatedSubstance,
    handleRemoveStandardPreparationUC,
    handleSamplePreparationDissoProfileStepChange,
    handleSamplePreparationDissoStepChange,
    handleSamplePreparationHypromelloseStepChange,
    handleSamplePreparationNitrosamineFieldChange,
    handleSamplePreparationNitrosamineStepChange,
    handleSamplePreparationRSStepChange,
    handleSamplePreparationRelatedSubstanceStepChange,
    handleSamplePreparationUCStepChange,
    handleStandardPreparationDissoProfileStepChange,
    handleStandardPreparationDissoStepChange,
    handleStandardPreparationHypromelloseStepChange,
    handleStandardPreparationNitrosamineFieldChange,
    handleStandardPreparationNitrosamineStepChange,
    handleStandardPreparationRSStepChange,
    handleStandardPreparationRelatedSubstanceStepChange,
    handleStandardPreparationUCStepChange,
    isFullyLocked,
    isPreparationLocked,
    parameterId,
    role,
    samplePreparationDissoPerParam,
    samplePreparationDissoProfilePerParam,
    samplePreparationHypromellosePerParam,
    samplePreparationNitrosaminePerParam,
    samplePreparationRSPerParam,
    samplePreparationRelatedSubstancePerParam,
    samplePreparationUCPerParam,
    selectedParam,
    shouldDisableContent,
    standardPreparationDissoPerParam,
    standardPreparationDissoProfilePerParam,
    standardPreparationHypromellosePerParam,
    standardPreparationNitrosaminePerParam,
    standardPreparationRelatedSubstancePerParam,
    standardPreparationResidualSolventPerParam,
    standardPreparationUCPerParam,
  } = ctx;

  return (
    <>
                        <DrugResidualSolventSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("residualSolvent")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "residualSolvent"
                            ] || null
                          }
                          standardPreparations={
                            (standardPreparationResidualSolventPerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationRSPerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsRSPerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparationRS={
                            handleAddStandardPreparationRS
                          }
                          handleRemoveStandardPreparationRS={
                            handleRemoveStandardPreparationRS
                          }
                          handleStandardPreparationRSStepChange={
                            handleStandardPreparationRSStepChange
                          }
                          handleRemoveSamplePreparationRS={
                            handleRemoveSamplePreparationRS
                          }
                          handleSamplePreparationRSStepChange={
                            handleSamplePreparationRSStepChange
                          }
                          handleAddCalculationRS={handleAddCalculationRS}
                          handleRemoveCalculationRS={
                            handleRemoveCalculationRS
                          }
                          handleCalculationRSFieldChange={
                            handleCalculationRSFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "residualSolvent",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "residualSolvent",
                            )
                          }
                        />

                        <DrugRelatedSubstanceSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("relatedSubstance")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "relatedSubstance"
                            ] || null
                          }
                          standardPreparations={
                            (standardPreparationRelatedSubstancePerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationRelatedSubstancePerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsRelatedSubstancePerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparationRelatedSubstance={
                            handleAddStandardPreparationRelatedSubstance
                          }
                          handleRemoveStandardPreparationRelatedSubstance={
                            handleRemoveStandardPreparationRelatedSubstance
                          }
                          handleStandardPreparationRelatedSubstanceStepChange={
                            handleStandardPreparationRelatedSubstanceStepChange
                          }
                          handleSamplePreparationRelatedSubstanceStepChange={
                            handleSamplePreparationRelatedSubstanceStepChange
                          }
                          handleAddCalculationRelatedSubstance={
                            handleAddCalculationRelatedSubstance
                          }
                          handleRemoveCalculationRelatedSubstance={
                            handleRemoveCalculationRelatedSubstance
                          }
                          handleCalculationRelatedSubstanceFieldChange={
                            handleCalculationRelatedSubstanceFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "relatedSubstance",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "relatedSubstance",
                            )
                          }
                        />

                        <DrugDissolutionSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("dissolution")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "dissolution"
                            ] || null
                          }
                          standardPreparations={
                            (standardPreparationDissoPerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationDissoPerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsDissoPerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparationDisso={
                            handleAddStandardPreparationDisso
                          }
                          handleRemoveStandardPreparationDisso={
                            handleRemoveStandardPreparationDisso
                          }
                          handleStandardPreparationDissoStepChange={
                            handleStandardPreparationDissoStepChange
                          }
                          handleSamplePreparationDissoStepChange={
                            handleSamplePreparationDissoStepChange
                          }
                          handleAddCalculationDisso={handleAddCalculationDisso}
                          handleRemoveCalculationDisso={
                            handleRemoveCalculationDisso
                          }
                          handleCalculationDissoFieldChange={
                            handleCalculationDissoFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "dissolution",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "dissolution",
                            )
                          }
                        />

                        <DrugDissolutionProfileSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("dissolutionProfile")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "dissolutionProfile"
                            ] || null
                          }
                          mediaPreparations={
                            (dissoMediaProfilePerParam ?? {})[selectedParam.id] || []
                          }
                          standardPreparations={
                            (standardPreparationDissoProfilePerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationDissoProfilePerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsDissoProfilePerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleRemoveDissoMediaProfile={
                            handleRemoveDissoMediaProfile
                          }
                          handleDissoMediaProfileStepChange={
                            handleDissoMediaProfileStepChange
                          }
                          handleAddStandardPreparationDissoProfile={
                            handleAddStandardPreparationDissoProfile
                          }
                          handleRemoveStandardPreparationDissoProfile={
                            handleRemoveStandardPreparationDissoProfile
                          }
                          handleStandardPreparationDissoProfileStepChange={
                            handleStandardPreparationDissoProfileStepChange
                          }
                          handleRemoveSamplePreparationDissoProfile={
                            handleRemoveSamplePreparationDissoProfile
                          }
                          handleSamplePreparationDissoProfileStepChange={
                            handleSamplePreparationDissoProfileStepChange
                          }
                          handleAddCalculationDissoProfile={
                            handleAddCalculationDissoProfile
                          }
                          handleRemoveCalculationDissoProfile={
                            handleRemoveCalculationDissoProfile
                          }
                          handleCalculationDissoProfileFieldChange={
                            handleCalculationDissoProfileFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "dissolutionProfile",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "dissolutionProfile",
                            )
                          }
                        />

                        <DrugUniformityOfContentSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("uniformityOfContent")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "uniformityOfContent"
                            ] || null
                          }
                          standardPreparations={
                            (standardPreparationUCPerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationUCPerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsUCPerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparationUC={
                            handleAddStandardPreparationUC
                          }
                          handleRemoveStandardPreparationUC={
                            handleRemoveStandardPreparationUC
                          }
                          handleStandardPreparationUCStepChange={
                            handleStandardPreparationUCStepChange
                          }
                          handleRemoveSamplePreparationUC={
                            handleRemoveSamplePreparationUC
                          }
                          handleSamplePreparationUCStepChange={
                            handleSamplePreparationUCStepChange
                          }
                          handleAddCalculationUC={handleAddCalculationUC}
                          handleRemoveCalculationUC={handleRemoveCalculationUC}
                          handleCalculationUCFieldChange={
                            handleCalculationUCFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "uniformityOfContent",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "uniformityOfContent",
                            )
                          }
                        />

                        <DrugHypromelloseSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("hypromellose")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "hypromellose"
                            ] || null
                          }
                          standardPreparations={
                            (standardPreparationHypromellosePerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationHypromellosePerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsAssayHypromellosePerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparationHypromellose={
                            handleAddStandardPreparationHypromellose
                          }
                          handleRemoveStandardPreparationHypromellose={
                            handleRemoveStandardPreparationHypromellose
                          }
                          handleStandardPreparationHypromelloseStepChange={
                            handleStandardPreparationHypromelloseStepChange
                          }
                          handleRemoveSamplePreparationHypromellose={
                            handleRemoveSamplePreparationHypromellose
                          }
                          handleSamplePreparationHypromelloseStepChange={
                            handleSamplePreparationHypromelloseStepChange
                          }
                          handleAddCalculationAssayHypromellose={
                            handleAddCalculationAssayHypromellose
                          }
                          handleRemoveCalculationAssayHypromellose={
                            handleRemoveCalculationAssayHypromellose
                          }
                          handleCalculationAssayHypromelloseFieldChange={
                            handleCalculationAssayHypromelloseFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "hypromellose",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "hypromellose",
                            )
                          }
                        />

                        <DrugNitrosamineSection
                          parameterId={selectedParam.id}
                          isActive={(
                            (activePreparationGroups ?? {})[selectedParam.id] || []
                          ).includes("nitrosamine")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            (groupPrepCompletedAtPerParam ?? {})[selectedParam.id]?.[
                              "nitrosamine"
                            ] || null
                          }
                          standardPreparations={
                            (standardPreparationNitrosaminePerParam ?? {})[selectedParam.id] || []
                          }
                          samplePreparations={
                            (samplePreparationNitrosaminePerParam ?? {})[selectedParam.id] || []
                          }
                          calculations={
                            (calculationsAssayNitrosaminePerParam ?? {})[selectedParam.id] || []
                          }
                          assignedStandards={
                            (addedStandards ?? {})[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparationNitrosamine={
                            handleAddStandardPreparationNitrosamine
                          }
                          handleRemoveStandardPreparationNitrosamine={
                            handleRemoveStandardPreparationNitrosamine
                          }
                          handleStandardPreparationNitrosamineStepChange={
                            handleStandardPreparationNitrosamineStepChange
                          }
                          handleStandardPreparationNitrosamineFieldChange={
                            handleStandardPreparationNitrosamineFieldChange
                          }
                          handleAddStandardDilutionStage={
                            handleAddStandardDilutionStage
                          }
                          handleRemoveStandardDilutionStage={
                            handleRemoveStandardDilutionStage
                          }
                          handleRemoveSamplePreparationNitrosamine={
                            handleRemoveSamplePreparationNitrosamine
                          }
                          handleSamplePreparationNitrosamineStepChange={
                            handleSamplePreparationNitrosamineStepChange
                          }
                          handleSamplePreparationNitrosamineFieldChange={
                            handleSamplePreparationNitrosamineFieldChange
                          }
                          handleAddSampleDilutionStage={
                            handleAddSampleDilutionStage
                          }
                          handleRemoveSampleDilutionStage={
                            handleRemoveSampleDilutionStage
                          }
                          handleAddCalculationAssayNitrosamine={
                            handleAddCalculationAssayNitrosamine
                          }
                          handleRemoveCalculationAssayNitrosamine={
                            handleRemoveCalculationAssayNitrosamine
                          }
                          handleCalculationAssayNitrosamineFieldChange={
                            handleCalculationAssayNitrosamineFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "nitrosamine",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "nitrosamine",
                            )
                          }
                        />

    </>
  );
};

export default DrugAdvancedAnalysisGroupsCoordinator;
