import { Story } from "../../src/model/stories";
import { loadMap } from "../../src/model/location";
import testStory from "./data/test.story.json";

describe("Map functionality tests", () => {
  describe("When the initial location of a map is requested", () => {
    it("It should return the default location", () => {
      // Given
      // When
      const testMap = loadMap(testStory as Story);

      // Then
      expect(testMap.getLocation().getDescription().name).toEqual(
        testStory.locations[0].name
      );
    });
  });

  describe("When the location options in the map are requested", () => {
    it("should return the available options", () => {
      // Given
      const testMap = loadMap(testStory as Story);

      // When
      const locationOptions = testMap.getOptions();

      // Then
      expect(locationOptions).toHaveLength(2);
      expect(locationOptions[0].getDescription().name).toEqual(
        testStory.locations[1].name
      );
    });
  });

  describe("When a change in location is requested", () => {
    it("It should update the location of the map to the selected location", () => {
      // Given
      const testMap = loadMap(testStory as Story);

      // When
      testMap.changeLocation(testMap.getOptions()[0]);

      // Then
      expect(testMap.getLocation().getDescription().name).toEqual(
        testStory.locations[1].name
      );
    });
  });

  describe("When the characters in a location are requested", () => {
    it("It should return the characters in the current location of the map", () => {
      // Given
      const testMap = loadMap(testStory as Story);

      // When
      const characters = testMap.getLocation().characters;

      // Then
      expect(characters).toHaveLength(1);
      expect(characters[0].getDescription().name).toEqual(
        "Don Alfredo, mayordomo"
      );
    });
  });
});
