import { useEffect, useState } from "react";
import { fetchSubjectSummary, fetchSummary } from "../api/api.ts";
import type { Span, SubjectSummaryItem, SummaryItem } from "../types/study.ts";
import { spanList } from "../types/study.ts";
import { getEndDate } from "../utils/getEndDate.ts";

export function useStudyStats(token: string | undefined) {
  const [span, setSpan] = useState<Span>("1日"); //統計表示の単位（日,週,月,年）
  const [summaryData, setSummaryData] = useState<SummaryItem[]>([]); //棒グラフ表示用の学習時間の集計データ
  const [selectedBar, setSelectedBar] = useState<number>(0); //選択中の期間インデックス（グラフと連動）
  const [subjectSummary, setSubjectSummary] = useState<SubjectSummaryItem[]>(
    [],
  ); //円グラフ表示用の教科別学習時間の集計データ
  const [barError, setBarError] = useState<string>("");
  const [pieError, setPieError] = useState<string>("");
  const [barLoading, setBarLoading] = useState<boolean>(true);
  const [pieLoading, setPieLoading] = useState<boolean>(false);

  const spanKey = spanList[span]; //spanをバックエンド用に変換

  // 指定した期間単位で学習時間の集計データを取得し、結果をstateに反映
  const getSummaryData = async () => {
    try {
      setBarLoading(true);
      setBarError("");
      if (!token) throw new Error("未認証です");
      const data = await fetchSummary(spanKey, token);
      setSummaryData(data);

      if (data.length > 0) {
        setSelectedBar(data.length - 1); // 選択中の棒グラフを最新の期間のものにする
      }
    } catch (e) {
      if (e instanceof Error) {
        setBarError(e.message);
      } else {
        setBarError("予期しないエラーが発生しました");
      }
    } finally {
      setBarLoading(false);
    }
  };

  useEffect(() => {
    getSummaryData();
  }, [span, token]);

  // 選択している期間の教科別学習時間の統計を取得しstateに反映
  const getSubjectSummary = async () => {
    if (summaryData.length === 0) {
      setSubjectSummary([]); // summaryDataに合わせて空配列にセット
      setPieLoading(false);
      return;
    } // 元となるデータが存在しない場合の対処
    if (!summaryData[selectedBar]) {
      setPieLoading(false);
      return; // 選択中のデータが存在しない場合の対処
    }
    try {
      setPieLoading(true);
      setPieError("");
      if (!token) throw new Error("未認証です");
      const start_date = summaryData[selectedBar].start_date;
      const end_date = getEndDate(start_date, span);
      const data = await fetchSubjectSummary(start_date, end_date, token);
      setSubjectSummary(data);
    } catch (e) {
      if (e instanceof Error) {
        setPieError(e.message);
      } else {
        setPieError("予期しないエラーが発生しました");
      }
    } finally {
      setPieLoading(false);
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
    barError,
    pieError,
    selectedBar,
    setSelectedBar,
    barLoading,
    pieLoading,
  };
}
