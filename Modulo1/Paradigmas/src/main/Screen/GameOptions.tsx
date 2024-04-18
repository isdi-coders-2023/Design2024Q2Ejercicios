import { GameOption } from "../../model/game";
import styles from "./GameScreen.module.scss";

type OptionMappingType = {
  [key: string]: (option: GameOption) => string;
};

const optionMapping: OptionMappingType = {
  location: (option: GameOption) => `Ir a ${option.getDescription().name}`,
  character: (option: GameOption) =>
    `Hablar con ${option.getDescription().name}`,
  dialog: (option: GameOption) => `${option.getDescription().name}`,
  exit: (option: GameOption) => option.getDescription().name,
  end: (option: GameOption) => option.getDescription().name,
};

interface OptionProps {
  handler: () => void;
  description: string;
}

const Option: React.FC<OptionProps> = ({ description, handler }) => {
  return (
    <button className={styles.chooseAnswer} onClick={handler}>
      {description}
    </button>
  );
};

interface GameOptionsProps {
  options: GameOption[];
  select: (option: GameOption) => void;
}

export const GameOptions: React.FC<GameOptionsProps> = ({
  options,
  select,
}) => {
  return (
    <section className={styles.options}>
      {options.map((option, index) => {
        return (
          <Option
            key={index}
            handler={() => select(option)}
            description={optionMapping[option.getType()](option)}
          />
        );
      })}
    </section>
  );
};
