import { useEffect, useState } from "react";
import { fetchSubjectSummary, fetchSummary } from "../api/api.ts";
import type {
  Span,
  SpanKey,
  SubjectSummaryItem,
  SummaryItem,
} from "../types/study.ts";
import { spanList } from "../types/study.ts";
import { getEndDate } from "../utils/getEndDate.ts";

export function useStudyStats(token: string | undefined) {
  const [span, setSpan] = useState<Span>("1日");
  const [summaryData, setSummaryData] = useState<SummaryItem[]>([]);
  const [selectedBar, setSelectedBar] = useState<number>(0);
  const [subjectSummary, setSubjectSummary] = useState<SubjectSummaryItem[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const spanKey: SpanKey = spanList[span];

  const getSummaryData = async () => {
    try {
      // setIsLoading(true);
      setError("");
      const data = await fetchSummary(spanKey, token);
      setSummaryData(data);
      if (data.length > 0) {
        setSelectedBar(data.length - 1);
      }
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
    if (!token) return;
    getSummaryData();
  }, [span, token]);

  const getSubjectSummary = async () => {
    if (summaryData.length === 0) return;
    try {
      setError("");
      if(!summaryData[selectedBar]) return;
      const start_date = summaryData[selectedBar].start_date;
      const end_date = getEndDate(start_date, span);
      const data = await fetchSubjectSummary(start_date, end_date, token);
      console.log(data);
      setSubjectSummary(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  useEffect(() => {
    if(!token) return;
    getSubjectSummary();
  }, [span, summaryData, selectedBar, token]);
  console.log(selectedBar);

  return {
    span,
    setSpan,
    summaryData,
    subjectSummary,
    error,
    selectedBar,
    setSelectedBar,
    isLoading,
  };
}
