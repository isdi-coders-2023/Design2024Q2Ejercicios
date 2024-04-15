import styles from "./GameScreen.module.scss";

interface GameOptionsProps {}

export const GameOptions: React.FC<GameOptionsProps> = () => {
  return (
    <section className={styles.options}>
      <button className={styles.chooseAnswer}>Opción 1</button>
      <button className={styles.chooseAnswer}>Opción 2</button>
      <button className={styles.chooseAnswer}>Opción 3</button>
      <button className={styles.chooseAnswer}>Opción 4</button>
      <button className={styles.chooseAnswer}>Opción 5</button>
    </section>
  );
};
