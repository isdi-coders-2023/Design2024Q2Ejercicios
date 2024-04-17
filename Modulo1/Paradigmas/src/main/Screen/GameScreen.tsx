import { useEffect, useMemo, useState } from "react";
import { Game, GameOption } from "../../model/game";
import { Story } from "../../model/stories";
import { ConversationHistoryDisplay } from "./ConversationHistory";
import { GameOptions } from "./GameOptions";
import styles from "./GameScreen.module.scss";
import { StoryInfo } from "./StoryInfo";
import { LocationDescription } from "../../model/location";

interface GameScreenProps {
  story: Story;
  endGame: () => void;
}

const createLoadingDescription = (): LocationDescription => ({
  name: "Cargando...",
  description: "Cargando...",
  image: "",
});

export const GameScreen: React.FC<GameScreenProps> = ({ story, endGame }) => {
  const [locationDescription, setLocationDescription] =
    useState<LocationDescription>(createLoadingDescription());

  const [options, setOptions] = useState<GameOption[]>([]);

  const game = useMemo(() => new Game(story), [story]);

  const updateGame = () => {
    setLocationDescription(game.getLocationDescription());
    setOptions(game.getOptions());
  };

  useEffect(() => {
    updateGame();

    game.addObserver(updateGame);
  }, [game]);

  const selectHandler = (option: GameOption) => {
    game.chooseOption(option);
  };

  return (
    <>
      <section className={styles.gameScreen}>
        <StoryInfo
          image={locationDescription.image}
          description={locationDescription.description}
        />
        <ConversationHistoryDisplay />
      </section>

      <GameOptions options={options} select={selectHandler} />
    </>
  );
};
