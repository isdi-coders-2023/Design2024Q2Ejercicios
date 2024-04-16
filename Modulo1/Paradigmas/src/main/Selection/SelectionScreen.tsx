import { useState } from "react";
import basic from "../../stories/basic.story.json";
import basic2 from "../../stories/basic2.story.json";
import basic3 from "../../stories/basic3.story.json";
import { Story } from "../stories";
import styles from "./SelectionScreen.module.scss";

interface SelectionScreenProps {
  start: (story: Story) => void;
}

const stories: Story[] = [basic as Story, basic2 as Story, basic3 as Story];

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ start }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const startStory = () => {
    start(basic3 as Story);
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          {stories.map((story, i) => (
            <li
              key={i}
              className={`${styles.story} ${
                selectedStory === story ? styles.selected : ""
              }`}
              onClick={() => handleStoryClick(story)}
            >
              {story.title}
            </li>
          ))}
        </ul>
        <p className={styles.storyDescription}>
          {selectedStory ? selectedStory.initialDescription : ""}
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
