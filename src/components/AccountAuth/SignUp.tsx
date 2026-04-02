import { useState } from "react";
import { supabase } from "../../lib/supabase.ts";
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import styles from "./AccountAuth.module.css";
import type {AuthProps} from "../../types/study.ts";

export default function Login({setMode}:AuthProps) {
  const [mailInput, setMailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mailInput === "" || passwordInput === "") {
      setError("入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: mailInput,
        password: passwordInput,
      });
      console.log(data);

      if (error) {
        setError("メールアドレスまたはパスワードが違います");
        return;
      }

      if (data.session === null) {
        setMessage("確認メールを送信しました。メールを確認してください");
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
      <h3 className={styles.modeName}>サインアップ</h3>
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
          {loading ? "サインアップ中" : "サインアップ"}
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
          onClick={setMode}
        >
          ログイン
        </Button>
    </>
  );
}
