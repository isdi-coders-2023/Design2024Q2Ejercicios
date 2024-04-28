import { ConversationHistory } from "../../model/game";
import styles from "./ConversationHistory.module.scss";

interface ConversationHistoryProps {
  history: ConversationHistory[];
}

export const ConversationHistoryDisplay: React.FC<ConversationHistoryProps> = ({
  history,
}) => {
  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.historyRoot}>
        {history.map((historyItem, index) => (
          <ul key={index} className={styles.history}>
            <li className={styles.character}>{historyItem.character}</li>
            {historyItem.lines.map((line, lineIndex) => (
              <li key={lineIndex} className={styles.line}>
                {line}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
