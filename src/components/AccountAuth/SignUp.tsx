import { useState } from "react";
import { supabase } from "../../lib/supabase.ts";
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import styles from "./AccountAuth.module.css";

export default function Login() {
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
      <h3 className={styles.modeName}>サインアップ</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <p className={styles.label}>メールアドレス</p>
          {/* <input
            type="email"
            value={mailInput}
            onChange={(e) => setMailInput(e.target.value)}
          /> */}
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
          {/* <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          /> */}
          <Input
            tag="input"
            type="password"
            value={passwordInput}
            size="lg"
            placeholder="パスワードを入力"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        {/* <button type="submit" disabled={loading}>
          {loading ? "サインアップ中" : "サインアップ"}
        </button> */}
        <Button variant="primary" type="submit" size="lg" disabled={loading}>
          {loading ? "サインアップ中" : "サインアップ"}
        </Button>
      </form>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
    </>
  );
}
