import { useState } from "react";
import Login from "../AccountAuth/Login.tsx";
import SignUp from "../AccountAuth/SignUp.tsx";
import styles from "./Auth.module.css";

export default function Auth() {
  const [mode, setMode] = useState<"signup" | "login">("login");
  return (
    <>
      <div className={styles.wrapper}>
        {mode === "login" ? (
          <Login setMode={() => setMode("signup")} />
        ) : (
          <SignUp setMode={() => setMode("login")} />
        )}
      </div>
    </>
  );
}
