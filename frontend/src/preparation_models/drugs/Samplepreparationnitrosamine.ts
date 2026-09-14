import type { SamplePreparationNitrosamineStep } from './Samplepreparationnitrosaminestep.ts';

export interface SamplePreparationNitrosamine {
  id: number;
  label: string;
  sampleWeight: string; // Sample Weight (mg)
  sampleWeightUnit: string;
  steps: SamplePreparationNitrosamineStep[]; // serial dilution chain (ds)
}