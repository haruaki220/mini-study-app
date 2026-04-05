import type { SpanKey } from "../types/study";

export const fetchSummary = async (
  spanKey: SpanKey,
  token: string | undefined,
) => {
  if (!token) return;
  const response = await fetch(
    `http://localhost:3000/api/study/summary?span=${spanKey}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) {
    throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  const data = await response.json();

  return data;
};

export const fetchSubjectSummary = async (
  start_date: string,
  end_date: string,
  token: string | undefined,
) => {
  if (!token) return;
  const response = await fetch(
    `http://localhost:3000/api/study/subject_summary?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) {
    throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  const data = await response.json();

  return data;
};

export const fetchRecords = async (token: string | undefined) => {
  if (!token) return [];
  const response = await fetch("http://localhost:3000/api/study", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const postRecord = async (
  subject: string,
  minutes: number | "",
  memo: string,
  token: string | undefined,
) => {
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
  if (!response.ok) {
    throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  // const data = await response.json();
};

export const removeRecord = async (
  id: string,
  token: string | undefined,
) => {
  if (!token) return;
  const response = await fetch(`http://localhost:3000/api/study/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  // const data = await response.json();
};

export const putRecord = async (
  id: string,
  editSubject: string,
  editMinutes: number | "",
  editMemo: string,
  token: string | undefined,
) => {
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
  if (!response.ok) {
    throw new Error(`サーバーからの応答が異常です: ${response.status}`);
  }
  // const data = await response.json();
};
