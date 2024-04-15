import { useState } from "react";
import { Character, DialogOption, Location, Story } from "../stories";
import { ConversationHistory } from "./ConversationHistory";
import { findScene } from "./sceneUtils";

type GameDataType = any[];

export const useGameData = (story: Story): GameDataType => {
  const [currentScene, setCurrentScene] = useState<Location | undefined>(
    undefined
  );

  const [currentCharacter, setCurrentCharacter] = useState<
    Character | undefined
  >(undefined);

  const [currentDialog, setCurrentDialog] = useState<DialogOption | undefined>(
    undefined
  );

  const changeScene = (location: Location) => () => {
    setCurrentCharacter(undefined);
    setCurrentScene(location);
  };

  const setupFirstScene = () => {
    if (!currentScene) {
      setCurrentScene(findScene(story, story.initialLocation));
    }
  };

  const startDialogWithCharacter = (character: Character) => () => {
    setCurrentCharacter(character);
  };

  const returnHandler = () => {
    setCurrentCharacter(undefined);
    setCurrentDialog(undefined);
  };

  const conversationChoiceHandler =
    (
      dialog: DialogOption,
      selectedConversation: ConversationHistory,
      selectedCharacter: Character
    ) =>
    () => {
      const newLines = [
        `Tú: ${dialog.question}`,
        `${selectedCharacter.name}: ${dialog.answer}`,
      ];

      setCurrentDialog(dialog);
      selectedConversation.lines.push(...newLines);
    };

  return [
    currentScene,
    currentCharacter,
    currentDialog,
    changeScene,
    setupFirstScene,
    startDialogWithCharacter,
    returnHandler,
    conversationChoiceHandler,
  ];
};
