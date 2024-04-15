import React, { useEffect, useState } from "react";
import { DataLoadingManagement } from "../common/DataLoadingManagement";
import { retrieveData } from "../common/network";
import styles from "./Slug.module.scss";
import { People } from "../types/people";

interface SlugProps {
  debug: boolean;
}

interface DataTableProps {
  data: VisualizationData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className={styles.friendsTable}>
      {data.map((person) => (
        <div
          className={styles.person}
          key={`${person.firstName}-${person.lastName}`}
        >
          <div className={styles.personName}>
            {person.firstName} {person.lastName}
          </div>
          <div className={styles.personFriends}>
            {person.friends.map((friend) => (
              <div className={styles.friend} key={friend}>
                {friend}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const assertTypeIsPeople = (data: any): People[] => {
  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  return data;
};

const completeWithFriends = (person: People): string[] => {
  const friendNames: string[] = [];

  if (!person || !person.friends || !Array.isArray(person.friends)) {
    return [];
  }

  for (const friend of person.friends) {
    friendNames.push(`${friend.firstName} ${friend.lastName}`);
  }

  return friendNames;
};

interface VisualizationData {
  firstName: string;
  lastName: string;

  friends: string[];
}

const processPeopleData = (data: People[]): VisualizationData[] => {
  const limits = data
    .slice(0, 50)
    .reduce(
      (acc, person) => {
        return [
          ...acc,
          acc[acc.length - 1] + (person.friends ? person.friends.length : 1),
        ];
      },
      [0]
    )
    .filter((limit) => limit < 10);

  console.log(limits);
  const sample = data.slice(0, limits.length - 1);
  const completedSample: VisualizationData[] = [];

  for (const person of sample) {
    completedSample.push({
      firstName: person.firstName,
      lastName: person.lastName,
      friends: completeWithFriends(person),
    });
  }

  return completedSample;
};

export const Slug: React.FC<SlugProps> = ({ debug }) => {
  const [data, setData] = useState<VisualizationData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    retrieveData("slug", debug)
      .then(assertTypeIsPeople)
      .then(processPeopleData)
      .then((data) => data && setData(data))
      .catch((error) => setError(error.message));
  }, [debug]);

  return (
    <div className={styles.slug}>
      <DataLoadingManagement
        data={data}
        error={error}
        render={(data) => <DataTable data={data as VisualizationData[]} />}
      />
    </div>
  );
};
