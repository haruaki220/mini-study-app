import type { ButtonProps } from "../../types/study.ts";
import styles from "./Button.module.css";

//アプリ全体で使用するボタンを共通化し再利用するためのコンポーネント（variantやsizeによってスタイルを切り替え）
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
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${active ? styles.active : ""}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
