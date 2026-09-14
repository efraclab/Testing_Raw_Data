export function useDrugFullParameterPayloadBuilder(ctx: any) {
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
  } = ctx;

    const buildFullParamPayload = (
      paramId: number,
      overrides: {
        preparationCompletedBy?: string | null;
        preparationCompletedAt?: string | null;
      } = {},
    ) => {
      const param = addedParameters.find((p) => p.id === paramId);
      if (!param) return null;

      const preparations = [
        ...(standardPreparationTitrationPerParam[paramId] || []).map((sp: any) => ({
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
        ...(samplePreparationTitrationPerParam[paramId] || []).map((sp: any) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "assay_titration",
          assignedStandardId: null,
          sampleWeight: sp.sampleWeight || "",
          sampleWeightUnit: sp.sampleWeightUnit || "mg",
          steps: JSON.stringify(sp.steps || []),
        })),
        ...(standardPreparationBetadexPerParam[paramId] || []).map((sp: any) => ({
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
        ...(samplePreparationBetadexPerParam[paramId] || []).map((sp: any) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "betadex_batch_analysis",
          assignedStandardId: null,
          sampleWeight: sp.sampleWeight || "",
          sampleWeightUnit: sp.sampleWeightUnit || "mg",
          steps: JSON.stringify(sp.steps || []),
        })),
        ...(standardPreparationStandardizedTitrationAssayPerParam[paramId] || []).map((sp: any) => ({
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
        ...(samplePreparationStandardizedTitrationAssayPerParam[paramId] || []).map((sp: any) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "standardized_titration_assay",
          assignedStandardId: null,
          sampleWeight: sp.sampleWeight || "",
          sampleWeightUnit: sp.sampleWeightUnit || "mg",
          steps: JSON.stringify(sp.steps || []),
        })),
        ...(standardPreparationDibasicSodiumPhosphateAssayPerParam[paramId] || []).map((sp: any) => ({
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
        ...(samplePreparationDibasicSodiumPhosphateAssayPerParam[paramId] || []).map((sp: any) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "dibasic_sodium_phosphate_assay",
          assignedStandardId: null,
          sampleWeight: sp.sampleWeight || "",
          sampleWeightUnit: sp.sampleWeightUnit || "mg",
          steps: JSON.stringify(sp.steps || []),
        })),
        ...(standardPreparationUCPerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "standard",
          preparationType: "uniformity_of_content",
          assignedStandardId: (sp as any).assignedStandardId || "",
          steps: JSON.stringify(sp.steps),
        })),
        ...(samplePreparationUCPerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "uniformity_of_content",
          assignedStandardId: (sp as any).assignedStandardId || null,
          steps: JSON.stringify(sp.steps),
        })),
        ...(standardPreparationHypromellosePerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "standard",
          preparationType: "hypromellose",
          assignedStandardId: (sp as any).assignedStandardId || "",
          steps: JSON.stringify(sp.steps),
        })),
        ...(samplePreparationHypromellosePerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "hypromellose",
          assignedStandardId: null,
          steps: JSON.stringify(sp.steps),
        })),
        ...(standardPreparationNitrosaminePerParam[paramId] || []).map((sp) => ({
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
        ...(samplePreparationNitrosaminePerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "nitrosamine",
          assignedStandardId: null,
          sampleWeight: sp.sampleWeight || "",
          sampleWeightUnit: sp.sampleWeightUnit || "mg",
          steps: JSON.stringify(sp.steps),
        })),
        ...(standardPreparationAssayPerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "standard",
          preparationType: "assay",
          assignedStandardId: (sp as any).assignedStandardId || "",
          steps: JSON.stringify(sp.steps),
        })),
        ...(standardPreparationResidualSolventPerParam[paramId] || []).map(
          (sp) => ({
            label: sp.label,
            preparationCategory: "standard",
            preparationType: "residual_solvent",
            assignedStandardId: (sp as any).assignedStandardId || "",
            steps: JSON.stringify(sp.steps),
          }),
        ),
        ...(standardPreparationRelatedSubstancePerParam[paramId] || []).map(
          (sp) => ({
            label: sp.label,
            preparationCategory: "standard",
            preparationType: "related_substance",
            assignedStandardId: (sp as any).assignedStandardId || "",
            steps: JSON.stringify(sp.steps),
          }),
        ),
        ...(standardPreparationDissoPerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "standard",
          preparationType: "dissolution",
          assignedStandardId: (sp as any).assignedStandardId || "",
          steps: JSON.stringify(sp.steps),
        })),
        ...(samplePreparationPerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "assay",
          assignedStandardId: null,
          steps: JSON.stringify(sp.steps),
        })),
        ...(samplePreparationLodPerParam[paramId] || []).map((spl) => ({
          label: spl.label,
          preparationCategory: "sample",
          preparationType: "lod",
          assignedStandardId: null,
          steps: JSON.stringify(spl.steps),
        })),
        ...(samplePreparationROIPerParam[paramId] || []).map((spl) => ({
          label: spl.label,
          preparationCategory: "sample",
          preparationType: "roi",
          assignedStandardId: null,
          steps: JSON.stringify(spl.steps),
        })),
        ...(samplePreparationSulphatedAshPerParam[paramId] || []).map((sps) => ({
          label: sps.label,
          preparationCategory: "sample",
          preparationType: "sulphated_ash",
          assignedStandardId: null,
          steps: JSON.stringify(sps.steps),
        })),
        ...(samplePreparationRSPerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "sample",
          preparationType: "residual_solvent",
          assignedStandardId: null,
          steps: JSON.stringify(sp.steps),
        })),
        ...(samplePreparationRelatedSubstancePerParam[paramId] || []).map(
          (sp) => ({
            label: sp.label,
            preparationCategory: "sample",
            preparationType: "related_substance",
            assignedStandardId: null,
            steps: JSON.stringify(sp.steps),
          }),
        ),
        ...(samplePreparationDissoPerParam[paramId] || []).map((spd) => ({
          label: spd.label,
          preparationCategory: "sample",
          preparationType: "dissolution",
          assignedStandardId: null,
          steps: JSON.stringify(spd.steps),
        })),
        ...(dissoMediaPerParam[paramId] || []).map((dm) => ({
          label: dm.label,
          preparationCategory: "dissolution_media",
          preparationType: "dissolution",
          assignedStandardId: null,
          steps: JSON.stringify(dm.steps),
        })),
        ...(mobilePhasePerParam[paramId] || []).map((mp) => ({
          label: mp.label,
          preparationCategory: "mobile_phase",
          preparationType: null,
          assignedStandardId: null,
          steps: null,
          content: mp.content,
        })),
        ...(bufferPreparationPerParam[paramId] || []).map((bp) => ({
          label: bp.label,
          preparationCategory: "buffer",
          preparationType: null,
          assignedStandardId: null,
          steps: JSON.stringify(bp.steps),
          content: null,
        })),
        ...(diluentPreparationsPerParam[paramId] || []).map((dp) => ({
          label: dp.label,
          preparationCategory: "diluent",
          preparationType: null,
          assignedStandardId: null,
          steps: null,
          content: dp.content,
        })),
        ...(samplePrepAssayFerrousFumaratePerParam[paramId] || []).map((spt) => ({
          label: spt.label,
          preparationCategory: "sample",
          preparationType: "assay_ferrous_fumarate",
          assignedStandardId: null,
          steps: JSON.stringify(spt.steps),
        })),
        ...(samplePrepDissoFerrousFumaratePerParam[paramId] || []).map((spt) => ({
          label: spt.label,
          preparationCategory: "sample",
          preparationType: "dissolution_ferrous_fumarate",
          assignedStandardId: null,
          steps: JSON.stringify(spt.steps),
        })),
        ...(systemSuitabilityPerParam[paramId] || []).map((ss) => ({
          label: ss.label,
          preparationCategory: "system_suitability",
          preparationType: null,
          assignedStandardId: null,
          steps: JSON.stringify(ss.steps),
        })),
        ...(blankPreparationPerParam[paramId] || []).map((bp) => ({
          label: bp.label,
          preparationCategory: "blank",
          preparationType: null,
          assignedStandardId: null,
          steps: null,
          content: bp.content,
        })),
        ...(standardPreparationDissoProfilePerParam[paramId] || []).map((sp) => ({
          label: sp.label,
          preparationCategory: "standard",
          preparationType: "dissolution_profile",
          assignedStandardId: (sp as any).assignedStandardId || "",
          steps: JSON.stringify(sp.steps),
        })),
        ...(samplePreparationDissoProfilePerParam[paramId] || []).map((spd) => ({
          label: spd.label,
          preparationCategory: "sample",
          preparationType: "dissolution_profile",
          assignedStandardId: null,
          steps: JSON.stringify(spd.steps),
        })),
        ...(dissoMediaProfilePerParam[paramId] || []).map((dm) => ({
          label: dm.label,
          preparationCategory: "dissolution_media",
          preparationType: "dissolution_profile",
          assignedStandardId: null,
          steps: JSON.stringify(dm.steps),
        })),
      ];

      const calculations = [
        ...(calculationsUCPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "uniformity_of_content",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsAssayHypromellosePerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "assay_hypromellose",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsAssayNitrosaminePerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "assay_nitrosamine",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsAssayPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "assay",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsLodPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "lod",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsROIPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "roi",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsSulphatedAshPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "sulphated_ash",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsRSPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "residual_solvent",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsRelatedSubstancePerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "related_substance",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsDissoPerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "dissolution",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsDissoProfilePerParam[paramId] || []).map((calc) => {
          const d = { ...calc } as any;
          delete d.selectedStandardPrepId;
          delete d.selectedSamplePrepId;
          return {
            label: calc.label,
            calculationType: "dissolution_profile",
            data: JSON.stringify(d),
          };
        }),
        ...(calculationsAssayFerrousFumaratePerParam[paramId] || []).map(
          (calc) => ({
            label: calc.label,
            calculationType: "assay_ferrous_fumarate",
            data: JSON.stringify({ ...calc }),
          }),
        ),
        ...(calculationsDissoFerrousFumaratePerParam[paramId] || []).map(
          (calc) => ({
            label: calc.label,
            calculationType: "dissolution_ferrous_fumarate",
            data: JSON.stringify({ ...calc }),
          }),
        ),
        ...(calculationsGenericPerParam[paramId] || []).map((calc: any) => ({
          label: calc.label,
          calculationType: calc.templateId,
          data: JSON.stringify({ ...calc }),
        })),
      ];

      // Build explicit payload — never spread ...param to avoid stale field contamination
      return {
        id: param.id,
        paraCode: param.paraCode,
        parameterName: param.parameterName,
        methodCode: param.methodCode,
        methodName: param.methodName,
        columnId: columnsPerParam[paramId] || null,
        diluentPreparation: diluentPerParam[paramId] || null,
        otherInfo: otherInfoPerParam[paramId] || null,
        additional_info: additionalInfoPerParam[paramId] || null,
        analysisStartDate: analysisStartDatePerParam[paramId] || null,
        analysisCompletionDate: analysisCompletionDatePerParam[paramId] || null,
        revisionStartDate: revisionStartDatePerParam[paramId] || null,
        revisionCompletedDate: revisionCompletedDatePerParam[paramId] || null,
        analyzedBy: analyzedByPerParam[paramId] || null,
        approvedByReviewer: approvedByReviewerPerParam[paramId] || null,
        approvedAtReviewer: approvedAtReviewerPerParam[paramId] || null,
        approvedByQA: approvedByQAPerParam[paramId] || null,
        approvedAtQA: approvedAtQAPerParam[paramId] || null,
        remarksByQA: remarksQAPerParam[paramId] ?? null,
        remarksByReviewer: remarksByReviewerPerParam[paramId] ?? null,
        remarksByAnalyst: remarksByAnalystPerParam[paramId] ?? null,
        // These two are the whole point — always explicit, never from stale param spread
        preparationCompletedBy:
          "preparationCompletedBy" in overrides
            ? (overrides.preparationCompletedBy ?? null)
            : preparationCompletedByPerParam[paramId] || null,
        preparationCompletedAt:
          "preparationCompletedAt" in overrides
            ? (overrides.preparationCompletedAt ?? null)
            : preparationCompletedAtPerParam[paramId] || null,
        status: parameterStatusPerParam[paramId] || "Created",
        instruments: (addedInstruments[paramId] || []).map((inst) => ({
          instrumentId: inst.instrumentId,
          name: inst.name,
          instrumentTag: inst.instrumentTag,
          make: inst.make,
          calibrationDoneDate: inst.calibrationDoneDate,
          calibrationDueDate: inst.calibrationDueDate,
        })),
        chemicals: (addedChemicals[paramId] || []).map((chem) => ({
          slno: chem.slno,
          name: chem.name,
          code: chem.code,
          make: chem.make,
          batchNo: chem.batchNo,
          expDate: chem.expDate,
        })),
        standards: (addedStandards[paramId] || []).map((std) => ({
          serialNo: std.serialNo,
          name: std.name,
          batchNo: std.batchNo,
          make: std.make,
          purity: std.purity,
          validity: std.validity,
        })),
        internalStandards: (addedInternalStandards[paramId] || []).map((std) => ({
          serialNo: std.serialNo,
          name: std.name,
          batchNo: std.batchNo,
          make: std.make,
          purity: std.purity,
          validity: std.validity,
        })),
        preparations,
        calculations,
        files: collectFilesForParam(paramId),
      };
    };

  return {
    buildFullParamPayload,
  };
}
