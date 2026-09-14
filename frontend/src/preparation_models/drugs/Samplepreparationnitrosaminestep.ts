export type SamplePreparationNitrosamineStep = {
  name: string; // "Dilution 1", "Dilution 2", ...
  value1?: string; // ml taken
  unit1?: string;
  value2?: string; // Diluted to
  unit2?: string;
  logBookID?: string;
  solventChemical?: string;
};