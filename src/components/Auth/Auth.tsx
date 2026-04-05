import { useState } from "react";
import eyeIcon from "../../assets/eyeIcon.png";
import eyeSlashIcon from "../../assets/eyeSlashIcon.png";
import { supabase } from "../../lib/supabase.ts";
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import styles from "./Auth.module.css";

export default function Auth() {
  const [mode, setMode] = useState<"signup" | "login">("login");
  const [mailInput, setMailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (mailInput === "" || passwordInput === "") {
      setError("入力してください");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        mode === "login"
          ? await supabase.auth.signInWithPassword({
              email: mailInput,
              password: passwordInput,
            })
          : await supabase.auth.signUp({
              email: mailInput,
              password: passwordInput,
            });

      if (error) {
        setError(error.message);
      }

      if (mode === "signup" && data.session === null) {
        setMessage("確認メールを送信しました。メールを確認してください");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("通信エラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setError("");
    setMessage("");
    setMailInput("");
    setPasswordInput("");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.welcome}>学習記録アプリ</h2>
        <h3 className={styles.modeName}>
          {mode === "login" ? "ログイン" : "新規登録"}
        </h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <p className={styles.label}>メールアドレス</p>
            <Input
              tag="input"
              type="email"
              value={mailInput}
              size="lg"
              placeholder="メールアドレスを入力"
              onChange={(e) => setMailInput(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <p className={styles.label}>パスワード</p>
            <div className={styles.passwordWrapper}>
              <Input
                tag="input"
                type={showPassword}
                value={passwordInput}
                size="lg"
                placeholder="パスワードを入力"
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <img
                id={styles.eyeIcon}
                src={showPassword === "password" ? eyeSlashIcon : eyeIcon}
                width={24}
                onClick={() =>
                  setShowPassword((prev) =>
                    prev === "password" ? "text" : "password",
                  )
                }
              />
            </div>
          </div>
          <Button variant="primary" type="submit" size="lg" disabled={loading}>
            {loading ? "処理中..." : mode === "login" ? "ログイン" : "新規登録"}
          </Button>
          {message && <div>{message}</div>}
          {error && <div>{error}</div>}
        </form>
        <h4>すでにアカウントをお持ちの方はこちら</h4>
        <Button
          variant="secondary"
          type="button"
          size="lg"
          disabled={false}
          onClick={switchMode}
        >
          {mode === "login" ? "新規登録" : "ログイン"}
        </Button>
      </div>
    </>
  );
}
