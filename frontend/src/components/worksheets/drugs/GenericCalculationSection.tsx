// file: frontend/src/components/worksheets/drugs/GenericCalculationSection.tsx
//
// This is "the on-screen form" for any simple/medium template (Titration,
// DCP, Ketotifen, etc). It follows the exact same shape as DrugAssaySection.tsx
// - a list of calculation entries, each with an Add/Remove button - except
// instead of being built for ONE calculation type, it reads a recipe
// (GenericCalculationTemplate) and works for ANY of them.
//
// What this file does NOT do: it does not know the actual fields or
// formulas for Titration, DCP, etc. It only knows how to render whatever
// recipe it's handed. The per-row rendering (the actual input boxes and
// tables) lives in GenericCalculationDetail.tsx, the next file.

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiTestTube } from "react-icons/bi";
import type { AttachedFile } from "../../../models/AttachedFile";
import type { WorksheetStandard } from "../../../models/WorksheetStandard";
import type { StandardPreparation } from "../../../preparation_models/drugs/StandardPreparation";
import type {
  GenericCalculationTemplate,
  CalculationGenericRow,
} from "../../../preparation_models/drugs/GenericCalculationTemplate";
import GenericCalculationDetail, {
  type LabeledPreparation,
} from "../../sub-components/drugs/GenericCalculationDetail";
import StandardPreparationDetail from "../../sub-components/drugs/StandardPreparationDetail";
import WorksheetFileAttacher from "../../shared/WorksheetFileAttacher";
import { Plus, Target } from "../../shared/WorksheetUiHelpers";

interface GenericCalculationSectionProps {
  parameterId: number;
  template: GenericCalculationTemplate;

  isActive: boolean;
  isPreparationLocked: boolean;
  shouldDisableContent: boolean;
  canManagePrep: boolean;
  isFullyLocked: boolean;
  role: string;
  completedAt?: string | null;

  // Standard Preparation uses the same generic StandardPreparation model +
  // StandardPreparationDetail editor every calc type already shares.
  standardPreparations: StandardPreparation[];
  handleAddStandardPreparation: (parameterId: number) => void;
  handleRemoveStandardPreparation: (parameterId: number, standardPreparationId: number) => void;
  handleStandardPreparationStepChange: (
    parameterId: number,
    standardPreparationId: number,
    stepName: string,
    field: string,
    newValue: string,
  ) => void;

  // Sample Preparation is NOT generic across templates - Titration uses a
  // different step model/editor than Assay does. The caller (the JSX block
  // in DrugPrimaryAnalysisGroupsCoordinator.tsx) supplies whichever editor
  // component and handlers match this template's actual preparation model.
  samplePreparations: LabeledPreparation[];
  // Render function instead of a fixed-props component, since each
  // template's real editor has its own prop shape (e.g.
  // SamplePreparationTitrationDetail expects `samplePreparationTitration`
  // and a `type: "assay" | "disso"` prop - not a generic `samplePreparation`
  // prop like GenericCalculationDetail uses elsewhere).
  renderSamplePreparationEditor: (
    samplePreparation: any,
    onStepChange: (id: number, stepName: string, field: string, newValue: string) => void,
    onRemove: () => void,
  ) => React.ReactNode;
  handleAddSamplePreparation: (parameterId: number) => void;
  handleRemoveSamplePreparation: (parameterId: number, samplePreparationId: number) => void;
  handleSamplePreparationStepChange: (
    parameterId: number,
    samplePreparationId: number,
    stepName: string,
    field: string,
    newValue: string,
  ) => void;

  assignedStandards: WorksheetStandard[];

  calculations: CalculationGenericRow[];

  getFilesForPrep: (
    parameterId: number,
    preparationType: string,
    sectionLabel: string,
  ) => AttachedFile[];
  handleAddPrepFiles: (
    parameterId: number,
    preparationType: string,
    sectionLabel: string,
    newFiles: AttachedFile[],
  ) => void;
  handleRemovePrepFile: (
    parameterId: number,
    preparationType: string,
    sectionLabel: string,
    index: number,
  ) => void;

