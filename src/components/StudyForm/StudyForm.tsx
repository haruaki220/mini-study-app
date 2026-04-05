import { useState } from "react";
import type { StudyFormProps } from "../../types/study.ts";
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import styles from "./StudyForm.module.css";

export default function StudyForm({ addRecord }: StudyFormProps) {
  const [subject, setSubject] = useState<string>("");
  const [minutes, setMinutes] = useState<number | "">("");
  const [memo, setMemo] = useState<string>("");

  return (
    <>
      <div className={styles.form}>
        <div className={styles.row}>
          <p className={styles.label}>教科</p>
          <Input
            tag="input"
            type="text"
            value={subject}
            size="lg"
            placeholder="例： 数学"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>時間</p>

          <div className={styles.inputMin}>
            <Input
              tag="input"
              type="number"
              value={minutes}
              size="sm"
              min={0}
              placeholder="例： 30"
              onChange={(e) => {
                const v = e.target.value;

                if (v === "") {
                  setMinutes("");
                  return;
                }

                const value = Number(e.target.value);
                if (value >= 0) setMinutes(value);
              }}
            />
            <span>分</span>
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>メモ</p>
          <Input
            tag="textarea"
            value={memo}
            size="lg"
            placeholder="学習内容やメモを入力"
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <div className={styles.buttonArea}>
          <Button
            variant="primary"
            type="button"
            size="lg"
            disabled={false}
            onClick={() => {
              addRecord(subject, minutes, memo);
            }}
          >
            記録を追加
          </Button>
        </div>
      </div>
    </>
  );
}
