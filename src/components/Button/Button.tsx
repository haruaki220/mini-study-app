import type { ButtonProps } from "../../types/study.ts";
import styles from "./Button.module.css";

export default function Button({
  variant,
  type,
  size,
  disabled,
  children,
  active,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={
        active
          ? `${styles.button} ${styles[variant]} ${styles[size]} ${styles.active}`
          : `${styles.button} ${styles[variant]} ${styles[size]}`
      }
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
