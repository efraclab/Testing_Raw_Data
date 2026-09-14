import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/worksheetDateUtils";
import { motion } from "framer-motion";
import type { DrugWorksheetProps } from "./worksheets/drugs/drugWorksheetConfig";
import { getDrugPreparationGroupOptions } from "./worksheets/drugs/drugPreparationGroupOptions";
import { getDrugWorksheetParameterSummary } from "../hooks/drugWorksheetParameterSummary";
import { createNewSystemSuitability } from "../hooks/drugWorksheetFactories";
import { useDrugAnalysts } from "../hooks/useDrugAnalysts";
import { useDrugReferenceResourceUi } from "../hooks/useDrugReferenceResourceUi";
import { useDrugReferenceResourceSelection } from "../hooks/useDrugReferenceResourceSelection";
import { useDrugWorksheetDisplayStatus } from "../hooks/useDrugWorksheetDisplayStatus";
import { useDrugParameterAccess } from "../hooks/useDrugParameterAccess";
import { useDrugStandardSelectionState } from "../hooks/useDrugStandardSelectionState";
import { useDrugAvailableStandards } from "../hooks/useDrugAvailableStandards";
import { useDrugBasicCalculationHandlers } from "../hooks/useDrugBasicCalculationHandlers";
import { useDrugSulphatedAshCalculationHandlers } from "../hooks/useDrugSulphatedAshCalculationHandlers";
import { useDrugResidualSolventCalculationHandlers } from "../hooks/useDrugResidualSolventCalculationHandlers";
import { useDrugRelatedSubstanceCalculationHandlers } from "../hooks/useDrugRelatedSubstanceCalculationHandlers";
import { useDrugDissolutionCalculationHandlers } from "../hooks/useDrugDissolutionCalculationHandlers";
import { useDrugDissolutionProfileCalculationHandlers } from "../hooks/useDrugDissolutionProfileCalculationHandlers";
import { useDrugUniformityCalculationHandlers } from "../hooks/useDrugUniformityCalculationHandlers";
import { useDrugDissolutionFerrousFumarateCalculationHandlers } from "../hooks/useDrugDissolutionFerrousFumarateCalculationHandlers";
import { useDrugHypromelloseCalculationHandlers } from "../hooks/useDrugHypromelloseCalculationHandlers";
import { useDrugHypromelloseCalculationSync } from "../hooks/useDrugHypromelloseCalculationSync";
import { useDrugNitrosamineCalculationHandlers } from "../hooks/useDrugNitrosamineCalculationHandlers";
import { useDrugNitrosamineCalculationSync } from "../hooks/useDrugNitrosamineCalculationSync";
import { useDrugBlankPreparationHandlers } from "../hooks/useDrugBlankPreparationHandlers";
import { useDrugMobilePhaseHandlers } from "../hooks/useDrugMobilePhaseHandlers";
import { useDrugDissolutionMediaHandlers } from "../hooks/useDrugDissolutionMediaHandlers";
import { useDrugAssayFerrousFumaratePreparationHandlers } from "../hooks/useDrugAssayFerrousFumaratePreparationHandlers";
import { useDrugAssayFerrousFumarateCalculationHandlers } from "../hooks/useDrugAssayFerrousFumarateCalculationHandlers";
import { useDrugDissolutionFerrousFumaratePreparationHandlers } from "../hooks/useDrugDissolutionFerrousFumaratePreparationHandlers";
import { useDrugBufferPreparationHandlers } from "../hooks/useDrugBufferPreparationHandlers";
import { useDrugDiluentPreparationHandlers } from "../hooks/useDrugDiluentPreparationHandlers";
import { useDrugUniformityPreparationHandlers } from "../hooks/useDrugUniformityPreparationHandlers";
import { useDrugHypromellosePreparationHandlers } from "../hooks/useDrugHypromellosePreparationHandlers";
import { useDrugNitrosaminePreparationHandlers } from "../hooks/useDrugNitrosaminePreparationHandlers";
import { useDrugDissolutionProfilePreparationHandlers } from "../hooks/useDrugDissolutionProfilePreparationHandlers";
import { useDrugResidualSolventPreparationHandlers } from "../hooks/useDrugResidualSolventPreparationHandlers";
import { useDrugRelatedSubstancePreparationHandlers } from "../hooks/useDrugRelatedSubstancePreparationHandlers";
import { useDrugDissolutionPreparationHandlers } from "../hooks/useDrugDissolutionPreparationHandlers";
import { useDrugStandardPreparationDialogHandlers } from "../hooks/useDrugStandardPreparationDialogHandlers";
import { useDrugStandardSelectionHandlers } from "../hooks/useDrugStandardSelectionHandlers";
import { useDrugAssayPreparationHandlers } from "../hooks/useDrugAssayPreparationHandlers";
import { useDrugTitrationPreparationHandlers } from "../hooks/useDrugTitrationPreparationHandlers";
import { useDrugBetadexPreparationHandlers } from "../hooks/useDrugBetadexPreparationHandlers";
import { useDrugStandardizedTitrationAssayPreparationHandlers } from "../hooks/useDrugStandardizedTitrationAssayPreparationHandlers";
import { useDrugDibasicSodiumPhosphateAssayPreparationHandlers } from "../hooks/useDrugDibasicSodiumPhosphateAssayPreparationHandlers";
import { useGenericCalculationHandlers } from "../hooks/useGenericCalculationHandlers";
import { useGenericCalculationTemplates } from "../hooks/useGenericCalculationTemplates.ts";
import type { CalculationGenericRow } from "../preparation_models/drugs/GenericCalculationTemplate";
import { useDrugLodPreparationHandlers } from "../hooks/useDrugLodPreparationHandlers";
import { useDrugSulphatedAshPreparationHandlers } from "../hooks/useDrugSulphatedAshPreparationHandlers";
import { useDrugRoiPreparationHandlers } from "../hooks/useDrugRoiPreparationHandlers";
import { useDrugAnalysisLifecycleHandlers } from "../hooks/useDrugAnalysisLifecycleHandlers";
import { useDrugReviewerDecisionHandlers } from "../hooks/useDrugReviewerDecisionHandlers";
import { useDrugQaRevisionHandlers } from "../hooks/useDrugQaRevisionHandlers";
import { useDrugWorksheetApprovalHandlers } from "../hooks/useDrugWorksheetApprovalHandlers";
import { useDrugSubmitForQaHandler } from "../hooks/useDrugSubmitForQaHandler";
import { useDrugParameterDeleteHandlers } from "../hooks/useDrugParameterDeleteHandlers";
import { useDrugPreparationCompletionHandlers } from "../hooks/useDrugPreparationCompletionHandlers";
import { useDrugParameterUnlockHandlers } from "../hooks/useDrugParameterUnlockHandlers";
import { useDrugAnalystDialogHandlers } from "../hooks/useDrugAnalystDialogHandlers";
import { useDrugAnalystSelectionHandler } from "../hooks/useDrugAnalystSelectionHandler";
import { useDrugRemoveParameterHandler } from "../hooks/useDrugRemoveParameterHandler";
import { useDrugWorksheetUiActions } from "../hooks/useDrugWorksheetUiActions";
import { useDrugSaveDraftHandler } from "../hooks/useDrugSaveDraftHandler";
import { useDrugSubmitForAnalysisHandler } from "../hooks/useDrugSubmitForAnalysisHandler";
import { useDrugStartRevisionHandler } from "../hooks/useDrugStartRevisionHandler";
import { useDrugReloadWorksheet } from "../hooks/useDrugReloadWorksheet";
import { useDrugWorksheetStateRestorer } from "../hooks/useDrugWorksheetStateRestorer";
import { useDrugFullParameterPayloadBuilder } from "../hooks/useDrugFullParameterPayloadBuilder";
import { useDrugWorksheetFormCollector } from "../hooks/useDrugWorksheetFormCollector";
import { useDrugWorksheetSidebarBridge } from "../hooks/useDrugWorksheetSidebarBridge";
import { useDrugPreparationGroupToggle } from "../hooks/useDrugPreparationGroupToggle";
import useDrugWorksheetFiles from "../hooks/useDrugWorksheetFiles";
import DrugAdditionalInfoSection from "./worksheets/drugs/DrugAdditionalInfoSection";
import DrugInternalStandardSection from "./worksheets/drugs/DrugInternalStandardSection";
import DrugBufferPreparationSection from "./worksheets/drugs/DrugBufferPreparationSection";
import DrugMobilePhaseSection from "./worksheets/drugs/DrugMobilePhaseSection";
import DrugDiluentPreparationSection from "./worksheets/drugs/DrugDiluentPreparationSection";
import DrugPreparationsManagementSection from "./worksheets/drugs/DrugPreparationsManagementSection";
import DrugBlankPreparationSection from "./worksheets/drugs/DrugBlankPreparationSection";
import DrugAssayFerrousFumarateSection from "./worksheets/drugs/DrugAssayFerrousFumarateSection";
import DrugDissolutionFerrousFumarateSection from "./worksheets/drugs/DrugDissolutionFerrousFumarateSection";
import DrugAssaySection from "./worksheets/drugs/DrugAssaySection";
import DrugLodSection from "./worksheets/drugs/DrugLodSection";
import DrugRoiSection from "./worksheets/drugs/DrugRoiSection";
import DrugSulphatedAshSection from "./worksheets/drugs/DrugSulphatedAshSection";
import DrugResidualSolventSection from "./worksheets/drugs/DrugResidualSolventSection";
import DrugRelatedSubstanceSection from "./worksheets/drugs/DrugRelatedSubstanceSection";
import DrugDissolutionSection from "./worksheets/drugs/DrugDissolutionSection";
import DrugDissolutionProfileSection from "./worksheets/drugs/DrugDissolutionProfileSection";
import DrugUniformityOfContentSection from "./worksheets/drugs/DrugUniformityOfContentSection";
import DrugHypromelloseSection from "./worksheets/drugs/DrugHypromelloseSection";
import DrugNitrosamineSection from "./worksheets/drugs/DrugNitrosamineSection";
import DrugSystemSuitabilitySection from "./worksheets/drugs/DrugSystemSuitabilitySection";
import DrugParameterFilesSection from "./worksheets/drugs/DrugParameterFilesSection";
import DrugPreparationDialogs from "./worksheets/drugs/DrugPreparationDialogs";
import DrugAnalysisReviewDialogs from "./worksheets/drugs/DrugAnalysisReviewDialogs";
import DrugSelectionActionDialogs from "./worksheets/drugs/DrugSelectionActionDialogs";
import DrugWorksheetResourcesSection from "./worksheets/drugs/DrugWorksheetResourcesSection";
import DrugParameterOverviewSection from "./worksheets/drugs/DrugParameterOverviewSection";
import DrugBottomParameterActionBar from "./worksheets/drugs/DrugBottomParameterActionBar";
import DrugLockedParameterOverlay from "./worksheets/drugs/DrugLockedParameterOverlay";
import DrugParametersManagementSection from "./worksheets/drugs/DrugParametersManagementSection";
import DrugWorksheetHeaderSummary from "./worksheets/drugs/DrugWorksheetHeaderSummary";
import DrugWorksheetUiSupport from "./worksheets/drugs/DrugWorksheetUiSupport";
import DrugParameterTopSection from "./worksheets/drugs/DrugParameterTopSection";
import DrugParameterPreparationCoordinator from "./worksheets/drugs/DrugParameterPreparationCoordinator";
import DrugPrimaryAnalysisGroupsCoordinator from "./worksheets/drugs/DrugPrimaryAnalysisGroupsCoordinator";
import DrugAdvancedAnalysisGroupsCoordinator from "./worksheets/drugs/DrugAdvancedAnalysisGroupsCoordinator";
import DrugParameterFooterCoordinator from "./worksheets/drugs/DrugParameterFooterCoordinator";
import DrugSelectedParametersRenderer from "./worksheets/drugs/DrugSelectedParametersRenderer";
import { type SampleData } from "../models/SampleData";
import type { Standard } from "../preparation_models/Standard";
import type { StandardPreparation } from "../preparation_models/drugs/StandardPreparation";
import type { SamplePreparation } from "../preparation_models/drugs/SamplePreparation";
import type { StandardPreparationStep } from "../preparation_models/drugs/StandardPreparationStep";
import type { SamplePreparationStep } from "../preparation_models/drugs/SamplePreparationStep";
import type { SamplePreparationLod } from "../preparation_models/drugs/SamplePreparationLod";
import type { SamplePreparationLodStep } from "../preparation_models/drugs/SamplePreparationLodStep";
import type { SamplePreparationSulphatedAsh } from "../preparation_models/drugs/SamplePreparationSulphatedAsh";
import type { SamplePreparationSulphatedAshStep } from "../preparation_models/drugs/SamplePreparationSulphatedAshStep";
import type { SamplePreparationROI } from "../preparation_models/drugs/SamplePreparationROI";
import type { SamplePreparationROIStep } from "../preparation_models/drugs/SamplePreparationROIStep";
import type { SamplePreparationDisso } from "../preparation_models/drugs/SamplePreparationDisso";
import type { SamplePreparationDissoStep } from "../preparation_models/drugs/SamplePreparationDissoStep";
import StandardSelectionDialog from "./shared/StandardSelectionDialog";
import type { CalculationAssay } from "../preparation_models/drugs/CalculationAssay";
import type { CalculationSulphatedAsh } from "../preparation_models/drugs/CalculationSulphatedAsh";
import type { CalculationROI } from "../preparation_models/drugs/CalculationROI";
import type { CalculationLod } from "../preparation_models/drugs/CalculationLod";
import type { CalculationRS } from "../preparation_models/drugs/CalculationRS";
import type { CalculationRelatedSubstance } from "../preparation_models/drugs/CalculationRelatedSubstance";
import type { CalculationDisso } from "../preparation_models/drugs/CalculationDisso";
import type { CalculationDissoProfile } from "../preparation_models/drugs/CalculationDissoProfile";
import type { WorksheetDetail } from "../models/WorksheetDetail";
import type { ParameterDetail } from "../models/ParameterDetail";
import SubmitDialog from "./shared/SubmitDialog";
import CompleteAnalysisDialog from "./shared/CompleteAnalysisDialog";
import CompletePreparationDialog from "./shared/CompletePreparationDialog";
import UnlockPreparationDialog from "./shared/UnlockPreparationDialog";
import StartAnalysisDialog from "./shared/StartAnalysisDialog";
import ApproveParameterDialog from "./shared/ApproveParameterDialog";
import DisapproveParameterDialog from "./shared/DisapproveParameterDialog";
import RevisionRequestDialog from "./shared/RevisionRequestDialog";
import ApproveWorksheetDialog from "./shared/ApproveWorksheetDialog";
import RevertApprovalDialog from "./shared/RevertApprovalDialog";
import Toast from "./shared/Toast";
import { WorksheetDbMapper } from "../helpers/WorksheetDbMapper";
import type { SamplePreparationTitration } from "../preparation_models/drugs/SamplePreparationTitration";
import type { DissoMediaPreparation } from "../preparation_models/drugs/DissoMediaPreparation";
import type { SamplePreparationTitrationStep } from "../preparation_models/drugs/SamplePreparationTitrationStep";
import type { DissoMediaPreparationStep } from "../preparation_models/drugs/DissoMediaPreparationStep";
import type { CalculationAssayFerrousFumarate } from "../preparation_models/drugs/CalculationAssayFerrousFumarate";
import type { CalculationDissoFerrousFumarate } from "../preparation_models/drugs/CalculationDissoFerrousFumarate";
import type { CalculationUC } from "../preparation_models/drugs/CalculationUC";
import type { SamplePreparationUC } from "../preparation_models/drugs/SamplePreparationUC";
import type { SamplePreparationUCStep } from "../preparation_models/drugs/SamplePreparationUCStep";
import type { SystemSuitability } from "../preparation_models/drugs/SystemSuitability";
import PreparationEditorDialog from "./sub-components/drugs/PreparationEditorDialog";
import type { BlankPreparation as BlankPreparationModel } from "../preparation_models/drugs/BlankPreparation";
import type { BufferPreparation as BufferPreparationModel } from "../preparation_models/drugs/BufferPreparation";
import type { MobilePhasePreparation } from "../preparation_models/drugs/MobilePhasePreparation";
import type { DiluentPreparation } from "../preparation_models/drugs/DiluentPreparation";
import type { AttachedFile } from "../models/AttachedFile";

