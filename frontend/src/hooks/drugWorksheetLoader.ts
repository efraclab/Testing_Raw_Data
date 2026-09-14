import type { SampleData } from "../models/SampleData";
import type { WorksheetDetail } from "../models/WorksheetDetail";
import type { FetchWorksheetRequest } from "../models/FetchWorksheetRequest";
import type { SmapleDetailsRequest } from "../models/SmapleDetailsRequest";
import { fetchSample, fetchWorksheetById } from "../services/api";

interface LoadDrugWorksheetDataArgs {
  worksheetId: string;
  employeeId: string;
  role: string;
  department: string;
}

interface LoadDrugWorksheetDataResult {
  worksheetData: WorksheetDetail;
  samples: SampleData[];
}

/**
 * Fetches the worksheet and its sample data together.
 * React state restoration stays inside DrugWorksheet for now.
 */
export async function loadDrugWorksheetData({
  worksheetId,
  employeeId,
  role,
  department,
}: LoadDrugWorksheetDataArgs): Promise<LoadDrugWorksheetDataResult> {
  const requestData: FetchWorksheetRequest = { employeeId, role };
  const worksheetData = await fetchWorksheetById(worksheetId, requestData);

  if (!worksheetData) {
    throw new Error("Worksheet not found");
  }

  const sampleRequest: SmapleDetailsRequest = {
    regNo: worksheetData.sample.registrationNo,
    lab: department,
  };

  const samples = await fetchSample(sampleRequest);

  return { worksheetData, samples };
}
