import { useCallback, useEffect, useState } from "react";
import type { WorksheetDetail } from "../models/WorksheetDetail";
import type { ParameterDetail } from "../models/ParameterDetail";

export function useDrugWorksheetDisplayStatus(
  worksheetInfo: WorksheetDetail | null,
  parameterStatusPerParam: Record<number, string>,
  addedParameters: ParameterDetail[],
) {
  const [displayStatus, setDisplayStatus] = useState<string>("");

  const computeDisplayStatus = useCallback(() => {
    if (!worksheetInfo) return;

    const currentStatus = worksheetInfo.sample.status;

    if (currentStatus === "Submitted For Analysis") {
      const allStatuses = Object.values(parameterStatusPerParam);

      if (allStatuses.length > 0) {
        const allCompleted = allStatuses.every(
          (status) => status === "Analysis Completed" || status === "Approved",
        );

        if (allCompleted) {
          const allReviewerApproved = addedParameters.every(
            (p) =>
              (parameterStatusPerParam[p.id] || "").toLowerCase() ===
              "approved",
          );

          if (allReviewerApproved) {
            setDisplayStatus("Pending QA Submission");
            return;
          }

          setDisplayStatus("Pending For Review");
          return;
        }
      }
    }

    if (currentStatus === "Submitted For QA Review") {
      setDisplayStatus("Pending QA Validation");
      return;
    }

    setDisplayStatus(currentStatus);
  }, [worksheetInfo, parameterStatusPerParam, addedParameters]);

  useEffect(() => {
    computeDisplayStatus();
  }, [computeDisplayStatus]);

  return displayStatus;
}
