import { useEffect, useState } from "react";
import { fetchSubjectSummary, fetchSummary } from "../api/api.ts";
import { getEndDate } from "../utils/getEndDate.ts";
import type { Span, SubjectSummaryItem, SummaryItem } from "../types/study.ts";
import { spanList } from "../types/study.ts";

export function useStudyStats(token: string | undefined) {
  const [span, setSpan] = useState<Span>("1日"); //統計表示の単位（日,週,月,年）
  const [summaryData, setSummaryData] = useState<SummaryItem[]>([]); //棒グラフ表示用の学習時間の集計データ
  const [selectedBar, setSelectedBar] = useState<number>(0); //選択中の期間インデックス（グラフと連動）
  const [subjectSummary, setSubjectSummary] = useState<SubjectSummaryItem[]>(
    [],
  ); //円グラフ表示用の教科別学習時間の集計データ
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const spanKey = spanList[span]; //spanをバックエンド用に変換

  // 指定した期間単位で学習時間の集計データを取得し、結果をstateに反映
  const getSummaryData = async () => {
    try {
      setIsLoading(true);
      setError("");
      if (!token) throw new Error("未認証です");
      const data = await fetchSummary(spanKey, token);
      setSummaryData(data);

      if (data.length > 0) {
        setSelectedBar(data.length - 1); // 選択中の棒グラフを最新の期間のものにする
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
    getSummaryData();
  }, [span, token]);

  // 選択している期間の教科別学習時間の統計を取得しstateに反映
  con getSubjectSummary = async () => {
    if (summaryData.length === 0) return; // 元となるデータが存在しない場合の対処
    if (!summaryData[selectedBar]) return; // 選択中のデータが存在しない場合の対処
    try {
      setError("");
      if (!token) throw new Error("未認証です");
      const start_date = summaryData[selectedBar].start_date;
      const end_date = getEndDate(start_date, span);
      const data = await fetchSubjectSummary(start_date, end_date, token);
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
    getSubjectSummary();
  }, [span, summaryData, selectedBar, token]);

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
