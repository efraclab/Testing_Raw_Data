import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Calculator, Trash, Plus, CheckCircle2 } from "lucide-react";
import type {
  CalculationAssayNitrosamine,
  SampleInjectionNitrosamine,
} from "../../../preparation_models/drugs/Calculationassaynitrosamine.ts";
import type { StandardPreparationNitrosamine } from "../../../preparation_models/drugs/Standardpreparationnitrosamine.ts";
import type { SamplePreparationNitrosamine } from "../../../preparation_models/drugs/Samplepreparationnitrosamine.ts";
import CustomDropdown from "../../shared/CustomDropdown";

interface CalculationDetailAssayNitrosamineProps {
  calculation: CalculationAssayNitrosamine;
  standardPreparations: StandardPreparationNitrosamine[];
  samplePreparations: SamplePreparationNitrosamine[];
  onFieldChange: (
    calculationId: number,
    field: keyof CalculationAssayNitrosamine,
    value: string | number | null | SampleInjectionNitrosamine[]
  ) => void;
  onRemove: () => void;
  role: string;
}

const cfOptions = [
  { value: "100", label: "% (CF = 100)" },
  { value: "1000000", label: "ppm (CF = 1,000,000)" },
  { value: "1000000000", label: "ppb (CF = 1,000,000,000)" },
];

const roundingOptions = [
  { value: "trunc", label: "Truncate (Excel TRUNC)" },
  { value: "round", label: "Round (Excel ROUND)" },
];

const truncate = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  const shifted = value * factor;
  const corrected = Math.round(shifted * 1e8) / 1e8;
  return Math.trunc(corrected) / factor;
};

const roundExcel = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return (Math.sign(value) * Math.round(Math.abs(value) * factor + 1e-9)) / factor;
};

const toNum = (v: string | null | undefined): number => {
  const n = parseFloat(String(v ?? ""));
  return isNaN(n) ? 0 : n;
};

const mean = (arr: number[]): number =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const stdevSample = (arr: number[], m: number): number =>
  arr.length > 1
    ? Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / (arr.length - 1))
    : 0;

const CalculationDetailAssayNitrosamine: React.FC<
  CalculationDetailAssayNitrosamineProps
