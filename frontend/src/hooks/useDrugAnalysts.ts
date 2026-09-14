import { useEffect, useState } from "react";
import type { Analyst } from "../models/Analyst";
import { fetchAnalysts } from "../services/api";

export function useDrugAnalysts(): Analyst[] {
  const [analysts, setAnalysts] = useState<Analyst[]>([]);

  useEffect(() => {
    const loadAnalysts = async () => {
      try {
        const allAnalysts = await fetchAnalysts();

        setAnalysts(
          allAnalysts.filter((analyst) =>
            analyst.department?.toLowerCase().includes("drug"),
          ),
        );
      } catch (error) {
        console.error("Error fetching analysts:", error);
      }
    };

    loadAnalysts();
  }, []);

  return analysts;
}
