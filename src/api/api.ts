import type { SpanKey } from "../types/study";
const API_BASE_URL = import.meta.env.VITE_API_URL; //バックエンドAPIのURL

// 以下の関数は認証を前提としているので、tokenがない場合はエラーとする
// UI側でのtokenチェックに加えて、直接以下の関数が呼ばれたときの対処として記述

// 認証済みユーザーの学習時間の合計を期間単位で集計したデータを取得する（統計画面の棒グラフに使用）
export const fetchSummary = async (
  spanKey: SpanKey,
  token: string | undefined,
) => {
  if (!token) {
    throw new Error("認証されていません");
  }
  const response = await fetch(
    `${API_BASE_URL}/api/study/summary?span=${spanKey}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
    // throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }

  return data;
};

// 指定した期間の教科別学習時間を取得する（統計画面の円グラフに使用）
export const fetchSubjectSummary = async (
  start_date: string,
  end_date: string,
  token: string | undefined,
) => {
  if (!token) {
    throw new Error("認証されていません");
  }
  const response = await fetch(
    `${API_BASE_URL}/api/study/subject_summary?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
    // throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }

  return data;
};

// 学習記録一覧を取得する（記録リストの表示に使用）
export const fetchRecords = async (token: string | undefined) => {
  if (!token) {
    throw new Error("認証されていません");
  }
  const response = await fetch(`${API_BASE_URL}/api/study`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
    // throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  return data;
};

// 学習記録を新規作成する（記録追加画面で使用）
export const postRecord = async (
  subject: string,
  minutes: number | "",
  memo: string,
  token: string | undefined,
) => {
  if (!token) {
    throw new Error("認証されていません");
  }
  const response = await fetch(`${API_BASE_URL}/api/study`, {
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
  if (!response.ok) {
    throw new Error(data.message);
  }
};

// 学習記録を削除する（記録リスト画面での削除操作に使用）
export const removeRecord = async (id: string, token: string | undefined) => {
  if (!token) {
    throw new Error("認証されていません");
  }
  const response = await fetch(`${API_BASE_URL}/api/study/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    // throw new Error(`サーバーからの応答が異常です: ${response.status}`);
    throw new Error(data.message);
  }
};

// 学習記録を編集する（記録リスト画面での編集操作に使用）
export const putRecord = async (
  id: string,
  editSubject: string,
  editMinutes: number | "",
  editMemo: string,
  token: string | undefined,
) => {
  if (!token) {
    throw new Error("認証されていません");
  }
  const response = await fetch(`${API_BASE_URL}/api/study/${id}`, {
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
  if (!response.ok) {
    // throw new Error(`サーバーからの応答が異常です: ${response.status}`);
    throw new Error(data.message);
  }
};
