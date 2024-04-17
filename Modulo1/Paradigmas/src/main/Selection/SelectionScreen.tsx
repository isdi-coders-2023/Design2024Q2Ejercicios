import basic1 from "../../stories/basic.story.json";
import basic2 from "../../stories/basic2.story.json";
import basic3 from "../../stories/basic3.story.json";
import { Story } from "../../model/stories";
import styles from "./SelectionScreen.module.scss";
import { useState } from "react";

const stories = [basic1, basic2, basic3] as Story[];

interface SelectionScreenProps {
  start: (story: Story) => void;
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ start }) => {
  const [selected, setSelected] = useState<Story | null>(null);

  const startStory = () => {
    start(basic3 as Story);
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          {stories.map((story) => (
            <li
              className={`${styles.story} ${
                selected?.title === story.title ? styles.selected : ""
              }`}
              key={story.title}
              onClick={() => setSelected(story)}
            >
              {story.title}
            </li>
          ))}
        </ul>
        <p className={styles.storyDescription}>
          {selected ? selected.initialDescription : "Selecciona una historia"}
        </p>
      </section>
      <section className={styles.controls}>
        <button className={`${styles.comenzar} `} onClick={startStory}>
          {selected ? "Comenzar" : "Selecciona una historia para comenzar"}
        </button>
      </section>
    </>
  );
};