import type { WorksheetStandard } from "../models/WorksheetStandard";
import type { WorksheetInstrument } from "../models/WorksheetInstrument";
import type { WorksheetChemical } from "../models/WorksheetChemical";
import type { StandardPreparationHypromellose } from "../preparation_models/drugs/Standardpreparationhypromellose.ts";
import type { SamplePreparationHypromellose } from "../preparation_models/drugs/Samplepreparationhypromellose.ts";
import type { CalculationAssayHypromellose } from "../preparation_models/drugs/Calculationassayhypromellose.ts";
import type { StandardPreparationNitrosamine } from "../preparation_models/drugs/Standardpreparationnitrosamine.ts";
import type { SamplePreparationNitrosamine } from "../preparation_models/drugs/Samplepreparationnitrosamine.ts";
import type { CalculationAssayNitrosamine } from "../preparation_models/drugs/Calculationassaynitrosamine.ts";


const hypromelloseWeightToMg = (
  value: string | null | undefined,
  unit: string | null | undefined,
): number => {
  const num = parseFloat(value ?? "");
  if (isNaN(num)) return NaN;
  return (unit || "").toLowerCase() === "g" ? num * 1000 : num;
};

// Support current and historical saved step names.
const isMethylIodideStep = (name: string) =>
  name === "Weight of Methyl Iodide" ||
  name === "Methyl Iodide - in Weight" ||
  name === "Methyl Iodide - By Difference";

const isIsopropylIodideStep = (name: string) =>
  name === "Weight of Isopropyl Iodide" ||
  name === "Isopropyl Iodide - in Weight" ||
  name === "Isopropyl Iodide - By Difference";

const nitrosamineWeightToMg = (
  value: string | null | undefined,
  unit: string | null | undefined,
): number => {
  const num = parseFloat(value ?? "");
  if (isNaN(num)) return NaN;
  return (unit || "").toLowerCase() === "g" ? num * 1000 : num;
};

const dilutionFactorFromNitrosamineSteps = (
  steps: { value1?: string; value2?: string }[],
): number => {
  let df = 1;
  let pendingMl: number | null = null;

  for (const step of steps) {
    const mlTaken = step.value1 ? parseFloat(step.value1) : null;
    const dilutedTo = step.value2 ? parseFloat(step.value2) : null;

    if (mlTaken != null && !isNaN(mlTaken)) {
      pendingMl = mlTaken;
    }

    if (dilutedTo != null && !isNaN(dilutedTo)) {
      df =
        pendingMl == null
          ? df * dilutedTo
          : (df / pendingMl) * dilutedTo;
      pendingMl = null;
    }
  }

  return df;
};

