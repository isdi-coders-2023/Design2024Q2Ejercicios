export const retrieveData = async (
  entity: string,
  debug: boolean
): Promise<any> => {
  const response = await fetch(
    `http://localhost:3000/${entity}?${debug ? "debug=true" : ""}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
