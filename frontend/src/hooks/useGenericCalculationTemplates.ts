// file: frontend/src/hooks/useGenericCalculationTemplates.ts
//
// Replaces the static import of GENERIC_CALCULATION_TEMPLATES from
// genericCalculationTemplates.ts with a real fetch from the database.
//
// IMPORTANT: keep genericCalculationTemplates.ts (ASSAY_TITRATION_TEMPLATE)
// in the codebase as a fallback / offline dev reference even after this is
// wired in - don't delete it. If the API call fails (network issue, empty
// table before the migration runs, etc.), falling back to it means
// Titration doesn't just disappear from the app.

import { useEffect, useState } from "react";
import axios from "axios";
import type { GenericCalculationTemplate } from "../preparation_models/drugs/GenericCalculationTemplate";
import { GENERIC_CALCULATION_TEMPLATES as FALLBACK_TEMPLATES } from "../preparation_models/drugs/genericCalculationTemplates";

// Matches API_BASE_URL in api.ts exactly - ideally this constant should be
// exported from api.ts and imported here instead of duplicated, to avoid
// the two drifting apart if the URL ever changes.
const API_BASE_URL = "http://localhost:5162/api";

interface RawTemplateFromApi {
  templateId: string;
  templateName: string;
  version: number;
  recipeJson: string;
  isActive: boolean;
}

export function useGenericCalculationTemplates() {
  const [templates, setTemplates] = useState<Record<string, GenericCalculationTemplate>>(
    FALLBACK_TEMPLATES,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await axios.get<RawTemplateFromApi[]>(
          `${API_BASE_URL}/calculation-templates`,
        );
        const raw = response.data;
        const parsed: Record<string, GenericCalculationTemplate> = {};

        for (const row of raw) {
          try {
            const recipe = JSON.parse(row.recipeJson) as GenericCalculationTemplate;
            // Key by templateId with the "camelCase group id" convention
            // used in PREPARATION_GROUPS, e.g. "assay_titration" -> "assayTitration".
            const groupKey = row.templateId.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
            parsed[groupKey] = recipe;
          } catch {
            console.warn(`Could not parse recipe JSON for template "${row.templateId}"`);
          }
        }

        if (!cancelled && Object.keys(parsed).length > 0) {
          setTemplates(parsed);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load calculation templates");
          // Keep using FALLBACK_TEMPLATES - already set as initial state above.
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { templates, isLoading, error };
}