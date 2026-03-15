import type { InputProps } from "../../types/study.ts";
import styles from "./Input.module.css";

export default function Input({
  tag,
  id,
  type,
  value,
  size,
  placeholder,
  min,
  onChange,
}: InputProps) {
  return tag === "input" ? (
    <input
      className={`${styles.inputArea} ${styles[size]}`}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      min={min}
      onChange={onChange}
    />
  ) : (
    <textarea
      className={`${styles.inputArea} ${styles[size]}`}
      id={id}
      value={value}
      rows={size==="lg"?5:2}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
}