const DrugWorksheet: React.FC<DrugWorksheetProps> = ({
  worksheetId,
  instruments = [],
  chemicals = [],
  standards = [],
  isReferenceDataLoading = false,
  referenceDataError = null,
  employeeId,
  role,
  department,
  onPrint,
  onSidebarStateChange,
  onSidebarActionsReady,
}) => {
  // Core state
  const [paramIdx, setParamIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [worksheetInfo, setWorksheetInfo] = useState<WorksheetDetail | null>(
    null,
  );
  const [samplesData, setSamplesData] = useState<SampleData[]>([]);
  const [addedParameters, setAddedParameters] = useState<ParameterDetail[]>([]);
  const [showParameterDropdown, setShowParameterDropdown] = useState(false);
  const [selectedParamsForDetail, setSelectedParamsForDetail] = useState<
    number[]
  >([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analystMode, setAnalystMode] = useState<"add" | "reassign">("add");
  const [showAnalystDialog, setShowAnalystDialog] = useState(false);
  const [pendingParameter, setPendingParameter] =
    useState<ParameterDetail | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const analysts = useDrugAnalysts();

  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [parameterToUnlock, setParameterToUnlock] =
    useState<ParameterDetail | null>(null);
  const [parameterToDelete, setParameterToDelete] =
    useState<ParameterDetail | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showStartAnalysisDialog, setShowStartAnalysisDialog] = useState(false);
  const [showCompleteAnalysisDialog, setShowCompleteAnalysisDialog] =
    useState(false);
  const [parameterForAnalysis, setParameterForAnalysis] =
    useState<ParameterDetail | null>(null);
  const [isStartingAnalysis, setIsStartingAnalysis] = useState(false);
  const [isCompletingAnalysis, setIsCompletingAnalysis] = useState(false);

  // Tracks which parameters the analyst has explicitly started revision on (optimistic).
  // Server status "Analysis Revision Started" is the source of truth after hydration.
  const [revisionStartedParams, setRevisionStartedParams] = useState<Set<number>>(new Set());

  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showDisapproveDialog, setShowDisapproveDialog] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const [parameterForApproval, setParameterForApproval] =
    useState<ParameterDetail | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isDisapproving, setIsDisapproving] = useState(false);
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);
  const [revisionComments, setRevisionComments] = useState("");

  const [showApproveWorksheetDialog, setShowApproveWorksheetDialog] =
    useState(false);
  const [isApprovingWorksheet, setIsApprovingWorksheet] = useState(false);

  const [showRevertApprovalDialog, setShowRevertApprovalDialog] =
    useState(false);
  const [isRevertingApproval, setIsRevertingApproval] = useState(false);

  const [showSubmitForQADialog, setShowSubmitForQADialog] = useState(false);
  const [isSubmittingForQA, setIsSubmittingForQA] = useState(false);

  const [mobilePhasePerParam, setMobilePhasePerParam] = useState<
    Record<number, MobilePhasePreparation[]>
  >({});
  const [dissoMediaPerParam, setDissoMediaPerParam] = useState<
    Record<number, DissoMediaPreparation[]>
  >({});
  const [
    samplePrepAssayFerrousFumaratePerParam,
    setSamplePrepAssayFerrousFumaratePerParam,
  ] = useState<Record<number, SamplePreparationTitration[]>>({});
  const [
    calculationsAssayFerrousFumaratePerParam,
    setCalculationsAssayFerrousFumaratePerParam,
  ] = useState<Record<number, CalculationAssayFerrousFumarate[]>>({});
  const [
    calculationsDissoFerrousFumaratePerParam,
    setCalculationsDissoFerrousFumaratePerParam,
  ] = useState<Record<number, CalculationDissoFerrousFumarate[]>>({});
  const [
    samplePrepDissoFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
  ] = useState<Record<number, SamplePreparationTitration[]>>({});

  const [samplePreparationUCPerParam, setSamplePreparationUCPerParam] =
    useState<Record<number, SamplePreparationUC[]>>({});
  const [calculationsUCPerParam, setCalculationsUCPerParam] = useState<
    Record<number, CalculationUC[]>
  >({});
  const [standardPreparationUCPerParam, setStandardPreparationUCPerParam] =
    useState<Record<number, StandardPreparation[]>>({});
  const [
    standardPreparationHypromellosePerParam,
    setStandardPreparationHypromellosePerParam,
  ] = useState<Record<number, StandardPreparationHypromellose[]>>({});
  const [
    samplePreparationHypromellosePerParam,
    setSamplePreparationHypromellosePerParam,
  ] = useState<Record<number, SamplePreparationHypromellose[]>>({});
  const [
    calculationsAssayHypromellosePerParam,
    setCalculationsAssayHypromellosePerParam,
  ] = useState<Record<number, CalculationAssayHypromellose[]>>({});
  const [
    standardPreparationNitrosaminePerParam,
    setStandardPreparationNitrosaminePerParam,
  ] = useState<Record<number, StandardPreparationNitrosamine[]>>({});
  const [
    samplePreparationNitrosaminePerParam,
    setSamplePreparationNitrosaminePerParam,
  ] = useState<Record<number, SamplePreparationNitrosamine[]>>({});
  const [
    calculationsAssayNitrosaminePerParam,
    setCalculationsAssayNitrosaminePerParam,
  ] = useState<Record<number, CalculationAssayNitrosamine[]>>({});

  // Per-parameter state
  const [columnsPerParam, setColumnsPerParam] = useState<
    Record<number, string>
  >({});
  const [calculationsAssayPerParam, setCalculationsAssayPerParam] = useState<
    Record<number, CalculationAssay[]>
  >({});
  const [calculationsGenericPerParam, setCalculationsGenericPerParam] =
    useState<Record<number, CalculationGenericRow[]>>({});
  const [
    standardPreparationTitrationPerParam,
    setStandardPreparationTitrationPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [
    samplePreparationTitrationPerParam,
    setSamplePreparationTitrationPerParam,
  ] = useState<Record<number, SamplePreparationTitration[]>>({});
  const [
    standardPreparationBetadexPerParam,
    setStandardPreparationBetadexPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [
    samplePreparationBetadexPerParam,
    setSamplePreparationBetadexPerParam,
  ] = useState<Record<number, SamplePreparationTitration[]>>({});
  const [
    standardPreparationStandardizedTitrationAssayPerParam,
    setStandardPreparationStandardizedTitrationAssayPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [
    samplePreparationStandardizedTitrationAssayPerParam,
    setSamplePreparationStandardizedTitrationAssayPerParam,
  ] = useState<Record<number, SamplePreparationTitration[]>>({});
  const [
    standardPreparationDibasicSodiumPhosphateAssayPerParam,
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [
    samplePreparationDibasicSodiumPhosphateAssayPerParam,
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam,
  ] = useState<Record<number, SamplePreparationTitration[]>>({});
  const [
    standardPreparationAssayPerParam,
    setStandardPreparationAssayPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [samplePreparationPerParam, setSamplePreparationPerParam] = useState<
    Record<number, SamplePreparation[]>
  >({});
  const [samplePreparationLodPerParam, setSamplePreparationLodPerParam] =
    useState<Record<number, SamplePreparationLod[]>>({});
  const [
    samplePreparationSulphatedAshPerParam,
    setSamplePreparationSulphatedAshPerParam,
  ] = useState<Record<number, SamplePreparationSulphatedAsh[]>>({});
  const [samplePreparationROIPerParam, setSamplePreparationROIPerParam] =
    useState<Record<number, SamplePreparationROI[]>>({});
  const [samplePreparationDissoPerParam, setSamplePreparationDissoPerParam] =
    useState<Record<number, SamplePreparationDisso[]>>({});
  const [addedInstruments, setAddedInstruments] = useState<
    Record<number, WorksheetInstrument[]>
  >({});
  const [addedChemicals, setAddedChemicals] = useState<
    Record<number, WorksheetChemical[]>
  >({});
  const [addedStandards, setAddedStandards] = useState<
    Record<number, WorksheetStandard[]>
  >({});
  // Internal Standard Preparation - Hypromellose only, independent pool from addedStandards
  const [addedInternalStandards, setAddedInternalStandards] = useState<
    Record<number, WorksheetStandard[]>
  >({});
  const [showInternalStandardPreparation, setShowInternalStandardPreparation] =
    useState<Record<number, boolean>>({});
  const [otherInfoPerParam, setOtherInfoPerParam] = useState<
    Record<number, string>
  >({});
  const [additionalInfoPerParam, setAdditionalInfoPerParam] = useState<
    Record<number, string>
  >({});
  const [showAdditionalInfo, setShowAdditionalInfo] = useState<
    Record<number, boolean>
  >({});
  const [diluentPerParam, setDiluentPerParam] = useState<
    Record<number, string>
  >({});
  const [analysisStartDatePerParam, setAnalysisStartDatePerParam] = useState<
    Record<number, string>
  >({});
  const [analysisCompletionDatePerParam, setAnalysisCompletionDatePerParam] =
    useState<Record<number, string>>({});
  const [revisionStartDatePerParam, setRevisionStartDatePerParam] = useState<
    Record<number, string>
  >({});
  const [revisionCompletedDatePerParam, setRevisionCompletedDatePerParam] = useState<
    Record<number, string>
  >({});
  const [analyzedByPerParam, setAnalyzedByPerParam] = useState<
    Record<number, string>
  >({});
  const [analyzedByNamePerParam, setAnalyzedByNamePerParam] = useState<
    Record<number, string>
  >({});
  const [approvedByReviewerPerParam, setApprovedByPerParam] = useState<
    Record<number, string>
  >({});
  const [approvedByReviewerNamePerParam, setApprovedByNamePerParam] = useState<
    Record<number, string>
  >({});
  const [approvedAtReviewerPerParam, setApprovedAtPerParam] = useState<
    Record<number, string>
  >({});

  // QA-specific state
  const [approvedByQAPerParam, setApprovedByQAPerParam] = useState<
    Record<number, string>
  >({});
  const [approvedAtQAPerParam, setApprovedAtQAPerParam] = useState<
    Record<number, string>
  >({});
  const [remarksQAPerParam, setRemarksQAPerParam] = useState<
    Record<number, string | null>
  >({});
  const [remarksByReviewerPerParam, setRemarksByReviewerPerParam] = useState<
    Record<number, string | null>
  >({});
  const [remarksByAnalystPerParam, setRemarksByAnalystPerParam] = useState<
    Record<number, string | null>
  >({});
  const [preparationCompletedByPerParam, setPreparationCompletedByPerParam] =
    useState<Record<number, string>>({});
  const [preparationCompletedAtPerParam, setPreparationCompletedAtPerParam] =
    useState<Record<number, string>>({});

  // Per-group preparation completion state: { paramId: { groupKey: isoTimestamp } }
  const [groupPrepCompletedAtPerParam, setGroupPrepCompletedAtPerParam] =
    useState<Record<number, Record<string, string>>>({});

  // Complete / Unlock Preparation dialog state
  const [showCompletePreparationDialog, setShowCompletePreparationDialog] =
    useState(false);
  const [showUnlockPreparationDialog, setShowUnlockPreparationDialog] =
    useState(false);
  const [paramForPreparation, setParamForPreparation] =
    useState<ParameterDetail | null>(null);
  const [isCompletingPreparation, setIsCompletingPreparation] = useState(false);
  const [isUnlockingPreparation, setIsUnlockingPreparation] = useState(false);

  // Per-group prep dialog state
  const [showCompleteGroupPrepDialog, setShowCompleteGroupPrepDialog] =
    useState(false);
  const [showUnlockGroupPrepDialog, setShowUnlockGroupPrepDialog] =
    useState(false);
  const [groupPrepDialogParam, setGroupPrepDialogParam] =
    useState<ParameterDetail | null>(null);
  const [groupPrepDialogKey, setGroupPrepDialogKey] = useState<string>("");
  const [isCompletingGroupPrep, setIsCompletingGroupPrep] = useState(false);
  const [isUnlockingGroupPrep, setIsUnlockingGroupPrep] = useState(false);
  const [showQARevisionDialog, setShowQARevisionDialog] = useState(false);
  const [isQARequestingRevision, setIsQARequestingRevision] = useState(false);
  const [qaRevisionComments, setQARevisionComments] = useState("");
  const [parameterStatusPerParam, setParameterStatusPerParam] = useState<
    Record<number, string>
  >({});
  const { handleStartRevision } = useDrugStartRevisionHandler({
    setRevisionStartedParams,
    setParameterStatusPerParam,
    setRevisionStartDatePerParam,
    worksheetId,
    employeeId,
    role,
    setToastMessage,
    setShowToast,
  });
  const displayStatus = useDrugWorksheetDisplayStatus(
    worksheetInfo,
    parameterStatusPerParam,
    addedParameters,
  );
  const {
    isParameterLocked,
    isParameterEditableForAnalyst,
  } = useDrugParameterAccess(
    role,
    parameterStatusPerParam,
    revisionStartedParams,
  );
  const [
    standardPreparationDissoPerParam,
    setStandardPreparationDissoPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [activePreparationGroups, setActivePreparationGroups] = useState<
    Record<number, string[]>
  >({});
  const [calculationsLodPerParam, setCalculationsLodPerParam] = useState<
    Record<number, CalculationLod[]>
  >({});
  const [calculationsROIPerParam, setCalculationsROIPerParam] = useState<
    Record<number, CalculationROI[]>
  >({});
  const [
    calculationsSulphatedAshPerParam,
    setCalculationsSulphatedAshPerParam,
  ] = useState<Record<number, CalculationSulphatedAsh[]>>({});
  const [
    standardPreparationResidualSolventPerParam,
    setStandardPreparationResidualSolventPerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [samplePreparationRSPerParam, setSamplePreparationRSPerParam] =
    useState<Record<number, SamplePreparation[]>>({});
  const [calculationsRSPerParam, setCalculationsRSPerParam] = useState<
    Record<number, CalculationRS[]>
  >({});
  const [
    standardPreparationRelatedSubstancePerParam,
    setStandardPreparationRelatedSubstancePerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [
    samplePreparationRelatedSubstancePerParam,
    setSamplePreparationRelatedSubstancePerParam,
  ] = useState<Record<number, SamplePreparation[]>>({});
  const [
    calculationsRelatedSubstancePerParam,
    setCalculationsRelatedSubstancePerParam,
  ] = useState<Record<number, CalculationRelatedSubstance[]>>({});
  const [calculationsDissoPerParam, setCalculationsDissoPerParam] = useState<
    Record<number, CalculationDisso[]>
  >({});

  const [
    calculationsDissoProfilePerParam,
    setCalculationsDissoProfilePerParam,
  ] = useState<Record<number, CalculationDissoProfile[]>>({});
  const [
    standardPreparationDissoProfilePerParam,
    setStandardPreparationDissoProfilePerParam,
  ] = useState<Record<number, StandardPreparation[]>>({});
  const [
    samplePreparationDissoProfilePerParam,
    setSamplePreparationDissoProfilePerParam,
  ] = useState<Record<number, SamplePreparationDisso[]>>({});
  const [dissoMediaProfilePerParam, setDissoMediaProfilePerParam] = useState<
    Record<number, DissoMediaPreparation[]>
  >({});

  const [showDiluentPreparation, setShowDiluentPreparation] = useState<
    Record<number, boolean>
  >({});
  const [showSystemSuitability, setShowSystemSuitability] = useState<
    Record<number, boolean>
  >({});
  const [showMobilePhasePreparation, setShowMobilePhasePreparation] = useState<
    Record<number, boolean>
  >({});
  const [showMobilePhaseDialog, setShowMobilePhaseDialog] = useState<
    Record<number, boolean>
  >({});
  const [editingMobilePhasePrepId, setEditingMobilePhasePrepId] = useState<
    string | null
  >(null);
  const [systemSuitabilityPerParam, setSystemSuitabilityPerParam] = useState<
    Record<number, SystemSuitability[]>
  >({});
  const [blankPreparationPerParam, setBlankPreparationPerParam] = useState<
    Record<number, BlankPreparationModel[]>
  >({});
  const [showBlankPreparationDialog, setShowBlankPreparationDialog] = useState<
    Record<number, boolean>
  >({});
  const [editingBlankPrepId, setEditingBlankPrepId] = useState<string | null>(
    null,
  );
  const {
    handleAddBlankPreparation,
    handleEditBlankPreparation,
    handleSaveBlankPreparation,
    handleRemoveBlankPreparation,
  } = useDrugBlankPreparationHandlers({
    editingBlankPrepId,
    setEditingBlankPrepId,
    setShowBlankPreparationDialog,
    setBlankPreparationPerParam,
  });
  const [bufferPreparationPerParam, setBufferPreparationPerParam] = useState<
    Record<number, BufferPreparationModel[]>
  >({});
  const [showBufferPreparation, setShowBufferPreparation] = useState<
    Record<number, boolean>
  >({});
  // Diluent uses the BlankPreparation sheet (multiple items)
  const [diluentPreparationsPerParam, setDiluentPreparationsPerParam] =
    useState<Record<number, DiluentPreparation[]>>({});
  const [showDiluentPrepDialog, setShowDiluentPrepDialog] = useState<
    Record<number, boolean>
  >({});
  const [editingDiluentPrepId, setEditingDiluentPrepId] = useState<
    string | null
  >(null);


  const handleTogglePreparationGroup = useDrugPreparationGroupToggle({
    setActivePreparationGroups,
    setBlankPreparationPerParam,
    setCalculationsAssayFerrousFumaratePerParam,
    setCalculationsAssayHypromellosePerParam,
    setCalculationsAssayNitrosaminePerParam,
    setCalculationsAssayPerParam,
    setCalculationsDissoFerrousFumaratePerParam,
    setCalculationsDissoPerParam,
    setCalculationsDissoProfilePerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
    setCalculationsRSPerParam,
    setCalculationsRelatedSubstancePerParam,
    setCalculationsSulphatedAshPerParam,
    setCalculationsUCPerParam,
    setCalculationsGenericPerParam,
    setDissoMediaProfilePerParam,
    setPreparationCompletedAtPerParam,
    setPreparationCompletedByPerParam,
    setSamplePrepAssayFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
    setSamplePreparationDissoPerParam,
    setSamplePreparationDissoProfilePerParam,
    setSamplePreparationHypromellosePerParam,
    setSamplePreparationLodPerParam,
    setSamplePreparationNitrosaminePerParam,
    setSamplePreparationPerParam,
    setSamplePreparationROIPerParam,
    setSamplePreparationRSPerParam,
    setSamplePreparationRelatedSubstancePerParam,
    setSamplePreparationSulphatedAshPerParam,
    setSamplePreparationUCPerParam,
    setSamplePreparationTitrationPerParam,
    setSamplePreparationBetadexPerParam,
    setSamplePreparationStandardizedTitrationAssayPerParam,
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam,
    setShowParameterDropdown,
    setStandardPreparationAssayPerParam,
    setStandardPreparationDissoPerParam,
    setStandardPreparationDissoProfilePerParam,
    setStandardPreparationHypromellosePerParam,
    setStandardPreparationNitrosaminePerParam,
    setStandardPreparationRelatedSubstancePerParam,
    setStandardPreparationResidualSolventPerParam,
    setStandardPreparationUCPerParam,
    setStandardPreparationTitrationPerParam,
    setStandardPreparationBetadexPerParam,
    setStandardPreparationStandardizedTitrationAssayPerParam,
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam,
  });

const {
    prepFileKey,
    filesPerParam,
    setFilesPerParam,
    showParamFiles,
    setShowParamFiles,
    getFilesForPrep,
    getParamLevelFiles,
    updateFilesForSlot,
    handleAddPrepFiles,
    handleRemovePrepFile,
    handleAddParamFiles,
    handleRemoveParamFile,
    collectFilesForParam,
  } = useDrugWorksheetFiles();

  const {
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
  } = useDrugReferenceResourceUi();

  const {
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
  } = useDrugReferenceResourceSelection({
    instruments, instrumentSearch, chemicals, chemicalSearch,
    standards, standardSearch, columns, columnSearch,
    setColumnsPerParam, setShowColumnDropdown, setColumnSearch, setAddedInstruments,
    setShowInstrumentDropdown, setInstrumentSearch, formatDate, setAddedChemicals,
    setShowChemicalDropdown, setChemicalSearch, setAddedStandards, setShowStandardDropdown,
    setStandardSearch, setAddedInternalStandards, setToastMessage,
  });

  const {
    showStandardSelectionDialog,
    setShowStandardSelectionDialog,
    currentParameterForStandardPrep,
    setCurrentParameterForStandardPrep,
    isAddingRSStandard,
    setIsAddingRSStandard,
    isAddingDissoStandard,
    setIsAddingDissoStandard,
    isAddingUCStandard,
    setIsAddingUCStandard,
    isAddingDissoProfileStandard,
    setIsAddingDissoProfileStandard,
    isAddingRelatedSubstanceStandard,
    setIsAddingRelatedSubstanceStandard,
    isAddingHypromelloseStandard,
    setIsAddingHypromelloseStandard,
  } = useDrugStandardSelectionState();

  const getAvailableStandardsForParameter = useDrugAvailableStandards({
    addedStandards, standardPreparationHypromellosePerParam, standardPreparationRelatedSubstancePerParam,
    standardPreparationResidualSolventPerParam, standardPreparationDissoPerParam, standardPreparationUCPerParam,
    standardPreparationDissoProfilePerParam, standardPreparationAssayPerParam,
  });

  const {
    handleAddCalculationAssay,
    handleRemoveCalculationAssay,
    handleCalculationAssayFieldChange,
    handleAddCalculationLod,
    handleRemoveCalculationLod,
    handleCalculationLodFieldChange,
    handleAddCalculationROI,
    handleRemoveCalculationROI,
    handleCalculationROIFieldChange,
  } = useDrugBasicCalculationHandlers({
    setCalculationsAssayPerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
  });

  const {
    handleAddCalculationSulphatedAsh,
    handleRemoveCalculationSulphatedAsh,
    handleCalculationSulphatedAshFieldChange,
  } = useDrugSulphatedAshCalculationHandlers({
    setCalculationsSulphatedAshPerParam,
  });

  const {
    handleAddCalculationRS,
    handleRemoveCalculationRS,
    handleCalculationRSFieldChange,
  } = useDrugResidualSolventCalculationHandlers({
    setCalculationsRSPerParam,
  });

  const {
    handleAddCalculationRelatedSubstance,
    handleRemoveCalculationRelatedSubstance,
    handleCalculationRelatedSubstanceFieldChange,
  } = useDrugRelatedSubstanceCalculationHandlers({
    setCalculationsRelatedSubstancePerParam,
  });

  const {
    handleAddCalculationDisso,
    handleRemoveCalculationDisso,
    handleCalculationDissoFieldChange,
  } = useDrugDissolutionCalculationHandlers({
    setCalculationsDissoPerParam,
  });

  const {
    handleAddCalculationDissoProfile,
    handleRemoveCalculationDissoProfile,
    handleCalculationDissoProfileFieldChange,
  } = useDrugDissolutionProfileCalculationHandlers({
    setCalculationsDissoProfilePerParam,
  });

  const {
    handleAddCalculationUC,
    handleRemoveCalculationUC,
    handleCalculationUCFieldChange,
  } = useDrugUniformityCalculationHandlers({
    setCalculationsUCPerParam,
  });

  const {
    handleAddCalculationDissoFerrousFumarate,
    handleRemoveCalculationDissoFerrousFumarate,
    handleCalculationDissoFerrousFumarateFieldChange,
  } = useDrugDissolutionFerrousFumarateCalculationHandlers({
    setCalculationsDissoFerrousFumaratePerParam,
  });

  const {
    handleAddCalculationAssayHypromellose,
    handleRemoveCalculationAssayHypromellose,
    handleCalculationAssayHypromelloseFieldChange,
  } = useDrugHypromelloseCalculationHandlers({
    setCalculationsAssayHypromellosePerParam,
    samplePreparationHypromellosePerParam,
    standardPreparationHypromellosePerParam,
    hypromelloseWeightToMg,
    isMethylIodideStep,
    isIsopropylIodideStep,
  });

  useDrugHypromelloseCalculationSync({
    setCalculationsAssayHypromellosePerParam,
    standardPreparationHypromellosePerParam,
    samplePreparationHypromellosePerParam,
    isMethylIodideStep,
    isIsopropylIodideStep,
    hypromelloseWeightToMg,
  });

  const {
    handleAddCalculationAssayNitrosamine,
    handleRemoveCalculationAssayNitrosamine,
    handleCalculationAssayNitrosamineFieldChange,
  } = useDrugNitrosamineCalculationHandlers({
    setCalculationsAssayNitrosaminePerParam,
    samplePreparationNitrosaminePerParam,
    standardPreparationNitrosaminePerParam,
    nitrosamineWeightToMg,
    dilutionFactorFromNitrosamineSteps,
  });

  useDrugNitrosamineCalculationSync({
    setCalculationsAssayNitrosaminePerParam,
    standardPreparationNitrosaminePerParam,
    samplePreparationNitrosaminePerParam,
    nitrosamineWeightToMg,
    dilutionFactorFromNitrosamineSteps,
  });

  const {
    handleAddMobilePhase,
    handleEditMobilePhase,
    handleSaveMobilePhase,
    handleRemoveMobilePhase,
  } = useDrugMobilePhaseHandlers({
    setShowMobilePhaseDialog,
    setEditingMobilePhasePrepId,
    editingMobilePhasePrepId,
    setMobilePhasePerParam,
  });

  const {
    handleRemoveDissoMedia,
    handleDissoMediaStepChange,
  } = useDrugDissolutionMediaHandlers({
    setDissoMediaPerParam,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
  });

  // These handlers are created here for the dissolution section and will be
  // threaded through the extracted coordinator separately.
  void handleRemoveDissoMedia;
  void handleDissoMediaStepChange;

  const {
    handleAddSamplePrepAssayFerrousFumaratePerParam,
    handleRemoveSamplePrepAssayFerrousFumaratePerParam,
    handleSamplePrepAssayFerrousFumaratePerParamStepChange,
  } = useDrugAssayFerrousFumaratePreparationHandlers({
    setSamplePrepAssayFerrousFumaratePerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddCalculationFerrousFumarate,
    handleRemoveCalculationFerrousFumarate,
    handleCalculationFerrousFumarateFieldChange,
  } = useDrugAssayFerrousFumarateCalculationHandlers({
    setCalculationsAssayFerrousFumaratePerParam,
  });

  const {
    handleAddSamplePrepDissoFerrousFumarate,
    handleRemoveSamplePrepDissoFerrousFumarate,
    handleSamplePrepDissoFerrousFumarateStepChange,
  } = useDrugDissolutionFerrousFumaratePreparationHandlers({
    setSamplePrepDissoFerrousFumaratePerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddBufferPreparation,
    handleRemoveBufferPreparation,
    handleBufferPreparationStepChange,
  } = useDrugBufferPreparationHandlers({
    setBufferPreparationPerParam,
  });

  const {
    handleAddDiluentPrep,
    handleEditDiluentPrep,
    handleSaveDiluentPrep,
    handleRemoveDiluentPrep,
  } = useDrugDiluentPreparationHandlers({
    setShowDiluentPrepDialog,
    setEditingDiluentPrepId,
    editingDiluentPrepId,
    setDiluentPreparationsPerParam,
  });

  const {
    handleAddStandardPreparationUC,
    handleRemoveStandardPreparationUC,
    handleStandardPreparationUCStepChange,
    handleRemoveSamplePreparationUC,
    handleSamplePreparationUCStepChange,
  } = useDrugUniformityPreparationHandlers({
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setShowStandardSelectionDialog,
    setStandardPreparationUCPerParam,
    setSamplePreparationUCPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleRemoveStandardPreparationHypromellose,
    handleStandardPreparationHypromelloseStepChange,
    handleRemoveSamplePreparationHypromellose,
    handleSamplePreparationHypromelloseStepChange,
  } = useDrugHypromellosePreparationHandlers({
    setStandardPreparationHypromellosePerParam,
    setSamplePreparationHypromellosePerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddStandardPreparationNitrosamine,
    handleRemoveStandardPreparationNitrosamine,
    handleStandardPreparationNitrosamineFieldChange,
    handleStandardPreparationNitrosamineStepChange,
    handleAddStandardDilutionStage,
    handleRemoveStandardDilutionStage,
    handleRemoveSamplePreparationNitrosamine,
    handleSamplePreparationNitrosamineFieldChange,
    handleSamplePreparationNitrosamineStepChange,
    handleAddSampleDilutionStage,
    handleRemoveSampleDilutionStage,
  } = useDrugNitrosaminePreparationHandlers({
    standardPreparationNitrosaminePerParam,
    samplePreparationNitrosaminePerParam,
    setStandardPreparationNitrosaminePerParam,
    setSamplePreparationNitrosaminePerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddStandardPreparationDissoProfile,
    handleRemoveStandardPreparationDissoProfile,
    handleStandardPreparationDissoProfileStepChange,
    handleRemoveSamplePreparationDissoProfile,
    handleSamplePreparationDissoProfileStepChange,
    handleDissoMediaProfileStepChange,
    handleRemoveDissoMediaProfile,
  } = useDrugDissolutionProfilePreparationHandlers({
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setShowStandardSelectionDialog,
    setStandardPreparationDissoProfilePerParam,
    setSamplePreparationDissoProfilePerParam,
    setDissoMediaProfilePerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleRemoveStandardPreparationRS,
    handleStandardPreparationRSStepChange,
    handleRemoveSamplePreparationRS,
    handleSamplePreparationRSStepChange,
  } = useDrugResidualSolventPreparationHandlers({
    setStandardPreparationResidualSolventPerParam,
    setSamplePreparationRSPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleRemoveStandardPreparationRelatedSubstance,
    handleStandardPreparationRelatedSubstanceStepChange,
    handleSamplePreparationRelatedSubstanceStepChange,
  } = useDrugRelatedSubstancePreparationHandlers({
    setStandardPreparationRelatedSubstancePerParam,
    setSamplePreparationRelatedSubstancePerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleRemoveSamplePreparationDisso,
    handleSamplePreparationDissoStepChange,
    handleAddStandardPreparationDisso,
    handleRemoveStandardPreparationDisso,
    handleStandardPreparationDissoStepChange,
  } = useDrugDissolutionPreparationHandlers({
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingUCStandard,
    setIsAddingDissoStandard,
    setShowStandardSelectionDialog,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
    setDissoMediaPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddStandardPreparationRS,
    handleAddStandardPreparationRelatedSubstance,
    handleAddStandardPreparationHypromellose,
  } = useDrugStandardPreparationDialogHandlers({
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setIsAddingRelatedSubstanceStandard,
    setIsAddingHypromelloseStandard,
    setShowStandardSelectionDialog,
  });

  const {
    handleStandardSelectedForPreparation,
    handleStandardsSelectedForHypromellosePreparation,
  } = useDrugStandardSelectionHandlers({
    currentParameterForStandardPrep,

    standardPreparationRelatedSubstancePerParam,
    samplePreparationRelatedSubstancePerParam,
    setStandardPreparationRelatedSubstancePerParam,
    setSamplePreparationRelatedSubstancePerParam,

    standardPreparationUCPerParam,
    samplePreparationUCPerParam,
    setStandardPreparationUCPerParam,
    setSamplePreparationUCPerParam,

    standardPreparationResidualSolventPerParam,
    samplePreparationRSPerParam,
    setStandardPreparationResidualSolventPerParam,
    setSamplePreparationRSPerParam,

    standardPreparationDissoPerParam,
    samplePreparationDissoPerParam,
    dissoMediaPerParam,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
    setDissoMediaPerParam,

    standardPreparationDissoProfilePerParam,
    samplePreparationDissoProfilePerParam,
    dissoMediaProfilePerParam,
    setStandardPreparationDissoProfilePerParam,
    setSamplePreparationDissoProfilePerParam,
    setDissoMediaProfilePerParam,

    standardPreparationHypromellosePerParam,
    samplePreparationHypromellosePerParam,
    setStandardPreparationHypromellosePerParam,
    setSamplePreparationHypromellosePerParam,

    standardPreparationAssayPerParam,
    setStandardPreparationAssayPerParam,

    setShowStandardSelectionDialog,
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setIsAddingUCStandard,
    setIsAddingDissoProfileStandard,
    setIsAddingHypromelloseStandard,
  });

  const {
    handleAddStandardPreparation,
    handleAddSamplePreparation,
    handleRemoveStandardPreparation,
    handleStandardPreparationStepChange,
    handleRemoveSamplePreparation,
    handleSamplePreparationStepChange,
  } = useDrugAssayPreparationHandlers({
    setCurrentParameterForStandardPrep,
    setIsAddingRSStandard,
    setIsAddingDissoStandard,
    setShowStandardSelectionDialog,
    setSamplePreparationPerParam,
    setStandardPreparationAssayPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const { templates: GENERIC_CALCULATION_TEMPLATES } = useGenericCalculationTemplates();
  const {
    handleAddCalculationGeneric,
    handleRemoveCalculationGeneric,
    handleGenericFieldChange,
    handleGenericGroupFieldChange,
    handleAddGenericGroupRow,
    handleRemoveGenericGroupRow,
    handleSelectGenericStandardPreparation,
    handleSelectGenericSamplePreparation,
  } = useGenericCalculationHandlers({
    calculationsGenericPerParam,
    setCalculationsGenericPerParam,
    genericTemplates: GENERIC_CALCULATION_TEMPLATES,
  });

  const {
    handleAddStandardPreparationTitration,
    handleRemoveStandardPreparationTitration,
    handleStandardPreparationTitrationStepChange,
    handleAddSamplePreparationTitration,
    handleRemoveSamplePreparationTitration,
    handleSamplePreparationTitrationStepChange,
  } = useDrugTitrationPreparationHandlers({
    setStandardPreparationTitrationPerParam,
    setSamplePreparationTitrationPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddStandardPreparationBetadex,
    handleRemoveStandardPreparationBetadex,
    handleStandardPreparationBetadexStepChange,
    handleAddSamplePreparationBetadex,
    handleRemoveSamplePreparationBetadex,
    handleSamplePreparationBetadexStepChange,
  } = useDrugBetadexPreparationHandlers({
    setStandardPreparationBetadexPerParam,
    setSamplePreparationBetadexPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddStandardPreparationStandardizedTitrationAssay,
    handleRemoveStandardPreparationStandardizedTitrationAssay,
    handleStandardPreparationStandardizedTitrationAssayStepChange,
    handleAddSamplePreparationStandardizedTitrationAssay,
    handleRemoveSamplePreparationStandardizedTitrationAssay,
    handleSamplePreparationStandardizedTitrationAssayStepChange,
  } = useDrugStandardizedTitrationAssayPreparationHandlers({
    setStandardPreparationStandardizedTitrationAssayPerParam,
    setSamplePreparationStandardizedTitrationAssayPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddStandardPreparationDibasicSodiumPhosphateAssay,
    handleRemoveStandardPreparationDibasicSodiumPhosphateAssay,
    handleStandardPreparationDibasicSodiumPhosphateAssayStepChange,
    handleAddSamplePreparationDibasicSodiumPhosphateAssay,
    handleRemoveSamplePreparationDibasicSodiumPhosphateAssay,
    handleSamplePreparationDibasicSodiumPhosphateAssayStepChange,
  } = useDrugDibasicSodiumPhosphateAssayPreparationHandlers({
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam,
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddSamplePreparationLod,
    handleRemoveSamplePreparationLod,
    handleSamplePreparationLodStepChange,
  } = useDrugLodPreparationHandlers({
    setSamplePreparationLodPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddSamplePreparationSulphatedAsh,
    handleRemoveSamplePreparationSulphatedAsh,
    handleSamplePreparationSulphatedAshStepChange,
  } = useDrugSulphatedAshPreparationHandlers({
    setSamplePreparationSulphatedAshPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const {
    handleAddSamplePreparationROI,
    handleRemoveSamplePreparationROI,
    handleSamplePreparationROIStepChange,
  } = useDrugRoiPreparationHandlers({
    setSamplePreparationROIPerParam,
    prepFileKey,
    setFilesPerParam,
  });

  const { collectFormDataForAPI } = useDrugWorksheetFormCollector({
    addedChemicals,
    addedInstruments,
    addedInternalStandards,
    addedParameters,
    addedStandards,
    additionalInfoPerParam,
    analysisCompletionDatePerParam,
    analysisStartDatePerParam,
    analyzedByPerParam,
    approvedAtQAPerParam,
    approvedAtReviewerPerParam,
    approvedByQAPerParam,
    approvedByReviewerPerParam,
    blankPreparationPerParam,
    bufferPreparationPerParam,
    calculationsAssayFerrousFumaratePerParam,
    calculationsAssayHypromellosePerParam,
    calculationsAssayNitrosaminePerParam,
    calculationsAssayPerParam,
    calculationsDissoFerrousFumaratePerParam,
    calculationsDissoPerParam,
    calculationsDissoProfilePerParam,
    calculationsLodPerParam,
    calculationsROIPerParam,
    calculationsRSPerParam,
    calculationsRelatedSubstancePerParam,
    calculationsSulphatedAshPerParam,
    calculationsUCPerParam,
    calculationsGenericPerParam,
    collectFilesForParam,
    columnsPerParam,
    diluentPerParam,
    diluentPreparationsPerParam,
    dissoMediaPerParam,
    dissoMediaProfilePerParam,
    employeeId,
    mobilePhasePerParam,
    otherInfoPerParam,
    parameterStatusPerParam,
    preparationCompletedAtPerParam,
    preparationCompletedByPerParam,
    registrationNo,
    remarksByAnalystPerParam,
    remarksByReviewerPerParam,
    remarksQAPerParam,
    revisionCompletedDatePerParam,
    revisionStartDatePerParam,
    role,
    samplePrepAssayFerrousFumaratePerParam,
    samplePrepDissoFerrousFumaratePerParam,
    samplePreparationDissoPerParam,
    samplePreparationDissoProfilePerParam,
    samplePreparationHypromellosePerParam,
    samplePreparationLodPerParam,
    samplePreparationNitrosaminePerParam,
    samplePreparationPerParam,
    samplePreparationROIPerParam,
    samplePreparationRSPerParam,
    samplePreparationRelatedSubstancePerParam,
    samplePreparationSulphatedAshPerParam,
    samplePreparationUCPerParam,
    samplePreparationTitrationPerParam,
    samplePreparationBetadexPerParam,
    samplePreparationStandardizedTitrationAssayPerParam,
    samplePreparationDibasicSodiumPhosphateAssayPerParam,
    standardPreparationAssayPerParam,
    standardPreparationDissoPerParam,
    standardPreparationDissoProfilePerParam,
    standardPreparationHypromellosePerParam,
    standardPreparationNitrosaminePerParam,
    standardPreparationRelatedSubstancePerParam,
    standardPreparationResidualSolventPerParam,
    standardPreparationUCPerParam,
    standardPreparationTitrationPerParam,
    standardPreparationBetadexPerParam,
    standardPreparationStandardizedTitrationAssayPerParam,
    standardPreparationDibasicSodiumPhosphateAssayPerParam,
    systemSuitabilityPerParam,
    showInternalStandardPreparation,
    showAdditionalInfo,
    worksheetId,
    worksheetInfo,
  });

  const {
    handleStartAnalysis,
    handleConfirmStartAnalysis,
    handleCompleteAnalysis,
    handleConfirmCompleteAnalysis,
  } = useDrugAnalysisLifecycleHandlers({
    parameterForAnalysis,
    setParameterForAnalysis,
    setShowStartAnalysisDialog,
    setShowCompleteAnalysisDialog,
    setIsStartingAnalysis,
    setIsCompletingAnalysis,
    setParameterStatusPerParam,
    setAnalysisStartDatePerParam,
    setAnalysisCompletionDatePerParam,
    setRevisionCompletedDatePerParam,
    setRemarksByAnalystPerParam,
    parameterStatusPerParam,
    revisionStartedParams,
    setRevisionStartedParams,
    collectFormDataForAPI,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  });

  const {
    handleApprove,
    handleRequestRevision,
    handleConfirmApprove,
    handleConfirmDisapprove,
    handleConfirmRevision,
  } = useDrugReviewerDecisionHandlers({
    parameterForApproval,
    setParameterForApproval,
    setShowApproveDialog,
    setShowRevisionDialog,
    setShowDisapproveDialog,
    setIsApproving,
    setIsDisapproving,
    setIsRequestingRevision,
    setParameterStatusPerParam,
    setApprovedByPerParam,
    setApprovedAtPerParam,
    setRemarksQAPerParam,
    setRemarksByReviewerPerParam,
    setRevisionComments,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  });

  const {
    handleQARequestRevision,
    handleConfirmQARevision,
  } = useDrugQaRevisionHandlers({
    parameterForApproval,
    setParameterForApproval,
    setShowQARevisionDialog,
    setIsQARequestingRevision,
    setParameterStatusPerParam,
    setRemarksQAPerParam,
    setQARevisionComments,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  });

  const {
    handleApproveWorksheet,
    handleRevertApproval,
  } = useDrugWorksheetApprovalHandlers({
    worksheetInfo,
    worksheetId,
    employeeId,
    role,
    collectFormDataForAPI,
    addedParameters,
    setApprovedByQAPerParam,
    setApprovedAtQAPerParam,
    setWorksheetInfo,
    setToastMessage,
    setShowToast,
    setShowApproveWorksheetDialog,
    setShowRevertApprovalDialog,
    setIsApprovingWorksheet,
    setIsRevertingApproval,
  });

  const { handleSubmitForQA } = useDrugSubmitForQaHandler({
    collectFormDataForAPI,
    worksheetId,
    employeeId,
    role,
    setWorksheetInfo,
    setToastMessage,
    setShowToast,
    setShowSubmitForQADialog,
    setIsSubmittingForQA,
  });

  const { handleRemoveParameter } = useDrugRemoveParameterHandler({
    addedParameters,
    selectedParamsForDetail,
    setActivePreparationGroups,
    setAddedChemicals,
    setAddedInstruments,
    setAddedParameters,
    setAddedStandards,
    setAdditionalInfoPerParam,
    setAnalysisCompletionDatePerParam,
    setAnalysisStartDatePerParam,
    setAnalyzedByNamePerParam,
    setAnalyzedByPerParam,
    setApprovedAtPerParam,
    setApprovedByNamePerParam,
    setApprovedByPerParam,
    setCalculationsAssayFerrousFumaratePerParam,
    setCalculationsAssayHypromellosePerParam,
    setCalculationsAssayNitrosaminePerParam,
    setCalculationsAssayPerParam,
    setCalculationsDissoFerrousFumaratePerParam,
    setCalculationsDissoPerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
    setCalculationsRSPerParam,
    setCalculationsSulphatedAshPerParam,
    setCalculationsUCPerParam,
    setCalculationsGenericPerParam,
    setColumnsPerParam,
    setDiluentPerParam,
    setDissoMediaPerParam,
    setMobilePhasePerParam,
    setOtherInfoPerParam,
    setParameterStatusPerParam,
    setPreparationCompletedAtPerParam,
    setPreparationCompletedByPerParam,
    setRemarksByAnalystPerParam,
    setSamplePrepAssayFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
    setSamplePreparationDissoPerParam,
    setSamplePreparationHypromellosePerParam,
    setSamplePreparationLodPerParam,
    setSamplePreparationNitrosaminePerParam,
    setSamplePreparationPerParam,
    setSamplePreparationROIPerParam,
    setSamplePreparationRSPerParam,
    setSamplePreparationSulphatedAshPerParam,
    setSamplePreparationUCPerParam,
    setSamplePreparationTitrationPerParam,
    setSamplePreparationBetadexPerParam,
    setSamplePreparationStandardizedTitrationAssayPerParam,
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam,
    setSelectedParamsForDetail,
    setShowAdditionalInfo,
    setShowBufferPreparation,
    setShowDiluentPreparation,
    setShowMobilePhasePreparation,
    setShowSystemSuitability,
    setStandardPreparationAssayPerParam,
    setStandardPreparationDissoPerParam,
    setStandardPreparationHypromellosePerParam,
    setStandardPreparationNitrosaminePerParam,
    setStandardPreparationResidualSolventPerParam,
    setStandardPreparationUCPerParam,
    setStandardPreparationTitrationPerParam,
    setStandardPreparationBetadexPerParam,
    setStandardPreparationStandardizedTitrationAssayPerParam,
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam,
    setSystemSuitabilityPerParam,
  });

  const {
    handleInitiateDelete,
    handleConfirmDelete,
  } = useDrugParameterDeleteHandlers({
    parameterToDelete,
    setParameterToDelete,
    setShowDeleteDialog,
    setIsDeleting,
    handleRemoveParameter,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  });

  const { restoreWorksheetToState } = useDrugWorksheetStateRestorer({
    setActivePreparationGroups,
    setAddedChemicals,
    setAddedInstruments,
    setAddedInternalStandards,
    setAddedParameters,
    setAddedStandards,
    setAdditionalInfoPerParam,
    setAnalysisCompletionDatePerParam,
    setAnalysisStartDatePerParam,
    setAnalyzedByNamePerParam,
    setAnalyzedByPerParam,
    setApprovedAtPerParam,
    setApprovedAtQAPerParam,
    setApprovedByNamePerParam,
    setApprovedByPerParam,
    setApprovedByQAPerParam,
    setBlankPreparationPerParam,
    setBufferPreparationPerParam,
    setCalculationsAssayFerrousFumaratePerParam,
    setCalculationsAssayHypromellosePerParam,
    setCalculationsAssayNitrosaminePerParam,
    setCalculationsAssayPerParam,
    setCalculationsDissoFerrousFumaratePerParam,
    setCalculationsDissoPerParam,
    setCalculationsDissoProfilePerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
    setCalculationsRSPerParam,
    setCalculationsRelatedSubstancePerParam,
    setCalculationsSulphatedAshPerParam,
    setCalculationsUCPerParam,
    setCalculationsGenericPerParam,
    setColumnsPerParam,
    setDiluentPreparationsPerParam,
    setDissoMediaPerParam,
    setDissoMediaProfilePerParam,
    setFilesPerParam,
    setGroupPrepCompletedAtPerParam,
    setMobilePhasePerParam,
    setOtherInfoPerParam,
    setParameterStatusPerParam,
    setPreparationCompletedAtPerParam,
    setPreparationCompletedByPerParam,
    setRemarksByAnalystPerParam,
    setRemarksByReviewerPerParam,
    setRemarksQAPerParam,
    setRevisionCompletedDatePerParam,
    setRevisionStartDatePerParam,
    setRevisionStartedParams,
    setSamplePrepAssayFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
    setSamplePreparationDissoPerParam,
    setSamplePreparationDissoProfilePerParam,
    setSamplePreparationHypromellosePerParam,
    setSamplePreparationLodPerParam,
    setSamplePreparationNitrosaminePerParam,
    setSamplePreparationPerParam,
    setSamplePreparationROIPerParam,
    setSamplePreparationRSPerParam,
    setSamplePreparationRelatedSubstancePerParam,
    setSamplePreparationSulphatedAshPerParam,
    setSamplePreparationUCPerParam,
    setSamplePreparationTitrationPerParam,
    setSelectedParamsForDetail,
    setShowAdditionalInfo,
    setShowBufferPreparation,
    setShowDiluentPreparation,
    setShowInternalStandardPreparation,
    setShowMobilePhasePreparation,
    setShowParamFiles,
    setShowSystemSuitability,
    setStandardPreparationAssayPerParam,
    setStandardPreparationDissoPerParam,
    setStandardPreparationDissoProfilePerParam,
    setStandardPreparationHypromellosePerParam,
    setStandardPreparationNitrosaminePerParam,
    setStandardPreparationRelatedSubstancePerParam,
    setStandardPreparationResidualSolventPerParam,
    setStandardPreparationUCPerParam,
    setStandardPreparationTitrationPerParam,
    setSystemSuitabilityPerParam,
  });

  const { reloadWorksheet } = useDrugReloadWorksheet({
    worksheetId,
    employeeId,
    role,
    department,
    setError,
    setWorksheetInfo,
    setRegistrationNo,
    setSamplesData,
    setAddedParameters,
    setSelectedParamsForDetail,
    setFilesPerParam,
    setShowParamFiles,
    restoreWorksheetToState,
    setIsLoading,
  });

  useEffect(() => {
    reloadWorksheet();
  }, [worksheetId]);


  const {
    handlePrintClick,
    toggleParameterDetail,
  } = useDrugWorksheetUiActions({
    onPrint,
    worksheetInfo,
    analysts,
    samplesData,
    setSelectedParamsForDetail,
  });

  const { handleSaveDraft } = useDrugSaveDraftHandler({
    setIsSaving,
    collectFormDataForAPI,
    role,
    worksheetId,
    setToastMessage,
    setShowToast,
    setSaveSuccess,
    reloadWorksheet,
  });

  const { handleSubmitForAnalysis } = useDrugSubmitForAnalysisHandler({
    setIsSubmitting,
    collectFormDataForAPI,
    worksheetInfo,
    parameterStatusPerParam,
    setToastMessage,
    setShowToast,
    setShowSubmitDialog,
    worksheetId,
    setWorksheetInfo,
    setParameterStatusPerParam,
    employeeId,
    role,
  });

  const {
    handleAddParameter,
    handleReassignAnalyst,
  } = useDrugAnalystDialogHandlers({
    addedParameters,
    setPendingParameter,
    setShowAnalystDialog,
    setAnalystMode,
  });

  const { handleAnalystSelected } = useDrugAnalystSelectionHandler({
    pendingParameter,
    analystMode,
    paramIdx,
    addedParameters,
    columnsPerParam,
    diluentPerParam,
    otherInfoPerParam,
    additionalInfoPerParam,
    addedInstruments,
    addedChemicals,
    addedStandards,
    addedInternalStandards,
    standardPreparationAssayPerParam,
    standardPreparationResidualSolventPerParam,
    standardPreparationRelatedSubstancePerParam,
    standardPreparationDissoPerParam,
    samplePreparationPerParam,
    samplePreparationRSPerParam,
    samplePreparationRelatedSubstancePerParam,
    samplePreparationDissoPerParam,
    samplePreparationLodPerParam,
    samplePreparationROIPerParam,
    samplePreparationSulphatedAshPerParam,
    dissoMediaPerParam,
    mobilePhasePerParam,
    samplePrepAssayFerrousFumaratePerParam,
    samplePrepDissoFerrousFumaratePerParam,
    calculationsAssayPerParam,
    calculationsLodPerParam,
    calculationsROIPerParam,
    calculationsSulphatedAshPerParam,
    calculationsRSPerParam,
    calculationsRelatedSubstancePerParam,
    calculationsDissoPerParam,
    calculationsAssayFerrousFumaratePerParam,
    calculationsDissoFerrousFumaratePerParam,
    approvedByReviewerPerParam,
    analysisStartDatePerParam,
    analysisCompletionDatePerParam,
    revisionStartDatePerParam,
    revisionCompletedDatePerParam,
    approvedAtReviewerPerParam,
    preparationCompletedByPerParam,
    preparationCompletedAtPerParam,
    remarksByAnalystPerParam,
    parameterStatusPerParam,
    worksheetId,
    role,
    collectFilesForParam,
    setParamIdx,
    setAddedParameters,
    setAnalyzedByPerParam,
    setAnalyzedByNamePerParam,
    setParameterStatusPerParam,
    setToastMessage,
    setShowToast,
    setColumnsPerParam,
    setDiluentPerParam,
    setOtherInfoPerParam,
    setAdditionalInfoPerParam,
    setShowAdditionalInfo,
    setAddedInstruments,
    setAddedChemicals,
    setAddedStandards,
    setStandardPreparationAssayPerParam,
    setSamplePreparationPerParam,
    setStandardPreparationResidualSolventPerParam,
    setSamplePreparationRSPerParam,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
    setSamplePreparationLodPerParam,
    setSamplePreparationROIPerParam,
    setSamplePreparationSulphatedAshPerParam,
    setCalculationsAssayPerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
    setCalculationsSulphatedAshPerParam,
    setCalculationsRSPerParam,
    setCalculationsDissoPerParam,
    setDissoMediaPerParam,
    setMobilePhasePerParam,
    setShowMobilePhasePreparation,
    setShowBufferPreparation,
    setSamplePrepAssayFerrousFumaratePerParam,
    setCalculationsAssayFerrousFumaratePerParam,
    setCalculationsDissoFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
    setShowDiluentPreparation,
    setShowSystemSuitability,
    setSystemSuitabilityPerParam,
    setPendingParameter,
    setAnalystMode,
    setShowAnalystDialog,
    setShowParameterDropdown,
  });

  useDrugWorksheetSidebarBridge({
    addedParameters,
    parameterStatusPerParam,
    handlePrintClick,
    handleSaveDraft,
    setShowSubmitDialog,
    setShowSubmitForQADialog,
    setShowApproveWorksheetDialog,
    setShowRevertApprovalDialog,
    onSidebarActionsReady,
    onSidebarStateChange,
    worksheetId,
    displayStatus,
    worksheetInfo,
    registrationNo,
    role,
    isSaving,
    saveSuccess,
    isSubmitting,
    isSubmittingForQA,
    isApprovingWorksheet,
    isRevertingApproval,
    isLoading,
  });

  // ── Helper: build full parameter payload matching collectFormDataForAPI shape ──
  const { buildFullParamPayload } = useDrugFullParameterPayloadBuilder({
    addedChemicals,
    addedInstruments,
    addedInternalStandards,
    addedParameters,
    addedStandards,
    additionalInfoPerParam,
    analysisCompletionDatePerParam,
    analysisStartDatePerParam,
    analyzedByPerParam,
    approvedAtQAPerParam,
    approvedAtReviewerPerParam,
    approvedByQAPerParam,
    approvedByReviewerPerParam,
    blankPreparationPerParam,
    bufferPreparationPerParam,
    calculationsAssayFerrousFumaratePerParam,
    calculationsAssayHypromellosePerParam,
    calculationsAssayNitrosaminePerParam,
    calculationsAssayPerParam,
    calculationsDissoFerrousFumaratePerParam,
    calculationsDissoPerParam,
    calculationsDissoProfilePerParam,
    calculationsLodPerParam,
    calculationsROIPerParam,
    calculationsRSPerParam,
    calculationsRelatedSubstancePerParam,
    calculationsSulphatedAshPerParam,
    calculationsUCPerParam,
    calculationsGenericPerParam,
    collectFilesForParam,
    columnsPerParam,
    diluentPerParam,
    diluentPreparationsPerParam,
    dissoMediaPerParam,
    dissoMediaProfilePerParam,
    mobilePhasePerParam,
    otherInfoPerParam,
    parameterStatusPerParam,
    preparationCompletedAtPerParam,
    preparationCompletedByPerParam,
    remarksByAnalystPerParam,
    remarksByReviewerPerParam,
    remarksQAPerParam,
    revisionCompletedDatePerParam,
    revisionStartDatePerParam,
    samplePrepAssayFerrousFumaratePerParam,
    samplePrepDissoFerrousFumaratePerParam,
    samplePreparationDissoPerParam,
    samplePreparationDissoProfilePerParam,
    samplePreparationHypromellosePerParam,
    samplePreparationLodPerParam,
    samplePreparationNitrosaminePerParam,
    samplePreparationPerParam,
    samplePreparationROIPerParam,
    samplePreparationRSPerParam,
    samplePreparationRelatedSubstancePerParam,
    samplePreparationSulphatedAshPerParam,
    samplePreparationUCPerParam,
    samplePreparationTitrationPerParam,
    samplePreparationBetadexPerParam,
    samplePreparationStandardizedTitrationAssayPerParam,
    standardPreparationAssayPerParam,
    standardPreparationDissoPerParam,
    standardPreparationDissoProfilePerParam,
    standardPreparationHypromellosePerParam,
    standardPreparationNitrosaminePerParam,
    standardPreparationRelatedSubstancePerParam,
    standardPreparationResidualSolventPerParam,
    standardPreparationUCPerParam,
    standardPreparationTitrationPerParam,
    standardPreparationBetadexPerParam,
    standardPreparationStandardizedTitrationAssayPerParam,
    systemSuitabilityPerParam,
  });

  const {
    handleInitiateCompletePreparation,
    handleConfirmCompletePreparation,
    handleInitiateUnlockPreparation,
    handleConfirmUnlockPreparation,
    handleInitiateCompleteGroupPrep,
    handleConfirmCompleteGroupPrep,
    handleInitiateUnlockGroupPrep,
    handleConfirmUnlockGroupPrep,
  } = useDrugPreparationCompletionHandlers({
    paramForPreparation,
    setParamForPreparation,
    setShowCompletePreparationDialog,
    setShowUnlockPreparationDialog,
    setIsCompletingPreparation,
    setIsUnlockingPreparation,
    groupPrepDialogParam,
    setGroupPrepDialogParam,
    groupPrepDialogKey,
    setGroupPrepDialogKey,
    setShowCompleteGroupPrepDialog,
    setShowUnlockGroupPrepDialog,
    setIsCompletingGroupPrep,
    setIsUnlockingGroupPrep,
    buildFullParamPayload,
    setPreparationCompletedByPerParam,
    setPreparationCompletedAtPerParam,
    setGroupPrepCompletedAtPerParam,
    setToastMessage,
    setShowToast,
    worksheetId,
    employeeId,
    role,
  });

  const {
    handleInitiateUnlock,
    handleConfirmUnlock,
  } = useDrugParameterUnlockHandlers({
    parameterToUnlock,
    setParameterToUnlock,
    setShowUnlockDialog,
    setIsUnlocking,
    setParameterStatusPerParam,
    setToastMessage,
    setShowToast,
  });

  const {
    availableToAdd,
    allParameters,
    testsRequiredDisplay,
    methodsRequiredDisplay,
  } = getDrugWorksheetParameterSummary(samplesData, addedParameters);

  return (
    <>
      <DrugWorksheetUiSupport
        showToast={showToast}
        toastMessage={toastMessage}
        setShowToast={setShowToast}
      />

      <div className="flex items-start gap-0 min-h-screen bg-slate-900 no-print-layout">


        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="mx-auto my-8 p-8 bg-white shadow-2xl max-w-4xl border border-emerald-900/30 rounded-2xl">
            <div className="flex justify-between items-center text-sm mb-6 pb-4 border-b border-slate-200">
              <div></div>
              <div className="flex flex-col items-end">
                <img src="/ic_efrac.png" alt="EFRAC Logo" className="h-10" />
              </div>
            </div>

            <DrugWorksheetHeaderSummary
              isLoading={isLoading}
              error={error}
              worksheetInfo={worksheetInfo}
              worksheetId={worksheetId}
              displayStatus={displayStatus}
              registrationNo={registrationNo}
              allParameters={allParameters}
              formatDate={formatDate}
              testsRequiredDisplay={testsRequiredDisplay}
              methodsRequiredDisplay={methodsRequiredDisplay}
            />

            <DrugParametersManagementSection
              role={role}
              worksheetInfo={worksheetInfo}
              availableToAdd={availableToAdd}
              showParameterDropdown={showParameterDropdown}
              setShowParameterDropdown={setShowParameterDropdown}
              handleAddParameter={handleAddParameter}
              addedParameters={addedParameters}
              isParameterLocked={isParameterLocked}
              parameterStatusPerParam={parameterStatusPerParam}
              selectedParamsForDetail={selectedParamsForDetail}
              toggleParameterDetail={toggleParameterDetail}
              analyzedByPerParam={analyzedByPerParam}
              analyzedByNamePerParam={analyzedByNamePerParam}
              setParameterToDelete={setParameterToDelete}
              setShowDeleteDialog={setShowDeleteDialog}
              isSaving={isSaving}
            />

            <DrugSelectedParametersRenderer
              ctx={{
                activePreparationGroups, addedChemicals, addedInstruments, addedInternalStandards, addedParameters, addedStandards,
                additionalInfoPerParam, analysisCompletionDatePerParam, analysisStartDatePerParam, analyzedByNamePerParam, analyzedByPerParam, approvedAtReviewerPerParam,
                approvedByQAPerParam, approvedByReviewerNamePerParam, approvedByReviewerPerParam, blankPreparationPerParam, bufferPreparationPerParam,
                calculationsAssayFerrousFumaratePerParam, calculationsAssayHypromellosePerParam, calculationsAssayNitrosaminePerParam, calculationsAssayPerParam, calculationsDissoFerrousFumaratePerParam, calculationsDissoPerParam,
                calculationsDissoProfilePerParam, calculationsLodPerParam, calculationsROIPerParam, calculationsRSPerParam, calculationsRelatedSubstancePerParam, calculationsSulphatedAshPerParam,
                calculationsUCPerParam, chemicalRef, chemicalSearch, chemicals, columnRef, columnSearch,
                // Generic calculation engine - Titration and future simple/medium templates.
                // Additive only: nothing above this line changes.
                genericTemplates: GENERIC_CALCULATION_TEMPLATES,
                calculationsGenericPerParam,
                standardPreparationGenericPerParam: standardPreparationTitrationPerParam,
                samplePreparationGenericPerParam: samplePreparationTitrationPerParam,
                standardPreparationBetadexPerParam,
                samplePreparationBetadexPerParam,
                standardPreparationStandardizedTitrationAssayPerParam,
                samplePreparationStandardizedTitrationAssayPerParam,
                standardPreparationDibasicSodiumPhosphateAssayPerParam,
                samplePreparationDibasicSodiumPhosphateAssayPerParam,
                handleAddCalculationGeneric,
                handleRemoveCalculationGeneric,
                handleGenericFieldChange,
                handleGenericGroupFieldChange,
                handleAddGenericGroupRow,
                handleRemoveGenericGroupRow,
                handleSelectGenericStandardPreparation,
                handleSelectGenericSamplePreparation,
                // Titration's own preparation editing (Standard + Sample) - these
                // get passed to DrugParameterPreparationCoordinator the same way
                // every other calc type's preparation handlers do. NOT YET WIRED
                // there - see note below.
                handleAddStandardPreparationTitration,
                handleRemoveStandardPreparationTitration,
                handleStandardPreparationTitrationStepChange,
                handleAddSamplePreparationTitration,
                handleRemoveSamplePreparationTitration,
                handleSamplePreparationTitrationStepChange,
                handleAddStandardPreparationBetadex,
                handleRemoveStandardPreparationBetadex,
                handleStandardPreparationBetadexStepChange,
                handleAddSamplePreparationBetadex,
                handleRemoveSamplePreparationBetadex,
                handleSamplePreparationBetadexStepChange,
                handleAddStandardPreparationStandardizedTitrationAssay,
                handleRemoveStandardPreparationStandardizedTitrationAssay,
                handleStandardPreparationStandardizedTitrationAssayStepChange,
                handleAddSamplePreparationStandardizedTitrationAssay,
                handleRemoveSamplePreparationStandardizedTitrationAssay,
                handleSamplePreparationStandardizedTitrationAssayStepChange,
                handleAddStandardPreparationDibasicSodiumPhosphateAssay,
                handleRemoveStandardPreparationDibasicSodiumPhosphateAssay,
                handleStandardPreparationDibasicSodiumPhosphateAssayStepChange,
                handleAddSamplePreparationDibasicSodiumPhosphateAssay,
                handleRemoveSamplePreparationDibasicSodiumPhosphateAssay,
                handleSamplePreparationDibasicSodiumPhosphateAssayStepChange,
                columns, columnsPerParam, diluentPreparationsPerParam, dissoMediaProfilePerParam, editingBlankPrepId,
                editingDiluentPrepId, editingMobilePhasePrepId, employeeId, formatDate, getAvailablePreparationGroups: getDrugPreparationGroupOptions, getFilesForPrep,
                getParamLevelFiles, groupPrepCompletedAtPerParam, handleAddBlankPreparation, handleAddBufferPreparation, handleAddCalculationAssay, handleAddCalculationAssayHypromellose,
                handleAddCalculationAssayNitrosamine, handleAddCalculationDisso, handleAddCalculationDissoFerrousFumarate, handleAddCalculationDissoProfile, handleAddCalculationFerrousFumarate, handleAddCalculationLod,
                handleAddCalculationROI, handleAddCalculationRS, handleAddCalculationRelatedSubstance, handleAddCalculationSulphatedAsh, handleAddCalculationUC, handleAddChemical,
                handleAddDiluentPrep, handleAddInstrument, handleAddInternalStandard, handleAddMobilePhase, handleAddParamFiles, handleAddPrepFiles,
                handleAddSampleDilutionStage, handleAddSamplePrepAssayFerrousFumaratePerParam, handleAddSamplePrepDissoFerrousFumarate, handleAddSamplePreparation, handleAddSamplePreparationLod, handleAddSamplePreparationROI,
                handleAddSamplePreparationSulphatedAsh, handleAddStandard, handleAddStandardDilutionStage, handleAddStandardPreparation, handleAddStandardPreparationDisso, handleAddStandardPreparationDissoProfile,
                handleAddStandardPreparationHypromellose, handleAddStandardPreparationNitrosamine, handleAddStandardPreparationRS, handleAddStandardPreparationRelatedSubstance, handleAddStandardPreparationUC, handleApprove,
                handleBufferPreparationStepChange, handleCalculationAssayFieldChange, handleCalculationAssayHypromelloseFieldChange, handleCalculationAssayNitrosamineFieldChange, handleCalculationDissoFerrousFumarateFieldChange, handleCalculationDissoFieldChange,
                handleCalculationDissoProfileFieldChange, handleCalculationFerrousFumarateFieldChange, handleCalculationLodFieldChange, handleCalculationROIFieldChange, handleCalculationRSFieldChange, handleCalculationRelatedSubstanceFieldChange,
                handleCalculationSulphatedAshFieldChange, handleCalculationUCFieldChange, handleCompleteAnalysis, handleDissoMediaProfileStepChange, handleEditBlankPreparation, handleEditDiluentPrep,
                handleEditMobilePhase, handleImportFromWorksheet, handleInitiateCompleteGroupPrep, handleInitiateCompletePreparation, handleInitiateDelete, handleInitiateUnlock,
                handleInitiateUnlockGroupPrep, handleInitiateUnlockPreparation, handleQARequestRevision, handleRemoveBlankPreparation, handleRemoveBufferPreparation, handleRemoveCalculationAssay,
                handleRemoveCalculationAssayHypromellose, handleRemoveCalculationAssayNitrosamine, handleRemoveCalculationDisso, handleRemoveCalculationDissoFerrousFumarate, handleRemoveCalculationDissoProfile, handleRemoveCalculationFerrousFumarate,
                handleRemoveCalculationLod, handleRemoveCalculationROI, handleRemoveCalculationRS, handleRemoveCalculationRelatedSubstance, handleRemoveCalculationSulphatedAsh, handleRemoveCalculationUC,
                handleRemoveChemical, handleRemoveDiluentPrep, handleRemoveDissoMediaProfile, handleRemoveInstrument, handleRemoveInternalStandard, handleRemoveMobilePhase,
                handleRemoveParamFile, handleRemovePrepFile, handleRemoveSampleDilutionStage, handleRemoveSamplePrepAssayFerrousFumaratePerParam, handleRemoveSamplePrepDissoFerrousFumarate, handleRemoveSamplePreparation,
                handleRemoveSamplePreparationDisso, handleRemoveSamplePreparationDissoProfile, handleRemoveSamplePreparationHypromellose, handleRemoveSamplePreparationLod, handleRemoveSamplePreparationNitrosamine, handleRemoveSamplePreparationROI,
                handleRemoveSamplePreparationRS, handleRemoveSamplePreparationSulphatedAsh, handleRemoveSamplePreparationUC, handleRemoveStandard, handleRemoveStandardDilutionStage, handleRemoveStandardPreparation,
                handleRemoveStandardPreparationDisso, handleRemoveStandardPreparationDissoProfile, handleRemoveStandardPreparationHypromellose, handleRemoveStandardPreparationNitrosamine, handleRemoveStandardPreparationRS, handleRemoveStandardPreparationRelatedSubstance,
                handleRemoveStandardPreparationUC, handleRequestRevision, handleSamplePrepAssayFerrousFumaratePerParamStepChange, handleSamplePrepDissoFerrousFumarateStepChange, handleSamplePreparationDissoProfileStepChange, handleSamplePreparationDissoStepChange,
                handleSamplePreparationHypromelloseStepChange, handleSamplePreparationLodStepChange, handleSamplePreparationNitrosamineFieldChange, handleSamplePreparationNitrosamineStepChange, handleSamplePreparationROIStepChange, handleSamplePreparationRSStepChange,
                handleSamplePreparationRelatedSubstanceStepChange, handleSamplePreparationStepChange, handleSamplePreparationSulphatedAshStepChange, handleSamplePreparationUCStepChange, handleSaveBlankPreparation, handleSaveDiluentPrep,
                handleSaveMobilePhase, handleSelectColumn, handleStandardPreparationDissoProfileStepChange, handleStandardPreparationDissoStepChange, handleStandardPreparationHypromelloseStepChange, handleStandardPreparationNitrosamineFieldChange,
                handleStandardPreparationNitrosamineStepChange, handleStandardPreparationRSStepChange, handleStandardPreparationRelatedSubstanceStepChange, handleStandardPreparationStepChange, handleStandardPreparationUCStepChange, handleStartAnalysis,
                handleStartRevision, handleTogglePreparationGroup, instrumentRef, instrumentSearch, instruments, isParameterEditableForAnalyst,
                isParameterLocked, isReferenceDataLoading, mobilePhasePerParam, otherInfoPerParam, parameterStatusPerParam,
                preparationCompletedAtPerParam, referenceDataError, remarksByAnalystPerParam, remarksByReviewerPerParam, remarksQAPerParam, revisionCompletedDatePerParam,
                revisionStartDatePerParam, revisionStartedParams, role, samplePrepAssayFerrousFumaratePerParam, samplePrepDissoFerrousFumaratePerParam, samplePreparationDissoPerParam,
                samplePreparationDissoProfilePerParam, samplePreparationHypromellosePerParam, samplePreparationLodPerParam, samplePreparationNitrosaminePerParam, samplePreparationPerParam, samplePreparationROIPerParam,
                samplePreparationRSPerParam, samplePreparationRelatedSubstancePerParam, samplePreparationSulphatedAshPerParam, samplePreparationUCPerParam, searchFilteredChemicals, searchFilteredColumns,
                searchFilteredInstruments, searchFilteredStandards, selectedParamsForDetail, setAdditionalInfoPerParam, setBufferPreparationPerParam, setChemicalSearch,
                setColumnSearch, setDiluentPreparationsPerParam, setEditingBlankPrepId, setEditingDiluentPrepId, setEditingMobilePhasePrepId, setInstrumentSearch,
                setOtherInfoPerParam, setShowAdditionalInfo, setShowBlankPreparationDialog, setShowBufferPreparation, setShowChemicalDropdown, setShowColumnDropdown,
                setShowCopyWorksheetDialog, setShowDiluentPrepDialog, setShowDiluentPreparation, setShowInstrumentDropdown, setShowInternalStandardPreparation, setShowMobilePhaseDialog,
                setShowMobilePhasePreparation, setShowParamFiles, setShowStandardDropdown, setShowSystemSuitability, setStandardSearch, setSystemSuitabilityPerParam,
                showAdditionalInfo, showBlankPreparationDialog, showBufferPreparation, showChemicalDropdown, showColumnDropdown, showCopyWorksheetDialog,
                showDiluentPrepDialog, showDiluentPreparation, showInstrumentDropdown, showInternalStandardPreparation, showMobilePhaseDialog, showMobilePhasePreparation,
                showParamFiles, showStandardDropdown, showSystemSuitability, standardPreparationAssayPerParam, standardPreparationDissoPerParam, standardPreparationDissoProfilePerParam,
                standardPreparationHypromellosePerParam, standardPreparationNitrosaminePerParam, standardPreparationRelatedSubstancePerParam, standardPreparationResidualSolventPerParam, standardPreparationUCPerParam, standardRef,
                standardSearch, standards, systemSuitabilityPerParam, createNewSystemSuitability, toggleParameterDetail, updateFilesForSlot, worksheetId,
                worksheetInfo,
              }}
            />

          </div>
        </div>


        <DrugSelectionActionDialogs
          showStandardSelectionDialog={showStandardSelectionDialog}
          setShowStandardSelectionDialog={setShowStandardSelectionDialog}
          setCurrentParameterForStandardPrep={setCurrentParameterForStandardPrep}
          setIsAddingRSStandard={setIsAddingRSStandard}
          setIsAddingDissoStandard={setIsAddingDissoStandard}
          setIsAddingUCStandard={setIsAddingUCStandard}
          setIsAddingDissoProfileStandard={setIsAddingDissoProfileStandard}
          setIsAddingRelatedSubstanceStandard={setIsAddingRelatedSubstanceStandard}
          setIsAddingHypromelloseStandard={setIsAddingHypromelloseStandard}
          currentParameterForStandardPrep={currentParameterForStandardPrep}
          getAvailableStandardsForParameter={getAvailableStandardsForParameter}
          isAddingRSStandard={isAddingRSStandard}
          isAddingDissoStandard={isAddingDissoStandard}
          isAddingUCStandard={isAddingUCStandard}
          isAddingDissoProfileStandard={isAddingDissoProfileStandard}
          isAddingRelatedSubstanceStandard={isAddingRelatedSubstanceStandard}
          isAddingHypromelloseStandard={isAddingHypromelloseStandard}
          handleStandardSelectedForPreparation={handleStandardSelectedForPreparation}
          handleStandardsSelectedForHypromellosePreparation={
            handleStandardsSelectedForHypromellosePreparation
          }

          showAnalystDialog={showAnalystDialog}
          setShowAnalystDialog={setShowAnalystDialog}
          setPendingParameter={setPendingParameter}
          analysts={analysts}
          handleAnalystSelected={handleAnalystSelected}
          worksheetInfo={worksheetInfo}

          showSubmitDialog={showSubmitDialog}
          isSubmitting={isSubmitting}
          setShowSubmitDialog={setShowSubmitDialog}
          handleSubmitForAnalysis={handleSubmitForAnalysis}
          addedParameters={addedParameters}
          parameterStatusPerParam={parameterStatusPerParam}

          showUnlockDialog={showUnlockDialog}
          parameterToUnlock={parameterToUnlock}
          isUnlocking={isUnlocking}
          setShowUnlockDialog={setShowUnlockDialog}
          setParameterToUnlock={setParameterToUnlock}
          handleConfirmUnlock={handleConfirmUnlock}

          showDeleteDialog={showDeleteDialog}
          parameterToDelete={parameterToDelete}
          isDeleting={isDeleting}
          setShowDeleteDialog={setShowDeleteDialog}
          setParameterToDelete={setParameterToDelete}
          handleConfirmDelete={handleConfirmDelete}
        />

        <DrugAnalysisReviewDialogs
          showStartAnalysisDialog={showStartAnalysisDialog}
          parameterForAnalysis={parameterForAnalysis}
          isStartingAnalysis={isStartingAnalysis}
          setShowStartAnalysisDialog={setShowStartAnalysisDialog}
          setParameterForAnalysis={setParameterForAnalysis}
          handleConfirmStartAnalysis={handleConfirmStartAnalysis}

          showCompleteAnalysisDialog={showCompleteAnalysisDialog}
          isCompletingAnalysis={isCompletingAnalysis}
          setShowCompleteAnalysisDialog={setShowCompleteAnalysisDialog}
          handleConfirmCompleteAnalysis={handleConfirmCompleteAnalysis}

          showApproveDialog={showApproveDialog}
          showRevisionDialog={showRevisionDialog}
          showDisapproveDialog={showDisapproveDialog}
          isApproving={isApproving}
          isRequestingRevision={isRequestingRevision}
          isDisapproving={isDisapproving}
          revisionComments={revisionComments}
          setShowApproveDialog={setShowApproveDialog}
          setShowRevisionDialog={setShowRevisionDialog}
          setShowDisapproveDialog={setShowDisapproveDialog}
          setRevisionComments={setRevisionComments}
          handleConfirmApprove={handleConfirmApprove}
          handleConfirmRevision={handleConfirmRevision}
          handleConfirmDisapprove={handleConfirmDisapprove}

          showQARevisionDialog={showQARevisionDialog}
          isSubmittingRevision={isQARequestingRevision}
          parameterForApproval={parameterForApproval}
          setParameterForApproval={setParameterForApproval}
          setShowQARevisionDialog={setShowQARevisionDialog}
          setQARevisionComments={setQARevisionComments}
          handleConfirmQARevision={handleConfirmQARevision}

          showSubmitForQADialog={showSubmitForQADialog}
          isSubmittingForQA={isSubmittingForQA}
          worksheetId={worksheetId}
          addedParameters={addedParameters}
          setShowSubmitForQADialog={setShowSubmitForQADialog}
          handleSubmitForQA={handleSubmitForQA}

          showApproveWorksheetDialog={showApproveWorksheetDialog}
          isApprovingWorksheet={isApprovingWorksheet}
          setShowApproveWorksheetDialog={setShowApproveWorksheetDialog}
          handleApproveWorksheet={handleApproveWorksheet}

          showRevertApprovalDialog={showRevertApprovalDialog}
          isRevertingApproval={isRevertingApproval}
          setShowRevertApprovalDialog={setShowRevertApprovalDialog}
          handleRevertApproval={handleRevertApproval}
        />

        <DrugPreparationDialogs
          showCompletePreparationDialog={showCompletePreparationDialog}
          isCompletingPreparation={isCompletingPreparation}
          paramForPreparation={paramForPreparation}
          setShowCompletePreparationDialog={setShowCompletePreparationDialog}
          setParamForPreparation={setParamForPreparation}
          handleConfirmCompletePreparation={
            handleConfirmCompletePreparation
          }
          showUnlockPreparationDialog={showUnlockPreparationDialog}
          isUnlockingPreparation={isUnlockingPreparation}
          setShowUnlockPreparationDialog={setShowUnlockPreparationDialog}
          handleConfirmUnlockPreparation={handleConfirmUnlockPreparation}
          showCompleteGroupPrepDialog={showCompleteGroupPrepDialog}
          groupPrepDialogParam={groupPrepDialogParam}
          isCompletingGroupPrep={isCompletingGroupPrep}
          setShowCompleteGroupPrepDialog={setShowCompleteGroupPrepDialog}
          setGroupPrepDialogParam={setGroupPrepDialogParam}
          setGroupPrepDialogKey={setGroupPrepDialogKey}
          handleConfirmCompleteGroupPrep={
            handleConfirmCompleteGroupPrep
          }
          showUnlockGroupPrepDialog={showUnlockGroupPrepDialog}
          isUnlockingGroupPrep={isUnlockingGroupPrep}
          setShowUnlockGroupPrepDialog={setShowUnlockGroupPrepDialog}
          handleConfirmUnlockGroupPrep={
            handleConfirmUnlockGroupPrep
          }
        />
      </div>
    </>
  );
};

export default DrugWorksheet;