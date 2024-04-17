import { Story } from "./stories";
import { Character } from "./game";

export interface LocationDescription {
  name: string;
  description: string;
  image: string;
}

export class Location {
  description: LocationDescription;
  connections: Location[];
  characters: Character[];

  constructor(name: string, image: string, description: string) {
    this.description = {
      name,
      image,
      description,
    };
    this.connections = [];
    this.characters = [];
  }

  addConnection(location: Location) {
    this.connections.push(location);
  }

  getDescription(): LocationDescription {
    return this.description;
  }

  getCharacters() {
    return this.characters;
  }
}

export class Map {
  defaultLocation: Location;
  currentLocation: Location;

  constructor(defaultLocation: Location) {
    this.defaultLocation = defaultLocation;
    this.currentLocation = defaultLocation;
  }

  getLocation() {
    return this.currentLocation;
  }

  getOptions() {
    return this.currentLocation.connections;
  }

  changeLocation(location: Location) {
    this.currentLocation = location;
  }
}

const getLocationsFromStory = (story: Story) => {
  return story.locations
    .map(
      (location) =>
        new Location(location.name, location.image, location.description)
    )
    .reduce((acc, location) => {
      acc[location.getDescription().name] = location;
      return acc;
    }, {} as Record<string, Location>);
};

const getCharactersFromStory = (story: Story) => {
  return story.characters
    .map(
      (character) =>
        new Character(character.id, character.name, character.description)
    )
    .reduce((acc, character) => {
      acc[character.getDescription().id] = character;
      return acc;
    }, {} as Record<string, Character>);
};

function completeConnections(
  locations: Record<string, Location>,
  story: Story
) {
  Object.values(locations).forEach((location) => {
    const connectionIds =
      story.locations.find(
        (originalLocation) =>
          originalLocation.name == location.getDescription().name
      )?.connections || [];

    location.connections = connectionIds.map(
      (connectionId) => locations[connectionId]
    );
  });
}

const completeCharacters = (
  locations: Record<string, Location>,
  characters: Record<string, Character>,
  story: Story
) => {
  Object.values(locations).forEach((location) => {
    const characterIds = story.characters
      .filter(
        (character) => character.location === location.getDescription().name
      )
      .map((character) => character.id);

    location.characters = characterIds.map(
      (characterId) => characters[characterId]
    );
  });
};

const loadLocations = (story: Story) => {
  const locations = getLocationsFromStory(story);
  const characters = getCharactersFromStory(story);

  completeConnections(locations, story);
  completeCharacters(locations, characters, story);

  return Object.values(locations);
};

export const loadMap = (story: Story) => {
  const locations = loadLocations(story);
  const defaultLocation = locations.find(
    (location) => location.getDescription().name === story.initialLocation
  );

  if (!defaultLocation) throw new Error("Initial location not found");

  return new Map(defaultLocation);
};
