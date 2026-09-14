import type { WorksheetRequest } from "../models/WorksheetRequest";

export function useDrugWorksheetFormCollector(ctx: any) {
  const {
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
  } = ctx;

    const collectFormDataForAPI = (): WorksheetRequest => {
      return {
        role: role,
        worksheetId: worksheetId,
        registrationInfo: {
          registrationNo: worksheetInfo?.sample.registrationNo || registrationNo,
          sampleName: worksheetInfo?.sample?.sampleName!,
          numberOfParameters: addedParameters.length!,
          dueDate: worksheetInfo?.sample?.dueDate!,
          lab: worksheetInfo?.sample.lab!,
        },
        documentInfo: {
          preparedBy: employeeId,
          status: worksheetInfo?.sample.status,
          approvedAt: worksheetInfo?.sample?.approvedAt || null,
        },
        parameters: addedParameters.map((param) => {
          const preparations = [
            // Generic template preparation: ASSAY BY TITRATION
            ...(standardPreparationTitrationPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "assay_titration",
              assignedStandardId: sp.assignedStandardId || "",
              batchNo: sp.batchNo || "",
              purity: sp.purity || "",
              weightTaken: sp.weightTaken || "",
              weightTakenUnit: sp.weightTakenUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),
            ...(samplePreparationTitrationPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "assay_titration",
              assignedStandardId: null,
              sampleWeight: sp.sampleWeight || "",
              sampleWeightUnit: sp.sampleWeightUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),

            // Generic template preparation: BETADEX BATCH ANALYSIS
            ...(standardPreparationBetadexPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "betadex_batch_analysis",
              assignedStandardId: sp.assignedStandardId || "",
              batchNo: sp.batchNo || "",
              purity: sp.purity || "",
              weightTaken: sp.weightTaken || "",
              weightTakenUnit: sp.weightTakenUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),
            ...(samplePreparationBetadexPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "betadex_batch_analysis",
              assignedStandardId: null,
              sampleWeight: sp.sampleWeight || "",
              sampleWeightUnit: sp.sampleWeightUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),

            // Generic template preparation: STANDARDIZED TITRATION ASSAY
            ...(standardPreparationStandardizedTitrationAssayPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "standardized_titration_assay",
              assignedStandardId: sp.assignedStandardId || "",
              batchNo: sp.batchNo || "",
              purity: sp.purity || "",
              weightTaken: sp.weightTaken || "",
              weightTakenUnit: sp.weightTakenUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),
            ...(samplePreparationStandardizedTitrationAssayPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "standardized_titration_assay",
              assignedStandardId: null,
              sampleWeight: sp.sampleWeight || "",
              sampleWeightUnit: sp.sampleWeightUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),

            // Generic template preparation: DIBASIC SODIUM PHOSPHATE ASSAY
            ...(standardPreparationDibasicSodiumPhosphateAssayPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "dibasic_sodium_phosphate_assay",
              assignedStandardId: sp.assignedStandardId || "",
              batchNo: sp.batchNo || "",
              purity: sp.purity || "",
              weightTaken: sp.weightTaken || "",
              weightTakenUnit: sp.weightTakenUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),
            ...(samplePreparationDibasicSodiumPhosphateAssayPerParam[param.id] || []).map((sp: any) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "dibasic_sodium_phosphate_assay",
              assignedStandardId: null,
              sampleWeight: sp.sampleWeight || "",
              sampleWeightUnit: sp.sampleWeightUnit || "mg",
              steps: JSON.stringify(sp.steps || []),
            })),

            // Standard Preparations for UNIFORMITY OF CONTENT
            ...(standardPreparationUCPerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "uniformity_of_content",
              assignedStandardId: (sp as any).assignedStandardId || "",
              steps: JSON.stringify(sp.steps),
            })),

            // Sample Preparations for UNIFORMITY OF CONTENT
            ...(samplePreparationUCPerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "uniformity_of_content",
              assignedStandardId: (sp as any).assignedStandardId || null,
              steps: JSON.stringify(sp.steps),
            })),
            // Standard Preparations for HYPROMELLOSE
            ...(standardPreparationHypromellosePerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "hypromellose",
              assignedStandardId: (sp as any).assignedStandardId || "",
              steps: JSON.stringify(sp.steps),
            })),
            // Sample Preparations for HYPROMELLOSE
            ...(samplePreparationHypromellosePerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "hypromellose",
              assignedStandardId: null,
              steps: JSON.stringify(sp.steps),
            })),
            // Standard Preparations for NITROSAMINE
            ...(standardPreparationNitrosaminePerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "nitrosamine",
              assignedStandardId: (sp as any).assignedStandardId || "",
              batchNo: sp.batchNo || "",
              purity: sp.purity || "",
              weightTaken: sp.weightTaken || "",
              weightTakenUnit: sp.weightTakenUnit || "mg",
              steps: JSON.stringify(sp.steps),
            })),
            // Sample Preparations for NITROSAMINE
            ...(samplePreparationNitrosaminePerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "nitrosamine",
              assignedStandardId: null,
              sampleWeight: sp.sampleWeight || "",
              sampleWeightUnit: sp.sampleWeightUnit || "mg",
              steps: JSON.stringify(sp.steps),
            })),
            // Standard Preparations for ASSAY
            ...(standardPreparationAssayPerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "assay",
              assignedStandardId: (sp as any).assignedStandardId || "",
              steps: JSON.stringify(sp.steps),
            })),
            // Standard Preparations for RESIDUAL SOLVENT
            ...(standardPreparationResidualSolventPerParam[param.id] || []).map(
              (sp) => ({
                label: sp.label,
                preparationCategory: "standard",
                preparationType: "residual_solvent",
                assignedStandardId: (sp as any).assignedStandardId || "",
                steps: JSON.stringify(sp.steps),
              }),
            ),
            // Standard Preparations for RELATED SUBSTANCE
            ...(standardPreparationRelatedSubstancePerParam[param.id] || []).map(
              (sp) => ({
                label: sp.label,
                preparationCategory: "standard",
                preparationType: "related_substance",
                assignedStandardId: (sp as any).assignedStandardId || "",
                steps: JSON.stringify(sp.steps),
              }),
            ),
            // Standard Preparations for DISSOLUTION
            ...(standardPreparationDissoPerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "standard",
              preparationType: "dissolution",
              assignedStandardId: (sp as any).assignedStandardId || "",
              steps: JSON.stringify(sp.steps),
            })),
            // Sample Preparations for ASSAY
            ...(samplePreparationPerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "assay",
              assignedStandardId: null,
              steps: JSON.stringify(sp.steps),
            })),
            // Sample Preparations for LOD
            ...(samplePreparationLodPerParam[param.id] || []).map((spl) => ({
              label: spl.label,
              preparationCategory: "sample",
              preparationType: "lod",
              assignedStandardId: null,
              steps: JSON.stringify(spl.steps),
            })),
            // Sample Preparations for ROI
            ...(samplePreparationROIPerParam[param.id] || []).map((spl) => ({
              label: spl.label,
              preparationCategory: "sample",
              preparationType: "roi",
              assignedStandardId: null,
              steps: JSON.stringify(spl.steps),
            })),
            // Sample Preparations for SULPHATED ASH
            ...(samplePreparationSulphatedAshPerParam[param.id] || []).map(
              (sps) => ({
                label: sps.label,
                preparationCategory: "sample",
                preparationType: "sulphated_ash",
                assignedStandardId: null,
                steps: JSON.stringify(sps.steps),
              }),
            ),
            // Sample Preparations for RESIDUAL SOLVENT
            ...(samplePreparationRSPerParam[param.id] || []).map((sp) => ({
              label: sp.label,
              preparationCategory: "sample",
              preparationType: "residual_solvent",
              assignedStandardId: null,
              steps: JSON.stringify(sp.steps),
            })),
            // Sample Preparations for RELATED SUBSTANCE
            ...(samplePreparationRelatedSubstancePerParam[param.id] || []).map(
              (sp) => ({
                label: sp.label,
                preparationCategory: "sample",
                preparationType: "related_substance",
                assignedStandardId: null,
                steps: JSON.stringify(sp.steps),
              }),
            ),
            // Sample Preparations for DISSOLUTION
            ...(samplePreparationDissoPerParam[param.id] || []).map((spd) => ({
              label: spd.label,
              preparationCategory: "sample",
              preparationType: "dissolution",
              assignedStandardId: null,
              steps: JSON.stringify(spd.steps),
            })),
            // Dissolution Media Preparation Preparations
            ...(dissoMediaPerParam[param.id] || []).map((dm) => ({
              label: dm.label,
              preparationCategory: "dissolution_media",
              preparationType: "dissolution",
              assignedStandardId: null,
              steps: JSON.stringify(dm.steps),
            })),
            // Mobile Phase Preparations
            ...(mobilePhasePerParam[param.id] || []).map((mp) => ({
              label: mp.label,
              preparationCategory: "mobile_phase",
              preparationType: null,
              assignedStandardId: null,
              steps: null,
              content: mp.content,
            })),
            // Buffer Preparations
            ...(bufferPreparationPerParam[param.id] || []).map((bp) => ({
              label: bp.label,
              preparationCategory: "buffer",
              preparationType: null,
              assignedStandardId: null,
              steps: JSON.stringify(bp.steps),
              content: null,
            })),
            // Diluent Preparations (blank-sheet style)
            ...(diluentPreparationsPerParam[param.id] || []).map((dp) => ({
              label: dp.label,
              preparationCategory: "diluent",
              preparationType: null,
              assignedStandardId: null,
              steps: null,
              content: dp.content,
            })),
            // Sample Preparation for Assay (Ferrous Fumarate)
            ...(samplePrepAssayFerrousFumaratePerParam[param.id] || []).map(
              (spt) => ({
                label: spt.label,
                preparationCategory: "sample",
                preparationType: "assay_ferrous_fumarate",
                assignedStandardId: null,
                steps: JSON.stringify(spt.steps),
              }),
            ),
            // Sample Preparation for Dissolution (Ferrous Fumarate)
            ...(samplePrepDissoFerrousFumaratePerParam[param.id] || []).map(
              (spt) => ({
                label: spt.label,
                preparationCategory: "sample",
                preparationType: "dissolution_ferrous_fumarate",
                assignedStandardId: null,
                steps: JSON.stringify(spt.steps),
              }),
            ),
            ...(systemSuitabilityPerParam[param.id] || []).map((ss) => ({
              label: ss.label,
              preparationCategory: "system_suitability",
              preparationType: null,
              assignedStandardId: null,
              steps: JSON.stringify(ss.steps),
            })),
            // Blank Preparations
            ...(blankPreparationPerParam[param.id] || []).map((bp) => ({
              label: bp.label,
              preparationCategory: "blank",
              preparationType: null,
              assignedStandardId: null,
              steps: null,
              content: bp.content,
            })),
            // Standard Preparations for DISSOLUTION PROFILE
            ...(standardPreparationDissoProfilePerParam[param.id] || []).map(
              (sp) => ({
                label: sp.label,
                preparationCategory: "standard",
                preparationType: "dissolution_profile",
                assignedStandardId: (sp as any).assignedStandardId || "",
                steps: JSON.stringify(sp.steps),
              }),
            ),
            // Sample Preparations for DISSOLUTION PROFILE
            ...(samplePreparationDissoProfilePerParam[param.id] || []).map(
              (spd) => ({
                label: spd.label,
                preparationCategory: "sample",
                preparationType: "dissolution_profile",
                assignedStandardId: null,
                steps: JSON.stringify(spd.steps),
              }),
            ),
            // Dissolution Media for DISSOLUTION PROFILE
            ...(dissoMediaProfilePerParam[param.id] || []).map((dm) => ({
              label: dm.label,
              preparationCategory: "dissolution_media",
              preparationType: "dissolution_profile",
              assignedStandardId: null,
              steps: JSON.stringify(dm.steps),
            })),
          ];

          // Collect all calculations with their types
          const calculations = [
            ...(calculationsUCPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "uniformity_of_content",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsAssayHypromellosePerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "assay_hypromellose",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsAssayNitrosaminePerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "assay_nitrosamine",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsAssayPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "assay",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsLodPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "lod",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsROIPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "roi",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsSulphatedAshPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "sulphated_ash",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsRSPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "residual_solvent",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsRelatedSubstancePerParam[param.id] || []).map(
              (calc) => {
                const dataObj = { ...calc } as any;
                delete dataObj.selectedStandardPrepId;
                delete dataObj.selectedSamplePrepId;
                return {
                  label: calc.label,
                  calculationType: "related_substance",
                  data: JSON.stringify(dataObj),
                };
              },
            ),
            ...(calculationsDissoPerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "dissolution",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsDissoProfilePerParam[param.id] || []).map((calc) => {
              const dataObj = { ...calc } as any;
              delete dataObj.selectedStandardPrepId;
              delete dataObj.selectedSamplePrepId;
              return {
                label: calc.label,
                calculationType: "dissolution_profile",
                data: JSON.stringify(dataObj),
              };
            }),
            ...(calculationsAssayFerrousFumaratePerParam[param.id] || []).map(
              (calc) => ({
                label: calc.label,
                calculationType: "assay_ferrous_fumarate",
                data: JSON.stringify({ ...calc }),
              }),
            ),
            ...(calculationsDissoFerrousFumaratePerParam[param.id] || []).map(
              (calc) => ({
                label: calc.label,
                calculationType: "dissolution_ferrous_fumarate",
                data: JSON.stringify({ ...calc }),
              }),
            ),
            ...(calculationsGenericPerParam[param.id] || []).map((calc: any) => ({
              label: calc.label,
              calculationType: calc.templateId,
              data: JSON.stringify({ ...calc }),
            })),
          ];

          return {
            id: param.id,
            paraCode: param.paraCode,
            parameterName: param.parameterName,
            methodCode: param.methodCode,
            methodName: param.methodName,
            columnId: columnsPerParam[param.id] || null,
            diluentPreparation: diluentPerParam[param.id] || null,
            otherInfo: otherInfoPerParam[param.id] || null,
            additional_info: additionalInfoPerParam[param.id] || null,
            ...({
              // Send both common API naming styles. Unknown properties are ignored
              // by ASP.NET, while the matching DTO property is persisted.
              other_info: otherInfoPerParam[param.id] || null,
              additionalInfo: additionalInfoPerParam[param.id] || null,
              showInternalStandardPreparation:
                showInternalStandardPreparation[param.id] || false,
              showAdditionalInfo: showAdditionalInfo[param.id] || false,
            } as any),
            analysisStartDate: analysisStartDatePerParam[param.id] || null,
            analysisCompletionDate:
              analysisCompletionDatePerParam[param.id] || null,
            revisionStartDate: revisionStartDatePerParam[param.id] || null,
            revisionCompletedDate: revisionCompletedDatePerParam[param.id] || null,
            analyzedBy: analyzedByPerParam[param.id] || null,
            approvedByReviewer: approvedByReviewerPerParam[param.id] || null,
            approvedAtReviewer: approvedAtReviewerPerParam[param.id] || null,
            approvedByQA: approvedByQAPerParam[param.id] || null,
            approvedAtQA: approvedAtQAPerParam[param.id] || null,
            remarksByQA: remarksQAPerParam[param.id] ?? null,
            remarksByReviewer: remarksByReviewerPerParam[param.id] ?? null,
            remarksByAnalyst: remarksByAnalystPerParam[param.id] ?? null,
            preparationCompletedBy:
              preparationCompletedByPerParam[param.id] || null,
            preparationCompletedAt:
              preparationCompletedAtPerParam[param.id] || null,
            status: parameterStatusPerParam[param.id] || "Created",
            instruments: (addedInstruments[param.id] || []).map((inst) => ({
              instrumentId: inst.instrumentId,
              name: inst.name,
              instrumentTag: inst.instrumentTag,
              make: inst.make,
              calibrationDoneDate: inst.calibrationDoneDate,
              calibrationDueDate: inst.calibrationDueDate,
            })),
            chemicals: (addedChemicals[param.id] || []).map((chem) => ({
              slno: chem.slno,
              name: chem.name,
              code: chem.code,
              make: chem.make,
              batchNo: chem.batchNo,
              expDate: chem.expDate,
            })),
            standards: (addedStandards[param.id] || []).map((std) => ({
              serialNo: std.serialNo,
              name: std.name,
              batchNo: std.batchNo,
              make: std.make,
              purity: std.purity,
              validity: std.validity,
            })),
            internalStandards: (addedInternalStandards[param.id] || []).map((std) => ({
              serialNo: std.serialNo,
              name: std.name,
              batchNo: std.batchNo,
              make: std.make,
              purity: std.purity,
              validity: std.validity,
            })),
            preparations, // ← Unified preparations array
            calculations,
            files: collectFilesForParam(param.id),
          };
        }),
      };
    };

  return {
    collectFormDataForAPI,
  };
}
