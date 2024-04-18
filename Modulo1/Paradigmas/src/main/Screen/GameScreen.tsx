import { useEffect, useState } from "react";
import { Location } from "../stories";
import { ConversationHistoryDisplay } from "./ConversationHistory";
import { GameOptions } from "./GameOptions";
import styles from "./GameScreen.module.scss";
import { StoryInfo } from "./StoryInfo";
import { useSelectedStory } from "./useSelectedStory";

type GameScreeProps = {
  end: () => void;
};

export const GameScreen = ({ end }: GameScreeProps) => {
  const { selectedStory } = useSelectedStory();

  const [currentScene, setCurrentScene] = useState<Location | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedStory) {
      setCurrentScene(selectedStory.locations[0]);
    }
  }, [selectedStory]);

  return (
    <>
      <section className={styles.gameScreen}>
        <StoryInfo
          image={currentScene?.image}
          description={currentScene?.description}
        />
        <ConversationHistoryDisplay />
      </section>
      <GameOptions end={end} />
    </>
  );
};
