import { useSelectedStory } from "./useSelectedStory";

type OptionType = {
  type: string;
  text: string;
  handler?: () => void;
};

const useGameOptions = () => {
  const { selectedStory } = useSelectedStory();

  const initialLocation = selectedStory?.initialLocation;

  const locations =
    selectedStory?.locations.filter(
      (location) => location.name !== initialLocation
    ) ?? [];

  const characters =
    selectedStory?.characters.filter(
      (character) => character.location === initialLocation
    ) ?? [];

  const mapLocationsAndCharactersIntoOptions = () => {
    const locationsOptions = locations?.map((location) => {
      return {
        type: "location",
        text: `Ir a ${location.name}`,
        handler: () => {
          console.log(`Ir a ${location.name}`);
        },
      };
    });

    const charactersOptions = characters?.map((character) => {
      return {
        type: "character",
        text: `Hablar con ${character.name}`,
        handler: () => {
          console.log(`Hablar con ${character.name}`);
        },
      };
    });

    return [...locationsOptions, ...charactersOptions];
  };

  const selectedStoryOptions = mapLocationsAndCharactersIntoOptions();

  const endGameOption: OptionType = {
    type: "end",
    text: "Salir del juego",
  };

  const options = [...selectedStoryOptions, endGameOption];
  return { options };
};

export { useGameOptions };
