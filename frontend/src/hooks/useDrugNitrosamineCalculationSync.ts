import { useEffect } from "react";
import type { CalculationAssayNitrosamine } from "../preparation_models/drugs/Calculationassaynitrosamine";

export function useDrugNitrosamineCalculationSync(ctx: any) {
  const {
    setCalculationsAssayNitrosaminePerParam,
    standardPreparationNitrosaminePerParam,
    samplePreparationNitrosaminePerParam,
    nitrosamineWeightToMg,
    dilutionFactorFromNitrosamineSteps,
  } = ctx;

    // Keep standardWeightTaken / sampleWeight / purity live-synced if the underlying
    // preparation values are edited AFTER a preparation has already been selected.
    useEffect(() => {
      setCalculationsAssayNitrosaminePerParam((prevCalcs) => {
        let changed = false;
        const updated: Record<number, CalculationAssayNitrosamine[]> = {};

        Object.keys(prevCalcs).forEach((key) => {
          const parameterId = Number(key);
          const standardPreps = standardPreparationNitrosaminePerParam[parameterId] || [];
          const samplePreps = samplePreparationNitrosaminePerParam[parameterId] || [];

          updated[parameterId] = prevCalcs[parameterId].map((calc) => {
            let next = calc;

            if (calc.selectedStandardPreparationLabel) {
              const matchedStandard = standardPreps.find(
                (sp) => sp.label === calc.selectedStandardPreparationLabel,
              );
              const fetchedWSa = matchedStandard
                ? nitrosamineWeightToMg(matchedStandard.weightTaken, matchedStandard.weightTakenUnit)
                : NaN;
              const fetchedDst = matchedStandard
                ? dilutionFactorFromNitrosamineSteps(matchedStandard.steps)
                : NaN;
              const newWeightTaken = !isNaN(fetchedWSa) ? fetchedWSa.toFixed(4) : next.standardWeightTaken;
              const newPurity = matchedStandard?.purity || next.purity;
              const newDst = !isNaN(fetchedDst) ? fetchedDst.toString() : next.standardDilutionFactor;
              if (
                newWeightTaken !== next.standardWeightTaken ||
                newPurity !== next.purity ||
                newDst !== next.standardDilutionFactor
              ) {
                changed = true;
                next = {
                  ...next,
                  standardWeightTaken: newWeightTaken,
                  purity: newPurity,
                  standardDilutionFactor: newDst,
                };
              }
            }

            if (calc.selectedSamplePreparationLabel) {
              const matchedSample = samplePreps.find(
                (sp) => sp.label === calc.selectedSamplePreparationLabel,
              );
              const fetchedWu = matchedSample
                ? nitrosamineWeightToMg(matchedSample.sampleWeight, matchedSample.sampleWeightUnit)
                : NaN;
              const fetchedDs = matchedSample
                ? dilutionFactorFromNitrosamineSteps(matchedSample.steps)
                : NaN;
              const newSampleWeight = !isNaN(fetchedWu) ? fetchedWu.toFixed(4) : next.sampleWeight;
              const newDs = !isNaN(fetchedDs) ? fetchedDs.toString() : next.sampleDilutionFactor;
              if (newSampleWeight !== next.sampleWeight || newDs !== next.sampleDilutionFactor) {
                changed = true;
                next = { ...next, sampleWeight: newSampleWeight, sampleDilutionFactor: newDs };
              }
            }

            return next;
          });
        });

        return changed ? updated : prevCalcs;
      });
    }, [standardPreparationNitrosaminePerParam, samplePreparationNitrosaminePerParam]);
}
