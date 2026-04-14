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
  const [loading, setLoading] = useState<boolean>(false); //非同期の認証処理中trueとなり、ボタンをクリック不可にする
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password",
  ); //パスワード表示管理（textで表示・passwordで非表示）

  // supabaseのauthAPIで認証を行い、結果をUI（エラーやメッセージ）に反映する中核処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    //入力が空の場合APIを呼ばずエラー表示
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
        return;
      }

      //サインアップ時メール確認前はsessionが発行されないため、その場合は確認を促す
      if (mode === "signup" && data.session === null) {
        setMessage("確認メールを送信しました。メールを確認してください");
      } 
    } catch (e) {
      /*通信エラー等supabase以外で発生した例外を処理*/
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("通信エラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  //ログインとサインアップを切り替え、エラー・入力・表示状態をリセットする関数
  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setError("");
    setMessage("");
    setMailInput("");
    setPasswordInput("");
    setShowPassword("text");
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
        <h4>
          {mode === "login"
            ? "アカウントをお持ちでない方はこちら"
            : "すでにアカウントをお持ちの方はこちら"}
        </h4>
        <Button
          variant="secondary"
          type="button"
          size="lg"
          disabled={loading}
          onClick={switchMode}
        >
          {mode === "login" ? "新規登録" : "ログイン"}
        </Button>
      </div>
    </>
  );
}
