import type { InputProps } from "../../types/study.ts";
import styles from "./Input.module.css";

//フォーム入力のUIを共通化するコンポーネント（sizeに応じてスタイルを切り替え）
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
      rows={size === "lg" ? 5 : 2} //sizeに応じてtextareaの行数を調整
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
}
