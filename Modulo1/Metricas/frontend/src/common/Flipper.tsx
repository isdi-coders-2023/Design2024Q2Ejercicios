import React from "react";
import styles from "./Flipper.module.scss";

interface FlipperProps {
  image: string;
  children: React.ReactNode;
}

export const Flipper: React.FC<FlipperProps> = ({ image, children }) => {
  const [show, setShow] = React.useState(false);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={styles.flipper} onClick={handleShow}>
      {!show && (
        <div className={styles.cover}>
          <img src={image} />
        </div>
      )}
      {show && <div className={styles.content}>{children}</div>}
    </div>
  );
};
