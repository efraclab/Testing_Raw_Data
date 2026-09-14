import type { StandardPreparationNitrosamineStep } from './Standardpreparationnitrosaminestep.ts';

export interface StandardPreparationNitrosamine {
  assignedStandardId: string | null;
  /** Optional 2nd reference standard (dual-standard % recovery check, as seen
   *  in the Busulfan/Methane Sulphonic Acid worksheet). Most nitrosamine
   *  monographs only need one, so this stays optional/single unlike
   *  Hypromellose's mandatory dual-select. */
  secondStandardId?: string | null;
  id: number;
  label: string;
  batchNo: string;
  purity: string; // Purity (%)
  weightTaken: string; // Weight Taken (mg)
  weightTakenUnit: string;
  steps: StandardPreparationNitrosamineStep[]; // serial dilution chain (dst)
}