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
  if(!response.ok){
    throw new Error(`サーバーからの応答が異常です: ${response.status}`)
  }
  const data = await response.json();

  return data;
};

export const fetchSubjectSummary = async (
  start_date: string,
  end_date: string,
  token: string | undefined,
) => {
  const response = await fetch(
    `http://localhost:3000/api/study/subject_summary?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if(!response.ok){
    throw new Error(`サーバーからの応答が異常です: ${response.status}`)
  }
  const data = await response.json();
  
  return data;
};