> = ({
  calculation,
  standardPreparations,
  samplePreparations,
  onFieldChange,
  onRemove,
  role,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (field: keyof CalculationAssayNitrosamine, value: string) => {
    onFieldChange(calculation.id, field, value);
  };

  const handleSelectStandardPreparation = (label: string) => {
    onFieldChange(calculation.id, "selectedStandardPreparationLabel", label);
  };

  const handleSelectSamplePreparation = (label: string) => {
    onFieldChange(calculation.id, "selectedSamplePreparationLabel", label);
  };

  const injections = calculation.sampleInjections || [];

  const handleAddInjection = () => {
    const newInjection: SampleInjectionNitrosamine = {
      id: Date.now(),
      area: "",
      weight: "",
      found: null,
    };
    onFieldChange(calculation.id, "sampleInjections", [...injections, newInjection]);
  };

  const handleRemoveInjection = (id: number) => {
    onFieldChange(
      calculation.id,
      "sampleInjections",
      injections.filter((inj) => inj.id !== id)
    );
  };

  const handleInjectionFieldChange = (
    id: number,
    field: "area" | "weight",
    value: string
  ) => {
    onFieldChange(
      calculation.id,
      "sampleInjections",
      injections.map((inj) => (inj.id === id ? { ...inj, [field]: value } : inj))
    );
  };

  const performCalculation = () => {
    const areas = [
      calculation.standardArea1,
      calculation.standardArea2,
      calculation.standardArea3,
      calculation.standardArea4,
      calculation.standardArea5,
      calculation.standardArea6,
    ]
      .map(toNum)
      .filter((n) => n !== 0);

    const avgStd = mean(areas);
    const stdev = stdevSample(areas, avgStd);
    const percentRSD = avgStd !== 0 ? (stdev / avgStd) * 100 : 0;

    onFieldChange(calculation.id, "standardAverageArea", avgStd ? avgStd.toString() : null);
    onFieldChange(calculation.id, "standardStdev", avgStd ? stdev.toString() : null);
    onFieldChange(calculation.id, "standardPercentRSD", avgStd ? percentRSD.toString() : null);

    const bracketingArea = toNum(calculation.bracketingArea);
    if (bracketingArea && areas.length > 0) {
      const withBracketing = [...areas, bracketingArea];
      const m = mean(withBracketing);
      const bracketingRSD = m !== 0 ? (stdevSample(withBracketing, m) / m) * 100 : 0;
      onFieldChange(calculation.id, "bracketingPercentRSD", bracketingRSD.toString());
    } else {
      onFieldChange(calculation.id, "bracketingPercentRSD", null);
    }

    const dst = toNum(calculation.standardDilutionFactor);
    const ds = toNum(calculation.sampleDilutionFactor);
    const purity = toNum(calculation.purity);
    const CF = toNum(calculation.unitConversionFactor) || 1;
    const labelClaim = toNum(calculation.labelClaim);
    const averageWeight = toNum(calculation.averageWeight);
    const weightRatio = labelClaim !== 0 ? (averageWeight || 1) / labelClaim : 1;
    const applyRounding = (x: number) =>
      calculation.roundingMode === "round" ? roundExcel(x, 4) : truncate(x, 4);
    const standardWeightTaken = toNum(calculation.standardWeightTaken);

    const injectionAreas = injections.map((inj) => toNum(inj.area)).filter((n) => n !== 0);
    const sampleAverageArea = injectionAreas.length ? mean(injectionAreas) : null;
    onFieldChange(
      calculation.id,
      "sampleAverageArea",
      sampleAverageArea !== null ? sampleAverageArea.toString() : null
    );

    const updatedInjections: SampleInjectionNitrosamine[] = injections.map((inj) => {
      const area = toNum(inj.area);
      const sampleWeight =
        inj.weight && toNum(inj.weight) !== 0 ? toNum(inj.weight) : toNum(calculation.sampleWeight);
      if (!area || !avgStd || !dst || !sampleWeight) {
        return { ...inj, found: null };
      }
      const raw =
        (area / avgStd) *
        (standardWeightTaken / dst) *
        (ds / sampleWeight) *
        (purity / 100) *
        weightRatio *
        CF;
      return { ...inj, found: applyRounding(raw).toString() };
    });
    onFieldChange(calculation.id, "sampleInjections", updatedInjections);

    const foundValues = updatedInjections
      .map((inj) => (inj.found !== null ? parseFloat(inj.found) : null))
      .filter((v): v is number => v !== null);
    const averageFound = foundValues.length ? mean(foundValues) : null;
    onFieldChange(
      calculation.id,
      "averageFound",
      averageFound !== null ? averageFound.toString() : null
    );

    const unit = CF === 100 ? "%" : CF === 1e6 ? "ppm" : CF === 1e9 ? "ppb" : "";
    onFieldChange(calculation.id, "resultUnit", unit);
  };

  const acceptanceMin = calculation.acceptanceLimitMin
    ? parseFloat(calculation.acceptanceLimitMin)
    : null;
  const acceptanceMax = calculation.acceptanceLimitMax
    ? parseFloat(calculation.acceptanceLimitMax)
    : null;
  const resultVal = calculation.averageFound ? parseFloat(calculation.averageFound) : null;
  const hasLimits = acceptanceMin !== null || acceptanceMax !== null;
  const passes =
    resultVal !== null &&
    (acceptanceMin === null || resultVal >= acceptanceMin) &&
    (acceptanceMax === null || resultVal <= acceptanceMax);

  const replicateInput = (field: keyof CalculationAssayNitrosamine, label: string) => (
    <input
      key={field}
      type="number"
      step="any"
      value={(calculation as any)[field] ?? ""}
      onChange={(e) => handleChange(field, e.target.value)}
      onWheel={(e) => e.currentTarget.blur()}
      placeholder={label}
      className="w-full px-2 py-2 bg-white border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg border-2 border-emerald-200 overflow-hidden mb-6"
    >
      <div
        className={`relative bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-900 ${
          isExpanded ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="relative flex items-center justify-between px-4 py-3">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/30 rounded-lg blur-md" />
              <div className="relative p-2 bg-white/20 rounded-lg backdrop-blur-md border border-white/30">
                <Calculator className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                {calculation.label}
              </h4>
              <p className="text-xs text-emerald-100">N-Nitrosamine Impurities - Estimation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </motion.div>
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 rounded-lg transition-all duration-200 border border-white/30"
              title={`Remove ${calculation.label}`}
            >
              <Trash className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-white space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-slate-50 rounded-lg p-4 border-2 border-emerald-200">
            <h5 className="text-sm font-bold text-gray-700 mb-3">
              Link Preparations (auto-fills weight taken, purity, dst, ds)
            </h5>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Standard Preparation
                </label>
                <CustomDropdown
                  options={standardPreparations.map((sp) => ({ value: sp.label, label: sp.label }))}
                  value={calculation.selectedStandardPreparationLabel || ""}
                  onChange={handleSelectStandardPreparation}
                  placeholder="Select standard preparation"
                  colorScheme="emerald"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Sample Preparation
                </label>
                <CustomDropdown
                  options={samplePreparations.map((sp) => ({ value: sp.label, label: sp.label }))}
                  value={calculation.selectedSamplePreparationLabel || ""}
                  onChange={handleSelectSamplePreparation}
                  placeholder="Select sample preparation"
                  colorScheme="emerald"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <label className="text-xs font-semibold text-gray-600">
              Analyte
              <input
                type="text"
                value={calculation.analyteName || ""}
                onChange={(e) => handleChange("analyteName", e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Purity (%)
              <input
                type="number"
                value={calculation.purity || ""}
                onChange={(e) => handleChange("purity", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Standard Weight Taken (mg)
              <input
                type="number"
                value={calculation.standardWeightTaken || ""}
                onChange={(e) => handleChange("standardWeightTaken", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Sample Weight (mg)
              <input
                type="number"
                value={calculation.sampleWeight || ""}
                onChange={(e) => handleChange("sampleWeight", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Dilution Factor - Standard (dst)
              <input
                type="number"
                value={calculation.standardDilutionFactor || ""}
                onChange={(e) => handleChange("standardDilutionFactor", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Dilution Factor - Sample (ds)
              <input
                type="number"
                value={calculation.sampleDilutionFactor || ""}
                onChange={(e) => handleChange("sampleDilutionFactor", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Average Weight (mg) — optional
              <input
                type="number"
                value={calculation.averageWeight || ""}
                onChange={(e) => handleChange("averageWeight", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="1"
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Label Claim (mg) — optional
              <input
                type="number"
                value={calculation.labelClaim || ""}
                onChange={(e) => handleChange("labelClaim", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="1"
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Unit Conversion Factor (CF)
              </label>
              <CustomDropdown
                options={cfOptions}
                value={calculation.unitConversionFactor || "1000000"}
                onChange={(v) => handleChange("unitConversionFactor", v)}
                placeholder="CF"
                colorScheme="emerald"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Rounding</label>
              <CustomDropdown
                options={roundingOptions}
                value={calculation.roundingMode || "trunc"}
                onChange={(v) => handleChange("roundingMode", v)}
                placeholder="Rounding"
                colorScheme="emerald"
              />
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-gray-700 mb-2">
              Standard Solution — Replicate Areas
            </h5>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {replicateInput("standardArea1", "Area 1")}
              {replicateInput("standardArea2", "Area 2")}
              {replicateInput("standardArea3", "Area 3")}
              {replicateInput("standardArea4", "Area 4")}
              {replicateInput("standardArea5", "Area 5")}
              {replicateInput("standardArea6", "Area 6")}
            </div>
            {calculation.standardAverageArea && (
              <p className="text-xs text-gray-600 mt-2">
                Avg {parseFloat(calculation.standardAverageArea).toFixed(2)} · SD{" "}
                {parseFloat(calculation.standardStdev || "0").toFixed(2)} · %RSD{" "}
                {parseFloat(calculation.standardPercentRSD || "0").toFixed(4)}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-gray-600">
              Bracketing Standard Area — optional
              {replicateInput("bracketingArea", "Area")}
            </label>
            {calculation.bracketingPercentRSD && (
              <p className="text-xs text-gray-600 self-end pb-2">
                %RSD with bracketing: {parseFloat(calculation.bracketingPercentRSD).toFixed(4)}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-bold text-gray-700">Sample Solution</h5>
              {calculation.sampleAverageArea && (
                <span className="text-xs text-gray-600">
                  Avg Area: {parseFloat(calculation.sampleAverageArea).toFixed(2)}
                </span>
              )}
            </div>
            <div className="space-y-2">
              {injections.map((inj, index) => (
                <div key={inj.id} className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-2 text-xs text-gray-500">
                    Sample Solution {index + 1}
                  </span>
                  <input
                    type="number"
                    step="any"
                    value={inj.area}
                    onChange={(e) => handleInjectionFieldChange(inj.id, "area", e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="Area"
                    className="col-span-3 w-full px-2 py-2 bg-emerald-50 border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <input
                    type="number"
                    step="any"
                    value={inj.weight}
                    onChange={(e) => handleInjectionFieldChange(inj.id, "weight", e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="Weight (optional, mg)"
                    className="col-span-3 w-full px-2 py-2 bg-emerald-50 border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <span className="col-span-3 text-xs font-semibold text-emerald-800">
                    {inj.found ? `Found: ${inj.found} ${calculation.resultUnit || ""}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInjection(inj.id)}
                    className="col-span-1 text-emerald-400 hover:text-red-500 transition-colors"
                    title="Remove"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddInjection}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Sample Solution
            </button>
          </div>

          <button
            type="button"
            onClick={performCalculation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-semibold rounded-xl hover:from-emerald-800 hover:to-slate-900 transition-all shadow-md text-sm"
          >
            <Calculator className="w-4 h-4" />
            Calculate Result
          </button>

          {calculation.averageFound && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-emerald-900">
                  Result: {parseFloat(calculation.averageFound).toFixed(4)} {calculation.resultUnit}
                </div>
                {hasLimits && (
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      passes ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {passes ? "PASS" : "FAIL"}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-gray-600">
              Acceptance Limit Min
              <input
                type="number"
                value={calculation.acceptanceLimitMin || ""}
                onChange={(e) => handleChange("acceptanceLimitMin", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Acceptance Limit Max
              <input
                type="number"
                value={calculation.acceptanceLimitMax || ""}
                onChange={(e) => handleChange("acceptanceLimitMax", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs"
              />
            </label>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CalculationDetailAssayNitrosamine;