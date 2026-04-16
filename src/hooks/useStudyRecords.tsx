import { useEffect, useState } from "react";
import { fetchRecords, postRecord, putRecord, removeRecord } from "../api/api";
import type { StudyRecord } from "../types/study";

export function useStudyRecords(token: string | undefined) {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]); //学習記録を管理する状態
  const [location, setLocation] = useState<"studyForm" | "studyList" | "stats">(
    "studyList",
  ); //表示する画面を管理する状態
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 以下の関数で使用するAPI処理は認証を前提としているので、tokenがない場合はエラーとする

  // 最新の学習記録を取得してstateに反映
  const getRecords = async () => {
    try {
      setIsLoading(true);
      setError("");
      if (!token) throw new Error("未認証です");
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

  // 学習記録を追加
  const addRecord = async (
    subject: string,
    minutes: number | "",
    memo: string,
  ) => {
    try {
      setError("");
      if (!token) throw new Error("未認証です");
      if (!subject.trim()) throw new Error("教科を入力してください");
      if (minutes === "") throw new Error("時間を入力してください");
      await postRecord(subject, minutes, memo, token);
      await getRecords();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  // 学習記録を削除
  const deleteRecord = async (id: string) => {
    try {
      setError("");
      if (!token) throw new Error("未認証です");
      await removeRecord(id, token);
      await getRecords();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  // 学習記録を編集
  const updateRecord = async (
    id: string,
    editSubject: string,
    editMinutes: number | "",
    editMemo: string,
  ) => {
    try {
      setError("");
      if (!token) throw new Error("未認証です");
      if (!editSubject.trim()) throw new Error("教科を入力してください");
      if (editMinutes === "") throw new Error("時間を入力してください");
      await putRecord(id, editSubject, editMinutes, editMemo, token);
      await getRecords();
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
