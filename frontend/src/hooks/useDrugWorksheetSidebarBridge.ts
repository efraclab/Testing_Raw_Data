import { useCallback, useEffect, useRef } from "react";

export function useDrugWorksheetSidebarBridge(ctx: any) {
  const {
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
  } = ctx;

    const areAllParametersApproved = useCallback((): boolean => {
      if (addedParameters.length === 0) return false;

      // For QA: worksheet approval is available when all params are Reviewer-approved (status = "approved")
      // and none have been returned for revision (no pending remarksQA)
      return addedParameters.every((param) => {
        const status = (
          parameterStatusPerParam[param.id] || "created"
        ).toLowerCase();
        return status === "approved";
      });
    }, [addedParameters, parameterStatusPerParam]);

    // ── Bubble sidebar state/actions up to App ──────────────────────────────
    //
    // Problem: registering actions once on mount captures stale closures.
    // handlePrintClick closes over worksheetInfo/analysts/samplesData which are
    // null at mount time, so onPrint() never fires when the button is clicked.
    //
    // Fix: use a stable ref-forwarding pattern. We pass a stable object whose
    // function bodies delegate to refs that are updated every render. This way:
    //   • App receives the object once (no re-registration loop)
    //   • Every click always invokes the current closure
    //
    const _printRef = useRef(handlePrintClick);
    const _saveDraftRef = useRef(handleSaveDraft);
    const _submitAnalysisRef = useRef(() => setShowSubmitDialog(true));
    const _submitQARef = useRef(() => setShowSubmitForQADialog(true));
    const _approveRef = useRef(() => setShowApproveWorksheetDialog(true));
    const _revertRef = useRef(() => setShowRevertApprovalDialog(true));

    // Keep refs current every render (cheap assignment, no effect needed)
    _printRef.current = handlePrintClick;
    _saveDraftRef.current = handleSaveDraft;
    _submitAnalysisRef.current = () => setShowSubmitDialog(true);
    _submitQARef.current = () => setShowSubmitForQADialog(true);
    _approveRef.current = () => setShowApproveWorksheetDialog(true);
    _revertRef.current = () => setShowRevertApprovalDialog(true);

    useEffect(() => {
      onSidebarActionsReady?.({
        onBack: () => window.history.back(),
        onSaveDraft: () => _saveDraftRef.current(),
        onSubmitForAnalysis: () => _submitAnalysisRef.current(),
        onSubmitForQA: () => _submitQARef.current(),
        onApproveWorksheet: () => _approveRef.current(),
        onPrintReport: () => _printRef.current(),
        onRevertApproval: () => _revertRef.current(),
        onContentReady: function (): void {
          throw new Error("Function not implemented.");
        },
        onToggleAuditTrail: function (): void {
          throw new Error("Function not implemented.");
        }
      });
      // Stable object registered once. The ref wrappers above always delegate
      // to the latest handler, so no stale-closure problem.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      onSidebarStateChange?.({
        worksheetId,
        displayStatus,
        sampleName: worksheetInfo?.sample?.sampleName ?? "",
        registrationNo: worksheetInfo?.sample?.registrationNo ?? registrationNo,
        worksheetStatus: worksheetInfo?.sample?.status ?? null,
        role,
        isSaving,
        saveSuccess,
        isSubmitting,
        isSubmittingForQA,
        isApprovingWorksheet,
        showSaveDraft: worksheetInfo?.sample?.status !== "Approved",
        showSubmitForAnalysis: role === "Reviewer" &&
          (worksheetInfo?.sample?.status === "Draft" ||
            worksheetInfo?.sample?.status === "Submitted For Analysis") &&
          addedParameters.some(
            (p) => (parameterStatusPerParam[p.id] || "created").toLowerCase() ===
              "created"
          ),
        showSubmitForQA: role === "Reviewer" &&
          worksheetInfo?.sample?.status === "Submitted For Analysis" &&
          areAllParametersApproved(),
        showApproveWorksheet: role === "QA" &&
          worksheetInfo?.sample?.status === "Submitted For QA Review" &&
          addedParameters.length > 0 &&
          areAllParametersApproved(),
        showPrintReport: worksheetInfo?.sample?.status === "Approved",
        showRevertApproval: role === "admin" &&
          worksheetInfo?.sample?.status === "Approved",
        isRevertingApproval,
        isContentLoading: isLoading,
        includeAuditTrail: false
      });
    }, [
      worksheetId, displayStatus, worksheetInfo, registrationNo, role,
      isSaving, saveSuccess, isSubmitting, isSubmittingForQA, isApprovingWorksheet,
      isRevertingApproval,
      addedParameters, parameterStatusPerParam, areAllParametersApproved,
      onSidebarStateChange,
    ]);
    // ────────────────────────────────────────────────────────────────────────
}
