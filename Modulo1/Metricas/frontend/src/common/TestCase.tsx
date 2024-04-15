import { Flipper } from "./Flipper";
import styles from "./TestCase.module.scss";

interface TestCaseProps {
  name: string;
  image: string;
  children: React.ReactNode;
}

export const TestCase: React.FC<TestCaseProps> = ({
  name,
  image,
  children,
}: TestCaseProps) => {
  return (
    <div className={styles.testCase}>
      <h1 className={styles.heading}>{name}</h1>
      <Flipper image={image}>{children}</Flipper>
    </div>
  );
};
