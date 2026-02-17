import { useState } from "react";
import type { StudyFormProps } from "../types/study.ts";

export default function StudyForm({ addRecord }: StudyFormProps) {
  const [subject, setSubject] = useState<string>("");
  const [minutes, setMinutes] = useState<number|"">("");
  const [memo, setMemo] = useState<string>("");

  return (
    <>
      <div>
        <span>教科：</span>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div>
        <span>時間：</span>
        <input
          type="number"
          min={0}
          value={minutes}
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
      </div>
      <div>
        <span>メモ：</span>
        <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>
      <button
        onClick={() => {
          addRecord(subject, minutes, memo);
        }}
      >
        追加
      </button>
    </>
  );
}
