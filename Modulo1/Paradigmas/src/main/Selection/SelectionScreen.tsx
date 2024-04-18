import basic3 from "../../stories/basic3.story.json";
import { Story } from "../stories";
import styles from "./SelectionScreen.module.scss";
import { useSelectedStory } from "../Screen/useSelectedStory";

interface SelectionScreenProps {
  start: (story: Story) => void;
  stories: Story[];
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({
  start,
  stories,
}) => {
  const { selectedStory, selectStory } = useSelectedStory();
  const startStory = () => {
    start(basic3 as Story);
  };

  const selectionScreenInfo = stories.map((story) => {
    return {
      title: story.title,
      description: story.initialDescription,
    };
  });

  const onClickSelectStory = (index: number) => {
    selectStory(stories[index]);
  };

  return (
    <>
      <section className={styles.selectionScreen}>
        <ul className={styles.availableStories}>
          {selectionScreenInfo.map((story, index) => (
            <li
              key={index}
              className={styles.story}
              onClick={() => onClickSelectStory(index)}
            >
              {story.title}
            </li>
          ))}
        </ul>
        <p className={styles.storyDescription}>
          {selectedStory?.initialDescription}
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
