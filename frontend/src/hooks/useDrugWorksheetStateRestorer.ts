import type { WorksheetDetail } from "../models/WorksheetDetail";
import type { AttachedFile } from "../models/AttachedFile";

export function useDrugWorksheetStateRestorer(ctx: any) {
  const {
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
    setSamplePreparationBetadexPerParam,
    setSamplePreparationStandardizedTitrationAssayPerParam,
    setSamplePreparationDibasicSodiumPhosphateAssayPerParam,
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
    setStandardPreparationBetadexPerParam,
    setStandardPreparationStandardizedTitrationAssayPerParam,
    setStandardPreparationDibasicSodiumPhosphateAssayPerParam,
    setSystemSuitabilityPerParam,
  } = ctx;

    const restoreWorksheetToState = (worksheetData: WorksheetDetail) => {
      const { parameters } = worksheetData;

      const restoredParams = parameters.map((param, index) => {
        const matchingParameter = parameters.find(
          (s) => s.paraCode === param.paraCode,
        );

        return {
          id: Date.now() + index,
          paraCode: param.paraCode,
          parameterName: param.parameterName,
          methodCode: param.methodCode,
          methodName: param.methodName,
          analyzedBy: param.analyzedBy,
          analysisStartDate: param.analysisStartDate,
          analysisCompletionDate: param.analysisCompletionDate,
          status: param.status,
          approvedByReviewer: param.approvedByReviewer,
          approvedAtReviewer: param.approvedAtReviewer,
          preparationCompletedBy: param.preparationCompletedBy,
          preparationCompletedAt: param.preparationCompletedAt,
          submittedQaBy: param.submittedQaBy,
          submittedQaByName: param.submittedQaByName,
          remarksByAnalyst: param.remarksByAnalyst,
          remarksByReviewer: param.remarksByReviewer,
          remarksByQA: param.remarksByQA,
          ...(matchingParameter || {}),
        };
      });

      setAddedParameters(restoredParams as any);

      // ============================================================================
      // HELPER: Safe JSON Parser
      // ============================================================================
      const safeJSONParse = (data: any, fallback: any = []) => {
        if (!data) return fallback;
        if (typeof data === "string") {
          try {
            return JSON.parse(data);
          } catch (e) {
            console.error("JSON Parse Error:", e);
            return fallback;
          }
        }
        return data;
      };

      // Accumulators for file state — built during forEach, set once cleanly after
      const restoredFilesPerParam: Record<
        number,
        Record<string, AttachedFile[]>
      > = {};
      const restoredShowParamFiles: Record<number, boolean> = {};

      parameters.forEach((param, idx) => {
        const paramId = restoredParams[idx].id;

        const systemSuitabilityPreps = (param.preparations || []).filter(
          (p: any) => p.preparationCategory === "system_suitability",
        );

        if (systemSuitabilityPreps.length > 0) {
          setShowSystemSuitability((prev) => ({
            ...prev,
            [paramId]: true,
          }));

          const restoredSuitability: SystemSuitability[] =
            systemSuitabilityPreps.map((prep: any, i: number) => {
              const steps = safeJSONParse(prep.steps, []);
              return {
                id: Date.now() + i * 1000 + Math.random() * 1000,
                label: prep.label || `System Suitability ${i + 1}`,
                steps: steps.map((step: any) => ({
                  name: step.name,
                  value1: step.value1 || "",
                  value2: step.value2 || "",
                  value3: step.value3 || "",
                  value4: step.value4 || "",
                  limitType: step.limitType,
                })),
              };
            });

          setSystemSuitabilityPerParam((prev) => ({
            ...prev,
            [paramId]: restoredSuitability,
          }));
        }

        if (param.analyzedBy) {
          setAnalyzedByPerParam((prev) => ({
            ...prev,
            [paramId]: param.analyzedBy!,
          }));
        }

        if (param.analyzedByName) {
          setAnalyzedByNamePerParam((prev) => ({
            ...prev,
            [paramId]: param.analyzedByName!,
          }));
        }

        if (param.analysisStartDate) {
          setAnalysisStartDatePerParam((prev) => ({
            ...prev,
            [paramId]: param.analysisStartDate!,
          }));
        }

        if (param.analysisCompletionDate) {
          setAnalysisCompletionDatePerParam((prev) => ({
            ...prev,
            [paramId]: param.analysisCompletionDate!,
          }));
        }

        if ((param as any).revisionStartDate) {
          setRevisionStartDatePerParam((prev) => ({
            ...prev,
            [paramId]: (param as any).revisionStartDate,
          }));
        }

        if ((param as any).revisionCompletedDate) {
          setRevisionCompletedDatePerParam((prev) => ({
            ...prev,
            [paramId]: (param as any).revisionCompletedDate,
          }));
        }

        // Hydrate revisionStartedParams if status is already "Analysis Revision Started"
        if ((param.status || "").toLowerCase() === "analysis revision started") {
          setRevisionStartedParams(prev => new Set([...prev, paramId]));
        }

        if (param.status) {
          setParameterStatusPerParam((prev) => ({
            ...prev,
            [paramId]: param.status!,
          }));
        }

        if (param.approvedByReviewer) {
          setApprovedByPerParam((prev) => ({
            ...prev,
            [paramId]: param.approvedByReviewer!,
          }));
        }

        if (param.approvedByReviewerName) {
          setApprovedByNamePerParam((prev) => ({
            ...prev,
            [paramId]: param.approvedByReviewerName!,
          }));
        }

        if (param.approvedAtReviewer) {
          setApprovedAtPerParam((prev) => ({
            ...prev,
            [paramId]: param.approvedAtReviewer!,
          }));
        }

        if (param.approvedByQA) {
          setApprovedByQAPerParam((prev) => ({
            ...prev,
            [paramId]: param.approvedByQA!,
          }));
        }

        if (param.approvedAtQA) {
          setApprovedAtQAPerParam((prev) => ({
            ...prev,
            [paramId]: param.approvedAtQA!,
          }));
        }

        if (param.remarksByQA !== undefined) {
          setRemarksQAPerParam((prev) => ({
            ...prev,
            [paramId]: param.remarksByQA ?? null,
          }));
        }

        if (param.remarksByReviewer !== undefined) {
          setRemarksByReviewerPerParam((prev) => ({
            ...prev,
            [paramId]: param.remarksByReviewer ?? null,
          }));
        }

        if (param.remarksByAnalyst !== undefined) {
          setRemarksByAnalystPerParam((prev) => ({
            ...prev,
            [paramId]: param.remarksByAnalyst ?? null,
          }));
        }

        const savedAdditionalInfo =
          param.additional_info ?? (param as any).additionalInfo;
        if (savedAdditionalInfo !== undefined) {
          setAdditionalInfoPerParam((prev) => ({
            ...prev,
            [paramId]: savedAdditionalInfo ?? "",
          }));
          if (savedAdditionalInfo || (param as any).showAdditionalInfo) {
            setShowAdditionalInfo((prev) => ({ ...prev, [paramId]: true }));
          }
        }

        const savedOtherInfo = param.otherInfo ?? (param as any).other_info;
        if (savedOtherInfo !== undefined) {
          setOtherInfoPerParam((prev) => ({
            ...prev,
            [paramId]: savedOtherInfo ?? "",
          }));
          if (savedOtherInfo || (param as any).showInternalStandardPreparation) {
            setShowInternalStandardPreparation((prev) => ({
              ...prev,
              [paramId]: true,
            }));
          }
        }

        if (param.preparationCompletedBy) {
          setPreparationCompletedByPerParam((prev) => ({
            ...prev,
            [paramId]: param.preparationCompletedBy!,
          }));
        }

        if (param.preparationCompletedAt) {
          setPreparationCompletedAtPerParam((prev) => ({
            ...prev,
            [paramId]: param.preparationCompletedAt!,
          }));

          // Sync groupPrepCompletedAt: mark whichever prep groups exist on this param as done.
          // groupPrepCompletedAtPerParam is local-only UI state derived from preparationCompletedAt.
          if (param.preparations && Array.isArray(param.preparations)) {
            const groupKeys: Record<string, string> = {};
            const at = param.preparationCompletedAt!;
            const prepTypes = param.preparations.map(
              (p: any) => p.preparationType,
            );
            if (prepTypes.includes("lod")) groupKeys["lod"] = at;
            if (prepTypes.includes("roi")) groupKeys["roi"] = at;
            if (prepTypes.includes("sulphated_ash"))
              groupKeys["sulphated_ash"] = at;
            if (prepTypes.includes("residual_solvent"))
              groupKeys["residualSolvent"] = at;
            if (prepTypes.includes("related_substance"))
              groupKeys["relatedSubstance"] = at;
            if (prepTypes.includes("dissolution")) groupKeys["dissolution"] = at;
            if (prepTypes.includes("dissolution_profile"))
              groupKeys["dissoProfile"] = at;
            if (prepTypes.includes("uniformity_of_content")) groupKeys["uc"] = at;
            if (prepTypes.includes("hypromellose")) groupKeys["hypromellose"] = at;
            if (prepTypes.includes("nitrosamine")) groupKeys["nitrosamine"] = at;
            if (prepTypes.includes("assay_ferrous_fumarate"))
              groupKeys["assayFerrousFumarate"] = at;
            if (prepTypes.includes("dissolution_ferrous_fumarate"))
              groupKeys["dissolutionFerrousFumarate"] = at;
            if (prepTypes.includes("assay_titration"))
              groupKeys["assayTitration"] = at;
            if (prepTypes.includes("betadex_batch_analysis"))
              groupKeys["betadexBatchAnalysis"] = at;
            if (prepTypes.includes("standardized_titration_assay"))
              groupKeys["standardizedTitrationAssay"] = at;
            if (prepTypes.includes("dibasic_sodium_phosphate_assay"))
              groupKeys["dibasicSodiumPhosphateAssay"] = at;
            if (Object.keys(groupKeys).length > 0) {
              setGroupPrepCompletedAtPerParam((prev) => ({
                ...prev,
                [paramId]: groupKeys,
              }));
            }
          }
        }

        // ------------------------------------------------------------------------
        // 2.3: Instruments
        // ------------------------------------------------------------------------
        if (param.instruments && Array.isArray(param.instruments)) {
          const worksheetInstruments = param.instruments as WorksheetInstrument[];
          if (worksheetInstruments.length > 0) {
            setAddedInstruments((prev) => ({
              ...prev,
              [paramId]: worksheetInstruments,
            }));
          }
        }

        // ------------------------------------------------------------------------
        // 2.4: Chemicals
        // ------------------------------------------------------------------------
        if (param.chemicals && Array.isArray(param.chemicals)) {
          const worksheetChemicals = param.chemicals as WorksheetChemical[];
          if (worksheetChemicals.length > 0) {
            setAddedChemicals((prev) => ({
              ...prev,
              [paramId]: worksheetChemicals,
            }));
          }
        }

        // ------------------------------------------------------------------------
        // 2.5: Standards
        // ------------------------------------------------------------------------
        if (param.standards && Array.isArray(param.standards)) {
          const worksheetStandards = param.standards as WorksheetStandard[];
          if (worksheetStandards.length > 0) {
            setAddedStandards((prev) => ({
              ...prev,
              [paramId]: worksheetStandards,
            }));
          }
        }

        // ------------------------------------------------------------------------
        // 2.5a: Column
        // ------------------------------------------------------------------------
        if ((param as any).columnId) {
          setColumnsPerParam((prev) => ({
            ...prev,
            [paramId]: (param as any).columnId,
          }));
        }

        // ------------------------------------------------------------------------
        // 2.5b: Internal Standards (Hypromellose only, independent pool)
        // ------------------------------------------------------------------------
        if (
          (param as any).internalStandards &&
          Array.isArray((param as any).internalStandards)
        ) {
          const worksheetInternalStandards = (param as any)
            .internalStandards as WorksheetStandard[];
          if (worksheetInternalStandards.length > 0) {
            setAddedInternalStandards((prev) => ({
              ...prev,
              [paramId]: worksheetInternalStandards,
            }));
            setShowInternalStandardPreparation((prev) => ({
              ...prev,
              [paramId]: true,
            }));
          }
        }

        // ------------------------------------------------------------------------
        // 2.6: PREPARATIONS (Main Logic - FIXED)
        // ------------------------------------------------------------------------
        if (
          param.preparations &&
          Array.isArray(param.preparations) &&
          param.preparations.length > 0
        ) {
          // Initialize collection arrays for each preparation type
          const preparationCollections = {
            // Standard preparations by type
            assayStd: [] as any[],
            rsStd: [] as any[],
            dissoStd: [] as any[],
            ucStd: [] as any[],
            relatedSubstanceStd: [] as any[],
            hypromelloseStd: [] as any[],
            nitrosamineStd: [] as any[],
            titrationStd: [] as any[],
            betadexStd: [] as any[],
            standardizedTitrationAssayStd: [] as any[],
            dibasicSodiumPhosphateAssayStd: [] as any[],

            // Sample preparations by type
            assaySpl: [] as any[],
            lodSpl: [] as any[],
            roiSpl: [] as any[],
            ashSpl: [] as any[],
            rsSpl: [] as any[],
            dissoSpl: [] as any[],
            assayFerrousFumarateSpl: [] as any[],
            dissolutionFerrousFumarateSpl: [] as any[],
            ucSpl: [] as any[],
            relatedSubstanceSpl: [] as any[],
            hypromelloseSpl: [] as any[],
            nitrosamineSpl: [] as any[],
            titrationSpl: [] as any[],
            betadexSpl: [] as any[],
            standardizedTitrationAssaySpl: [] as any[],
            dibasicSodiumPhosphateAssaySpl: [] as any[],

            // Special category preparations
            dissoMedia: [] as any[],
            mobilePhase: [] as any[],
            blank: [] as any[],
            bufferPrep: [] as any[],
            diluentPrep: [] as any[],
            dissoProfileStd: [] as any[],
            dissoProfileSpl: [] as any[],
            dissoMediaProfile: [] as any[],
          };

          // Process each preparation
          param.preparations.forEach((prep: any, i: number) => {
            const prepCategory = prep.preparationCategory;
            const prepType = prep.preparationType;

            // Skip system_suitability as it's handled separately above
            if (prepCategory === "system_suitability") {
              return;
            }

            const parsedSteps = safeJSONParse(prep.steps, []);

            const newPrep = {
              id: Date.now() + i + 1000 + Math.random() * 1000,
              label: prep.label,
              steps: parsedSteps,
              assignedStandardId: prep.assignedStandardId || null,
              batchNo: prep.batchNo || "",
              purity: prep.purity || "",
              weightTaken: prep.weightTaken || "",
              weightTakenUnit: prep.weightTakenUnit || "mg",
              sampleWeight: prep.sampleWeight || "",
              sampleWeightUnit: prep.sampleWeightUnit || "mg",
            };

            // Route based on preparationCategory first, then preparationType
            if (prepCategory === "standard") {
              // Standard preparations - route by preparationType
              switch (prepType) {
                case "assay":
                  preparationCollections.assayStd.push(newPrep);
                  break;
                case "residual_solvent":
                  preparationCollections.rsStd.push(newPrep);
                  break;
                case "related_substance":
                  preparationCollections.relatedSubstanceStd.push(newPrep);
                  break;
                case "dissolution":
                  preparationCollections.dissoStd.push(newPrep);
                  break;
                case "uniformity_of_content":
                  preparationCollections.ucStd.push(newPrep);
                  break;
                case "dissolution_profile":
                  preparationCollections.dissoProfileStd.push(newPrep);
                  break;
                case "hypromellose":
                  preparationCollections.hypromelloseStd.push(newPrep);
                  break;
                case "nitrosamine":
                  preparationCollections.nitrosamineStd.push(newPrep);
                  break;
                case "assay_titration":
                  preparationCollections.titrationStd.push(newPrep);
                  break;
                case "betadex_batch_analysis":
                  preparationCollections.betadexStd.push(newPrep);
                  break;
                case "standardized_titration_assay":
                  preparationCollections.standardizedTitrationAssayStd.push(newPrep);
                  break;
                case "dibasic_sodium_phosphate_assay":
                  preparationCollections.dibasicSodiumPhosphateAssayStd.push(newPrep);
                  break;
                default:
                  // [WARNING] CRITICAL FIX: Log unrecognized types but DON'T add them
                  if (prepType) {
                    console.warn(
                      `  [WARNING]  Unrecognized standard preparationType: "${prepType}" for prep: "${prep.label}"`,
                    );
                  } else {
                    console.warn(
                      `  [WARNING]  Standard preparation with NULL preparationType: "${prep.label}" - SKIPPED`,
                    );
                  }
                  break;
              }
            } else if (prepCategory === "sample") {
              // Sample preparations - route by preparationType
              switch (prepType) {
                case "assay":
                  preparationCollections.assaySpl.push(newPrep);
                  break;
                case "lod":
                  preparationCollections.lodSpl.push(newPrep);
                  break;
                case "roi":
                  preparationCollections.roiSpl.push(newPrep);
                  break;
                case "sulphated_ash":
                  preparationCollections.ashSpl.push(newPrep);
                  break;
                case "residual_solvent":
                  preparationCollections.rsSpl.push(newPrep);
                  break;
                case "related_substance":
                  preparationCollections.relatedSubstanceSpl.push(newPrep);
                  break;
                case "dissolution":
                  preparationCollections.dissoSpl.push(newPrep);
                  break;
                case "assay_ferrous_fumarate":
                  preparationCollections.assayFerrousFumarateSpl.push(newPrep);
                  break;

                case "dissolution_ferrous_fumarate":
                  preparationCollections.dissolutionFerrousFumarateSpl.push(
                    newPrep,
                  );
                  break;
                case "uniformity_of_content":
                  preparationCollections.ucSpl.push(newPrep);
                  break;
                case "dissolution_profile":
                  preparationCollections.dissoProfileSpl.push(newPrep);
                  break;
                case "hypromellose":
                  preparationCollections.hypromelloseSpl.push(newPrep);
                  break;
                case "nitrosamine":
                  preparationCollections.nitrosamineSpl.push(newPrep);
                  break;
                case "assay_titration":
                  preparationCollections.titrationSpl.push(newPrep);
                  break;
                case "betadex_batch_analysis":
                  preparationCollections.betadexSpl.push(newPrep);
                  break;
                case "standardized_titration_assay":
                  preparationCollections.standardizedTitrationAssaySpl.push(newPrep);
                  break;
                case "dibasic_sodium_phosphate_assay":
                  preparationCollections.dibasicSodiumPhosphateAssaySpl.push(newPrep);
                  break;
                default:
                  // [WARNING] CRITICAL FIX: Log unrecognized types but DON'T add them
                  if (prepType) {
                    console.warn(
                      `  [WARNING]  Unrecognized sample preparationType: "${prepType}" for prep: "${prep.label}"`,
                    );
                  } else {
                    console.warn(
                      `  [WARNING]  Sample preparation with NULL preparationType: "${prep.label}" - SKIPPED`,
                    );
                  }
                  break;
              }
            } else if (prepCategory === "dissolution_media") {
              if (prepType === "dissolution_media") {
                preparationCollections.dissoMedia.push(newPrep);
              } else {
                preparationCollections.dissoMediaProfile.push(newPrep);
              }
            } else if (prepCategory === "mobile_phase") {
              preparationCollections.mobilePhase.push({
                id: String(newPrep.id),
                label: prep.label || "Mobile Phase Preparation",
                content: prep.content || "",
              });
            } else if (prepCategory === "blank") {
              preparationCollections.blank.push({
                id: newPrep.id,
                label: prep.label || "Blank Preparation",
                content: prep.content || "",
              });
            } else if (prepCategory === "buffer") {
              preparationCollections.bufferPrep.push({
                id: newPrep.id,
                label: prep.label || "Buffer Preparation",
                steps: newPrep.steps,
              });
            } else if (prepCategory === "diluent") {
              preparationCollections.diluentPrep.push({
                id: String(newPrep.id),
                label: prep.label || "Diluent Preparation",
                content: prep.content || "",
              });
            } else {
              console.warn(
                `  [WARNING]  Unrecognized preparationCategory: "${prepCategory}" for prep: "${prep.label}"`,
              );
            }
          });

          if (preparationCollections.assayStd.length > 0) {
            setStandardPreparationAssayPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.assayStd,
            }));
          }

          if (preparationCollections.rsStd.length > 0) {
            setStandardPreparationResidualSolventPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.rsStd,
            }));
          }

          if (preparationCollections.dissoStd.length > 0) {
            setStandardPreparationDissoPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissoStd,
            }));
          }

          if (preparationCollections.ucStd.length > 0) {
            setStandardPreparationUCPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.ucStd,
            }));
          }

          if (preparationCollections.hypromelloseStd.length > 0) {
            setStandardPreparationHypromellosePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.hypromelloseStd,
            }));
          }

          if (preparationCollections.nitrosamineStd.length > 0) {
            setStandardPreparationNitrosaminePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.nitrosamineStd,
            }));
          }

          if (preparationCollections.titrationStd.length > 0) {
            setStandardPreparationTitrationPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.titrationStd,
            }));
          }

          if (preparationCollections.betadexStd.length > 0) {
            setStandardPreparationBetadexPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.betadexStd,
            }));
          }

          if (preparationCollections.standardizedTitrationAssayStd.length > 0) {
            setStandardPreparationStandardizedTitrationAssayPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.standardizedTitrationAssayStd,
            }));
          }

          if (preparationCollections.dibasicSodiumPhosphateAssayStd.length > 0) {
            setStandardPreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.dibasicSodiumPhosphateAssayStd,
            }));
          }

          // Sample preparations
          if (preparationCollections.assaySpl.length > 0) {
            setSamplePreparationPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.assaySpl,
            }));
          }

          if (preparationCollections.lodSpl.length > 0) {
            setSamplePreparationLodPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.lodSpl,
            }));
          }

          if (preparationCollections.roiSpl.length > 0) {
            setSamplePreparationROIPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.roiSpl,
            }));
          }

          if (preparationCollections.ashSpl.length > 0) {
            setSamplePreparationSulphatedAshPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.ashSpl,
            }));
          }

          if (preparationCollections.rsSpl.length > 0) {
            setSamplePreparationRSPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.rsSpl,
            }));
          }

          if (preparationCollections.relatedSubstanceStd.length > 0) {
            setStandardPreparationRelatedSubstancePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.relatedSubstanceStd,
            }));
          }

          if (preparationCollections.relatedSubstanceSpl.length > 0) {
            setSamplePreparationRelatedSubstancePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.relatedSubstanceSpl,
            }));
          }

          if (preparationCollections.dissoSpl.length > 0) {
            setSamplePreparationDissoPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissoSpl,
            }));
          }

          if (preparationCollections.assayFerrousFumarateSpl.length > 0) {
            setSamplePrepAssayFerrousFumaratePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.assayFerrousFumarateSpl,
            }));
          }

          if (preparationCollections.dissolutionFerrousFumarateSpl.length > 0) {
            setSamplePrepDissoFerrousFumaratePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissolutionFerrousFumarateSpl,
            }));
          }

          if (preparationCollections.ucSpl.length > 0) {
            setSamplePreparationUCPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.ucSpl,
            }));
          }

          if (preparationCollections.hypromelloseSpl.length > 0) {
            setSamplePreparationHypromellosePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.hypromelloseSpl,
            }));
          }

          if (preparationCollections.nitrosamineSpl.length > 0) {
            setSamplePreparationNitrosaminePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.nitrosamineSpl,
            }));
          }

          if (preparationCollections.titrationSpl.length > 0) {
            setSamplePreparationTitrationPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.titrationSpl,
            }));
          }

          if (preparationCollections.betadexSpl.length > 0) {
            setSamplePreparationBetadexPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.betadexSpl,
            }));
          }

          if (preparationCollections.standardizedTitrationAssaySpl.length > 0) {
            setSamplePreparationStandardizedTitrationAssayPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.standardizedTitrationAssaySpl,
            }));
          }

          if (preparationCollections.dibasicSodiumPhosphateAssaySpl.length > 0) {
            setSamplePreparationDibasicSodiumPhosphateAssayPerParam((prev: any) => ({
              ...prev,
              [paramId]: preparationCollections.dibasicSodiumPhosphateAssaySpl,
            }));
          }

          // Special category preparations
          if (preparationCollections.dissoMedia.length > 0) {
            setDissoMediaPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissoMedia,
            }));
          }

          if (preparationCollections.dissoProfileStd.length > 0) {
            setStandardPreparationDissoProfilePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissoProfileStd,
            }));
          }

          if (preparationCollections.dissoProfileSpl.length > 0) {
            setSamplePreparationDissoProfilePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissoProfileSpl,
            }));
          }

          if (preparationCollections.dissoMediaProfile.length > 0) {
            setDissoMediaProfilePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.dissoMediaProfile,
            }));
          }

          if (preparationCollections.mobilePhase.length > 0) {
            setMobilePhasePerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.mobilePhase,
            }));
            // Auto-enable the mobile phase toggle when data exists
            setShowMobilePhasePreparation((prev) => ({
              ...prev,
              [paramId]: true,
            }));
          }

          // Blank preparations
          if (preparationCollections.blank.length > 0) {
            setBlankPreparationPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.blank,
            }));
            // Auto-enable the blank preparation group when data exists
            setActivePreparationGroups((prev) => ({
              ...prev,
              [paramId]: [...(prev[paramId] || []), "blankPreparation"],
            }));
          }

          // Buffer preparations
          if (preparationCollections.bufferPrep.length > 0) {
            setBufferPreparationPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.bufferPrep,
            }));
            setShowBufferPreparation((prev) => ({ ...prev, [paramId]: true }));
          }

          // Diluent preparations (blank-sheet style)
          if (preparationCollections.diluentPrep.length > 0) {
            setDiluentPreparationsPerParam((prev) => ({
              ...prev,
              [paramId]: preparationCollections.diluentPrep,
            }));
            setShowDiluentPreparation((prev) => ({ ...prev, [paramId]: true }));
          }
        }

        // ------------------------------------------------------------------------
        // 2.7: CALCULATIONS
        // ------------------------------------------------------------------------
        const prepLabelMapping: Record<string, number> = {};

        // Map all preparation labels to IDs for calculation linking
        if (param.preparations && Array.isArray(param.preparations)) {
          param.preparations.forEach((prep: any, i: number) => {
            if (prep.label) {
              prepLabelMapping[prep.label] =
                Date.now() + i + 1000 + Math.random() * 1000;
            }
          });
        }

        if (param.calculations && Array.isArray(param.calculations)) {
          const restoredCalculations = {
            assay: [] as any[],
            lod: [] as any[],
            roi: [] as any[],
            sulphatedAsh: [] as any[],
            residualSolvent: [] as any[],
            relatedSubstance: [] as any[],
            dissolution: [] as any[],
            uniformityOfContent: [] as any[],
            dissolutionProfile: [] as any[],
            ferrousFumarate: [] as CalculationAssayFerrousFumarate[],
            dissoFerrousFumarate: [] as CalculationDissoFerrousFumarate[],
            hypromellose: [] as CalculationAssayHypromellose[],
            nitrosamine: [] as CalculationAssayNitrosamine[],
            generic: [] as any[],
          };

          param.calculations.forEach((calc: any, i: number) => {
            try {
              const parsedData =
                typeof calc.data === "string" ? JSON.parse(calc.data) : calc.data;
              const calcType = calc.calculationType || "assay";

              // Get preparation labels for linking
              const stdLabel = parsedData.selectedStandardPreparationLabel;
              const splLabel = parsedData.selectedSamplePreparationLabel;

              const baseId = Date.now() + paramId * 10000 + i;

              // Route based on calculationType
              switch (calcType) {
                case "uniformity_of_content":
                  const ucCalc = {
                    id: baseId + 9000,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel:
                      parsedData.selectedStandardPreparationLabel,
                    selectedSamplePreparationLabel:
                      parsedData.selectedSamplePreparationLabel,
                    areaOfStandard: parsedData.areaOfStandard ?? null,
                    areaOfSample1: parsedData.areaOfSample1 ?? null,
                    areaOfSample2: parsedData.areaOfSample2 ?? null,
                    areaOfSample3: parsedData.areaOfSample3 ?? null,
                    areaOfSample4: parsedData.areaOfSample4 ?? null,
                    areaOfSample5: parsedData.areaOfSample5 ?? null,
                    areaOfSample6: parsedData.areaOfSample6 ?? null,
                    areaOfSample7: parsedData.areaOfSample7 ?? null,
                    areaOfSample8: parsedData.areaOfSample8 ?? null,
                    areaOfSample9: parsedData.areaOfSample9 ?? null,
                    areaOfSample10: parsedData.areaOfSample10 ?? null,
                    purity: parsedData.purity || "",
                    mWBase: parsedData.mWBase ?? null,
                    mWSalt: parsedData.mWSalt ?? null,
                    calculationResultUnit:
                      parsedData.calculationResultUnit || null,
                    calculationResultTablet1:
                      parsedData.calculationResultTablet1 || null,
                    calculationResultTablet2:
                      parsedData.calculationResultTablet2 || null,
                    calculationResultTablet3:
                      parsedData.calculationResultTablet3 || null,
                    calculationResultTablet4:
                      parsedData.calculationResultTablet4 || null,
                    calculationResultTablet5:
                      parsedData.calculationResultTablet5 || null,
                    calculationResultTablet6:
                      parsedData.calculationResultTablet6 || null,
                    calculationResultTablet7:
                      parsedData.calculationResultTablet7 || null,
                    calculationResultTablet8:
                      parsedData.calculationResultTablet8 || null,
                    calculationResultTablet9:
                      parsedData.calculationResultTablet9 || null,
                    calculationResultTablet10:
                      parsedData.calculationResultTablet10 || null,
                    mgPerTabletResultUnit:
                      parsedData.mgPerTabletResultUnit || null,
                    mgPerTabletResultTablet1:
                      parsedData.mgPerTabletResultTablet1 || null,
                    mgPerTabletResultTablet2:
                      parsedData.mgPerTabletResultTablet2 || null,
                    mgPerTabletResultTablet3:
                      parsedData.mgPerTabletResultTablet3 || null,
                    mgPerTabletResultTablet4:
                      parsedData.mgPerTabletResultTablet4 || null,
                    mgPerTabletResultTablet5:
                      parsedData.mgPerTabletResultTablet5 || null,
                    mgPerTabletResultTablet6:
                      parsedData.mgPerTabletResultTablet6 || null,
                    mgPerTabletResultTablet7:
                      parsedData.mgPerTabletResultTablet7 || null,
                    mgPerTabletResultTablet8:
                      parsedData.mgPerTabletResultTablet8 || null,
                    mgPerTabletResultTablet9:
                      parsedData.mgPerTabletResultTablet9 || null,
                    mgPerTabletResultTablet10:
                      parsedData.mgPerTabletResultTablet10 || null,
                    sw1: parsedData.sw1 || null,
                    claim: parsedData.claim || null,
                    v1: parsedData.v1 || null,
                    v2: parsedData.v2 || null,
                    v3: parsedData.v3 || null,
                    v4: parsedData.v4 || null,
                    v5: parsedData.v5 || null,
                    v6: parsedData.v6 || null,
                    v7: parsedData.v7 || null,
                    v8: parsedData.v8 || null,
                    v9: parsedData.v9 || null,
                    v10: parsedData.v10 || null,
                    v11: parsedData.v11 || null,
                    v12: parsedData.v12 || null,
                    v13: parsedData.v13 || null,
                    v14: parsedData.v14 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.uniformityOfContent.push(ucCalc);
                  break;

                case "assay":
                  const assayCalc = {
                    id: baseId + 3000,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    calculationFor: parsedData.calculationFor || "",
                    areaOfSample: parsedData.areaOfSample || "",
                    areaOfStandard: parsedData.areaOfStandard || "",
                    avgWeight: parsedData.avgWeight || "",
                    avgWeightUnit: parsedData.avgWeightUnit || "",
                    weightPerMl: parsedData.weightPerMl || "",
                    weightPerMlUnit: parsedData.weightPerMlUnit || "",
                    purity: parsedData.purity || "",
                    mWSalt: parsedData.mWSalt || "",
                    mWBase: parsedData.mWBase || "",
                    claim: parsedData.claim || "",
                    claimUnit: parsedData.claimUnit || "",
                    labelClaim: parsedData.labelClaim || null,
                    lodWaterType: parsedData.lodWaterType || "",
                    lodWaterValue: parsedData.lodWaterValue || "",
                    calculationResult: parsedData.calculationResult || null,
                    calculationResultUnit:
                      parsedData.calculationResultUnit || null,
                    labelClaimPercent: parsedData.labelClaimPercent || null,
                    lodWaterBasisResult: parsedData.lodWaterBasisResult || null,
                    sw1: parsedData.sw1 || null,
                    sw2: parsedData.sw2 || null,
                    v1: parsedData.v1 || null,
                    v2: parsedData.v2 || null,
                    v3: parsedData.v3 || null,
                    v4: parsedData.v4 || null,
                    v5: parsedData.v5 || null,
                    v6: parsedData.v6 || null,
                    v7: parsedData.v7 || null,
                    v8: parsedData.v8 || null,
                    v9: parsedData.v9 || null,
                    v10: parsedData.v10 || null,
                    v11: parsedData.v11 || null,
                    v12: parsedData.v12 || null,
                    v13: parsedData.v13 || null,
                    v14: parsedData.v14 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.assay.push(assayCalc);
                  break;

                case "lod":
                  const lodCalc = {
                    id: baseId + 4000,
                    label: parsedData.label || calc.label,
                    selectedSamplePreparationLabel: splLabel,
                    w1_emptyDish: parsedData.w1_emptyDish || "",
                    w2_dishWithSample: parsedData.w2_dishWithSample || "",
                    w3_dishAfterIgnition: parsedData.w3_dishAfterIgnition || "",
                    calculationResult: parsedData.calculationResult || "",
                    calculationResultUnit: parsedData.calculationResultUnit || "",
                    w1: parsedData.w1 || null,
                    w2: parsedData.w2 || null,
                    w3: parsedData.w3 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.lod.push(lodCalc);
                  break;

                case "roi":
                  const roiCalc = {
                    id: baseId + 5000,
                    label: parsedData.label || calc.label,
                    selectedSamplePreparationLabel: splLabel,
                    w1_emptyDish: parsedData.w1_emptyDish || "",
                    w2_dishWithSample: parsedData.w2_dishWithSample || "",
                    w3_dishAfterIgnition: parsedData.w3_dishAfterIgnition || "",
                    calculationResult: parsedData.calculationResult || "",
                    calculationResultUnit: parsedData.calculationResultUnit || "",
                    w1: parsedData.w1 || null,
                    w2: parsedData.w2 || null,
                    w3: parsedData.w3 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.roi.push(roiCalc);
                  break;

                case "sulphated_ash":
                  const ashCalc = {
                    id: baseId + 6000,
                    label: parsedData.label || calc.label,
                    selectedSamplePreparationLabel: splLabel,
                    w1_emptyCrucible: parsedData.w1_emptyCrucible || "",
                    w2_crucibleWithSample: parsedData.w2_crucibleWithSample || "",
                    w3_crucibleAfterAsh: parsedData.w3_crucibleAfterAsh || "",
                    calculationResult: parsedData.calculationResult || "",
                    calculationResultUnit: parsedData.calculationResultUnit || "",
                    w1: parsedData.w1 || null,
                    w2: parsedData.w2 || null,
                    w3: parsedData.w3 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.sulphatedAsh.push(ashCalc);
                  break;

                case "residual_solvent":
                  const rsCalc = {
                    id: baseId + 7000,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    areaOfSample: parsedData.areaOfSample || "",
                    areaOfStandard: parsedData.areaOfStandard || "",
                    purity: parsedData.purity || "",
                    calculationResult: parsedData.calculationResult || "",
                    calculationResultUnit: parsedData.calculationResultUnit || "",
                    sw1: parsedData.sw1 || null,
                    sw2: parsedData.sw2 || null,
                    v1: parsedData.v1 || null,
                    v2: parsedData.v2 || null,
                    v3: parsedData.v3 || null,
                    v4: parsedData.v4 || null,
                    v5: parsedData.v5 || null,
                    v6: parsedData.v6 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.residualSolvent.push(rsCalc);
                  break;

                case "related_substance":
                  const relSubCalc: CalculationRelatedSubstance = {
                    id: baseId + 7100,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    calculationFor: parsedData.calculationFor || "",
                    areaOfSample: parsedData.areaOfSample || "",
                    areaOfStandard: parsedData.areaOfStandard || "",
                    purity: parsedData.purity || "",
                    mWSalt: parsedData.mWSalt || "",
                    mWBase: parsedData.mWBase || "",
                    responseFactor: parsedData.responseFactor || "",
                    responseFactorUnit: parsedData.responseFactorUnit || "mg",
                    labelClaim: parsedData.labelClaim || "",
                    avgWeight: parsedData.avgWeight || "",
                    avgWeightUnit: parsedData.avgWeightUnit || "mg",
                    weightPerMl: parsedData.weightPerMl || "",
                    weightPerMlUnit: parsedData.weightPerMlUnit || "mg",
                    doseVolume: parsedData.doseVolume || "",
                    doseVolumeUnit: parsedData.doseVolumeUnit || "ml",
                    calculationResult: parsedData.calculationResult || null,
                    calculationResultUnit:
                      parsedData.calculationResultUnit || null,
                    sw1: parsedData.sw1 || null,
                    sw2: parsedData.sw2 || null,
                    v1: parsedData.v1 || null,
                    v2: parsedData.v2 || null,
                    v3: parsedData.v3 || null,
                    v4: parsedData.v4 || null,
                    v5: parsedData.v5 || null,
                    v6: parsedData.v6 || null,
                    v7: parsedData.v7 || null,
                    v8: parsedData.v8 || null,
                    v9: parsedData.v9 || null,
                    v10: parsedData.v10 || null,
                    v11: parsedData.v11 || null,
                    v12: parsedData.v12 || null,
                    v13: parsedData.v13 || null,
                    v14: parsedData.v14 || null,
                    labelClaimUnit: parsedData.labelClaimUnit || null,
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || null,
                  };
                  restoredCalculations.relatedSubstance.push(relSubCalc);
                  break;

                case "dissolution":
                  const dissoCalc = {
                    id: baseId + 8000,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    areaOfSample1: parsedData.areaOfSample1 || "",
                    areaOfSample2: parsedData.areaOfSample2 || "",
                    areaOfSample3: parsedData.areaOfSample3 || "",
                    areaOfSample4: parsedData.areaOfSample4 || "",
                    areaOfSample5: parsedData.areaOfSample5 || "",
                    areaOfSample6: parsedData.areaOfSample6 || "",
                    areaOfStandard: parsedData.areaOfStandard || "",
                    mWBase: parsedData.mWBase || "",
                    mWSalt: parsedData.mWSalt || "",
                    purity: parsedData.purity || "",
                    calculationResult: parsedData.calculationResult || null,
                    calculationResultTablet1:
                      parsedData.calculationResultTablet1 || null,
                    calculationResultTablet2:
                      parsedData.calculationResultTablet2 || null,
                    calculationResultTablet3:
                      parsedData.calculationResultTablet3 || null,
                    calculationResultTablet4:
                      parsedData.calculationResultTablet4 || null,
                    calculationResultTablet5:
                      parsedData.calculationResultTablet5 || null,
                    calculationResultTablet6:
                      parsedData.calculationResultTablet6 || null,
                    calculationResultUnit:
                      parsedData.calculationResultUnit || null,
                    sw1: parsedData.sw1 || null,
                    claim: parsedData.claim || null,
                    mediaVol: parsedData.mediaVol || null,
                    v1: parsedData.v1 || null,
                    v2: parsedData.v2 || null,
                    v3: parsedData.v3 || null,
                    v4: parsedData.v4 || null,
                    v5: parsedData.v5 || null,
                    v6: parsedData.v6 || null,
                    v7: parsedData.v7 || null,
                    v8: parsedData.v8 || null,
                    v9: parsedData.v9 || null,
                    v10: parsedData.v10 || null,
                    v11: parsedData.v11 || null,
                    v12: parsedData.v12 || null,
                    v13: parsedData.v13 || null,
                    v14: parsedData.v14 || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.dissolution.push(dissoCalc);
                  break;

                case "dissolution_profile":
                  const dissoProfileCalc = {
                    id: baseId + 8500,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    areaOfStandard: parsedData.areaOfStandard || "",
                    numberOfTimePoints: parsedData.numberOfTimePoints || 2,
                    volumeWithdraw: parsedData.volumeWithdraw || "",
                    volumeReplaced: parsedData.volumeReplaced || "",
                    timePointDetail1: parsedData.timePointDetail1 || null,
                    timePointDetail2: parsedData.timePointDetail2 || null,
                    timePointDetail3: parsedData.timePointDetail3 || null,
                    timePointDetail4: parsedData.timePointDetail4 || null,
                    timePointDetail5: parsedData.timePointDetail5 || null,
                    timePointDetail6: parsedData.timePointDetail6 || null,
                    timePointDetail7: parsedData.timePointDetail7 || null,
                    timePointDetail8: parsedData.timePointDetail8 || null,
                    timePointDetail9: parsedData.timePointDetail9 || null,
                    timePointDetail10: parsedData.timePointDetail10 || null,
                    areaOfSampleT1S1: parsedData.areaOfSampleT1S1 || null,
                    areaOfSampleT1S2: parsedData.areaOfSampleT1S2 || null,
                    areaOfSampleT1S3: parsedData.areaOfSampleT1S3 || null,
                    areaOfSampleT1S4: parsedData.areaOfSampleT1S4 || null,
                    areaOfSampleT1S5: parsedData.areaOfSampleT1S5 || null,
                    areaOfSampleT1S6: parsedData.areaOfSampleT1S6 || null,
                    areaOfSampleT2S1: parsedData.areaOfSampleT2S1 || null,
                    areaOfSampleT2S2: parsedData.areaOfSampleT2S2 || null,
                    areaOfSampleT2S3: parsedData.areaOfSampleT2S3 || null,
                    areaOfSampleT2S4: parsedData.areaOfSampleT2S4 || null,
                    areaOfSampleT2S5: parsedData.areaOfSampleT2S5 || null,
                    areaOfSampleT2S6: parsedData.areaOfSampleT2S6 || null,
                    areaOfSampleT3S1: parsedData.areaOfSampleT3S1 || null,
                    areaOfSampleT3S2: parsedData.areaOfSampleT3S2 || null,
                    areaOfSampleT3S3: parsedData.areaOfSampleT3S3 || null,
                    areaOfSampleT3S4: parsedData.areaOfSampleT3S4 || null,
                    areaOfSampleT3S5: parsedData.areaOfSampleT3S5 || null,
                    areaOfSampleT3S6: parsedData.areaOfSampleT3S6 || null,
                    areaOfSampleT4S1: parsedData.areaOfSampleT4S1 || null,
                    areaOfSampleT4S2: parsedData.areaOfSampleT4S2 || null,
                    areaOfSampleT4S3: parsedData.areaOfSampleT4S3 || null,
                    areaOfSampleT4S4: parsedData.areaOfSampleT4S4 || null,
                    areaOfSampleT4S5: parsedData.areaOfSampleT4S5 || null,
                    areaOfSampleT4S6: parsedData.areaOfSampleT4S6 || null,
                    areaOfSampleT5S1: parsedData.areaOfSampleT5S1 || null,
                    areaOfSampleT5S2: parsedData.areaOfSampleT5S2 || null,
                    areaOfSampleT5S3: parsedData.areaOfSampleT5S3 || null,
                    areaOfSampleT5S4: parsedData.areaOfSampleT5S4 || null,
                    areaOfSampleT5S5: parsedData.areaOfSampleT5S5 || null,
                    areaOfSampleT5S6: parsedData.areaOfSampleT5S6 || null,
                    areaOfSampleT6S1: parsedData.areaOfSampleT6S1 || null,
                    areaOfSampleT6S2: parsedData.areaOfSampleT6S2 || null,
                    areaOfSampleT6S3: parsedData.areaOfSampleT6S3 || null,
                    areaOfSampleT6S4: parsedData.areaOfSampleT6S4 || null,
                    areaOfSampleT6S5: parsedData.areaOfSampleT6S5 || null,
                    areaOfSampleT6S6: parsedData.areaOfSampleT6S6 || null,
                    areaOfSampleT7S1: parsedData.areaOfSampleT7S1 || null,
                    areaOfSampleT7S2: parsedData.areaOfSampleT7S2 || null,
                    areaOfSampleT7S3: parsedData.areaOfSampleT7S3 || null,
                    areaOfSampleT7S4: parsedData.areaOfSampleT7S4 || null,
                    areaOfSampleT7S5: parsedData.areaOfSampleT7S5 || null,
                    areaOfSampleT7S6: parsedData.areaOfSampleT7S6 || null,
                    areaOfSampleT8S1: parsedData.areaOfSampleT8S1 || null,
                    areaOfSampleT8S2: parsedData.areaOfSampleT8S2 || null,
                    areaOfSampleT8S3: parsedData.areaOfSampleT8S3 || null,
                    areaOfSampleT8S4: parsedData.areaOfSampleT8S4 || null,
                    areaOfSampleT8S5: parsedData.areaOfSampleT8S5 || null,
                    areaOfSampleT8S6: parsedData.areaOfSampleT8S6 || null,
                    areaOfSampleT9S1: parsedData.areaOfSampleT9S1 || null,
                    areaOfSampleT9S2: parsedData.areaOfSampleT9S2 || null,
                    areaOfSampleT9S3: parsedData.areaOfSampleT9S3 || null,
                    areaOfSampleT9S4: parsedData.areaOfSampleT9S4 || null,
                    areaOfSampleT9S5: parsedData.areaOfSampleT9S5 || null,
                    areaOfSampleT9S6: parsedData.areaOfSampleT9S6 || null,
                    areaOfSampleT10S1: parsedData.areaOfSampleT10S1 || null,
                    areaOfSampleT10S2: parsedData.areaOfSampleT10S2 || null,
                    areaOfSampleT10S3: parsedData.areaOfSampleT10S3 || null,
                    areaOfSampleT10S4: parsedData.areaOfSampleT10S4 || null,
                    areaOfSampleT10S5: parsedData.areaOfSampleT10S5 || null,
                    areaOfSampleT10S6: parsedData.areaOfSampleT10S6 || null,
                    purity: parsedData.purity || "",
                    mWSalt: parsedData.mWSalt || "",
                    mWBase: parsedData.mWBase || "",
                    claim: parsedData.claim || "",
                    claimUnit: parsedData.claimUnit || "",
                    sampleResultsT1: parsedData.sampleResultsT1
                      ? typeof parsedData.sampleResultsT1 === "string"
                        ? JSON.parse(parsedData.sampleResultsT1)
                        : parsedData.sampleResultsT1
                      : null,
                    sampleResultsT2: parsedData.sampleResultsT2
                      ? typeof parsedData.sampleResultsT2 === "string"
                        ? JSON.parse(parsedData.sampleResultsT2)
                        : parsedData.sampleResultsT2
                      : null,
                    sampleResultsT3: parsedData.sampleResultsT3
                      ? typeof parsedData.sampleResultsT3 === "string"
                        ? JSON.parse(parsedData.sampleResultsT3)
                        : parsedData.sampleResultsT3
                      : null,
                    sampleResultsT4: parsedData.sampleResultsT4
                      ? typeof parsedData.sampleResultsT4 === "string"
                        ? JSON.parse(parsedData.sampleResultsT4)
                        : parsedData.sampleResultsT4
                      : null,
                    sampleResultsT5: parsedData.sampleResultsT5
                      ? typeof parsedData.sampleResultsT5 === "string"
                        ? JSON.parse(parsedData.sampleResultsT5)
                        : parsedData.sampleResultsT5
                      : null,
                    sampleResultsT6: parsedData.sampleResultsT6
                      ? typeof parsedData.sampleResultsT6 === "string"
                        ? JSON.parse(parsedData.sampleResultsT6)
                        : parsedData.sampleResultsT6
                      : null,
                    sampleResultsT7: parsedData.sampleResultsT7
                      ? typeof parsedData.sampleResultsT7 === "string"
                        ? JSON.parse(parsedData.sampleResultsT7)
                        : parsedData.sampleResultsT7
                      : null,
                    sampleResultsT8: parsedData.sampleResultsT8
                      ? typeof parsedData.sampleResultsT8 === "string"
                        ? JSON.parse(parsedData.sampleResultsT8)
                        : parsedData.sampleResultsT8
                      : null,
                    sampleResultsT9: parsedData.sampleResultsT9
                      ? typeof parsedData.sampleResultsT9 === "string"
                        ? JSON.parse(parsedData.sampleResultsT9)
                        : parsedData.sampleResultsT9
                      : null,
                    sampleResultsT10: parsedData.sampleResultsT10
                      ? typeof parsedData.sampleResultsT10 === "string"
                        ? JSON.parse(parsedData.sampleResultsT10)
                        : parsedData.sampleResultsT10
                      : null,
                    correctionFactorsT2: parsedData.correctionFactorsT2
                      ? typeof parsedData.correctionFactorsT2 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT2)
                        : parsedData.correctionFactorsT2
                      : null,
                    correctionFactorsT3: parsedData.correctionFactorsT3
                      ? typeof parsedData.correctionFactorsT3 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT3)
                        : parsedData.correctionFactorsT3
                      : null,
                    correctionFactorsT4: parsedData.correctionFactorsT4
                      ? typeof parsedData.correctionFactorsT4 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT4)
                        : parsedData.correctionFactorsT4
                      : null,
                    correctionFactorsT5: parsedData.correctionFactorsT5
                      ? typeof parsedData.correctionFactorsT5 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT5)
                        : parsedData.correctionFactorsT5
                      : null,
                    correctionFactorsT6: parsedData.correctionFactorsT6
                      ? typeof parsedData.correctionFactorsT6 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT6)
                        : parsedData.correctionFactorsT6
                      : null,
                    correctionFactorsT7: parsedData.correctionFactorsT7
                      ? typeof parsedData.correctionFactorsT7 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT7)
                        : parsedData.correctionFactorsT7
                      : null,
                    correctionFactorsT8: parsedData.correctionFactorsT8
                      ? typeof parsedData.correctionFactorsT8 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT8)
                        : parsedData.correctionFactorsT8
                      : null,
                    correctionFactorsT9: parsedData.correctionFactorsT9
                      ? typeof parsedData.correctionFactorsT9 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT9)
                        : parsedData.correctionFactorsT9
                      : null,
                    correctionFactorsT10: parsedData.correctionFactorsT10
                      ? typeof parsedData.correctionFactorsT10 === "string"
                        ? JSON.parse(parsedData.correctionFactorsT10)
                        : parsedData.correctionFactorsT10
                      : null,
                    // ── Results after correction per time point ──────────────
                    resultsAfterCorrectionT2: parsedData.resultsAfterCorrectionT2
                      ? typeof parsedData.resultsAfterCorrectionT2 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT2)
                        : parsedData.resultsAfterCorrectionT2
                      : null,
                    resultsAfterCorrectionT3: parsedData.resultsAfterCorrectionT3
                      ? typeof parsedData.resultsAfterCorrectionT3 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT3)
                        : parsedData.resultsAfterCorrectionT3
                      : null,
                    resultsAfterCorrectionT4: parsedData.resultsAfterCorrectionT4
                      ? typeof parsedData.resultsAfterCorrectionT4 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT4)
                        : parsedData.resultsAfterCorrectionT4
                      : null,
                    resultsAfterCorrectionT5: parsedData.resultsAfterCorrectionT5
                      ? typeof parsedData.resultsAfterCorrectionT5 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT5)
                        : parsedData.resultsAfterCorrectionT5
                      : null,
                    resultsAfterCorrectionT6: parsedData.resultsAfterCorrectionT6
                      ? typeof parsedData.resultsAfterCorrectionT6 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT6)
                        : parsedData.resultsAfterCorrectionT6
                      : null,
                    resultsAfterCorrectionT7: parsedData.resultsAfterCorrectionT7
                      ? typeof parsedData.resultsAfterCorrectionT7 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT7)
                        : parsedData.resultsAfterCorrectionT7
                      : null,
                    resultsAfterCorrectionT8: parsedData.resultsAfterCorrectionT8
                      ? typeof parsedData.resultsAfterCorrectionT8 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT8)
                        : parsedData.resultsAfterCorrectionT8
                      : null,
                    resultsAfterCorrectionT9: parsedData.resultsAfterCorrectionT9
                      ? typeof parsedData.resultsAfterCorrectionT9 === "string"
                        ? JSON.parse(parsedData.resultsAfterCorrectionT9)
                        : parsedData.resultsAfterCorrectionT9
                      : null,
                    resultsAfterCorrectionT10:
                      parsedData.resultsAfterCorrectionT10
                        ? typeof parsedData.resultsAfterCorrectionT10 === "string"
                          ? JSON.parse(parsedData.resultsAfterCorrectionT10)
                          : parsedData.resultsAfterCorrectionT10
                        : null,
                    // ── Stats per time point ─────────────────────────────────
                    minT1: parsedData.minT1 ?? null,
                    avgT1: parsedData.avgT1 ?? null,
                    maxT1: parsedData.maxT1 ?? null,
                    minT2: parsedData.minT2 ?? null,
                    avgT2: parsedData.avgT2 ?? null,
                    maxT2: parsedData.maxT2 ?? null,
                    minT3: parsedData.minT3 ?? null,
                    avgT3: parsedData.avgT3 ?? null,
                    maxT3: parsedData.maxT3 ?? null,
                    minT4: parsedData.minT4 ?? null,
                    avgT4: parsedData.avgT4 ?? null,
                    maxT4: parsedData.maxT4 ?? null,
                    minT5: parsedData.minT5 ?? null,
                    avgT5: parsedData.avgT5 ?? null,
                    maxT5: parsedData.maxT5 ?? null,
                    minT6: parsedData.minT6 ?? null,
                    avgT6: parsedData.avgT6 ?? null,
                    maxT6: parsedData.maxT6 ?? null,
                    minT7: parsedData.minT7 ?? null,
                    avgT7: parsedData.avgT7 ?? null,
                    maxT7: parsedData.maxT7 ?? null,
                    minT8: parsedData.minT8 ?? null,
                    avgT8: parsedData.avgT8 ?? null,
                    maxT8: parsedData.maxT8 ?? null,
                    minT9: parsedData.minT9 ?? null,
                    avgT9: parsedData.avgT9 ?? null,
                    maxT9: parsedData.maxT9 ?? null,
                    minT10: parsedData.minT10 ?? null,
                    avgT10: parsedData.avgT10 ?? null,
                    maxT10: parsedData.maxT10 ?? null,
                    sw1: parsedData.sw1 || null,
                    v1: parsedData.v1 || null,
                    v2: parsedData.v2 || null,
                    v3: parsedData.v3 || null,
                    v4: parsedData.v4 || null,
                    v5: parsedData.v5 || null,
                    v6: parsedData.v6 || null,
                    v7: parsedData.v7 || null,
                    v8: parsedData.v8 || null,
                    v9: parsedData.v9 || null,
                    v10: parsedData.v10 || null,
                    v11: parsedData.v11 || null,
                    v12: parsedData.v12 || null,
                    v13: parsedData.v13 || null,
                    v14: parsedData.v14 || null,
                    v8TimePoint1: parsedData.v8TimePoint1 || null,
                    v8TimePoint2: parsedData.v8TimePoint2 || null,
                    v8TimePoint3: parsedData.v8TimePoint3 || null,
                    v8TimePoint4: parsedData.v8TimePoint4 || null,
                    v8TimePoint5: parsedData.v8TimePoint5 || null,
                    v8TimePoint6: parsedData.v8TimePoint6 || null,
                    v8TimePoint7: parsedData.v8TimePoint7 || null,
                    v8TimePoint8: parsedData.v8TimePoint8 || null,
                    v8TimePoint9: parsedData.v8TimePoint9 || null,
                    v8TimePoint10: parsedData.v8TimePoint10 || null,
                    acceptanceLimitMin1: parsedData.acceptanceLimitMin1 || null,
                    acceptanceLimitMax1: parsedData.acceptanceLimitMax1 || null,
                    acceptanceLimitMin2: parsedData.acceptanceLimitMin2 || null,
                    acceptanceLimitMax2: parsedData.acceptanceLimitMax2 || null,
                    acceptanceLimitMin3: parsedData.acceptanceLimitMin3 || null,
                    acceptanceLimitMax3: parsedData.acceptanceLimitMax3 || null,
                    acceptanceLimitMin4: parsedData.acceptanceLimitMin4 || null,
                    acceptanceLimitMax4: parsedData.acceptanceLimitMax4 || null,
                    acceptanceLimitMin5: parsedData.acceptanceLimitMin5 || null,
                    acceptanceLimitMax5: parsedData.acceptanceLimitMax5 || null,
                    acceptanceLimitMin6: parsedData.acceptanceLimitMin6 || null,
                    acceptanceLimitMax6: parsedData.acceptanceLimitMax6 || null,
                    acceptanceLimitMin7: parsedData.acceptanceLimitMin7 || null,
                    acceptanceLimitMax7: parsedData.acceptanceLimitMax7 || null,
                    acceptanceLimitMin8: parsedData.acceptanceLimitMin8 || null,
                    acceptanceLimitMax8: parsedData.acceptanceLimitMax8 || null,
                    acceptanceLimitMin9: parsedData.acceptanceLimitMin9 || null,
                    acceptanceLimitMax9: parsedData.acceptanceLimitMax9 || null,
                    acceptanceLimitMin10: parsedData.acceptanceLimitMin10 || null,
                    acceptanceLimitMax10: parsedData.acceptanceLimitMax10 || null,
                  };
                  restoredCalculations.dissolutionProfile.push(dissoProfileCalc);
                  break;

                case "assay_ferrous_fumarate": {
                  const ffCalc: CalculationAssayFerrousFumarate = {
                    id: baseId + 8700,
                    label: parsedData.label || calc.label,
                    selectedSamplePreparationLabel:
                      parsedData.selectedSamplePreparationLabel || null,
                    calculationFor: parsedData.calculationFor || "",
                    buretteReading: parsedData.buretteReading || "",
                    theoreticalMolarity: parsedData.theoreticalMolarity || "",
                    actualMolarity: parsedData.actualMolarity || "",
                    factor: parsedData.factor || "",
                    avgWeight: parsedData.avgWeight || "",
                    labelClaim: parsedData.labelClaim || "",
                    lodWaterType: parsedData.lodWaterType || "",
                    lodWaterValue: parsedData.lodWaterValue || "",
                    calculationResult: parsedData.calculationResult || null,
                    calculationResultUnit:
                      parsedData.calculationResultUnit || null,
                    labelClaimPercent: parsedData.labelClaimPercent || null,
                    lodWaterBasisResult: parsedData.lodWaterBasisResult || null,
                    factorUnit: parsedData.factorUnit || "",
                    avgWeightUnit: parsedData.avgWeightUnit || "",
                    labelClaimUnit: parsedData.labelClaimUnit || "",
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                    sampleWeight: parsedData.sampleWeight || null,
                    sampleWeightUnit: parsedData.sampleWeightUnit || "",
                  };
                  restoredCalculations.ferrousFumarate.push(ffCalc);
                  break;
                }

                case "dissolution_ferrous_fumarate": {
                  const dffCalc: CalculationDissoFerrousFumarate = {
                    id: baseId + 8800,
                    label: parsedData.label || calc.label,
                    selectedSamplePreparationLabel:
                      parsedData.selectedSamplePreparationLabel || null,
                    buretteReading1: parsedData.buretteReading1 || "",
                    buretteReading2: parsedData.buretteReading2 || "",
                    buretteReading3: parsedData.buretteReading3 || "",
                    buretteReading4: parsedData.buretteReading4 || "",
                    buretteReading5: parsedData.buretteReading5 || "",
                    buretteReading6: parsedData.buretteReading6 || "",
                    theoreticalMolarity: parsedData.theoreticalMolarity || "",
                    actualMolarity: parsedData.actualMolarity || "",
                    factor: parsedData.factor || "",
                    factorUnit: parsedData.factorUnit || null,
                    dissoMediaVolume: parsedData.dissoMediaVolume || "",
                    labelClaim: parsedData.labelClaim || "",
                    calculationResultTablet1:
                      parsedData.calculationResultTablet1 || null,
                    calculationResultTablet2:
                      parsedData.calculationResultTablet2 || null,
                    calculationResultTablet3:
                      parsedData.calculationResultTablet3 || null,
                    calculationResultTablet4:
                      parsedData.calculationResultTablet4 || null,
                    calculationResultTablet5:
                      parsedData.calculationResultTablet5 || null,
                    calculationResultTablet6:
                      parsedData.calculationResultTablet6 || null,
                    calculationResult: parsedData.calculationResult || null,
                    calculationResultUnit:
                      parsedData.calculationResultUnit || null,
                    sampleTaken: parsedData.sampleTaken || null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || null,
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || null,
                    dissoMediaVolumeUnit: parsedData.dissoMediaVolumeUnit || null,
                    labelClaimUnit: parsedData.labelClaimUnit || null,
                    sampleTakenUnit: parsedData.sampleTakenUnit || null,
                  };
                  restoredCalculations.dissoFerrousFumarate.push(dffCalc);
                  break;
                }

                case "assay_hypromellose": {
                  const hypCalc: CalculationAssayHypromellose = {
                    id: baseId + 8900,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    methylIodideBatchNo: parsedData.methylIodideBatchNo || "",
                    isopropylIodideBatchNo:
                      parsedData.isopropylIodideBatchNo || "",
                    methylIodidePurity: parsedData.methylIodidePurity || "",
                    isopropylIodidePurity:
                      parsedData.isopropylIodidePurity || "",
                    methylIodideStdWt: parsedData.methylIodideStdWt || "",
                    isopropylIodideStdWt:
                      parsedData.isopropylIodideStdWt || "",
                    sampleWeight: parsedData.sampleWeight || "",
                    lodPercent: parsedData.lodPercent || "",
                    areaOfMI1: parsedData.areaOfMI1 || "",
                    areaOfMI2: parsedData.areaOfMI2 || "",
                    areaOfMI3: parsedData.areaOfMI3 || "",
                    areaOfMI4: parsedData.areaOfMI4 || "",
                    areaOfMI5: parsedData.areaOfMI5 || "",
                    areaOfMI6: parsedData.areaOfMI6 || "",
                    areaOfIPI1: parsedData.areaOfIPI1 || "",
                    areaOfIPI2: parsedData.areaOfIPI2 || "",
                    areaOfIPI3: parsedData.areaOfIPI3 || "",
                    areaOfIPI4: parsedData.areaOfIPI4 || "",
                    areaOfIPI5: parsedData.areaOfIPI5 || "",
                    areaOfIPI6: parsedData.areaOfIPI6 || "",
                    internalStandardArea1:
                      parsedData.internalStandardArea1 || "",
                    internalStandardArea2:
                      parsedData.internalStandardArea2 || "",
                    internalStandardArea3:
                      parsedData.internalStandardArea3 || "",
                    internalStandardArea4:
                      parsedData.internalStandardArea4 || "",
                    internalStandardArea5:
                      parsedData.internalStandardArea5 || "",
                    internalStandardArea6:
                      parsedData.internalStandardArea6 || "",
                    areaRatioMIMean: parsedData.areaRatioMIMean ?? null,
                    areaRatioMISD: parsedData.areaRatioMISD ?? null,
                    areaRatioMIRSD: parsedData.areaRatioMIRSD ?? null,
                    areaRatioIPIMean: parsedData.areaRatioIPIMean ?? null,
                    areaRatioIPISD: parsedData.areaRatioIPISD ?? null,
                    areaRatioIPIRSD: parsedData.areaRatioIPIRSD ?? null,
                    sampleAreaOfMI1: parsedData.sampleAreaOfMI1 || "",
                    sampleAreaOfMI2: parsedData.sampleAreaOfMI2 || "",
                    sampleAreaOfMI3: parsedData.sampleAreaOfMI3 || "",
                    sampleAreaOfMI4: parsedData.sampleAreaOfMI4 || "",
                    sampleAreaOfMI5: parsedData.sampleAreaOfMI5 || "",
                    sampleAreaOfMI6: parsedData.sampleAreaOfMI6 || "",
                    sampleAreaOfIPI1: parsedData.sampleAreaOfIPI1 || "",
                    sampleAreaOfIPI2: parsedData.sampleAreaOfIPI2 || "",
                    sampleAreaOfIPI3: parsedData.sampleAreaOfIPI3 || "",
                    sampleAreaOfIPI4: parsedData.sampleAreaOfIPI4 || "",
                    sampleAreaOfIPI5: parsedData.sampleAreaOfIPI5 || "",
                    sampleAreaOfIPI6: parsedData.sampleAreaOfIPI6 || "",
                    sampleInternalStandardArea1:
                      parsedData.sampleInternalStandardArea1 || "",
                    sampleInternalStandardArea2:
                      parsedData.sampleInternalStandardArea2 || "",
                    sampleInternalStandardArea3:
                      parsedData.sampleInternalStandardArea3 || "",
                    sampleInternalStandardArea4:
                      parsedData.sampleInternalStandardArea4 || "",
                    sampleInternalStandardArea5:
                      parsedData.sampleInternalStandardArea5 || "",
                    sampleInternalStandardArea6:
                      parsedData.sampleInternalStandardArea6 || "",
                    areaRatioSampleMIMean:
                      parsedData.areaRatioSampleMIMean ?? null,
                    areaRatioSampleMISD:
                      parsedData.areaRatioSampleMISD ?? null,
                    areaRatioSampleMIRSD:
                      parsedData.areaRatioSampleMIRSD ?? null,
                    areaRatioSampleIPIMean:
                      parsedData.areaRatioSampleIPIMean ?? null,
                    areaRatioSampleIPISD:
                      parsedData.areaRatioSampleIPISD ?? null,
                    areaRatioSampleIPIRSD:
                      parsedData.areaRatioSampleIPIRSD ?? null,
                    stdAreaOfMI: parsedData.stdAreaOfMI || "",
                    stdAreaOfIPI: parsedData.stdAreaOfIPI || "",
                    stdInternalStandardArea:
                      parsedData.stdInternalStandardArea || "",
                    areaRatioQSa: parsedData.areaRatioQSa ?? null,
                    areaRatioQSb: parsedData.areaRatioQSb ?? null,
                    sampleAreaOfMI: parsedData.sampleAreaOfMI || "",
                    sampleAreaOfIPI: parsedData.sampleAreaOfIPI || "",
                    sampleInternalStandardArea:
                      parsedData.sampleInternalStandardArea || "",
                    areaRatioQTa: parsedData.areaRatioQTa ?? null,
                    areaRatioQTb: parsedData.areaRatioQTb ?? null,
                    methoxyResultAsIs: parsedData.methoxyResultAsIs ?? null,
                    methoxyResultDried: parsedData.methoxyResultDried ?? null,
                    methoxyResultUnit: parsedData.methoxyResultUnit ?? null,
                    methoxyLimitMin: parsedData.methoxyLimitMin || "",
                    methoxyLimitMax: parsedData.methoxyLimitMax || "",
                    hydroxypropoxyResultAsIs:
                      parsedData.hydroxypropoxyResultAsIs ?? null,
                    hydroxypropoxyResultDried:
                      parsedData.hydroxypropoxyResultDried ?? null,
                    hydroxypropoxyResultUnit:
                      parsedData.hydroxypropoxyResultUnit ?? null,
                    hydroxypropoxyLimitMin:
                      parsedData.hydroxypropoxyLimitMin || "",
                    hydroxypropoxyLimitMax:
                      parsedData.hydroxypropoxyLimitMax || "",
                  };
                  restoredCalculations.hypromellose.push(hypCalc);
                  break;
                }
                case "assay_titration": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9900,
                    label: parsedData.label || calc.label,
                    templateId: parsedData.templateId || "assay_titration",
                  });
                  break;
                }

                case "betadex_batch_analysis": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9910,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId || "betadex_batch_analysis",
                  });
                  break;
                }

                case "standardized_titration_assay": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9920,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId || "standardized_titration_assay",
                  });
                  break;
                }

                case "dibasic_sodium_phosphate_assay": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9930,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId || "dibasic_sodium_phosphate_assay",
                  });
                  break;
                }

                case "free_carboxyl_groups": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9940,
                    label: parsedData.label || calc.label,
                    templateId: parsedData.templateId || "free_carboxyl_groups",
                  });
                  break;
                }

                case "glycerol_behenate_free_glycerol": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9950,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId || "glycerol_behenate_free_glycerol",
                  });
                  break;
                }

                case "glycerol_behenate_assay": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9960,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId || "glycerol_behenate_assay",
                  });
                  break;
                }

                case "hydrogenated_castor_oil_composition": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9970,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "hydrogenated_castor_oil_composition",
                  });
                  break;
                }

                case "ketotifen_hydrogen_fumarate_assay": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9980,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "ketotifen_hydrogen_fumarate_assay",
                  });
                  break;
                }

                case "lecithin_single_linearity": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 9990,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "lecithin_single_linearity",
                  });
                  break;
                }

                case "lecithin_batch_analysis": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 10000,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "lecithin_batch_analysis",
                  });
                  break;
                }

                case "lipoids_assay": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 10010,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "lipoids_assay",
                  });
                  break;
                }

                case "lipoids_impurity": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 10020,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "lipoids_impurity",
                  });
                  break;
                }

                case "logarithmic_calculation_4_point": {
                  restoredCalculations.generic.push({
                    ...parsedData,
                    id: baseId + 10030,
                    label: parsedData.label || calc.label,
                    templateId:
                      parsedData.templateId ||
                      "logarithmic_calculation_4_point",
                  });
                  break;
                }

                case "assay_nitrosamine": {
                  const nitroCalc: CalculationAssayNitrosamine = {
                    id: baseId + 8950,
                    label: parsedData.label || calc.label,
                    selectedStandardPreparationLabel: stdLabel,
                    selectedSamplePreparationLabel: splLabel,
                    analyteName: parsedData.analyteName || "",
                    purity: parsedData.purity || "",
                    standardWeightTaken: parsedData.standardWeightTaken || "",
                    sampleWeight: parsedData.sampleWeight || "",
                    standardDilutionFactor: parsedData.standardDilutionFactor ?? null,
                    sampleDilutionFactor: parsedData.sampleDilutionFactor ?? null,
                    averageWeight: parsedData.averageWeight || "",
                    labelClaim: parsedData.labelClaim || "",
                    unitConversionFactor: parsedData.unitConversionFactor || "1000000",
                    roundingMode: parsedData.roundingMode || "trunc",
                    standardArea1: parsedData.standardArea1 || "",
                    standardArea2: parsedData.standardArea2 || "",
                    standardArea3: parsedData.standardArea3 || "",
                    standardArea4: parsedData.standardArea4 || "",
                    standardArea5: parsedData.standardArea5 || "",
                    standardArea6: parsedData.standardArea6 || "",
                    standardAverageArea: parsedData.standardAverageArea ?? null,
                    standardStdev: parsedData.standardStdev ?? null,
                    standardPercentRSD: parsedData.standardPercentRSD ?? null,
                    bracketingArea: parsedData.bracketingArea || "",
                    bracketingPercentRSD: parsedData.bracketingPercentRSD ?? null,
                    sampleInjections: Array.isArray(parsedData.sampleInjections)
                      ? parsedData.sampleInjections
                      : [{ id: Date.now(), area: "", weight: "", found: null }],
                    sampleAverageArea: parsedData.sampleAverageArea ?? null,
                    averageFound: parsedData.averageFound ?? null,
                    resultUnit: parsedData.resultUnit ?? null,
                    acceptanceLimitMin: parsedData.acceptanceLimitMin || "",
                    acceptanceLimitMax: parsedData.acceptanceLimitMax || "",
                  };
                  restoredCalculations.nitrosamine.push(nitroCalc);
                  break;
                }

                default:
                  console.warn(`Unrecognized calculationType: "${calcType}"`);
                  break;
              }
            } catch (e) {
              console.error(`Error parsing calculation ${i + 1}:`, e);
            }
          });

          // Set calculation state ONLY if arrays have items
          if (restoredCalculations.assay.length > 0) {
            setCalculationsAssayPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.assay,
            }));
          }

          if (restoredCalculations.lod.length > 0) {
            setCalculationsLodPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.lod,
            }));
          }

          if (restoredCalculations.roi.length > 0) {
            setCalculationsROIPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.roi,
            }));
          }

          if (restoredCalculations.sulphatedAsh.length > 0) {
            setCalculationsSulphatedAshPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.sulphatedAsh,
            }));
          }

          if (restoredCalculations.residualSolvent.length > 0) {
            setCalculationsRSPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.residualSolvent,
            }));
          }

          if (restoredCalculations.relatedSubstance.length > 0) {
            setCalculationsRelatedSubstancePerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.relatedSubstance,
            }));
          }

          if (restoredCalculations.dissolution.length > 0) {
            setCalculationsDissoPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.dissolution,
            }));
          }

          if (restoredCalculations.dissolutionProfile.length > 0) {
            setCalculationsDissoProfilePerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.dissolutionProfile,
            }));
          }

          if (restoredCalculations.uniformityOfContent.length > 0) {
            setCalculationsUCPerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.uniformityOfContent,
            }));
          }

          if (restoredCalculations.ferrousFumarate.length > 0) {
            setCalculationsAssayFerrousFumaratePerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.ferrousFumarate,
            }));
          }

          if (restoredCalculations.dissoFerrousFumarate.length > 0) {
            setCalculationsDissoFerrousFumaratePerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.dissoFerrousFumarate,
            }));
          }

          if (restoredCalculations.hypromellose.length > 0) {
            setCalculationsAssayHypromellosePerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.hypromellose,
            }));
          }
          if (restoredCalculations.nitrosamine.length > 0) {
            setCalculationsAssayNitrosaminePerParam((prev) => ({
              ...prev,
              [paramId]: restoredCalculations.nitrosamine,
            }));
          }

          if (restoredCalculations.generic.length > 0) {
            setCalculationsGenericPerParam((prev: any) => ({
              ...prev,
              [paramId]: restoredCalculations.generic,
            }));
          }
        }

        const activeGroups: string[] = [];

        if (param.preparations && Array.isArray(param.preparations)) {
          if (
            param.preparations.some(
              (p: any) =>
                (p.preparationCategory === "standard" ||
                  p.preparationCategory === "sample") &&
                p.preparationType === "assay",
            )
          ) {
            activeGroups.push("assay");
          }

          // Check for LOD preparations
          if (param.preparations.some((p: any) => p.preparationType === "lod")) {
            activeGroups.push("lod");
          }

          // Check for ROI preparations
          if (param.preparations.some((p: any) => p.preparationType === "roi")) {
            activeGroups.push("roi");
          }

          // Check for Sulphated Ash preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "sulphated_ash",
            )
          ) {
            activeGroups.push("sulphatedAsh");
          }

          // Check for Residual Solvent preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "residual_solvent",
            )
          ) {
            activeGroups.push("residualSolvent");
          }

          // Check for Related Substance preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "related_substance",
            )
          ) {
            activeGroups.push("relatedSubstance");
          }

          // Check for Dissolution preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "dissolution",
            )
          ) {
            activeGroups.push("dissolution");
          }

          // Check for Dissolution Profile preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "dissolution_profile",
            )
          ) {
            activeGroups.push("dissolutionProfile");
          }

          // Check for Mobile Phase preparations (based on preparationCategory)
          if (
            param.preparations.some(
              (p: any) => p.preparationCategory === "mobile_phase",
            )
          ) {
            activeGroups.push("mobilePhase");
          }

          // Check for Dissolution Media preparations (based on preparationCategory)
          if (
            param.preparations.some(
              (p: any) => p.preparationCategory === "dissolution_media",
            )
          ) {
            activeGroups.push("dissoMedia");
          }

          // Check for Sample Titration preparations or Ferrous Fumarate calculations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "assay_ferrous_fumarate",
            )
          ) {
            activeGroups.push("assayFerrousFumarate");
          } else if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) => c.calculationType === "assay_ferrous_fumarate",
            )
          ) {
            activeGroups.push("assayFerrousFumarate");
          }

          // Check for Dissolution Ferrous Fumarate
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "dissolution_ferrous_fumarate",
            ) ||
            (param.calculations &&
              Array.isArray(param.calculations) &&
              param.calculations.some(
                (c: any) => c.calculationType === "dissolution_ferrous_fumarate",
              ))
          ) {
            activeGroups.push("dissolutionFerrousFumarate");
          }

          // Check for Uniformity of Content preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "uniformity_of_content",
            )
          ) {
            activeGroups.push("uniformityOfContent");
          }

          // Check for Hypromellose preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "hypromellose",
            )
          ) {
            activeGroups.push("hypromellose");
          }

          // Check for Nitrosamine preparations
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "nitrosamine",
            )
          ) {
            activeGroups.push("nitrosamine");
          }

          // Generic Assay by Titration
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "assay_titration",
            ) ||
            (param.calculations &&
              Array.isArray(param.calculations) &&
              param.calculations.some(
                (c: any) => c.calculationType === "assay_titration",
              ))
          ) {
            activeGroups.push("assayTitration");
          }

          // Generic Betadex Batch Analysis
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "betadex_batch_analysis",
            ) ||
            (param.calculations &&
              Array.isArray(param.calculations) &&
              param.calculations.some(
                (c: any) => c.calculationType === "betadex_batch_analysis",
              ))
          ) {
            activeGroups.push("betadexBatchAnalysis");
          }

          // Generic Standardized Titration Assay
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "standardized_titration_assay",
            ) ||
            (param.calculations &&
              Array.isArray(param.calculations) &&
              param.calculations.some(
                (c: any) => c.calculationType === "standardized_titration_assay",
              ))
          ) {
            activeGroups.push("standardizedTitrationAssay");
          }

          // Generic Dibasic Sodium Phosphate Assay
          if (
            param.preparations.some(
              (p: any) => p.preparationType === "dibasic_sodium_phosphate_assay",
            ) ||
            (param.calculations &&
              Array.isArray(param.calculations) &&
              param.calculations.some(
                (c: any) => c.calculationType === "dibasic_sodium_phosphate_assay",
              ))
          ) {
            activeGroups.push("dibasicSodiumPhosphateAssay");
          }

          // Generic Free Carboxyl Groups Calculation
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) => c.calculationType === "free_carboxyl_groups",
            )
          ) {
            activeGroups.push("freeCarboxylGroups");
          }

          // Generic Glycerol Behenate - Free Glycerol
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "glycerol_behenate_free_glycerol",
            )
          ) {
            activeGroups.push("glycerolBehenateFreeGlycerol");
          }

          // Generic Glycerol Behenate - Assay
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) => c.calculationType === "glycerol_behenate_assay",
            )
          ) {
            activeGroups.push("glycerolBehenateAssay");
          }

          // Generic Hydrogenated Castor Oil - Composition
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "hydrogenated_castor_oil_composition",
            )
          ) {
            activeGroups.push("hydrogenatedCastorOilComposition");
          }

          // Generic Ketotifen Hydrogen Fumarate - Assay
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "ketotifen_hydrogen_fumarate_assay",
            )
          ) {
            activeGroups.push("ketotifenHydrogenFumarateAssay");
          }

          // Generic Lecithin - Single Linearity
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "lecithin_single_linearity",
            )
          ) {
            activeGroups.push("lecithinSingleLinearity");
          }

          // Generic Lecithin - Batch Analysis
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "lecithin_batch_analysis",
            )
          ) {
            activeGroups.push("lecithinBatchAnalysis");
          }

          // Generic Lipoids - Assay
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "lipoids_assay",
            )
          ) {
            activeGroups.push("lipoidsAssay");
          }

          // Generic Lipoids - Impurity
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "lipoids_impurity",
            )
          ) {
            activeGroups.push("lipoidsImpurity");
          }

          // Generic Logarithmic Calculation - 4 Point
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "logarithmic_calculation_4_point",
            )
          ) {
            activeGroups.push("logarithmicCalculation4Point");
          }

          // Generic NDMA Validation - Batch Analysis
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "ndma_validation_batch_analysis",
            )
          ) {
            activeGroups.push("ndmaValidationBatchAnalysis");
          }

          // Generic Povidone - Limit of Aldehyde
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "povidone_limit_of_aldehyde",
            )
          ) {
            activeGroups.push("povidoneLimitOfAldehyde");
          }

          // Generic Prilocaine - Assay
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "prilocaine_assay",
            )
          ) {
            activeGroups.push("prilocaineAssay");
          }

          // Generic Castor Oil - Fatty Acid Composition
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "castor_oil_fatty_acid",
            )
          ) {
            activeGroups.push("castorOilFattyAcid");
          }

          // Generic HEC - Ethoxy Content
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "hec_ethoxy_content",
            )
          ) {
            activeGroups.push("hecEthoxyContent");
          }

          // Generic HPC - Assay
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "hpc_assay",
            )
          ) {
            activeGroups.push("hpcAssay");
          }

          // Generic LHPC - Hydroxypropoxy Content
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "lhpc_hydroxypropoxy_content",
            )
          ) {
            activeGroups.push("lhpcHydroxypropoxyContent");
          }

          // Generic Magnesium Stearate - Fatty Acid Composition
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "magnesium_stearate_fatty_acid",
            )
          ) {
            activeGroups.push("magnesiumStearateFattyAcid");
          }

          // Generic Nefopam - Residual Solvent
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "nefopam_residual_solvent",
            )
          ) {
            activeGroups.push("nefopamResidualSolvent");
          }

          // Generic Polyoxyl 35 Castor Oil - EG / DEG / TEG
          if (
            param.calculations &&
            Array.isArray(param.calculations) &&
            param.calculations.some(
              (c: any) =>
                c.calculationType === "polyoxyl_35_castor_oil_glycols",
            )
          ) {
            activeGroups.push("polyoxyl35CastorOilGlycols");
          }
        }

        if (param.files && Array.isArray(param.files) && param.files.length > 0) {
          const slotMap: Record<string, AttachedFile[]> = {};

          for (const f of param.files) {
            // Treat null / undefined / empty-string all as "no value"
            const hasType = f.preparationType != null && f.preparationType !== "";
            const hasLabel = f.label != null && f.label !== "";

            // Param-level files have neither type nor label
            const slotKey =
              !hasType && !hasLabel
                ? "param_level"
                : `${hasType ? f.preparationType : ""}|${hasLabel ? f.label : ""}`;

            if (!slotMap[slotKey]) slotMap[slotKey] = [];
            slotMap[slotKey].push({
              id: f.id ?? 0,
              fileName: f.fileName,
              fileDataBase64: f.fileDataBase64 ?? null,
              preparationType: hasType ? f.preparationType : null,
              label: hasLabel ? f.label : null,
            });
          }

          restoredFilesPerParam[paramId] = slotMap;

          // Show param-level section if we have param-level files
          if (slotMap["param_level"]?.length) {
            restoredShowParamFiles[paramId] = true;
          }
        }

        if (activeGroups.length > 0) {
          setActivePreparationGroups((prev) => ({
            ...prev,
            [paramId]: activeGroups,
          }));
        }
      });

      // Set file state once cleanly — no stale merging with old paramIds
      setFilesPerParam(restoredFilesPerParam);
      setShowParamFiles(restoredShowParamFiles);

      setSelectedParamsForDetail(restoredParams.map((p) => p.id));
    };

  return {
    restoreWorksheetToState,
  };
}
