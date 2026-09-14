import type { Standard } from "../preparation_models/Standard";

export function useDrugAvailableStandards(ctx: any) {
  const {
    addedStandards,
    standardPreparationHypromellosePerParam,
    standardPreparationRelatedSubstancePerParam,
    standardPreparationResidualSolventPerParam,
    standardPreparationDissoPerParam,
    standardPreparationUCPerParam,
    standardPreparationDissoProfilePerParam,
    standardPreparationAssayPerParam,
  } = ctx;

    const getAvailableStandardsForParameter = (
      parameterId: number,
      isForRS: boolean = false,
      isForDisso: boolean = false,
      isForUC: boolean = false,
      isForDissoProfile: boolean = false,
      isForRelatedSubstance: boolean = false,
      isForHypromellose: boolean = false,
    ): Standard[] => {
      const paramStandards = addedStandards[parameterId] || [];
      const preparations = isForHypromellose
        ? standardPreparationHypromellosePerParam[parameterId] || []
        : isForRelatedSubstance
          ? standardPreparationRelatedSubstancePerParam[parameterId] || []
          : isForRS
            ? standardPreparationResidualSolventPerParam[parameterId] || []
            : isForDisso
              ? standardPreparationDissoPerParam[parameterId] || []
              : isForUC
                ? standardPreparationUCPerParam[parameterId] || []
                : isForDissoProfile
                  ? standardPreparationDissoProfilePerParam[parameterId] || []
                  : standardPreparationAssayPerParam[parameterId] || [];

      const assignedStandardIds = preparations
        .flatMap((prep: any) =>
          Array.isArray(prep.assignedStandardIds) && prep.assignedStandardIds.length > 0
            ? prep.assignedStandardIds
            : [prep.assignedStandardId],
        )
        .filter(Boolean);

      return paramStandards.filter(
        (std) => !assignedStandardIds.includes(std.serialNo),
      );
    };

  return getAvailableStandardsForParameter;
}
