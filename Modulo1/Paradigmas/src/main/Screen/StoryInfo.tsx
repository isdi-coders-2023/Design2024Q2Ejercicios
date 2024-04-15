import styles from "./GameScreen.module.scss";

interface StoryInfoProps {
  image?: string;
  description?: string;
}

export const StoryInfo: React.FC<StoryInfoProps> = ({ image, description }) => {
  return (
    <div className={styles.storyInfo}>
      {image && (
        <img src={`./img/${image}`} className={styles.sceneImage}></img>
      )}
      <p className={styles.storyDescription}>
        {description || "No description available"}
      </p>
    </div>
  );
};
