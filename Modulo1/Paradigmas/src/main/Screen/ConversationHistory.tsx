import styles from "./ConversationHistory.module.scss";

export interface ConversationHistory {
  character: string;

  lines: string[];
}

interface ConversationHistoryProps {
  conversationHistory: ConversationHistory[];
}

export const ConversationHistoryDisplay: React.FC<ConversationHistoryProps> = ({
  conversationHistory,
}) => {
  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.historyRoot}>
        {conversationHistory.map((conversation, index) => (
          <ul key={index} className={styles.history}>
            {conversation.lines.map((line, index) => (
              <li key={index} className={styles.line}>
                {line}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
