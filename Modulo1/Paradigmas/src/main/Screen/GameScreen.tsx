import { useEffect, useState } from "react";
import { Location, Story } from "../stories";
import { ConversationHistoryDisplay } from "./ConversationHistory";
import { GameOptions } from "./GameOptions";
import styles from "./GameScreen.module.scss";
import { StoryInfo } from "./StoryInfo";

interface GameScreenProps {
  story: Story;
}

export const GameScreen: React.FC<GameScreenProps> = ({ story }) => {
  const [currentScene, setCurrentScene] = useState<Location | undefined>(
    undefined
  );

  useEffect(() => {
    if (story) {
      setCurrentScene(story.locations[0]);
    }
  }, [story]);

  return (
    <>
      <section className={styles.gameScreen}>
        <StoryInfo
          image={currentScene?.image}
          description={currentScene?.description}
        />
        <ConversationHistoryDisplay />
      </section>
      <GameOptions />
    </>
  );
};
