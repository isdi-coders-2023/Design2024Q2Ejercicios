import { useState } from "react";
import { useSelectedStory } from "./useSelectedStory";
import { Location } from "../stories";

export type OptionType = {
  type: string;
  text: string;
  name?: string;
  handler: (name?: string) => void;
};

const useGameOptions = () => {
  const { selectedStory } = useSelectedStory();

  const initialLocation = selectedStory?.initialLocation;

  const [currentScene, setCurrentScene] = useState<Location | undefined>(
    undefined
  );

  const [locationOptions, setLocationOptions] = useState(
    selectedStory?.locations.filter(
      (location) => location.name !== initialLocation
    ) ?? []
  );

  const [characterOptions, setCharacterOptions] = useState(
    selectedStory?.characters.filter(
      (character) => character.location === initialLocation
    ) ?? []
  );

  const mapLocationsAndCharactersIntoOptions = () => {
    const locationsOptions = locationOptions?.map((location) => {
      return {
        type: "location",
        text: `Ir a ${location.name}`,
        name: location.name,
        handler: (locationName?: string) => {
          const currentScene =
            selectedStory?.locations.filter((location) => {
              return location.name === locationName;
            }) ?? [];

          console.log("currentScene", currentScene);
          setCurrentScene(currentScene[0]);
        },
      };
    });

    const charactersOptions = characterOptions?.map((character) => {
      return {
        type: "character",
        text: `Hablar con ${character.name}`,
        name: character.name,
        handler: () => {
          console.log(character);
          console.log(`Hablar con ${character.name}`);
        },
      };
    });

    return [...charactersOptions, ...locationsOptions];
  };

  const selectedStoryOptions = mapLocationsAndCharactersIntoOptions();

  const endGameOption = {
    type: "end",
    text: "Salir del juego",
    handler: () => {},
  };

  const options: OptionType[] = [...selectedStoryOptions, endGameOption];

  return {
    options,
    characterOptions,
    locationOptions,
    setLocationOptions,
    setCharacterOptions,
    currentScene,
    setCurrentScene,
  };
};

export { useGameOptions };
