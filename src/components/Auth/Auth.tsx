import { useState } from "react";
import Login from "../AccountAuth/Login.tsx";
import SignUp from "../AccountAuth/SignUp.tsx";
import Button from "../Button/Button.tsx";
import styles from "./Auth.module.css";

export default function Auth() {
  const [mode, setMode] = useState<"signup" | "login">("login");
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.welcome}>学習記録アプリへようこそ！</h2>
        {mode === "login" ? <Login /> : <SignUp />}
        {/* <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login"
            ? "アカウントをお持ちでない方はこちら"
            : "すでにアカウントをお持ちの方はこちら"}
        </button> */}
        <h4>{mode === "login"
            ? "アカウントをお持ちでない方はこちら"
            : "すでにアカウントをお持ちの方はこちら"}</h4>
        
        <Button
          variant="secondary"
          type="button"
          size="lg"
          disabled={false}
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode==="login"?"サインアップ":"ログイン"}
        </Button>
      </div>
      
    </>
  );
}
