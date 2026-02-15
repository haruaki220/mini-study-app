import { useEffect, useState } from "react";
import "./App.css";
import StudyForm from "./components/StudyForm.tsx";
import StudyList from "./components/StudyList.tsx";
import type { StudyRecord } from "./types/study.ts";

function App() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>(() => {
    const saved = localStorage.getItem("studyRecords");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("studyRecords", JSON.stringify(studyRecords));
  }, [studyRecords]);

  const handleAddStudy = async(subject: string) =>{
    if (!subject.trim()) return;

    const response = await fetch('http://localhost:3000/api/study', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: subject,
        completed: false
      })
    })
    const data = await response.json()
    console.log(data)
  }

  const addRecord = (subject: string) => {
    if (!subject.trim()) return;
    const newRecord = {
      id: crypto.randomUUID(),
      subject: subject,
    };
    setStudyRecords((prev) => [...prev, newRecord]);
  };

  const deleteRecord = (id: string) => {
    setStudyRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const updateRecord = (id: string, editedSubject: string) => {
    setStudyRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, subject: editedSubject } : record,
      ),
    );
  };

  useEffect(()=>{
    fetch("http://localhost:3000/api/study")
    .then(res=>res.text())
    .then(data=>console.log(data))
  })

  return (
    <>
      <div>
        <StudyForm addRecord={addRecord} handleAddStudy={handleAddStudy} />
        <StudyList studyRecords={studyRecords} deleteRecord={deleteRecord} updateRecord={updateRecord}/>
      </div>
    </>
  );
}

export default App;
