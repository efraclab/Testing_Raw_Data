import { PREPARATION_GROUPS } from "../components/worksheets/drugs/drugWorksheetConfig";

export function useDrugPreparationGroupToggle(ctx: any) {
  const {
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
  } = ctx;

  const handleTogglePreparationGroup = (
    parameterId: number,
    groupId: string,
  ) => {
    setActivePreparationGroups((prev: Record<number, string[]>) => {
      const currentGroups = prev[parameterId] || [];

      if (currentGroups.includes(groupId)) {
        // Deselect: same cleanup as before
        const group =
          PREPARATION_GROUPS[groupId as keyof typeof PREPARATION_GROUPS];

        if (group.id === "uniformityOfContent") {
          setStandardPreparationUCPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationUCPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsUCPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        }

        if (group.id === "hypromellose") {
          setStandardPreparationHypromellosePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationHypromellosePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsAssayHypromellosePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        }

        if (group.id === "nitrosamine") {
          setStandardPreparationNitrosaminePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationNitrosaminePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsAssayNitrosaminePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        }

        if (group.id === "assay") {
          setStandardPreparationAssayPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsAssayPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "lod") {
          setSamplePreparationLodPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsLodPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "roi") {
          setSamplePreparationROIPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsROIPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "sulphatedAsh") {
          setSamplePreparationSulphatedAshPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsSulphatedAshPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "residualSolvent") {
          setStandardPreparationResidualSolventPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationRSPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsRSPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "relatedSubstance") {
          setStandardPreparationRelatedSubstancePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationRelatedSubstancePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsRelatedSubstancePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "dissolution") {
          setCalculationsDissoPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationDissoPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setStandardPreparationDissoPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "dissolutionProfile") {
          setCalculationsDissoProfilePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationDissoProfilePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setStandardPreparationDissoProfilePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setDissoMediaProfilePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "assayFerrousFumarate") {
          setSamplePrepAssayFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsAssayFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "dissolutionFerrousFumarate") {
          setSamplePrepDissoFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsDissoFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        } else if (group.id === "assayTitration") {
          setStandardPreparationTitrationPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationTitrationPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "assay_titration",
            ),
          }));
        } else if (group.id === "betadexBatchAnalysis") {
          setStandardPreparationBetadexPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationBetadexPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "betadex_batch_analysis",
            ),
          }));
        } else if (group.id === "standardizedTitrationAssay") {
          setStandardPreparationStandardizedTitrationAssayPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationStandardizedTitrationAssayPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "standardized_titration_assay",
            ),
          }));
        } else if (group.id === "dibasicSodiumPhosphateAssay") {
          setStandardPreparationDibasicSodiumPhosphateAssayPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setSamplePreparationDibasicSodiumPhosphateAssayPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "dibasic_sodium_phosphate_assay",
            ),
          }));
        } else if (group.id === "freeCarboxylGroups") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "free_carboxyl_groups",
            ),
          }));
        } else if (group.id === "glycerolBehenateFreeGlycerol") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "glycerol_behenate_free_glycerol",
            ),
          }));
        } else if (group.id === "glycerolBehenateAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "glycerol_behenate_assay",
            ),
          }));
        } else if (group.id === "hydrogenatedCastorOilComposition") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "hydrogenated_castor_oil_composition",
            ),
          }));
        } else if (group.id === "ketotifenHydrogenFumarateAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "ketotifen_hydrogen_fumarate_assay",
            ),
          }));
        } else if (group.id === "lecithinSingleLinearity") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lecithin_single_linearity",
            ),
          }));
        } else if (group.id === "lecithinBatchAnalysis") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lecithin_batch_analysis",
            ),
          }));
        } else if (group.id === "lipoidsAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lipoids_assay",
            ),
          }));
        } else if (group.id === "lipoidsImpurity") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lipoids_impurity",
            ),
          }));
        } else if (group.id === "logarithmicCalculation4Point") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "logarithmic_calculation_4_point",
            ),
          }));
        } else if (group.id === "ndmaValidationBatchAnalysis") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "ndma_validation_batch_analysis",
            ),
          }));
        } else if (group.id === "povidoneLimitOfAldehyde") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "povidone_limit_of_aldehyde",
            ),
          }));
        } else if (group.id === "prilocaineAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "prilocaine_assay",
            ),
          }));
        } else if (group.id === "castorOilFattyAcid") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "castor_oil_fatty_acid",
            ),
          }));
        } else if (group.id === "hecEthoxyContent") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "hec_ethoxy_content",
            ),
          }));
        } else if (group.id === "hpcAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "hpc_assay",
            ),
          }));
        } else if (group.id === "lhpcHydroxypropoxyContent") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lhpc_hydroxypropoxy_content",
            ),
          }));
        } else if (group.id === "magnesiumStearateFattyAcid") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "magnesium_stearate_fatty_acid",
            ),
          }));
        } else if (group.id === "nefopamResidualSolvent") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "nefopam_residual_solvent",
            ),
          }));
        } else if (group.id === "polyoxyl35CastorOilGlycols") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "polyoxyl_35_castor_oil_glycols",
            ),
          }));
        } else if (group.id === "blankPreparation") {
          setBlankPreparationPerParam((p: any) => {
            const { [parameterId]: _, ...rest } = p;
            return rest;
          });
        }

        return {
          ...prev,
          [parameterId]: currentGroups.filter((g: string) => g !== groupId),
        };
      }

      // ── Single-select: if there's already a group, clear it first ──────
      const clearGroup = (oldGroupId: string) => {
        const oldGroup =
          PREPARATION_GROUPS[oldGroupId as keyof typeof PREPARATION_GROUPS];
        if (!oldGroup) return;
        if (oldGroupId === "assay") {
          setStandardPreparationAssayPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsAssayPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "lod") {
          setSamplePreparationLodPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsLodPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "roi") {
          setSamplePreparationROIPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsROIPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "sulphatedAsh") {
          setSamplePreparationSulphatedAshPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsSulphatedAshPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "residualSolvent") {
          setStandardPreparationResidualSolventPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationRSPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsRSPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "relatedSubstance") {
          setStandardPreparationRelatedSubstancePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationRelatedSubstancePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsRelatedSubstancePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "dissolution") {
          setCalculationsDissoPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationDissoPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setStandardPreparationDissoPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "dissolutionProfile") {
          setCalculationsDissoProfilePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationDissoProfilePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setStandardPreparationDissoProfilePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setDissoMediaProfilePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "uniformityOfContent") {
          setStandardPreparationUCPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationUCPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsUCPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "hypromellose") {
          setStandardPreparationHypromellosePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationHypromellosePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsAssayHypromellosePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "nitrosamine") {
          setStandardPreparationNitrosaminePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationNitrosaminePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsAssayNitrosaminePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "assayFerrousFumarate") {
          setSamplePrepAssayFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsAssayFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "dissolutionFerrousFumarate") {
          setSamplePrepDissoFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsDissoFerrousFumaratePerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        } else if (oldGroupId === "assayTitration") {
          setStandardPreparationTitrationPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationTitrationPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "assay_titration",
            ),
          }));
        } else if (oldGroupId === "betadexBatchAnalysis") {
          setStandardPreparationBetadexPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationBetadexPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "betadex_batch_analysis",
            ),
          }));
        } else if (oldGroupId === "standardizedTitrationAssay") {
          setStandardPreparationStandardizedTitrationAssayPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationStandardizedTitrationAssayPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "standardized_titration_assay",
            ),
          }));
        } else if (oldGroupId === "dibasicSodiumPhosphateAssay") {
          setStandardPreparationDibasicSodiumPhosphateAssayPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setSamplePreparationDibasicSodiumPhosphateAssayPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "dibasic_sodium_phosphate_assay",
            ),
          }));
        } else if (oldGroupId === "freeCarboxylGroups") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "free_carboxyl_groups",
            ),
          }));
        } else if (oldGroupId === "glycerolBehenateFreeGlycerol") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "glycerol_behenate_free_glycerol",
            ),
          }));
        } else if (oldGroupId === "glycerolBehenateAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) => calc?.templateId !== "glycerol_behenate_assay",
            ),
          }));
        } else if (oldGroupId === "hydrogenatedCastorOilComposition") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "hydrogenated_castor_oil_composition",
            ),
          }));
        } else if (oldGroupId === "ketotifenHydrogenFumarateAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "ketotifen_hydrogen_fumarate_assay",
            ),
          }));
        } else if (oldGroupId === "lecithinSingleLinearity") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lecithin_single_linearity",
            ),
          }));
        } else if (oldGroupId === "lecithinBatchAnalysis") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lecithin_batch_analysis",
            ),
          }));
        } else if (oldGroupId === "lipoidsAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lipoids_assay",
            ),
          }));
        } else if (oldGroupId === "lipoidsImpurity") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lipoids_impurity",
            ),
          }));
        } else if (oldGroupId === "logarithmicCalculation4Point") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "logarithmic_calculation_4_point",
            ),
          }));
        } else if (oldGroupId === "ndmaValidationBatchAnalysis") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "ndma_validation_batch_analysis",
            ),
          }));
        } else if (oldGroupId === "povidoneLimitOfAldehyde") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "povidone_limit_of_aldehyde",
            ),
          }));
        } else if (oldGroupId === "prilocaineAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "prilocaine_assay",
            ),
          }));
        } else if (oldGroupId === "castorOilFattyAcid") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "castor_oil_fatty_acid",
            ),
          }));
        } else if (oldGroupId === "hecEthoxyContent") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "hec_ethoxy_content",
            ),
          }));
        } else if (oldGroupId === "hpcAssay") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "hpc_assay",
            ),
          }));
        } else if (oldGroupId === "lhpcHydroxypropoxyContent") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "lhpc_hydroxypropoxy_content",
            ),
          }));
        } else if (oldGroupId === "magnesiumStearateFattyAcid") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "magnesium_stearate_fatty_acid",
            ),
          }));
        } else if (oldGroupId === "nefopamResidualSolvent") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "nefopam_residual_solvent",
            ),
          }));
        } else if (oldGroupId === "polyoxyl35CastorOilGlycols") {
          setCalculationsGenericPerParam((p: any) => ({
            ...p,
            [parameterId]: (p[parameterId] || []).filter(
              (calc: any) =>
                calc?.templateId !== "polyoxyl_35_castor_oil_glycols",
            ),
          }));
        } else if (oldGroupId === "blankPreparation") {
          setBlankPreparationPerParam((p: any) => {
            const { [parameterId]: _, ...r } = p;
            return r;
          });
        }
        // Also clear preparationCompleted when changing group
        setPreparationCompletedByPerParam((p: any) => {
          const { [parameterId]: _, ...r } = p;
          return r;
        });
        setPreparationCompletedAtPerParam((p: any) => {
          const { [parameterId]: _, ...r } = p;
          return r;
        });
      };

      // Clear all existing groups for this parameter (single-select)
      currentGroups.forEach(clearGroup);

      return {
        ...prev,
        [parameterId]: [groupId],
      };
    });
    setShowParameterDropdown(false);
  };



  return handleTogglePreparationGroup;
}
