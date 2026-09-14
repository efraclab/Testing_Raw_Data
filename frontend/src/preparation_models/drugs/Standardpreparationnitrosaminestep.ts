export type StandardPreparationNitrosamineStep = {
  /** "Dilution 1", "Dilution 2", ... — one card per serial-dilution stage.
   *  Chain length varies by monograph (Mifepristone: 7 stages, Busulfan: 6),
   *  so unlike Hypromellose's fixed step set, this is a dynamic array the
   *  user can add/remove stages from. */
  name: string;
  /** "ml taken" for this stage (aliquot drawn forward). */
  value1?: string;
  unit1?: string; // "ml" | "µl"
  /** "Diluted to" volume for this stage. */
  value2?: string;
  unit2?: string;
  logBookID?: string;
  solventChemical?: string;
};