import { Dialog, loadDialog } from "../../src/model/dialog";
import testStory from "./data/test.story.json";

describe("Dialog functionality tests", () => {
  describe("When the initial dialog is requested", () => {
    it("should return the default dialog", () => {
      // Given
      // When
      const testDialog = new Dialog("initial", "continuation", "final");

      // Then
      expect(testDialog.initial).toEqual("initial");
    });
  });

  describe("When the dialog questions are requested", () => {
    it("should return the available questions", () => {
      // Given
      const testDialog = loadDialog(testStory.characters[0].dialog);

      // When
      const questions = testDialog.getOptions();

      // Then
      expect(questions).toHaveLength(2);
      expect(questions[0]).toEqual("¿Dónde estaba usted la noche del crimen?");
      expect(questions[1]).toEqual("¿Qué opina de la víctima?");
    });
  });

  describe("When a question is asked", () => {
    it("should return the answer to the question", () => {
      // Given
      const testDialog = loadDialog(testStory.characters[0].dialog);

      // When
      const answer = testDialog.askQuestion(
        "¿Dónde estaba usted la noche del crimen?"
      );

      // Then
      expect(answer).toEqual(
        "Estaba en la cocina, preparando la cena para el señor y la señora."
      );
    });
    it("It should update the available questions", () => {
      // Given
      const testDialog = loadDialog(testStory.characters[0].dialog);

      // When
      testDialog.askQuestion("¿Dónde estaba usted la noche del crimen?");

      // Then
      expect(testDialog.getOptions()).toHaveLength(2);
      expect(testDialog.getOptions()[0]).toEqual(
        "¿Vio a alguien más en la casa?"
      );
      expect(testDialog.getOptions()[1]).toEqual(
        "¿Como era su relación laboral con la víctima?"
      );
    });
  });

  describe("The dialog is ended", () => {
    it("should return the final message", () => {
      // Given
      const testDialog = loadDialog(testStory.characters[0].dialog);

      // When
      const finalMessage = testDialog.final;

      // Then
      expect(finalMessage).toEqual(
        "Gracias por su tiempo, señora. Si tiene alguna información adicional, no dude en decírmelo."
      );
    });
  });
});
