import { useEffect, useState } from "react";
import { Character, DialogOption, Story } from "../stories";
import {
  ConversationHistory,
  ConversationHistoryDisplay,
} from "./ConversationHistory";
import { GameOptions } from "./GameOptions";
import styles from "./GameScreen.module.scss";
import { StoryInfo } from "./StoryInfo";
import { OptionType } from "./game";
import {
  createLocationReturnOption,
  getConversationOptions,
  getLocationOptions,
} from "./optionHandlers";
import { getCharactersInLocation } from "./sceneUtils";
import { useGameData } from "./gameDataHook";

function continueDialog(
  conversationHistory: ConversationHistory[],
  currentDialog: DialogOption,
  extractConversationOption: (
    selectedConversation: ConversationHistory,
    selectedCharacter: Character
  ) => (dialog: DialogOption) => OptionType,
  currentCharacter: Character
) {
  const selectedConversation =
    conversationHistory[conversationHistory.length - 1];

  const conversationOptions: OptionType[] = (currentDialog?.options || []).map(
    extractConversationOption(selectedConversation, currentCharacter)
  );

  return conversationOptions;
}

function initiateDialog(
  currentCharacter: Character,
  setConversationHistory: any,
  conversationHistory: ConversationHistory[],
  extractConversationOption: (
    selectedConversation: ConversationHistory,
    selectedCharacter: Character
  ) => (dialog: DialogOption) => OptionType
) {
  const initialConversation = createInitialConversation(currentCharacter);

  setConversationHistory([...conversationHistory, initialConversation]);

  const conversationOptions: OptionType[] = (
    currentCharacter.dialog.options || []
  ).map(extractConversationOption(initialConversation, currentCharacter));

  return conversationOptions;
}

function createInitialConversation(currentCharacter: Character) {
  return {
    character: currentCharacter.name,
    lines: [
      `${currentCharacter.description}\n`,
      `${currentCharacter.name}: ${currentCharacter.dialog.initial}`,
    ],
  };
}

interface GameScreenProps {
  story: Story;
  endGame: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ story, endGame }) => {
  const [conversationHistory, setConversationHistory] = useState<
    ConversationHistory[]
  >([]);

  const [currentOptions, setCurrentOptions] = useState<OptionType[]>([]);

  const [
    currentScene,
    currentCharacter,
    currentDialog,
    changeScene,
    setupFirstScene,
    startDialogWithCharacter,
    returnHandler,
    conversationChoiceHandler,
  ] = useGameData(story);

  useEffect(setupFirstScene, [story]);

  const extractConversationOption =
    (selectedConversation: ConversationHistory, selectedCharacter: Character) =>
    (dialog: DialogOption): OptionType => ({
      type: "conversation",
      text: dialog.question,
      handler: conversationChoiceHandler(
        dialog,
        selectedConversation,
        selectedCharacter
      ),
    });

  useEffect(() => {
    let newOptions: OptionType[] = [];

    if (currentCharacter) {
      if (!currentDialog) {
        newOptions = initiateDialog(
          currentCharacter,
          setConversationHistory,
          conversationHistory,
          extractConversationOption
        );
      } else {
        newOptions = continueDialog(
          conversationHistory,
          currentDialog,
          extractConversationOption,
          currentCharacter
        );
      }

      const locationOptions: OptionType[] =
        createLocationReturnOption(returnHandler);

      newOptions.push(...locationOptions);
    } else {
      const charactersInLocation = getCharactersInLocation(
        story,
        currentScene?.name
      );

      const conversationOptions: OptionType[] = getConversationOptions(
        charactersInLocation,
        startDialogWithCharacter
      );

      const locationOptions: OptionType[] = getLocationOptions(
        story,
        currentScene,
        changeScene
      );

      newOptions = [...conversationOptions, ...locationOptions];
    }

    const endGameOption: OptionType = {
      type: "end",
      text: "Salir del juego",
      handler: endGame,
    };

    setCurrentOptions([...newOptions, endGameOption] || []);
  }, [currentCharacter, currentDialog, currentScene, story, endGame]);

  return (
    <>
      <section className={styles.gameScreen}>
        <StoryInfo
          image={currentScene?.image}
          description={currentScene?.description}
        />
        <ConversationHistoryDisplay conversationHistory={conversationHistory} />
      </section>
      <GameOptions options={currentOptions} />
    </>
  );
};
