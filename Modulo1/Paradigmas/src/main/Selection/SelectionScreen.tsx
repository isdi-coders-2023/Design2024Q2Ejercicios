import basic3 from "../../stories/basic3.story.json";
import { Story } from "../stories";
import styles from "./SelectionScreen.module.scss";

interface SelectionScreenProps {
  start: (story: Story) => void;
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ start }) => {
  const startStory = () => {
    start(basic3 as Story);
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          <li className={`${styles.story}`}>Una de las historias</li>
          <li className={`${styles.story} ${styles.selected}`}>
            Una de las historias
          </li>
          <li className={`${styles.story}`}>Una de las historias</li>
        </ul>
        <p className={styles.storyDescription}>
          Esta debería ser la descripción de la historia cuando el usuario clica
          en ella
        </p>
      </section>
      <section className={styles.controls}>
        <button className={styles.comenzar} onClick={startStory}>
          Comenzar
        </button>
      </section>
    </>
  );
};
