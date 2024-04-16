import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { SelectionScreen } from "./Selection/SelectionScreen";
import { Story } from "./stories";
import { GameScreen } from "./Screen/GameScreen";
import story1 from "../stories/basic.story.json";
import story2 from "../stories/basic2.story.json";
import story3 from "../stories/basic3.story.json";

function App() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);

  const startStory = (story: Story) => {
    setCurrentStory(story);
  };

  const endStory = () => {
    setCurrentStory(null);
  };

  useEffect(() => {
    const stories = [story1, story2, story3] as Story[];

    setStories(stories);
  }, []);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Los Misterios de Mr. Poirot</h1>
      <h2 className={styles.subtitle}>Una aventura conversacional old-school</h2>
      {currentStory ? <GameScreen endGame={endStory} story={currentStory} /> : <SelectionScreen stories={stories} start={startStory} />}
    </div>
  );
}

export default App;
