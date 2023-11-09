"use client";
import styles from "./Button.module.css";

function Button({ count, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {count}
    </button>
  );
}

export default Button;
