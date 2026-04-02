import { useState } from "react";
import { supabase } from "../../lib/supabase.ts";
import type { AuthProps } from "../../types/study.ts";
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import styles from "./AccountAuth.module.css";

export default function Login({ setMode }: AuthProps) {
  const [mailInput, setMailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mailInput === "" || passwordInput === "") {
      setError("入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: mailInput,
        password: passwordInput,
      });

      if (error) {
        setError("メールアドレスまたはパスワードが違います");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.welcome}>学習記録アプリ</h2>
      <h3 className={styles.modeName}>ログイン</h3>
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
          <Input
            tag="input"
            type="password"
            value={passwordInput}
            size="lg"
            placeholder="パスワードを入力"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit" size="lg" disabled={loading}>
          {loading ? "ログイン中" : "ログイン"}
        </Button>
        {error && <div>{error}</div>}
      </form>

      <h4>アカウントをお持ちでない方はこちら</h4>
      <Button
        variant="secondary"
        type="button"
        size="lg"
        disabled={false}
        onClick={setMode}
      >
        サインアップ
      </Button>
    </>
  );
}
