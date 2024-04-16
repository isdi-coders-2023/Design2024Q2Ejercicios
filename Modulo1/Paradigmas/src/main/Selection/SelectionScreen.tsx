import basic3 from "../../stories/basic3.story.json";
import { Story } from "../stories";
import styles from "./SelectionScreen.module.scss";

interface SelectionScreenProps {
  start: (story: Story) => void;
  stories: Story[];
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ start, stories }) => {
  const startStory = () => {
    start(basic3 as Story);
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          {stories.map((story) => (
            <li className={`${styles.story}`}>{story.title}</li>
          ))}
        </ul>
        <p className={styles.storyDescription}>Esta debería ser la descripción de la historia cuando el usuario clica en ella</p>
      </section>
      <section className={styles.controls}>
        <button className={styles.comenzar} onClick={startStory}>
          Comenzar
        </button>
      </section>
    </>
  );
};
