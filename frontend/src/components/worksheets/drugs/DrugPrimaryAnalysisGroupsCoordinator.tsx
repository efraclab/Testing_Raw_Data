import React from "react";
import DrugAssayFerrousFumarateSection from "./DrugAssayFerrousFumarateSection";
import DrugDissolutionFerrousFumarateSection from "./DrugDissolutionFerrousFumarateSection";
import DrugAssaySection from "./DrugAssaySection";
import DrugLodSection from "./DrugLodSection";
import DrugRoiSection from "./DrugRoiSection";
import DrugSulphatedAshSection from "./DrugSulphatedAshSection";
import GenericCalculationSection from "./GenericCalculationSection";
import SamplePreparationTitrationDetail from "../../sub-components/drugs/SamplePreparationTitrationDetail";

interface DrugPrimaryAnalysisGroupsCoordinatorProps {
  ctx: any;
}

const DrugPrimaryAnalysisGroupsCoordinator: React.FC<
  DrugPrimaryAnalysisGroupsCoordinatorProps
> = ({ ctx }) => {
  const {
    activePreparationGroups,
    addedStandards,
    calculationsAssayFerrousFumaratePerParam,
    calculationsAssayPerParam,
    calculationsDissoFerrousFumaratePerParam,
    calculationsLodPerParam,
    calculationsROIPerParam,
    calculationsSulphatedAshPerParam,
    canManagePrep,
    getFilesForPrep,
    groupPrepCompletedAtPerParam,
    handleAddCalculationAssay,
    handleAddCalculationDissoFerrousFumarate,
    handleAddCalculationFerrousFumarate,
    handleAddCalculationLod,
    handleAddCalculationROI,
    handleAddCalculationSulphatedAsh,
    handleAddPrepFiles,
    handleAddSamplePrepAssayFerrousFumaratePerParam,
    handleAddSamplePrepDissoFerrousFumarate,
    handleAddSamplePreparation,
    handleAddSamplePreparationLod,
    handleAddSamplePreparationROI,
    handleAddSamplePreparationSulphatedAsh,
    handleAddStandardPreparation,
    handleCalculationAssayFieldChange,
    handleCalculationDissoFerrousFumarateFieldChange,
    handleCalculationFerrousFumarateFieldChange,
    handleCalculationLodFieldChange,
    handleCalculationROIFieldChange,
    handleCalculationSulphatedAshFieldChange,
    handleInitiateCompleteGroupPrep,
    handleInitiateCompletePreparation,
    handleInitiateUnlockGroupPrep,
    handleInitiateUnlockPreparation,
    handleRemoveCalculationAssay,
    handleRemoveCalculationDissoFerrousFumarate,
    handleRemoveCalculationFerrousFumarate,
    handleRemoveCalculationLod,
    handleRemoveCalculationROI,
    handleRemoveCalculationSulphatedAsh,
    handleRemovePrepFile,
    handleRemoveSamplePrepAssayFerrousFumaratePerParam,
    handleRemoveSamplePrepDissoFerrousFumarate,
    handleRemoveSamplePreparation,
    handleRemoveSamplePreparationLod,
    handleRemoveSamplePreparationROI,
    handleRemoveSamplePreparationSulphatedAsh,
    handleRemoveStandardPreparation,
    handleSamplePrepAssayFerrousFumaratePerParamStepChange,
    handleSamplePrepDissoFerrousFumarateStepChange,
    handleSamplePreparationLodStepChange,
    handleSamplePreparationROIStepChange,
    handleSamplePreparationStepChange,
    handleSamplePreparationSulphatedAshStepChange,
    handleStandardPreparationStepChange,
    isFullyLocked,
    isPreparationLocked,
    preparationCompletedAtPerParam,
    role,
    samplePrepAssayFerrousFumaratePerParam,
    samplePrepDissoFerrousFumaratePerParam,
    samplePreparationLodPerParam,
    samplePreparationPerParam,
    samplePreparationROIPerParam,
    samplePreparationSulphatedAshPerParam,
    selectedParam,
    shouldDisableContent,
    standardPreparationAssayPerParam,

    // Generic calculation engine fields (Titration, and future simple
    // templates) - all new, additive, don't touch any field above.
    genericTemplates, // Record<string, GenericCalculationTemplate>, e.g. { assayTitration: {...} }
    calculationsGenericPerParam,
    standardPreparationGenericPerParam,
    samplePreparationGenericPerParam,
    handleAddCalculationGeneric,
    handleRemoveCalculationGeneric,
    handleGenericFieldChange,
    handleGenericGroupFieldChange,
    handleAddGenericGroupRow,
    handleRemoveGenericGroupRow,
    handleSelectGenericStandardPreparation,
    handleSelectGenericSamplePreparation,
    handleAddStandardPreparationTitration,
    handleRemoveStandardPreparationTitration,
    handleStandardPreparationTitrationStepChange,
    handleAddSamplePreparationTitration,
    handleRemoveSamplePreparationTitration,
    handleSamplePreparationTitrationStepChange,
    standardPreparationBetadexPerParam,
    samplePreparationBetadexPerParam,
    handleAddStandardPreparationBetadex,
    handleRemoveStandardPreparationBetadex,
    handleStandardPreparationBetadexStepChange,
    handleAddSamplePreparationBetadex,
    handleRemoveSamplePreparationBetadex,
    handleSamplePreparationBetadexStepChange,
    standardPreparationStandardizedTitrationAssayPerParam,
    samplePreparationStandardizedTitrationAssayPerParam,
    handleAddStandardPreparationStandardizedTitrationAssay,
    handleRemoveStandardPreparationStandardizedTitrationAssay,
    handleStandardPreparationStandardizedTitrationAssayStepChange,
    handleAddSamplePreparationStandardizedTitrationAssay,
    handleRemoveSamplePreparationStandardizedTitrationAssay,
    handleSamplePreparationStandardizedTitrationAssayStepChange,
    standardPreparationDibasicSodiumPhosphateAssayPerParam,
    samplePreparationDibasicSodiumPhosphateAssayPerParam,
    handleAddStandardPreparationDibasicSodiumPhosphateAssay,
    handleRemoveStandardPreparationDibasicSodiumPhosphateAssay,
    handleStandardPreparationDibasicSodiumPhosphateAssayStepChange,
    handleAddSamplePreparationDibasicSodiumPhosphateAssay,
    handleRemoveSamplePreparationDibasicSodiumPhosphateAssay,
    handleSamplePreparationDibasicSodiumPhosphateAssayStepChange,
  } = ctx;

  const assayTitrationTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) => template?.templateId === "assay_titration",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) => template?.templateId === "assay_titration",
      );

  const betadexBatchAnalysisTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "betadex_batch_analysis",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "betadex_batch_analysis",
      );

  const standardizedTitrationAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "standardized_titration_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "standardized_titration_assay",
      );

  const dibasicSodiumPhosphateAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "dibasic_sodium_phosphate_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "dibasic_sodium_phosphate_assay",
      );

  const freeCarboxylGroupsTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) => template?.templateId === "free_carboxyl_groups",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) => template?.templateId === "free_carboxyl_groups",
      );

  const glycerolBehenateFreeGlycerolTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "glycerol_behenate_free_glycerol",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "glycerol_behenate_free_glycerol",
      );

  const glycerolBehenateAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "glycerol_behenate_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "glycerol_behenate_assay",
      );

  const hydrogenatedCastorOilCompositionTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "hydrogenated_castor_oil_composition",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "hydrogenated_castor_oil_composition",
      );

  const ketotifenHydrogenFumarateAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "ketotifen_hydrogen_fumarate_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "ketotifen_hydrogen_fumarate_assay",
      );

  const lecithinSingleLinearityTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "lecithin_single_linearity",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "lecithin_single_linearity",
      );

  const lecithinBatchAnalysisTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "lecithin_batch_analysis",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "lecithin_batch_analysis",
      );

  const lipoidsAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "lipoids_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "lipoids_assay",
      );

  const lipoidsImpurityTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "lipoids_impurity",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "lipoids_impurity",
      );

  const logarithmicCalculation4PointTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "logarithmic_calculation_4_point",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "logarithmic_calculation_4_point",
      );

  const ndmaValidationBatchAnalysisTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "ndma_validation_batch_analysis",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "ndma_validation_batch_analysis",
      );

  const povidoneLimitOfAldehydeTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "povidone_limit_of_aldehyde",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "povidone_limit_of_aldehyde",
      );

  const prilocaineAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "prilocaine_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "prilocaine_assay",
      );

  const castorOilFattyAcidTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "castor_oil_fatty_acid",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "castor_oil_fatty_acid",
      );

  const hecEthoxyContentTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "hec_ethoxy_content",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "hec_ethoxy_content",
      );

  const hpcAssayTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "hpc_assay",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "hpc_assay",
      );

  const lhpcHydroxypropoxyContentTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "lhpc_hydroxypropoxy_content",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "lhpc_hydroxypropoxy_content",
      );

  const magnesiumStearateFattyAcidTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "magnesium_stearate_fatty_acid",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "magnesium_stearate_fatty_acid",
      );

  const nefopamResidualSolventTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "nefopam_residual_solvent",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "nefopam_residual_solvent",
      );

  const polyoxyl35CastorOilGlycolsTemplate = Array.isArray(genericTemplates)
    ? genericTemplates.find(
        (template: any) =>
          template?.templateId === "polyoxyl_35_castor_oil_glycols",
      )
    : Object.values(genericTemplates || {}).find(
        (template: any) =>
          template?.templateId === "polyoxyl_35_castor_oil_glycols",
      );

  return (
    <>
                        <DrugAssayFerrousFumarateSection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("assayFerrousFumarate")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            groupPrepCompletedAtPerParam[selectedParam.id]?.[
                              "assayFerrousFumarate"
                            ] || null
                          }
                          samplePreparations={
                            samplePrepAssayFerrousFumaratePerParam[
                              selectedParam.id
                            ] || []
                          }
                          calculations={
                            calculationsAssayFerrousFumaratePerParam[
                              selectedParam.id
                            ] || []
                          }
                          files={getFilesForPrep(
                            selectedParam.id,
                            "assay_ferrous_fumarate",
                            "Preparation Files",
                          )}
                          onAddPreparation={
                            handleAddSamplePrepAssayFerrousFumaratePerParam
                          }
                          onRemovePreparation={
                            handleRemoveSamplePrepAssayFerrousFumaratePerParam
                          }
                          onPreparationStepChange={
                            handleSamplePrepAssayFerrousFumaratePerParamStepChange
                          }
                          onAddFiles={(newFiles) =>
                            handleAddPrepFiles(
                              selectedParam.id,
                              "assay_ferrous_fumarate",
                              "Preparation Files",
                              newFiles,
                            )
                          }
                          onRemoveFile={(index) =>
                            handleRemovePrepFile(
                              selectedParam.id,
                              "assay_ferrous_fumarate",
                              "Preparation Files",
                              index,
                            )
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "assayFerrousFumarate",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "assayFerrousFumarate",
                            )
                          }
                          onAddCalculation={
                            handleAddCalculationFerrousFumarate
                          }
                          onRemoveCalculation={
                            handleRemoveCalculationFerrousFumarate
                          }
                          onCalculationFieldChange={
                            handleCalculationFerrousFumarateFieldChange
                          }
                        />

                        <DrugDissolutionFerrousFumarateSection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("dissolutionFerrousFumarate")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            groupPrepCompletedAtPerParam[selectedParam.id]?.[
                              "dissolutionFerrousFumarate"
                            ] || null
                          }
                          samplePreparations={
                            samplePrepDissoFerrousFumaratePerParam[
                              selectedParam.id
                            ] || []
                          }
                          calculations={
                            calculationsDissoFerrousFumaratePerParam[
                              selectedParam.id
                            ] || []
                          }
                          files={getFilesForPrep(
                            selectedParam.id,
                            "dissolution_ferrous_fumarate",
                            "Preparation Files",
                          )}
                          onAddPreparation={
                            handleAddSamplePrepDissoFerrousFumarate
                          }
                          onRemovePreparation={
                            handleRemoveSamplePrepDissoFerrousFumarate
                          }
                          onPreparationStepChange={
                            handleSamplePrepDissoFerrousFumarateStepChange
                          }
                          onAddFiles={(newFiles) =>
                            handleAddPrepFiles(
                              selectedParam.id,
                              "dissolution_ferrous_fumarate",
                              "Preparation Files",
                              newFiles,
                            )
                          }
                          onRemoveFile={(index) =>
                            handleRemovePrepFile(
                              selectedParam.id,
                              "dissolution_ferrous_fumarate",
                              "Preparation Files",
                              index,
                            )
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "dissolutionFerrousFumarate",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "dissolutionFerrousFumarate",
                            )
                          }
                          onAddCalculation={
                            handleAddCalculationDissoFerrousFumarate
                          }
                          onRemoveCalculation={
                            handleRemoveCalculationDissoFerrousFumarate
                          }
                          onCalculationFieldChange={
                            handleCalculationDissoFerrousFumarateFieldChange
                          }
                        />

                        <DrugAssaySection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("assay")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            preparationCompletedAtPerParam[selectedParam.id] || null
                          }
                          standardPreparations={
                            standardPreparationAssayPerParam[selectedParam.id] || []
                          }
                          samplePreparations={
                            samplePreparationPerParam[selectedParam.id] || []
                          }
                          calculations={
                            calculationsAssayPerParam[selectedParam.id] || []
                          }
                          assignedStandards={
                            addedStandards[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddStandardPreparation={handleAddStandardPreparation}
                          handleRemoveStandardPreparation={handleRemoveStandardPreparation}
                          handleStandardPreparationStepChange={
                            handleStandardPreparationStepChange
                          }
                          handleAddSamplePreparation={handleAddSamplePreparation}
                          handleRemoveSamplePreparation={handleRemoveSamplePreparation}
                          handleSamplePreparationStepChange={
                            handleSamplePreparationStepChange
                          }
                          handleAddCalculationAssay={handleAddCalculationAssay}
                          handleRemoveCalculationAssay={handleRemoveCalculationAssay}
                          handleCalculationAssayFieldChange={
                            handleCalculationAssayFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompletePreparation(selectedParam)
                          }
                          onUnlock={() =>
                            handleInitiateUnlockPreparation(selectedParam)
                          }
                        />

                        {assayTitrationTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={assayTitrationTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("assayTitration")}
                            isPreparationLocked={isPreparationLocked}
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              preparationCompletedAtPerParam[selectedParam.id] || null
                            }
                            standardPreparations={
                              (standardPreparationGenericPerParam ?? {})[selectedParam.id] || []
                            }
                            handleAddStandardPreparation={handleAddStandardPreparationTitration}
                            handleRemoveStandardPreparation={handleRemoveStandardPreparationTitration}
                            handleStandardPreparationStepChange={handleStandardPreparationTitrationStepChange}
                            samplePreparations={
                              (samplePreparationGenericPerParam ?? {})[selectedParam.id] || []
                            }
                            renderSamplePreparationEditor={(sp, onStepChange, onRemove) => (
                              <SamplePreparationTitrationDetail
                                samplePreparationTitration={sp}
                                type="assay"
                                onStepChange={onStepChange}
                                onRemove={onRemove}
                              />
                            )}
                            handleAddSamplePreparation={handleAddSamplePreparationTitration}
                            handleRemoveSamplePreparation={handleRemoveSamplePreparationTitration}
                            handleSamplePreparationStepChange={handleSamplePreparationTitrationStepChange}
                            calculations={
                              (calculationsGenericPerParam ?? {})[selectedParam.id] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompletePreparation(selectedParam)
                            }
                            onUnlock={() =>
                              handleInitiateUnlockPreparation(selectedParam)
                            }
                          />
                        )}

                        {betadexBatchAnalysisTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={betadexBatchAnalysisTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("betadexBatchAnalysis")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "betadexBatchAnalysis"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "betadexBatchAnalysis"
                              ] || null
                            }
                            standardPreparations={
                              (standardPreparationBetadexPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            handleAddStandardPreparation={
                              handleAddStandardPreparationBetadex
                            }
                            handleRemoveStandardPreparation={
                              handleRemoveStandardPreparationBetadex
                            }
                            handleStandardPreparationStepChange={
                              handleStandardPreparationBetadexStepChange
                            }
                            samplePreparations={
                              (samplePreparationBetadexPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            renderSamplePreparationEditor={(
                              sp,
                              onStepChange,
                              onRemove,
                            ) => (
                              <SamplePreparationTitrationDetail
                                samplePreparationTitration={sp}
                                type="assay"
                                onStepChange={onStepChange}
                                onRemove={onRemove}
                              />
                            )}
                            handleAddSamplePreparation={
                              handleAddSamplePreparationBetadex
                            }
                            handleRemoveSamplePreparation={
                              handleRemoveSamplePreparationBetadex
                            }
                            handleSamplePreparationStepChange={
                              handleSamplePreparationBetadexStepChange
                            }
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "betadexBatchAnalysis",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "betadexBatchAnalysis",
                              )
                            }
                          />
                        )}

                        {standardizedTitrationAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={standardizedTitrationAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("standardizedTitrationAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "standardizedTitrationAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "standardizedTitrationAssay"
                              ] || null
                            }
                            standardPreparations={
                              (standardPreparationStandardizedTitrationAssayPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            handleAddStandardPreparation={
                              handleAddStandardPreparationStandardizedTitrationAssay
                            }
                            handleRemoveStandardPreparation={
                              handleRemoveStandardPreparationStandardizedTitrationAssay
                            }
                            handleStandardPreparationStepChange={
                              handleStandardPreparationStandardizedTitrationAssayStepChange
                            }
                            samplePreparations={
                              (samplePreparationStandardizedTitrationAssayPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            renderSamplePreparationEditor={(
                              sp,
                              onStepChange,
                              onRemove,
                            ) => (
                              <SamplePreparationTitrationDetail
                                samplePreparationTitration={sp}
                                type="assay"
                                onStepChange={onStepChange}
                                onRemove={onRemove}
                              />
                            )}
                            handleAddSamplePreparation={
                              handleAddSamplePreparationStandardizedTitrationAssay
                            }
                            handleRemoveSamplePreparation={
                              handleRemoveSamplePreparationStandardizedTitrationAssay
                            }
                            handleSamplePreparationStepChange={
                              handleSamplePreparationStandardizedTitrationAssayStepChange
                            }
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "standardizedTitrationAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "standardizedTitrationAssay",
                              )
                            }
                          />
                        )}

                        {dibasicSodiumPhosphateAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={dibasicSodiumPhosphateAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("dibasicSodiumPhosphateAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "dibasicSodiumPhosphateAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "dibasicSodiumPhosphateAssay"
                              ] || null
                            }
                            standardPreparations={
                              (standardPreparationDibasicSodiumPhosphateAssayPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            handleAddStandardPreparation={
                              handleAddStandardPreparationDibasicSodiumPhosphateAssay
                            }
                            handleRemoveStandardPreparation={
                              handleRemoveStandardPreparationDibasicSodiumPhosphateAssay
                            }
                            handleStandardPreparationStepChange={
                              handleStandardPreparationDibasicSodiumPhosphateAssayStepChange
                            }
                            samplePreparations={
                              (samplePreparationDibasicSodiumPhosphateAssayPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            renderSamplePreparationEditor={(
                              sp,
                              onStepChange,
                              onRemove,
                            ) => (
                              <SamplePreparationTitrationDetail
                                samplePreparationTitration={sp}
                                type="assay"
                                onStepChange={onStepChange}
                                onRemove={onRemove}
                              />
                            )}
                            handleAddSamplePreparation={
                              handleAddSamplePreparationDibasicSodiumPhosphateAssay
                            }
                            handleRemoveSamplePreparation={
                              handleRemoveSamplePreparationDibasicSodiumPhosphateAssay
                            }
                            handleSamplePreparationStepChange={
                              handleSamplePreparationDibasicSodiumPhosphateAssayStepChange
                            }
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "dibasicSodiumPhosphateAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "dibasicSodiumPhosphateAssay",
                              )
                            }
                          />
                        )}

                        {freeCarboxylGroupsTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={freeCarboxylGroupsTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("freeCarboxylGroups")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "freeCarboxylGroups"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "freeCarboxylGroups"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "freeCarboxylGroups",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "freeCarboxylGroups",
                              )
                            }
                          />
                        )}

                        {glycerolBehenateFreeGlycerolTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={glycerolBehenateFreeGlycerolTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("glycerolBehenateFreeGlycerol")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "glycerolBehenateFreeGlycerol"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "glycerolBehenateFreeGlycerol"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "glycerolBehenateFreeGlycerol",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "glycerolBehenateFreeGlycerol",
                              )
                            }
                          />
                        )}

                        {glycerolBehenateAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={glycerolBehenateAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("glycerolBehenateAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "glycerolBehenateAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "glycerolBehenateAssay"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "glycerolBehenateAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "glycerolBehenateAssay",
                              )
                            }
                          />
                        )}

                        {hydrogenatedCastorOilCompositionTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={hydrogenatedCastorOilCompositionTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("hydrogenatedCastorOilComposition")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "hydrogenatedCastorOilComposition"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "hydrogenatedCastorOilComposition"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "hydrogenatedCastorOilComposition",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "hydrogenatedCastorOilComposition",
                              )
                            }
                          />
                        )}

                        {ketotifenHydrogenFumarateAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={ketotifenHydrogenFumarateAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("ketotifenHydrogenFumarateAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "ketotifenHydrogenFumarateAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "ketotifenHydrogenFumarateAssay"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "ketotifenHydrogenFumarateAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "ketotifenHydrogenFumarateAssay",
                              )
                            }
                          />
                        )}

                        {lecithinSingleLinearityTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={lecithinSingleLinearityTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("lecithinSingleLinearity")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lecithinSingleLinearity"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lecithinSingleLinearity"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "lecithinSingleLinearity",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "lecithinSingleLinearity",
                              )
                            }
                          />
                        )}

                        {lecithinBatchAnalysisTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={lecithinBatchAnalysisTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("lecithinBatchAnalysis")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lecithinBatchAnalysis"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lecithinBatchAnalysis"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "lecithinBatchAnalysis",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "lecithinBatchAnalysis",
                              )
                            }
                          />
                        )}

                        {lipoidsAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={lipoidsAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("lipoidsAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lipoidsAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lipoidsAssay"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={
                              addedStandards[selectedParam.id] || []
                            }
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "lipoidsAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "lipoidsAssay",
                              )
                            }
                          />
                        )}

                        {lipoidsImpurityTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={lipoidsImpurityTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("lipoidsImpurity")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lipoidsImpurity"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lipoidsImpurity"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "lipoidsImpurity",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "lipoidsImpurity",
                              )
                            }
                          />
                        )}

                        {logarithmicCalculation4PointTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={logarithmicCalculation4PointTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("logarithmicCalculation4Point")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "logarithmicCalculation4Point"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "logarithmicCalculation4Point"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "logarithmicCalculation4Point",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "logarithmicCalculation4Point",
                              )
                            }
                          />
                        )}

                        {ndmaValidationBatchAnalysisTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={ndmaValidationBatchAnalysisTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("ndmaValidationBatchAnalysis")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "ndmaValidationBatchAnalysis"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "ndmaValidationBatchAnalysis"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "ndmaValidationBatchAnalysis",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "ndmaValidationBatchAnalysis",
                              )
                            }
                          />
                        )}

                        {povidoneLimitOfAldehydeTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={povidoneLimitOfAldehydeTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("povidoneLimitOfAldehyde")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "povidoneLimitOfAldehyde"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "povidoneLimitOfAldehyde"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "povidoneLimitOfAldehyde",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "povidoneLimitOfAldehyde",
                              )
                            }
                          />
                        )}

                        {prilocaineAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={prilocaineAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("prilocaineAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "prilocaineAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "prilocaineAssay"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "prilocaineAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "prilocaineAssay",
                              )
                            }
                          />
                        )}

                        {castorOilFattyAcidTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={castorOilFattyAcidTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("castorOilFattyAcid")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "castorOilFattyAcid"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "castorOilFattyAcid"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "castorOilFattyAcid",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "castorOilFattyAcid",
                              )
                            }
                          />
                        )}

                        {hecEthoxyContentTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={hecEthoxyContentTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("hecEthoxyContent")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "hecEthoxyContent"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "hecEthoxyContent"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "hecEthoxyContent",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "hecEthoxyContent",
                              )
                            }
                          />
                        )}

                        {hpcAssayTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={hpcAssayTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("hpcAssay")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "hpcAssay"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "hpcAssay"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "hpcAssay",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "hpcAssay",
                              )
                            }
                          />
                        )}

                        {lhpcHydroxypropoxyContentTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={lhpcHydroxypropoxyContentTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("lhpcHydroxypropoxyContent")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lhpcHydroxypropoxyContent"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "lhpcHydroxypropoxyContent"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "lhpcHydroxypropoxyContent",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "lhpcHydroxypropoxyContent",
                              )
                            }
                          />
                        )}

                        {magnesiumStearateFattyAcidTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={magnesiumStearateFattyAcidTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("magnesiumStearateFattyAcid")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "magnesiumStearateFattyAcid"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "magnesiumStearateFattyAcid"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "magnesiumStearateFattyAcid",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "magnesiumStearateFattyAcid",
                              )
                            }
                          />
                        )}

                        {nefopamResidualSolventTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={nefopamResidualSolventTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("nefopamResidualSolvent")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "nefopamResidualSolvent"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "nefopamResidualSolvent"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "nefopamResidualSolvent",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "nefopamResidualSolvent",
                              )
                            }
                          />
                        )}

                        {polyoxyl35CastorOilGlycolsTemplate && (
                          <GenericCalculationSection
                            parameterId={selectedParam.id}
                            template={polyoxyl35CastorOilGlycolsTemplate}
                            isActive={(
                              activePreparationGroups[selectedParam.id] || []
                            ).includes("polyoxyl35CastorOilGlycols")}
                            isPreparationLocked={
                              !!groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "polyoxyl35CastorOilGlycols"
                              ] || isPreparationLocked
                            }
                            shouldDisableContent={shouldDisableContent}
                            canManagePrep={canManagePrep}
                            isFullyLocked={isFullyLocked}
                            role={role}
                            completedAt={
                              groupPrepCompletedAtPerParam[selectedParam.id]?.[
                                "polyoxyl35CastorOilGlycols"
                              ] || null
                            }
                            showPreparations={false}
                            standardPreparations={[]}
                            handleAddStandardPreparation={() => {}}
                            handleRemoveStandardPreparation={() => {}}
                            handleStandardPreparationStepChange={() => {}}
                            samplePreparations={[]}
                            renderSamplePreparationEditor={() => null}
                            handleAddSamplePreparation={() => {}}
                            handleRemoveSamplePreparation={() => {}}
                            handleSamplePreparationStepChange={() => {}}
                            calculations={
                              (calculationsGenericPerParam ?? {})[
                                selectedParam.id
                              ] || []
                            }
                            assignedStandards={addedStandards[selectedParam.id] || []}
                            getFilesForPrep={getFilesForPrep}
                            handleAddPrepFiles={handleAddPrepFiles}
                            handleRemovePrepFile={handleRemovePrepFile}
                            handleAddCalculation={handleAddCalculationGeneric}
                            handleRemoveCalculation={handleRemoveCalculationGeneric}
                            handleFieldChange={handleGenericFieldChange}
                            handleGroupFieldChange={handleGenericGroupFieldChange}
                            handleAddGroupRow={handleAddGenericGroupRow}
                            handleRemoveGroupRow={handleRemoveGenericGroupRow}
                            handleSelectStandardPreparation={
                              handleSelectGenericStandardPreparation
                            }
                            handleSelectSamplePreparation={
                              handleSelectGenericSamplePreparation
                            }
                            onComplete={() =>
                              handleInitiateCompleteGroupPrep(
                                selectedParam,
                                "polyoxyl35CastorOilGlycols",
                              )
                            }
                            onUnlock={() =>
                              handleInitiateUnlockGroupPrep(
                                selectedParam,
                                "polyoxyl35CastorOilGlycols",
                              )
                            }
                          />
                        )}

                        <DrugLodSection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("lod")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            groupPrepCompletedAtPerParam[selectedParam.id]?.[
                              "lod"
                            ] || null
                          }
                          samplePreparations={
                            samplePreparationLodPerParam[selectedParam.id] || []
                          }
                          calculations={
                            calculationsLodPerParam[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddSamplePreparationLod={
                            handleAddSamplePreparationLod
                          }
                          handleRemoveSamplePreparationLod={
                            handleRemoveSamplePreparationLod
                          }
                          handleSamplePreparationLodStepChange={
                            handleSamplePreparationLodStepChange
                          }
                          handleAddCalculationLod={handleAddCalculationLod}
                          handleRemoveCalculationLod={handleRemoveCalculationLod}
                          handleCalculationLodFieldChange={
                            handleCalculationLodFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "lod",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "lod",
                            )
                          }
                        />

                        <DrugRoiSection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("roi")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            groupPrepCompletedAtPerParam[selectedParam.id]?.[
                              "roi"
                            ] || null
                          }
                          samplePreparations={
                            samplePreparationROIPerParam[selectedParam.id] || []
                          }
                          calculations={
                            calculationsROIPerParam[selectedParam.id] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddSamplePreparationROI={
                            handleAddSamplePreparationROI
                          }
                          handleRemoveSamplePreparationROI={
                            handleRemoveSamplePreparationROI
                          }
                          handleSamplePreparationROIStepChange={
                            handleSamplePreparationROIStepChange
                          }
                          handleAddCalculationROI={handleAddCalculationROI}
                          handleRemoveCalculationROI={handleRemoveCalculationROI}
                          handleCalculationROIFieldChange={
                            handleCalculationROIFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "roi",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "roi",
                            )
                          }
                        />

                        <DrugSulphatedAshSection
                          parameterId={selectedParam.id}
                          isActive={(
                            activePreparationGroups[selectedParam.id] || []
                          ).includes("sulphatedAsh")}
                          isPreparationLocked={isPreparationLocked}
                          shouldDisableContent={shouldDisableContent}
                          canManagePrep={canManagePrep}
                          isFullyLocked={isFullyLocked}
                          role={role}
                          completedAt={
                            groupPrepCompletedAtPerParam[selectedParam.id]?.[
                              "sulphatedAsh"
                            ] || null
                          }
                          samplePreparations={
                            samplePreparationSulphatedAshPerParam[
                              selectedParam.id
                            ] || []
                          }
                          calculations={
                            calculationsSulphatedAshPerParam[
                              selectedParam.id
                            ] || []
                          }
                          getFilesForPrep={getFilesForPrep}
                          handleAddPrepFiles={handleAddPrepFiles}
                          handleRemovePrepFile={handleRemovePrepFile}
                          handleAddSamplePreparationSulphatedAsh={
                            handleAddSamplePreparationSulphatedAsh
                          }
                          handleRemoveSamplePreparationSulphatedAsh={
                            handleRemoveSamplePreparationSulphatedAsh
                          }
                          handleSamplePreparationSulphatedAshStepChange={
                            handleSamplePreparationSulphatedAshStepChange
                          }
                          handleAddCalculationSulphatedAsh={
                            handleAddCalculationSulphatedAsh
                          }
                          handleRemoveCalculationSulphatedAsh={
                            handleRemoveCalculationSulphatedAsh
                          }
                          handleCalculationSulphatedAshFieldChange={
                            handleCalculationSulphatedAshFieldChange
                          }
                          onComplete={() =>
                            handleInitiateCompleteGroupPrep(
                              selectedParam,
                              "sulphatedAsh",
                            )
                          }
                          onUnlock={() =>
                            handleInitiateUnlockGroupPrep(
                              selectedParam,
                              "sulphatedAsh",
                            )
                          }
                        />

    </>
  );
};

export default DrugPrimaryAnalysisGroupsCoordinator;