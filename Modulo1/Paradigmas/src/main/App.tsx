import styles from "./App.module.scss";
import { SelectionScreen } from "./Selection/SelectionScreen";
import { Story } from "./stories";
import { GameScreen } from "./Screen/GameScreen";
import story1 from "../stories/basic.story.json";
import story2 from "../stories/basic2.story.json";
import story3 from "../stories/basic3.story.json";
import { useSelectedStory } from "./Screen/useSelectedStory";

function App() {
  const { selectStory, selectedStory } = useSelectedStory();
  const stories = [story1, story2, story3];

  const startStory = (story: Story) => {
    selectStory(story);
  };

  const endStory = () => {
    selectStory(null);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Los Misterios de Mr. Poirot</h1>
      <h2 className={styles.subtitle}>
        Una aventura conversacional old-school
      </h2>
      {selectedStory ? (
        <GameScreen end={endStory} />
      ) : (
        <SelectionScreen start={startStory} stories={stories} />
      )}
    </div>
  );
}

export default App;
