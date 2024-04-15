import { useState } from "react";
import styles from "./App.module.scss";
import { SelectionScreen } from "./Selection/SelectionScreen";
import { Story } from "./stories";
import { GameScreen } from "./Screen/GameScreen";

function App() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  const startStory = (story: Story) => {
    setCurrentStory(story);
  };

  const endStory = () => {
    setCurrentStory(null);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Los Misterios de Mr. Poirot</h1>
      <h2 className={styles.subtitle}>
        Una aventura conversacional old-school
      </h2>
      {currentStory ? (
        <GameScreen endGame={endStory} story={currentStory} />
      ) : (
        <SelectionScreen start={startStory} />
      )}
    </div>
  );
}

export default App;
