import React, { useEffect, useState } from "react";
import { DataLoadingManagement } from "../common/DataLoadingManagement";
import { retrieveData } from "../common/network";
import styles from "./Sloth.module.scss";
import { City, assertTypeIsCity } from "../types/cities";

interface SlothProps {
  debug: boolean;
}

interface DataTableProps {
  data: Partial<City>[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className={styles.slothTable}>
      <div className={`${styles.slothRow} ${styles.slothRowHeader}`}>
        <div className={styles.slothCellName}>Name</div>
        <div className={styles.slothCellPopulation}>Population</div>
        <div className={styles.slothCellCategory}>Classification</div>
        <div className={styles.slothCellDistance}>Distance</div>
      </div>
      {data.map((city) => (
        <div key={city.name} className={styles.slothRow}>
          <div className={styles.slothCellName}>{city.name}</div>
          <div className={styles.slothCellPopulation}>{city.population}</div>
          <div className={styles.slothCellCategory}>{city.classification}</div>
          <div className={styles.slothCellDistance}>
            {city.distanceToNearestCityInTheState?.toFixed(2) || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
};

const classifyByPopulation = (city: City): City => {
  const population = city.population;
  if (population < 100000) {
    return { ...city, classification: "small" };
  } else if (population < 1000000) {
    return { ...city, classification: "medium" };
  } else {
    return { ...city, classification: "large" };
  }
};

const assignId = (city: City): City => {
  return { ...city, id: `${city.name}-${city.population}` };
};

const computDistancesToNearestCityInTheState = (
  cities: City[],
  city: City,
  _: number,
  originalCities: City[]
) => {
  const citiesInTheSameState = originalCities
    .filter((filteredCity: any) => filteredCity.id !== city.id)
    .filter((filteredCity: any) => filteredCity.state === city.state);

  const distanceToNearestCity = citiesInTheSameState.reduce(
    (minDistance: number, otherCity: any) => {
      const distance = Math.sqrt(
        Math.pow(city.longitude - otherCity.longitude, 2) +
          Math.pow(city.latitude - otherCity.latitude, 2)
      );

      return distance < minDistance ? distance : minDistance;
    },
    Infinity
  );

  return [
    ...cities,
    {
      ...city,
      distanceToNearestCityInTheState: distanceToNearestCity,
    },
  ];
};

const isolatedCities = (threshold: number) => (city: City) => {
  return (
    city.distanceToNearestCityInTheState &&
    city.distanceToNearestCityInTheState > threshold
  );
};

const toVisualizationData = (city: City): Partial<City> => {
  return {
    name: city.name,
    population: city.population,
    classification: city.classification,
    distanceToNearestCityInTheState: city.distanceToNearestCityInTheState,
  };
};

const processCityData = (data: City[]): Partial<City>[] => {
  return data
    .map(classifyByPopulation)
    .map(assignId)
    .reduce(
      (a, v, i, o) => computDistancesToNearestCityInTheState(a, v, i, o),
      [] as City[]
    )
    .filter(isolatedCities(10))
    .sort(
      (a: City, b: City) =>
        (b.distanceToNearestCityInTheState || 0) -
        (a.distanceToNearestCityInTheState || 0)
    )
    .map(toVisualizationData)
    .slice(0, 5);
};

export const Sloth: React.FC<SlothProps> = ({ debug }) => {
  const [data, setData] = useState<Partial<City>[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    retrieveData("sloth", debug)
      .then(assertTypeIsCity)
      .then(processCityData)
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }, [debug]);

  return (
    <div className={styles.sloth}>
      <DataLoadingManagement
        data={data}
        error={error}
        render={(localData) => (
          <DataTable data={localData as Partial<City>[]} />
        )}
      />
    </div>
  );
};
