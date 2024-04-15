import React from "react";
import styles from "./App.module.scss";
import { TestCase } from "./common/TestCase";
import { Sloth } from "./sloth/Sloth";
import { Slug } from "./slug/Slug";
import { Turtle } from "./turtle/Turtle";

interface ButtonBarProps {
  debug: boolean;
  handleDebug: () => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ debug, handleDebug }) => {
  return (
    <div className={styles.buttonBar}>
      <button
        className={`${styles.button} ${
          debug ? styles.buttonPressed : styles.buttonReleased
        }`}
        onClick={handleDebug}
      >
        Debug
      </button>
    </div>
  );
};

function App() {
  const [debug, setDebug] = React.useState(false);

  const handleDebugButton = () => {
    setDebug((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <ButtonBar debug={debug} handleDebug={handleDebugButton} />
      <TestCase name="sloth" image="sloth.jpg">
        <Sloth debug={debug} />
      </TestCase>
      <TestCase name="turtle" image="turtle.jpg">
        <Turtle debug={debug} />
      </TestCase>
      <TestCase name="slug" image="slug.jpg">
        <Slug debug={debug} />
      </TestCase>
    </div>
  );
}

export default App;
