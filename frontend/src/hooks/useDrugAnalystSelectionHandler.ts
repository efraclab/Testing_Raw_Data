import { addParameter, updateParameter, insertWorksheetLog } from "../services/api";

export function useDrugAnalystSelectionHandler(ctx: any) {
  const {
    pendingParameter,
    analystMode,
    paramIdx,
    addedParameters,
    columnsPerParam,
    diluentPerParam,
    otherInfoPerParam,
    additionalInfoPerParam,
    addedInstruments,
    addedChemicals,
    addedStandards,
    addedInternalStandards,
    standardPreparationAssayPerParam,
    standardPreparationResidualSolventPerParam,
    standardPreparationRelatedSubstancePerParam,
    standardPreparationDissoPerParam,
    samplePreparationPerParam,
    samplePreparationRSPerParam,
    samplePreparationRelatedSubstancePerParam,
    samplePreparationDissoPerParam,
    samplePreparationLodPerParam,
    samplePreparationROIPerParam,
    samplePreparationSulphatedAshPerParam,
    dissoMediaPerParam,
    mobilePhasePerParam,
    samplePrepAssayFerrousFumaratePerParam,
    samplePrepDissoFerrousFumaratePerParam,
    calculationsAssayPerParam,
    calculationsLodPerParam,
    calculationsROIPerParam,
    calculationsSulphatedAshPerParam,
    calculationsRSPerParam,
    calculationsRelatedSubstancePerParam,
    calculationsDissoPerParam,
    calculationsAssayFerrousFumaratePerParam,
    calculationsDissoFerrousFumaratePerParam,
    approvedByReviewerPerParam,
    analysisStartDatePerParam,
    analysisCompletionDatePerParam,
    revisionStartDatePerParam,
    revisionCompletedDatePerParam,
    approvedAtReviewerPerParam,
    preparationCompletedByPerParam,
    preparationCompletedAtPerParam,
    remarksByAnalystPerParam,
    parameterStatusPerParam,
    worksheetId,
    role,
    collectFilesForParam,
    setParamIdx,
    setAddedParameters,
    setAnalyzedByPerParam,
    setAnalyzedByNamePerParam,
    setParameterStatusPerParam,
    setToastMessage,
    setShowToast,
    setColumnsPerParam,
    setDiluentPerParam,
    setOtherInfoPerParam,
    setAdditionalInfoPerParam,
    setShowAdditionalInfo,
    setAddedInstruments,
    setAddedChemicals,
    setAddedStandards,
    setStandardPreparationAssayPerParam,
    setSamplePreparationPerParam,
    setStandardPreparationResidualSolventPerParam,
    setSamplePreparationRSPerParam,
    setStandardPreparationDissoPerParam,
    setSamplePreparationDissoPerParam,
    setSamplePreparationLodPerParam,
    setSamplePreparationROIPerParam,
    setSamplePreparationSulphatedAshPerParam,
    setCalculationsAssayPerParam,
    setCalculationsLodPerParam,
    setCalculationsROIPerParam,
    setCalculationsSulphatedAshPerParam,
    setCalculationsRSPerParam,
    setCalculationsDissoPerParam,
    setDissoMediaPerParam,
    setMobilePhasePerParam,
    setShowMobilePhasePreparation,
    setShowBufferPreparation,
    setSamplePrepAssayFerrousFumaratePerParam,
    setCalculationsAssayFerrousFumaratePerParam,
    setCalculationsDissoFerrousFumaratePerParam,
    setSamplePrepDissoFerrousFumaratePerParam,
    setShowDiluentPreparation,
    setShowSystemSuitability,
    setSystemSuitabilityPerParam,
    setPendingParameter,
    setAnalystMode,
    setShowAnalystDialog,
    setShowParameterDropdown,
  } = ctx;

    const handleAnalystSelected = async (
      employeeId: string,
      employeeName: string,
    ) => {
      if (!pendingParameter) return;

      try {
        if (analystMode === "add") {
          const newId = paramIdx + 1;
          setParamIdx(newId);
          const newParameter = { ...pendingParameter, id: newId };

          setAddedParameters((prev) => [...prev, newParameter]);

          setAnalyzedByPerParam((prev) => ({
            ...prev,
            [newId]: employeeId,
          }));

          setAnalyzedByNamePerParam((prev) => ({
            ...prev,
            [newId]: employeeName,
          }));

          setParameterStatusPerParam((prev) => ({
            ...prev,
            [newId]: "Created",
          }));

          setToastMessage(`Adding parameter "${newParameter.parameterName}"...`);
          setShowToast(true);

          try {
            const parameterData = {
              paraCode: newParameter.paraCode,
              parameterName: newParameter.parameterName,
              methodCode: newParameter.methodCode,
              methodName: newParameter.methodName,
              columnId: columnsPerParam[newId] || null,
              diluentPreparation: diluentPerParam[newId] || null,
              otherInfo: otherInfoPerParam[newId] || null,
              analyzedBy: employeeId,
              approvedByReviewer: null,
              analysisStartDate: null,
              analysisCompletionDate: null,
              approvedAtReviewer: null,
              status: "Created",
              instruments: (addedInstruments[newId] || []).map((inst) => ({
                instrumentId: inst.instrumentId,
                name: inst.name,
                instrumentTag: inst.instrumentTag,
                make: inst.make,
                calibrationDoneDate: inst.calibrationDoneDate,
                calibrationDueDate: inst.calibrationDueDate,
              })),
              chemicals: (addedChemicals[newId] || []).map((chem) => ({
                slno: chem.slno,
                name: chem.name,
                code: chem.code,
                make: chem.make,
                batchNo: chem.batchNo,
                expDate: chem.expDate,
              })),
              standards: (addedStandards[newId] || []).map((std) => ({
                serialNo: std.serialNo,
                name: std.name,
                batchNo: std.batchNo,
                make: std.make,
                purity: std.purity,
                validity: std.validity,
              })),
              internalStandards: (addedInternalStandards[newId] || []).map((std) => ({
                serialNo: std.serialNo,
                name: std.name,
                batchNo: std.batchNo,
                make: std.make,
                purity: std.purity,
                validity: std.validity,
              })),
              preparations: [
                // Standard Preparations
                ...(standardPreparationAssayPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "standard",
                  preparationType: "assay",
                  assignedStandardId: sp.assignedStandardId || "",
                  steps: JSON.stringify(sp.steps),
                })),
                ...(standardPreparationResidualSolventPerParam[newId] || []).map(
                  (sp) => ({
                    label: sp.label,
                    preparationCategory: "standard",
                    preparationType: "residual_solvent",
                    assignedStandardId: (sp as any).assignedStandardId || "",
                    steps: JSON.stringify(sp.steps),
                  }),
                ),
                ...(standardPreparationRelatedSubstancePerParam[newId] || []).map(
                  (sp) => ({
                    label: sp.label,
                    preparationCategory: "standard",
                    preparationType: "related_substance",
                    assignedStandardId: (sp as any).assignedStandardId || "",
                    steps: JSON.stringify(sp.steps),
                  }),
                ),
                ...(standardPreparationDissoPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "standard",
                  preparationType: "dissolution",
                  assignedStandardId: (sp as any).assignedStandardId || "",
                  steps: JSON.stringify(sp.steps),
                })),
                // Sample Preparations
                ...(samplePreparationPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "sample",
                  preparationType: "assay",
                  assignedStandardId: "",
                  steps: JSON.stringify(sp.steps),
                })),
                ...(samplePreparationROIPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "sample",
                  preparationType: "roi",
                  assignedStandardId: "",
                  steps: JSON.stringify(sp.steps),
                })),
                ...(samplePreparationLodPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "sample",
                  preparationType: "lod",
                  assignedStandardId: "",
                  steps: JSON.stringify(sp.steps),
                })),
                ...(samplePreparationSulphatedAshPerParam[newId] || []).map(
                  (sp) => ({
                    label: sp.label,
                    preparationCategory: "sample",
                    preparationType: "sulphated_ash",
                    assignedStandardId: "",
                    steps: JSON.stringify(sp.steps),
                  }),
                ),
                ...(samplePreparationRSPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "sample",
                  preparationType: "residual_solvent",
                  assignedStandardId: (sp as any).assignedStandardId || "",
                  steps: JSON.stringify(sp.steps),
                })),
                ...(samplePreparationRelatedSubstancePerParam[newId] || []).map(
                  (sp) => ({
                    label: sp.label,
                    preparationCategory: "sample",
                    preparationType: "related_substance",
                    assignedStandardId: (sp as any).assignedStandardId || "",
                    steps: JSON.stringify(sp.steps),
                  }),
                ),
                ...(samplePreparationDissoPerParam[newId] || []).map((sp) => ({
                  label: sp.label,
                  preparationCategory: "sample",
                  preparationType: "dissolution",
                  assignedStandardId: (sp as any).assignedStandardId || "",
                  steps: JSON.stringify(sp.steps),
                })),
                // Dissolution Media Preparation
                ...(dissoMediaPerParam[newId] || []).map((dm) => ({
                  label: dm.label,
                  preparationCategory: "dissolution_media",
                  preparationType: null,
                  assignedStandardId: null,
                  steps: JSON.stringify(dm.steps),
                })),
                // Mobile Phase
                ...(mobilePhasePerParam[newId] || []).map((mp) => ({
                  label: mp.label,
                  preparationCategory: "mobile_phase",
                  preparationType: null,
                  assignedStandardId: null,
                  steps: null,
                  content: mp.content,
                })),
                // Sample Preparation Assay (Ferrous Fumarate)
                ...(samplePrepAssayFerrousFumaratePerParam[newId] || []).map(
                  (spt) => ({
                    label: spt.label,
                    preparationCategory: "sample",
                    preparationType: "assay_ferrous_fumarate",
                    assignedStandardId: null,
                    steps: JSON.stringify(spt.steps),
                  }),
                ),
                // Sample Preparation Dissolution (Ferrous Fumarate)
                ...(samplePrepDissoFerrousFumaratePerParam[newId] || []).map(
                  (spt) => ({
                    label: spt.label,
                    preparationCategory: "sample",
                    preparationType: "dissolution_ferrous_fumarate",
                    assignedStandardId: null,
                    steps: JSON.stringify(spt.steps),
                  }),
                ),
              ],
              calculations: [
                ...(calculationsAssayPerParam[newId] || []).map((calc) => {
                  const dataObj = { ...calc } as any;
                  delete dataObj.selectedStandardPrepId;
                  delete dataObj.selectedSamplePrepId;
                  return {
                    label: calc.label,
                    calculationType: "assay",
                    data: JSON.stringify(dataObj),
                  };
                }),
                ...(calculationsLodPerParam[newId] || []).map((calc) => {
                  const dataObj = { ...calc } as any;
                  delete dataObj.selectedSamplePrepId;
                  return {
                    label: calc.label,
                    calculationType: "lod",
                    data: JSON.stringify(dataObj),
                  };
                }),
                ...(calculationsROIPerParam[newId] || []).map((calc) => {
                  const dataObj = { ...calc } as any;
                  delete dataObj.selectedSamplePrepId;
                  return {
                    label: calc.label,
                    calculationType: "roi",
                    data: JSON.stringify(dataObj),
                  };
                }),
                ...(calculationsSulphatedAshPerParam[newId] || []).map((calc) => {
                  const dataObj = { ...calc } as any;
                  delete dataObj.selectedSamplePrepId;
                  return {
                    label: calc.label,
                    calculationType: "sulphated_ash",
                    data: JSON.stringify(dataObj),
                  };
                }),
                ...(calculationsRSPerParam[newId] || []).map((calc) => {
                  const dataObj = { ...calc } as any;
                  delete dataObj.selectedStandardPrepId;
                  delete dataObj.selectedSamplePrepId;
                  return {
                    label: calc.label,
                    calculationType: "residual_solvent",
                    data: JSON.stringify(dataObj),
                  };
                }),
                ...(calculationsRelatedSubstancePerParam[newId] || []).map(
                  (calc) => {
                    const dataObj = { ...calc } as any;
                    delete dataObj.selectedStandardPrepId;
                    delete dataObj.selectedSamplePrepId;
                    return {
                      label: calc.label,
                      calculationType: "related_substance",
                      data: JSON.stringify(dataObj),
                    };
                  },
                ),
                ...(calculationsDissoPerParam[newId] || []).map((calc) => {
                  const dataObj = { ...calc } as any;
                  delete dataObj.selectedStandardPrepId;
                  delete dataObj.selectedSamplePrepId;
                  return {
                    label: calc.label,
                    calculationType: "dissolution",
                    data: JSON.stringify(dataObj),
                  };
                }),
                ...(calculationsAssayFerrousFumaratePerParam[newId] || []).map(
                  (calc) => ({
                    label: calc.label,
                    calculationType: "assay_ferrous_fumarate",
                    data: JSON.stringify({ ...calc }),
                  }),
                ),
                ...(calculationsDissoFerrousFumaratePerParam[newId] || []).map(
                  (calc) => ({
                    label: calc.label,
                    calculationType: "dissolution_ferrous_fumarate",
                    data: JSON.stringify({ ...calc }),
                  }),
                ),
              ],
              files: collectFilesForParam(newId),
            };

            const response = await addParameter(worksheetId, parameterData);

            setAddedParameters((prev) =>
              prev.map((p) =>
                p.id === newId ? { ...p, id: response.parameterId } : p,
              ),
            );

            const serverParameterId = response.parameterId;

            setAnalyzedByPerParam((prev) => {
              const { [newId]: analyzedBy, ...rest } = prev;
              return { ...rest, [serverParameterId]: analyzedBy };
            });

            setAnalyzedByNamePerParam((prev) => {
              const { [newId]: analyzedByName, ...rest } = prev;
              return { ...rest, [serverParameterId]: analyzedByName };
            });

            setParameterStatusPerParam((prev) => {
              const { [newId]: status, ...rest } = prev;
              return { ...rest, [serverParameterId]: status };
            });

            if (columnsPerParam[newId]) {
              setColumnsPerParam((prev) => {
                const { [newId]: column, ...rest } = prev;
                return { ...rest, [serverParameterId]: column };
              });
            }

            if (diluentPerParam[newId]) {
              setDiluentPerParam((prev) => {
                const { [newId]: diluent, ...rest } = prev;
                return { ...rest, [serverParameterId]: diluent };
              });
            }

            if (otherInfoPerParam[newId]) {
              setOtherInfoPerParam((prev) => {
                const { [newId]: info, ...rest } = prev;
                return { ...rest, [serverParameterId]: info };
              });
            }

            if (additionalInfoPerParam[newId]) {
              setAdditionalInfoPerParam((prev) => {
                const { [newId]: additionalInfo, ...rest } = prev;
                return { ...rest, [serverParameterId]: additionalInfo };
              });
            }

            if (addedInstruments[newId]) {
              setAddedInstruments((prev) => {
                const { [newId]: instruments, ...rest } = prev;
                return { ...rest, [serverParameterId]: instruments };
              });
            }

            if (addedChemicals[newId]) {
              setAddedChemicals((prev) => {
                const { [newId]: chemicals, ...rest } = prev;
                return { ...rest, [serverParameterId]: chemicals };
              });
            }

            if (addedStandards[newId]) {
              setAddedStandards((prev) => {
                const { [newId]: standards, ...rest } = prev;
                return { ...rest, [serverParameterId]: standards };
              });
            }

            if (standardPreparationAssayPerParam[newId]) {
              setStandardPreparationAssayPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (samplePreparationPerParam[newId]) {
              setSamplePreparationPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (standardPreparationResidualSolventPerParam[newId]) {
              setStandardPreparationResidualSolventPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (samplePreparationRSPerParam[newId]) {
              setSamplePreparationRSPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (standardPreparationDissoPerParam[newId]) {
              setStandardPreparationDissoPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (samplePreparationDissoPerParam[newId]) {
              setSamplePreparationDissoPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (samplePreparationLodPerParam[newId]) {
              setSamplePreparationLodPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (samplePreparationROIPerParam[newId]) {
              setSamplePreparationROIPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (samplePreparationSulphatedAshPerParam[newId]) {
              setSamplePreparationSulphatedAshPerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            if (calculationsAssayPerParam[newId]) {
              setCalculationsAssayPerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsLodPerParam[newId]) {
              setCalculationsLodPerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsROIPerParam[newId]) {
              setCalculationsROIPerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsSulphatedAshPerParam[newId]) {
              setCalculationsSulphatedAshPerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsRSPerParam[newId]) {
              setCalculationsRSPerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsDissoPerParam[newId]) {
              setCalculationsDissoPerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsAssayFerrousFumaratePerParam[newId]) {
              setCalculationsAssayFerrousFumaratePerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (calculationsDissoFerrousFumaratePerParam[newId]) {
              setCalculationsDissoFerrousFumaratePerParam((prev) => {
                const { [newId]: calcs, ...rest } = prev;
                return { ...rest, [serverParameterId]: calcs };
              });
            }

            if (samplePrepDissoFerrousFumaratePerParam[newId]) {
              setSamplePrepDissoFerrousFumaratePerParam((prev) => {
                const { [newId]: preps, ...rest } = prev;
                return { ...rest, [serverParameterId]: preps };
              });
            }

            setToastMessage(
              `Parameter "${newParameter.parameterName}" added successfully!`,
            );
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            await insertWorksheetLog({
              worksheetId,
              parameterId: response.parameterId,
              action: "Parameter Added",
              remarks: `Parameter "${newParameter.parameterName}" (${newParameter.paraCode}) added`,
              employeeId,
              role,
            });
          } catch (error) {
            console.error("Error adding parameter:");
            console.error(
              "Error type:",
              error instanceof Error ? error.constructor.name : typeof error,
            );
            console.error(
              "Error message:",
              error instanceof Error ? error.message : String(error),
            );
            console.error("Full error object:", error);

            setAddedParameters((prev) => prev.filter((p) => p.id !== newId));

            const cleanupState = (setter: Function) => {
              setter((prev: any) => {
                const { [newId]: _, ...rest } = prev;
                return rest;
              });
            };

            cleanupState(setAnalyzedByPerParam);
            cleanupState(setParameterStatusPerParam);
            cleanupState(setColumnsPerParam);
            cleanupState(setDiluentPerParam);
            cleanupState(setOtherInfoPerParam);
            cleanupState(setAdditionalInfoPerParam);
            cleanupState(setShowAdditionalInfo);
            cleanupState(setAddedInstruments);
            cleanupState(setAddedChemicals);
            cleanupState(setAddedStandards);
            cleanupState(setStandardPreparationAssayPerParam);
            cleanupState(setSamplePreparationPerParam);
            cleanupState(setStandardPreparationResidualSolventPerParam);
            cleanupState(setSamplePreparationRSPerParam);
            cleanupState(setStandardPreparationDissoPerParam);
            cleanupState(setSamplePreparationDissoPerParam);
            cleanupState(setSamplePreparationLodPerParam);
            cleanupState(setSamplePreparationROIPerParam);
            cleanupState(setSamplePreparationSulphatedAshPerParam);
            cleanupState(setCalculationsAssayPerParam);
            cleanupState(setCalculationsLodPerParam);
            cleanupState(setCalculationsROIPerParam);
            cleanupState(setCalculationsSulphatedAshPerParam);
            cleanupState(setCalculationsRSPerParam);
            cleanupState(setCalculationsDissoPerParam);
            cleanupState(setDissoMediaPerParam);
            cleanupState(setMobilePhasePerParam);
            cleanupState(setShowMobilePhasePreparation);
            cleanupState(setShowBufferPreparation);
            cleanupState(setSamplePrepAssayFerrousFumaratePerParam);
            cleanupState(setCalculationsAssayFerrousFumaratePerParam);
            cleanupState(setCalculationsDissoFerrousFumaratePerParam);
            cleanupState(setSamplePrepDissoFerrousFumaratePerParam);
            cleanupState(setShowDiluentPreparation);
            cleanupState(setShowSystemSuitability);
            cleanupState(setSystemSuitabilityPerParam);

            setToastMessage(
              error instanceof Error
                ? `Failed to add parameter: ${error.message}`
                : "Failed to add parameter. Please try again.",
            );
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }
        }

        if (analystMode === "reassign") {
          const paramId = pendingParameter.id;

          setAnalyzedByPerParam((prev) => ({
            ...prev,
            [paramId]: employeeId,
          }));

          setToastMessage("Reassigning analyst...");
          setShowToast(true);

          const param = addedParameters.find((p) => p.id === paramId);
          if (param) {
            try {
              const paramData = {
                id: paramId,
                paraCode: param.paraCode,
                parameterName: param.parameterName,
                methodCode: param.methodCode,
                methodName: param.methodName,
                columnId: columnsPerParam[paramId] || null,
                diluentPreparation: diluentPerParam[paramId] || null,
                otherInfo: otherInfoPerParam[paramId] || null,
                analyzedBy: employeeId,
                approvedByReviewer: approvedByReviewerPerParam[paramId] || null,
                analysisStartDate: analysisStartDatePerParam[paramId] || null,
                analysisCompletionDate:
                  analysisCompletionDatePerParam[paramId] || null,
                revisionStartDate: revisionStartDatePerParam[paramId] || null,
                revisionCompletedDate: revisionCompletedDatePerParam[paramId] || null,
                approvedAtReviewer: approvedAtReviewerPerParam[paramId] || null,
                preparationCompletedBy:
                  preparationCompletedByPerParam[paramId] || null,
                preparationCompletedAt:
                  preparationCompletedAtPerParam[paramId] || null,
                remarksByAnalyst: remarksByAnalystPerParam[paramId] || null,
                status: parameterStatusPerParam[paramId] || "Created",
                instruments: (addedInstruments[param.id] || []).map((inst) => ({
                  instrumentId: inst.instrumentId,
                  name: inst.name,
                  instrumentTag: inst.instrumentTag,
                  make: inst.make,
                  calibrationDoneDate: inst.calibrationDoneDate,
                  calibrationDueDate: inst.calibrationDueDate,
                })),
                chemicals: (addedChemicals[param.id] || []).map((chem) => ({
                  slno: chem.slno,
                  name: chem.name,
                  code: chem.code,
                  make: chem.make,
                  batchNo: chem.batchNo,
                  expDate: chem.expDate,
                })),
                standards: (addedStandards[param.id] || []).map((std) => ({
                  serialNo: std.serialNo,
                  name: std.name,
                  batchNo: std.batchNo,
                  make: std.make,
                  purity: std.purity,
                  validity: std.validity,
                })),
                internalStandards: (addedInternalStandards[param.id] || []).map((std) => ({
                  serialNo: std.serialNo,
                  name: std.name,
                  batchNo: std.batchNo,
                  make: std.make,
                  purity: std.purity,
                  validity: std.validity,
                })),
                standardPreparations: [],
                samplePreparations: [],
                calculations: [],
                files: [],
              };

              const response = await updateParameter(paramId, paramData);

              if (response && response.parameterId) {
                setToastMessage("Analyst reassigned successfully!");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                await insertWorksheetLog({
                  worksheetId,
                  parameterId: paramId,
                  action: "Analyst Reassigned",
                  remarks: `Analyst reassigned for parameter "${param?.parameterName}"`,
                  employeeId,
                  role,
                });
              } else {
                console.error("Update failed: Invalid response from server");
                console.error("Response received:", response);

                setToastMessage(
                  "Analyst reassigned but failed to save. Please save manually.",
                );
                setShowToast(true);
                setTimeout(() => setShowToast(false), 4000);
              }
            } catch (error) {
              console.error("Error updating parameter:");
              console.error(
                "Error type:",
                error instanceof Error ? error.constructor.name : typeof error,
              );
              console.error(
                "Error message:",
                error instanceof Error ? error.message : String(error),
              );
              console.error("Full error object:", error);

              setToastMessage("Failed to reassign analyst. Please try again.");
              setShowToast(true);
              setTimeout(() => setShowToast(false), 4000);
            }
          } else {
            console.error("Parameter not found for reassignment");
            console.error("Parameter ID:", paramId);
            console.error(
              "Available parameters:",
              addedParameters.map((p) => ({ id: p.id, name: p.parameterName })),
            );
          }
        }

        setPendingParameter(null);
        setAnalystMode("add");
        setShowAnalystDialog(false);
        setShowParameterDropdown(false);
      } catch (error) {
        console.error("Error in handleAnalystSelected:");
        console.error(
          "Error type:",
          error instanceof Error ? error.constructor.name : typeof error,
        );
        console.error(
          "Error message:",
          error instanceof Error ? error.message : String(error),
        );
        console.error("Full error object:", error);
        console.error("Analyst Mode:", analystMode);
        console.error("Pending Parameter:", pendingParameter);

        setToastMessage("Failed to process parameter. Please try again.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };

  return {
    handleAnalystSelected,
  };
}
