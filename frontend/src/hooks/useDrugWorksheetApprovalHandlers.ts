import { updateWorksheet, submitWorksheet, insertWorksheetLog, revertApproval } from "../services/api";
import { WorksheetDbMapper } from "../helpers/WorksheetDbMapper";

export function useDrugWorksheetApprovalHandlers(ctx: any) {
  const {
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
  } = ctx;

    const handleApproveWorksheet = async () => {
      setIsApprovingWorksheet(true);

      try {
        if (!worksheetInfo) {
          throw new Error("Worksheet information is not available");
        }

        // Capture timestamp once — used for every write below
        const now = new Date().toISOString();

        // ── 1. Build the full payload with QA approval stamped on every parameter ──
        // collectFormDataForAPI reads the current per-param state arrays, giving us
        // the complete parameter data (preparations, calculations, files, etc.)
        const worksheetData = collectFormDataForAPI();

        const updatedWorksheetData = {
          ...worksheetData,
          documentInfo: {
            ...worksheetData?.documentInfo,
            status: "Approved",
            approvedBy: employeeId, // → approved_by column on worksheet row
            approvedAt: now, // → approved_at column on worksheet row
          },
          // Stamp approvedByQA / approvedAtQA on every parameter in the same payload.
          // updateWorksheet's backend loop calls UpdateParameter for each one in a
          // single transaction — no separate per-param API calls needed.
          parameters: worksheetData.parameters?.map((p) => ({
            ...p,
            approvedByQA: employeeId,
            approvedAtQA: now,
          })),
        };

        // ── 2. Single call — updates worksheet row + all parameter rows atomically ──
        const response = await updateWorksheet(worksheetId, updatedWorksheetData);

        if (!response?.worksheetId) {
          throw new Error("Failed to update worksheet status after approval");
        }

        // ── 3. Submit to final tbl tables — inject QA fields BEFORE mapping ──
        const worksheetInfoWithQA = {
          ...worksheetInfo,
          sample: {
            ...worksheetInfo.sample,
            status: "Approved",
            approvedBy: employeeId,
            approvedAt: now,
          },
          parameters: worksheetInfo.parameters.map((p) => ({
            ...p,
            approvedByQA: employeeId,
            approvedAtQA: now,
          })),
        };

        const mappedData = WorksheetDbMapper.mapAll(
          worksheetInfoWithQA as typeof worksheetInfo,
        );
        const submitResponse = await submitWorksheet(mappedData);

        if (!submitResponse.success) {
          throw new Error(
            submitResponse.message ||
            "Failed to submit worksheet to final database",
          );
        }

        // ── 4. Update local React state so UI reflects approval immediately ──
        const qaUpdate: Record<number, string> = {};
        const qaAtUpdate: Record<number, string> = {};
        addedParameters.forEach((p) => {
          qaUpdate[p.id] = employeeId;
          qaAtUpdate[p.id] = now;
        });
        setApprovedByQAPerParam((prev) => ({ ...prev, ...qaUpdate }));
        setApprovedAtQAPerParam((prev) => ({ ...prev, ...qaAtUpdate }));

        setWorksheetInfo((prev) =>
          prev
            ? {
              ...prev,
              sample: {
                ...prev.sample,
                status: "Approved",
                approvedBy: employeeId,
                approvedAt: now,
              },
            }
            : null,
        );

        setToastMessage(
          "Worksheet approved by QA successfully! All parameters are now finalized.",
        );
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        await insertWorksheetLog({
          worksheetId,
          action: "Worksheet Approved by QA",
          remarks: "Worksheet fully approved by QA",
          employeeId,
          role,
        });
        setShowApproveWorksheetDialog(false);
      } catch (error: any) {
        console.error("Error during worksheet approval:", error);
        setToastMessage(`Error approving worksheet: ${error.message || error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsApprovingWorksheet(false);
      }
    };

    // Reverts a worksheet that QA already fully approved, back to
    // "Submitted For QA Review", so it can be re-reviewed and re-approved.
    // Restricted server-side to the QA-revert-only account (role = "admin").
    const handleRevertApproval = async () => {
      setIsRevertingApproval(true);

      try {
        if (!worksheetId) {
          throw new Error("Worksheet ID is not available");
        }

        const response = await revertApproval(worksheetId);

        if (!response?.worksheetId) {
          throw new Error("Failed to revert worksheet approval");
        }

        // Reflect the reverted status locally so the UI updates immediately
        setWorksheetInfo((prev) =>
          prev
            ? {
              ...prev,
              sample: {
                ...prev.sample,
                status: "Submitted For QA Review",
                approvedBy: null,
                approvedAt: null,
              },
            }
            : null,
        );

        setToastMessage("QA approval reverted. Worksheet sent back for QA review.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);

        await insertWorksheetLog({
          worksheetId,
          action: "QA Approval Reverted",
          remarks: "Final QA approval reverted back to Submitted For QA Review",
          employeeId,
          role,
        });

        setShowRevertApprovalDialog(false);
      } catch (error: any) {
        console.error("Error reverting worksheet approval:", error);
        setToastMessage(`Error reverting approval: ${error.message || error}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setIsRevertingApproval(false);
      }
    };

  return {
    handleApproveWorksheet,
    handleRevertApproval,
  };
}