  // Same add/remove/change contract every other calc section uses, just
  // generic-shaped instead of tied to one specific field list.
  handleAddCalculation: (parameterId: number, templateId: string) => void;
  handleRemoveCalculation: (parameterId: number, calculationId: number) => void;
  handleFieldChange: (
    parameterId: number,
    calculationId: number,
    fieldName: string,
    value: string | null,
  ) => void;
  handleGroupFieldChange: (
    parameterId: number,
    calculationId: number,
    groupName: string,
    rowIndex: number,
    fieldName: string,
    value: string | null,
  ) => void;
  handleAddGroupRow: (
    parameterId: number,
    calculationId: number,
    groupName: string,
  ) => void;
  handleRemoveGroupRow: (
    parameterId: number,
    calculationId: number,
    groupName: string,
    rowIndex: number,
  ) => void;
  handleSelectStandardPreparation: (
    parameterId: number,
    calculationId: number,
    label: string | null,
  ) => void;
  handleSelectSamplePreparation: (
    parameterId: number,
    calculationId: number,
    label: string | null,
  ) => void;

  onComplete: () => void;
  onUnlock: () => void;
  showPreparations?: boolean;
}

const GenericCalculationSection: React.FC<GenericCalculationSectionProps> = ({
  parameterId,
  template,
  isActive,
  isPreparationLocked,
  shouldDisableContent,
  canManagePrep,
  isFullyLocked,
  role,
  completedAt,
  standardPreparations,
  handleAddStandardPreparation,
  handleRemoveStandardPreparation,
  handleStandardPreparationStepChange,
  samplePreparations,
  renderSamplePreparationEditor,
  handleAddSamplePreparation,
  handleRemoveSamplePreparation,
  handleSamplePreparationStepChange,
  assignedStandards,
  calculations,
  getFilesForPrep,
  handleAddPrepFiles,
  handleRemovePrepFile,
  handleAddCalculation,
  handleRemoveCalculation,
  handleFieldChange,
  handleGroupFieldChange,
  handleAddGroupRow,
  handleRemoveGroupRow,
  handleSelectStandardPreparation,
  handleSelectSamplePreparation,
  onComplete,
  onUnlock,
  showPreparations = true,
}) => {
  const relevantCalculations = calculations.filter(
    (c) => c.templateId === template.templateId,
  );

  return (
    <>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 p-8 rounded-2xl border-2 border-emerald-200/50 bg-gradient-to-br from-emerald-50/40 via-white/60 to-emerald-50/40 backdrop-blur-sm shadow-sm hover:shadow-emerald-200/50 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-500/10">
              <BiTestTube className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {template.templateName}
            </h3>
          </div>

          {showPreparations && (
            <div className="mb-8">
            {/* Standard Preparations - shares the same generic model/editor every calc type uses */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700">Standard Preparations</h4>
                {!shouldDisableContent && !isFullyLocked && (
                  <button
                    type="button"
                    onClick={() => handleAddStandardPreparation(parameterId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Standard Preparation
                  </button>
                )}
              </div>
              {standardPreparations.map((sp: any) => {
                const assignedStandard = assignedStandards.find(
                  (std: any) => std.serialNo === sp.assignedStandardId,
                );
                return (
                  <div key={sp.id} className="mb-4">
                    <StandardPreparationDetail
                      standardPreparation={sp}
                      assignedStandard={assignedStandard || null}
                      onStepChange={(id: number, stepName: string, field: string, value: string) =>
                        handleStandardPreparationStepChange(parameterId, id, stepName, field, value)
                      }
                      onRemove={() => handleRemoveStandardPreparation(parameterId, sp.id)}
                      role={role}
                    />
                  </div>
                );
              })}
            </div>

            {/* Sample Preparations - template-specific editor, since the step model
                differs per template (Titration's is not the same as Assay's) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700">Sample Preparations</h4>
                {!shouldDisableContent && !isFullyLocked && (
                  <button
                    type="button"
                    onClick={() => handleAddSamplePreparation(parameterId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Sample Preparation
                  </button>
                )}
              </div>
              {samplePreparations.map((sp: any) => (
                <div key={sp.id} className="mb-4">
                  {renderSamplePreparationEditor(
                    sp,
                    (id: number, stepName: string, field: string, value: string) =>
                      handleSamplePreparationStepChange(parameterId, id, stepName, field, value),
                    () => handleRemoveSamplePreparation(parameterId, sp.id),
                  )}
                </div>
              ))}
            </div>
          </div>
          )}

          <AnimatePresence>
            {relevantCalculations.map((calc) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <GenericCalculationDetail
                  parameterId={parameterId}
                  template={template}
                  row={calc}
                  standardPreparations={standardPreparations}
                  samplePreparations={samplePreparations}
                  assignedStandards={assignedStandards}
                  shouldDisableContent={shouldDisableContent}
                  isFullyLocked={isFullyLocked}
                  onFieldChange={(fieldName, value) =>
                    handleFieldChange(parameterId, calc.id, fieldName, value)
                  }
                  onGroupFieldChange={(groupName, rowIndex, fieldName, value) =>
                    handleGroupFieldChange(
                      parameterId,
                      calc.id,
                      groupName,
                      rowIndex,
                      fieldName,
                      value,
                    )
                  }
                  onAddGroupRow={(groupName) =>
                    handleAddGroupRow(parameterId, calc.id, groupName)
                  }
                  onRemoveGroupRow={(groupName, rowIndex) =>
                    handleRemoveGroupRow(parameterId, calc.id, groupName, rowIndex)
                  }
                  onSelectStandardPreparation={(label) =>
                    handleSelectStandardPreparation(parameterId, calc.id, label)
                  }
                  onSelectSamplePreparation={(label) =>
                    handleSelectSamplePreparation(parameterId, calc.id, label)
                  }
                  onCalculatedResults={(computedValues, computedGroupValues) => {
                    // Store every computed top-level value back into the real
                    // calculation row so Save Draft / Complete Analysis can persist it.
                    template.fields
                      .filter(
                        (field) =>
                          field.source === "computed" && !field.group,
                      )
                      .forEach((field) => {
                        handleFieldChange(
                          parameterId,
                          calc.id,
                          field.name,
                          computedValues[field.name] ?? null,
                        );
                      });

                    // Store computed group values such as Factor and Result.
                    template.groups.forEach((group) => {
                      const rows =
                        computedGroupValues[group.name] || [];
                      const computedFields = template.fields.filter(
                        (field) =>
                          field.source === "computed" &&
                          field.group === group.name,
                      );

                      rows.forEach((computedRow, rowIndex) => {
                        computedFields.forEach((field) => {
                          handleGroupFieldChange(
                            parameterId,
                            calc.id,
                            group.name,
                            rowIndex,
                            field.name,
                            computedRow?.[field.name] ?? null,
                          );
                        });
                      });
                    });
                  }}
                  onRemove={() =>
                    handleRemoveCalculation(parameterId, calc.id)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {!shouldDisableContent && !isFullyLocked && (
            <button
              type="button"
              onClick={() => handleAddCalculation(parameterId, template.templateId)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 font-medium hover:bg-emerald-500/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add {template.templateName} Calculation
            </button>
          )}

          <div className="mt-6">
            <WorksheetFileAttacher
              files={getFilesForPrep(parameterId, template.templateId, template.templateName)}
              preparationType={template.templateId}
              sectionLabel={template.templateName}
              onAdd={(newFiles) =>
                handleAddPrepFiles(parameterId, template.templateId, template.templateName, newFiles)
              }
              onRemove={(index) =>
                handleRemovePrepFile(parameterId, template.templateId, template.templateName, index)
              }
            />
          </div>

          {!isPreparationLocked && canManagePrep && !isFullyLocked && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onComplete}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                <Target className="w-4 h-4" />
                Mark Complete
              </button>
            </div>
          )}

          {isFullyLocked && completedAt && role === "reviewer" && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onUnlock}
                className="text-sm text-emerald-700 underline"
              >
                Unlock Section
              </button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default GenericCalculationSection;