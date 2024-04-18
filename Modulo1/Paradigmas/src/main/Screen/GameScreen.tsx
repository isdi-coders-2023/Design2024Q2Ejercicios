import { useEffect } from "react";
import { Location } from "../stories";
import { ConversationHistoryDisplay } from "./ConversationHistory";
import { GameOptions } from "./GameOptions";
import styles from "./GameScreen.module.scss";
import { StoryInfo } from "./StoryInfo";
import { useSelectedStory } from "./useSelectedStory";
import { useGameOptions } from "./useGameOptions";

type GameScreeProps = {
  end: () => void;
};

export const GameScreen = ({ end }: GameScreeProps) => {
  const { selectedStory } = useSelectedStory();
  const { options, setCurrentScene, currentScene } = useGameOptions();

  useEffect(() => {
    if (selectedStory) {
      setCurrentScene(selectedStory.locations[0] as Location);
    }
  }, [selectedStory]);

  console.log(currentScene);
  return (
    <>
      <section className={styles.gameScreen}>
        <StoryInfo
          image={currentScene?.image}
          description={currentScene?.description}
        />
        <ConversationHistoryDisplay />
      </section>
      <GameOptions options={options} end={end} />
    </>
  );
};
