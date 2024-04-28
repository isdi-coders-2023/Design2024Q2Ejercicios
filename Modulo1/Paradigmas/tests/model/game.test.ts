import { Game } from "../../src/model/game";
import { Story } from "../../src/model/stories";
import story from "./data/test.story.json";

describe("Game tests", () => {
  describe("When a game is created", () => {
    it("should have a map and a state", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const map = testGame.map;
      const state = testGame.state;

      // Then
      expect(map).toBeDefined();
      expect(state).toBeDefined();
    });

    it("should have a default state of moving", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const state = testGame.state;

      // Then
      expect(state).toEqual("moving");
    });

    it("should have a map with the default location", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const location = testGame.map.getLocation();

      // Then
      expect(location.getDescription().name).toEqual(story.locations[0].name);
    });
  });

  describe("When the location description is requested", () => {
    it("should return the description of the current location", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const description = testGame.getLocationDescription();

      // Then
      expect(description.name).toEqual(story.locations[0].name);
    });
  });

  describe("When the state is moving and the options are requested", () => {
    it("should return the location options", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const options = testGame.getOptions();

      // Then
      expect(options).toHaveLength(4);
      expect(options[0].getType()).toEqual("location");
      expect(options[1].getType()).toEqual("location");
    });

    it("should return the character options", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const options = testGame.getOptions();

      // Then
      expect(options).toHaveLength(4);
      expect(options[2].getType()).toEqual("character");
    });

    it("should return the end option", () => {
      // Given
      const testGame = new Game(story as Story);

      // When
      const options = testGame.getOptions();

      // Then
      expect(options).toHaveLength(4);
      expect(options[3].getType()).toEqual("end");
    });
  });

  describe("When a location option is selected", () => {
    it("should not change the game state", () => {
      // Given
      const testGame = new Game(story as Story);
      const locationOptions = testGame.getOptions();

      // When
      testGame.chooseOption(locationOptions[0]);

      // Then
      expect(testGame.state).toEqual("moving");
    });

    it("should change the current location of the map", () => {
      // Given
      const testGame = new Game(story as Story);
      const locationOptions = testGame.getOptions();

      // When
      testGame.chooseOption(locationOptions[0]);

      // Then
      expect(testGame.map.getLocation().getDescription().name).toEqual(
        story.locations[1].name
      );
    });
  });

  describe("When a character option is selected", () => {
    it("should change the game state", () => {
      // Given
      const testGame = new Game(story as Story);
      const characterOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "character");

      // When
      testGame.chooseOption(characterOptions[0]);

      // Then
      expect(testGame.state).toEqual("talking");
    });

    test.todo("should return the initial line of the character");
  });

  describe("When the talking options are requested", () => {
    it("should return the dialog options", () => {
      // Given
      const testGame = new Game(story as Story);
      const characterOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "character");

      // When
      testGame.chooseOption(characterOptions[0]);
      const options = testGame.getOptions();

      // Then
      expect(options).toHaveLength(4);
      expect(options[0].getType()).toEqual("dialog");
      expect(options[1].getType()).toEqual("dialog");

      expect(options[0].getDescription().name).toEqual(
        "¿Dónde estaba usted la noche del crimen?"
      );
      expect(options[1].getDescription().name).toEqual(
        "¿Qué opina de la víctima?"
      );
    });

    it("should return the exit option", () => {
      // Given
      const testGame = new Game(story as Story);
      const characterOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "character");

      // When
      testGame.chooseOption(characterOptions[0]);
      const options = testGame.getOptions();

      // Then
      expect(options).toHaveLength(4);
      expect(options[2].getType()).toEqual("exit");
    });

    it("should return the end option", () => {
      // Given
      const testGame = new Game(story as Story);
      const characterOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "character");

      // When
      testGame.chooseOption(characterOptions[0]);
      const options = testGame.getOptions();

      // Then
      expect(options).toHaveLength(4);
      expect(options[3].getType()).toEqual("end");
    });
  });

  describe("When a dialog option is selected", () => {
    it("should return the correct answer", () => {
      // Given
      const testGame = new Game(story as Story);
      const characterOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "character");

      // When
      testGame.chooseOption(characterOptions[0]);
      const dialogOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "dialog");

      const answer = testGame.chooseOption(dialogOptions[0]);

      // Then
      expect(answer).toEqual(
        "Estaba en la cocina, preparando la cena para el señor y la señora."
      );
    });
  });

  describe("When a follow-up dialog option is selected", () => {
    it("should return the correct answer", () => {
      // Given
      const testGame = new Game(story as Story);
      const characterOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "character");

      // When
      testGame.chooseOption(characterOptions[0]);
      const dialogOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "dialog");

      testGame.chooseOption(dialogOptions[0]);
      const followUpDialogOptions = testGame
        .getOptions()
        .filter((option) => option.getType() === "dialog");

      const answer = testGame.chooseOption(followUpDialogOptions[0]);

      // Then
      expect(answer).toEqual(
        "No, no vi a nadie más. Estaba solo en la cocina."
      );
    });
  });
});
