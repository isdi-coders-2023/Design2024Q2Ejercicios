import { useEffect, useState } from "react";
import styles from "./SelectionScreen.module.scss";
import basic from "../../stories/basic.story.json";
import basic2 from "../../stories/basic2.story.json";
import basic3 from "../../stories/basic3.story.json";
import { Story } from "../stories";

const loadStoriesFromDisk = () => {
  const result: Story[] = [basic as Story, basic2 as Story, basic3 as Story];

  return result;
};

interface SelectionScreenProps {
  start: (story: Story) => void;
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ start }) => {
  const [stories, setStories] = useState([] as Story[]);
  const [selectedStory, setSelectedStory] = useState(null as Story | null);

  useEffect(() => {
    const stories = loadStoriesFromDisk();
    setStories(stories);
  }, []);

  const selectStory = (event: React.MouseEvent<HTMLLIElement>) => {
    const storyTitle = event.currentTarget.textContent;
    const story = stories.find((story) => story.title === storyTitle);

    if (story) {
      if (selectedStory && selectedStory.title === story.title) {
        setSelectedStory(null);
      } else {
        setSelectedStory(story);
      }
    }
  };

  const startStory = () => {
    if (selectedStory) {
      start(selectedStory);
    }
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          {stories.map((story) => (
            <li
              key={story.title}
              className={`${styles.story} ${
                selectedStory && selectedStory.title === story.title
                  ? styles.selected
                  : ""
              }`}
              onClick={selectStory}
            >
              {story.title}
            </li>
          ))}
        </ul>
        <p className={styles.storyDescription}>
          {selectedStory
            ? selectedStory.initialDescription
            : "Seleccione una historia para empezar a jugar"}
        </p>
      </section>
      <section className={styles.controls}>
        <button className={styles.comenzar} onClick={startStory}>
          {selectedStory ? "Comenzar" : "Seleccione historia"}
        </button>
      </section>
    </>
  );
};
