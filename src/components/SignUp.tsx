import { useState } from "react";
import { supabase } from "../lib/supabase.ts";

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
      <form onSubmit={handleSubmit}>
        <div>
          <span>email:</span>
          <input
            type="email"
            value={mailInput}
            onChange={(e) => setMailInput(e.target.value)}
          />
        </div>
        <div>
          <span>password:</span>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "サインアップ中" : "サインアップ"}
        </button>
      </form>
      {message && <div><span>{message}</span></div>}
      {error && <div><span>{error}</span></div>}
    </>
  );
}
