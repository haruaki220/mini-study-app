import { useEffect, useState } from "react";
// import "..App.css";
import { useAuth } from "../context/AuthContext.tsx";
import { supabase } from "../lib/supabase.ts";
import type { StudyRecord } from "../types/study.ts";
import StudyForm from "./StudyForm.tsx";
import StudyList from "./StudyList.tsx";

function StudyApp() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]);
  // const [location, setLocation] = useState<"studyForm" | "studyList">(
  //   "studyList",
  // );
  const { session } = useAuth();

  const token = session?.access_token;

  const addRecord = async (
    subject: string,
    minutes: number | "",
    memo: string,
  ) => {
    if (!subject.trim()) return;
    if (minutes === "") return;
    if (!token) return;
    const response = await fetch("http://localhost:3000/api/study", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // id: crypto.randomUUID(),
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
    if (!token) return;
    const response = await fetch(`http://localhost:3000/api/study/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
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
    if (editMinutes === "") return;
    if (!token) return;
    const response = await fetch(`http://localhost:3000/api/study/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  // const fetchRecords = () => {
  //   fetch("http://localhost:3000/api/study")
  //     .then((res) => res.json())
  //     .then((data) => setStudyRecords(data));
  // };

  const fetchRecords = async () => {
    if (!token) return;
    const response = await fetch("http://localhost:3000/api/study", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setStudyRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, [token]);

  const handleLogout = async () => {
    const ok = window.confirm("ログアウトしますか");
    if (!ok) return;
    await supabase.auth.signOut();
  };

  return (
    // <>
    //   {location === "studyForm" && <StudyForm addRecord={addRecord} />}
    //   {location === "studyList" && (
    //     <StudyList
    //       studyRecords={studyRecords}
    //       deleteRecord={deleteRecord}
    //       updateRecord={updateRecord}
    //     />
    //   )}
    // </>

    <>
      <StudyForm addRecord={addRecord} />
      <StudyList
        studyRecords={studyRecords}
        deleteRecord={deleteRecord}
        updateRecord={updateRecord}
      />
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}

export default StudyApp;
