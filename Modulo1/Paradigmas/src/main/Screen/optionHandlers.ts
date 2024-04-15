import { Character, Location, Story } from "../stories";
import { OptionType } from "./game";
import { getSceneLocations } from "./sceneUtils";

export const getLocationOptions = (
  story: Story,
  currentScene: Location | undefined,
  changeSceneHandler: (location: Location) => () => void
): OptionType[] => {
  return getSceneLocations(story, currentScene).map((location) => ({
    type: "location",
    text: `Ir a ${location.name}`,
    handler: changeSceneHandler(location),
  }));
};

export const getConversationOptions = (
  charactersInLocation: Character[],
  startDialog: (character: Character) => () => void
): OptionType[] => {
  return charactersInLocation.map((character) => ({
    type: "conversation",
    text: `Hablar con ${character.name}`,
    handler: startDialog(character),
  }));
};

export function createLocationReturnOption(
  returnHandler: () => void
): OptionType[] {
  return [
    {
      type: "location",
      text: "Volver",
      handler: returnHandler,
    },
  ];
}
