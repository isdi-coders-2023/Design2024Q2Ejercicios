import { useState } from "react";
import basic3 from "../../stories/basic3.story.json";
import { Story } from "../stories";
import styles from "./SelectionScreen.module.scss";

interface SelectionScreenProps {
  start: (story: Story) => void;
  stories: Story[];
  setCurrentStory: React.Dispatch<React.SetStateAction<Story | null>>;
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ start, stories, setCurrentStory }) => {
  const startStory = () => {
    start(basic3 as Story);
  };

  const handleSetCurrentStory = (storyTitle: string) => {
    const selectedStory = stories.find((story) => story.title === storyTitle);
    if (selectedStory) {
      setCurrentStory(selectedStory);
    }
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          {stories.map((story) => (
            <li onClick={() => handleSetCurrentStory(story.title)} className={`${styles.story}`}>
              {story.title}
            </li>
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
