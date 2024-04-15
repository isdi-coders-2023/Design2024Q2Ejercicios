import styles from "./ConversationHistory.module.scss";

export interface ConversationHistory {
  character: string;

  lines: string[];
}

interface ConversationHistoryProps {}

export const ConversationHistoryDisplay: React.FC<
  ConversationHistoryProps
> = () => {
  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.historyRoot}>
        <ul className={styles.history}>
          <li className={styles.line}>
            La línea de presentación del personaje
          </li>
          <li className={styles.line}>Tú: pregunta al personaje</li>
          <li className={styles.line}>Personaje: su contestación</li>
          <li className={styles.line}>Tú: pregunta al personaje</li>
          <li className={styles.line}>Personaje: su contestación</li>
          <li className={styles.line}>Tú: pregunta al personaje</li>
          <li className={styles.line}>Personaje: su contestación</li>
        </ul>
      </div>
    </div>
  );
};
