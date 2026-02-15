import { useState } from "react";
import type { StudyFormProps } from "../types/study.ts";

export default function StudyForm({
  addRecord,
  handleAddStudy,
}: StudyFormProps) {
  const [subject, setSubject] = useState<string>("");

  return (
    <>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      <button
        onClick={() => {
          addRecord(subject);
          handleAddStudy(subject);
        }}
      >
        追加
      </button>
    </>
  );
}
