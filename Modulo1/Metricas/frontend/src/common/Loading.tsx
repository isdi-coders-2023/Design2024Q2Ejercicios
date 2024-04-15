import { useEffect, useState } from "react";
import styles from "./Loading.module.scss";

export const Loading: React.FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev: number) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setCounter]);

  return (
    <div className={styles.loading}>
      <p className={styles.label}> Loading {counter}s... </p>
    </div>
  );
};
