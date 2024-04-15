export interface City {
  name: string;
  country: string;
  state: string;
  population: number;
  latitude: number;
  longitude: number;
  timeZone: string;

  id?: string;
  distanceToNearestCityInTheState?: number;
  classification: "small" | "medium" | "large";
}

export const assertTypeIsCity = (data: any): City[] => {
  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  return data;
};
