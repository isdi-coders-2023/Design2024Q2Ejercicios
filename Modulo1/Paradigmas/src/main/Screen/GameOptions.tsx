import styles from "./GameScreen.module.scss";
import { OptionType } from "./useGameOptions";

type GameOptionsProps = {
  end: () => void;
  options: OptionType[];
};

export const GameOptions = ({ options, end }: GameOptionsProps) => {
  return (
    <section className={styles.options}>
      {options.map((option) => {
        const handleClick = option.handler
          ? () => option.handler(option.name)
          : end;

        return (
          <button key={option.text} onClick={handleClick}>
            {option.text}
          </button>
        );
      })}
    </section>
  );
};
