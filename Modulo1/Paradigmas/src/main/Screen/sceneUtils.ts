import { Location, Story } from "../stories";

export const findScene = (story: Story, sceneName: string) => {
  return story.locations.find((location) => location.name === sceneName);
};

export const getCharactersInLocation = (story: Story, locationName?: string) =>
  locationName
    ? story.characters.filter(
        (character) => character.location === locationName
      )
    : [];

export const getSceneLocations = (story: Story, scene?: Location) =>
  scene
    ? story.locations.filter((location) =>
        scene?.connections.includes(location.name)
      )
    : [];
