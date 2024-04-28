import { useEffect, useMemo, useState } from "react";
import { ConversationHistory, Game, GameOption } from "../../model/game";
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

const useGame = (story: Story) => {
  const [locationDescription, setLocationDescription] =
    useState<LocationDescription>(createLoadingDescription());

  const [options, setOptions] = useState<GameOption[]>([]);

  const [history, setHistory] = useState<ConversationHistory[]>([]);

  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const game = useMemo(() => new Game(story), [story]);

  const updateGame = () => {
    setLocationDescription(game.getLocationDescription());
    setOptions(game.getOptions());
    setHistory(game.getHistory());
    setGameFinished(game.isGameEnded());
  };

  useEffect(() => {
    updateGame();

    game.addObserver(updateGame);
  }, [game]);

  const selectHandler = (option: GameOption) => {
    game.chooseOption(option);
  };

  return { locationDescription, options, selectHandler, history, gameFinished };
};

export const GameScreen: React.FC<GameScreenProps> = ({ story, endGame }) => {
  const { locationDescription, options, history, gameFinished, selectHandler } =
    useGame(story);

  useEffect(() => {
    if (gameFinished) {
      endGame();
    }
  }, [gameFinished, endGame]);

  return (
    <>
      <section className={styles.gameScreen}>
        <StoryInfo
          image={locationDescription.image}
          description={locationDescription.description}
        />
        <ConversationHistoryDisplay history={history} />
      </section>

      <GameOptions options={options} select={selectHandler} />
    </>
  );
};
