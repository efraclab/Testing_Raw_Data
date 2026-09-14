export function getDrugWorksheetParameterSummary(
  samplesData: any[],
  addedParameters: any[],
) {
  const availableToAdd = (samplesData ?? []).filter(
    (param) =>
      !addedParameters.find((added) => added.paraCode === param.paraCode),
  );

  const allParameters = (samplesData ?? []).map((data) => data.parameter);

  const uniqueMethods = [
    ...new Map(
      (samplesData ?? []).map((item) => [item.methodCode, item]),
    ).values(),
  ];

  const allMethods = uniqueMethods
    .map((item: any) => item.methodName)
    .filter((method: string) => method && method.trim() !== "");

  const testsRequiredDisplay = allParameters
    .filter((param: string) => param && param.trim() !== "")
    .join(", ");

  const methodsRequiredDisplay = allMethods.join(", ");

  return {
    availableToAdd,
    allParameters,
    testsRequiredDisplay,
    methodsRequiredDisplay,
  };
}
