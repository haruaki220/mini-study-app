import { useEffect, useState } from "react";
import { fetchRecords, postRecord, putRecord, removeRecord } from "../api/api";
import type { StudyRecord } from "../types/study";

export function useStudyRecords(token: string | undefined) {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]);
  const [location, setLocation] = useState<"studyForm" | "studyList" | "stats">(
    "studyList",
  );
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRecords = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchRecords(token);
      setStudyRecords(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecords();
  }, [token]);

  const addRecord = async (
    subject: string,
    minutes: number | "",
    memo: string,
  ) => {
    if (!subject.trim()) return;
    if (minutes === "") return;
    try {
      setError("");
      await postRecord(subject, minutes, memo, token);
      setStudyRecords(await fetchRecords(token));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      setError("");
      await removeRecord(id, token);
      setStudyRecords(await fetchRecords(token));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  const updateRecord = async (
    id: string,
    editSubject: string,
    editMinutes: number | "",
    editMemo: string,
  ) => {
    if (!editSubject.trim()) return;
    if (editMinutes === "") return;
    try {
      setError("");
      await putRecord(id, editSubject, editMinutes, editMemo, token);
      setStudyRecords(await fetchRecords(token));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  return {
    studyRecords,
    location,
    isLoading,
    setLocation,
    error,
    setError,
    addRecord,
    deleteRecord,
    updateRecord,
  };
}
