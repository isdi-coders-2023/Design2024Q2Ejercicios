import { OptionType } from "./game";
import styles from "./GameScreen.module.scss";

interface GameOptionsProps {
  options: OptionType[];
}

export const GameOptions: React.FC<GameOptionsProps> = ({ options }) => {
  return (
    <section className={styles.options}>
      {options.map((option, index) => (
        <button
          key={index}
          className={styles.chooseAnswer}
          onClick={option.handler}
        >
          {option.text}
        </button>
      ))}
    </section>
  );
};
