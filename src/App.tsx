import { useEffect, useState } from "react";
import "./App.css";
import StudyForm from "./components/StudyForm.tsx";
import StudyList from "./components/StudyList.tsx";
import type { StudyRecord } from "./types/study.ts";

function App() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]);

  const addRecord = async (
    subject: string,
    minutes: number | "",
    memo: string,
  ) => {
    if (!subject.trim()) return;
    if (minutes === "") return;
    const response = await fetch("http://localhost:3000/api/study", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        subject: subject,
        minutes: minutes,
        memo: memo,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchRecords();
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/study/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchRecords();
  };

  const updateRecord = async (
    id: string,
    editSubject: string,
    editMinutes: number | "",
    editMemo: string,
  ) => {
    if (editMinutes === "")return;
    const response = await fetch(`http://localhost:3000/api/study/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: editSubject,
        minutes: editMinutes,
        memo: editMemo,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchRecords();
  };

  const fetchRecords = () => {
    fetch("http://localhost:3000/api/study")
      .then((res) => res.json())
      .then((data) => setStudyRecords(data));
  };

  useEffect(fetchRecords, []);

  return (
    <>
      <div>
        <StudyForm addRecord={addRecord} />
        <StudyList
          studyRecords={studyRecords}
          deleteRecord={deleteRecord}
          updateRecord={updateRecord}
        />
      </div>
    </>
  );
}

export default App;
