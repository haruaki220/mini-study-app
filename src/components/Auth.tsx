import { useState } from "react";
import Login from "./Login.tsx";
import SignUp from "./SignUp.tsx";

export default function Auth() {
  const [mode, setMode] = useState<"signup" | "login">("login");
  return (
    <>
      <div>
        <h2>学習記録アプリへようこそ！</h2>
      </div>
      {mode === "login" ? <Login /> : <SignUp />}
      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login"
          ? "アカウントをお持ちでない方はこちら"
          : "すでにアカウントをお持ちの方はこちら"}
      </button>
    </>
  );
}
