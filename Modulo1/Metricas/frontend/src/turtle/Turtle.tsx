import React, { useEffect, useState } from "react";
import { retrieveData } from "../common/network";
import { DataLoadingManagement } from "../common/DataLoadingManagement";
import { City, assertTypeIsCity } from "../types/cities";
import styles from "./turtle.module.scss";

interface TurtleProps {
  debug: boolean;
}

interface DataTableProps {
  data: Record<string, City[]>;
}

interface StateProps {
  state: string;
  cities: City[];
}

const State: React.FC<StateProps> = ({ state, cities }) => {
  const selectedCities = cities.slice(0, 3);

  return (
    <div key={state} className={styles.state}>
      <h2>{state}</h2>
      <ul className={styles.citiesList}>
        {selectedCities.map((city) => (
          <li key={city.name} className={styles.city}>
            {city.name} - {city.population}
          </li>
        ))}
        <li>...</li>
      </ul>
    </div>
  );
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const sampleKeys = Object.keys(data).slice(0, 4);

  return (
    <div className={styles.turtle}>
      {sampleKeys.map((state) => (
        <State key={state} state={state} cities={data[state]} />
      ))}
    </div>
  );
};

const alreadyInserted = (city: City, cities: City[]): boolean => {
  return cities.some((c) => c.name === city.name);
};

const sortCityByPopulation = (data: City[]): City[] => {
  const sortedCities: City[] = [];

  for (let i = 0; i < data.length; i++) {
    let biggest: City | null = null;

    for (const comparedCity of data) {
      if (alreadyInserted(comparedCity, sortedCities)) {
        continue;
      }

      if (!biggest || comparedCity.population > biggest.population) {
        biggest = comparedCity;
      }
    }

    if (biggest) {
      sortedCities.push(biggest);
    }
  }

  return sortedCities;
};

const filterCitiesByPopulation = (data: City[]): City[] => {
  return data.filter((city) => city.population > 100000);
};

const getStatesFromCities = (data: City[]): string[] => {
  const states: string[] = [];

  for (const city of data) {
    let found = false;

    for (const state of states) {
      if (state === city.state) {
        found = true;
      }
    }

    if (!found) {
      states.push(city.state);
    }
  }

  return states;
};

const getCitiesFromState = (data: City[], state: string): City[] => {
  return data.filter((city) => city.state === state);
};

const groupCitiesByState = (data: City[]): Record<string, City[]> => {
  const states = getStatesFromCities(data);
  const groupedCities: Record<string, City[]> = {};

  for (const state of states) {
    groupedCities[state] = getCitiesFromState(data, state);
  }

  return groupedCities;
};

const processCityData = (data: City[]): Record<string, City[]> => {
  const sortedCities = sortCityByPopulation(data);
  const filteredCities = filterCitiesByPopulation(sortedCities);
  const groupedCities = groupCitiesByState(filteredCities);

  return groupedCities;
};

export const Turtle: React.FC<TurtleProps> = ({ debug }) => {
  const [data, setData] = useState<Record<string, City[]> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    retrieveData("turtle", debug)
      .then(assertTypeIsCity)
      .then(processCityData)
      .then((data) => data && setData(data))
      .catch((error) => setError(error.message));
  }, [debug]);

  return (
    <div className={styles.slug}>
      <DataLoadingManagement data={data} error={error} render={(data) => <DataTable data={data as Record<string, City[]>} />} />
    </div>
  );
};
