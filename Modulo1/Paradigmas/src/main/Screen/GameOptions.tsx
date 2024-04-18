import styles from "./GameScreen.module.scss";
import { useGameOptions } from "./useGameOptions";

type GameOptionsProps = {
  end: () => void;
};

export const GameOptions = ({ end }: GameOptionsProps) => {
  const { options } = useGameOptions();

  return (
    <section className={styles.options}>
      {options.map((option, index) => {
        return (
          <button key={index} onClick={option.handler ?? end}>
            {option.text}
          </button>
        );
      })}
    </section>
  );
};
