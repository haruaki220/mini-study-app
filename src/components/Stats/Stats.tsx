// import { useEffect, useState } from "react";
// import type { Span } from "../../types/study.ts";
// import { fetchSubjectSummary, fetchSummary } from "../../api/api.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import type { Span } from "../../types/study.ts";
import { spans } from "../../types/study.ts";
// import { getEndDate } from "../../utils/getEndDate.ts";
import { useStudyStats } from "../../hooks/useStudyStats.tsx";
import { formatSummaryData } from "../../utils/formatSummaryData.ts";
import StudyRatio from "../StudyRatio/StudyRatio.tsx";
import StudyTime from "../StudyTime/StudyTime.tsx";
import styles from "./Stats.module.css";

// const spans = ["1日", "1週間", "1か月", "1年"] as const;
// export type Span = (typeof spans)[number];

export default function Stats() {
  const { session } = useAuth();
  const token = session?.access_token;
  // const [span, setSpan] = useState<Span>("1日");
  // const [summaryData, setSummaryData] = useState<SummaryItem[]>([]);
  // const [selectedBar, setSelectedBar] = useState<number>(0);
  // const [subjectSummary, setSubjectSummary] = useState<SubjectSummaryItem[]>(
  //   [],
  // );
  // const [error, setError] = useState<string>("");
  const {
    span,
    setSpan,
    summaryData,
    subjectSummary,
    error,
    selectedBar,
    setSelectedBar,
    isLoading,
  } = useStudyStats(token);

  // API用にspanを変換
  // const spanKey: SpanKey = spanList[span];

  // const getSummaryData = async () => {
  //   try {
  //     if (!token) throw new Error("未認証です");
  //     const data = await fetchSummary(spanKey, token);
  //     setSummaryData(data);
  //     if (data.length > 0) {
  //       setSelectedBar(data.length - 1);
  //     }
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       setError(e.message);
  //     } else {
  //       setError("予期しないエラーが発生しました");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!token) return;
  //   getSummaryData();
  // }, [span, token]);

  // const getSubjectSummary = async () => {
  //   if (summaryData.length === 0) return;
  //   try {
  //     const start_date = summaryData[selectedBar].start_date;
  //     const end_date = getEndDate(start_date, span);
  //     const data = await fetchSubjectSummary(start_date, end_date, token);
  //     console.log(data);
  //     setSubjectSummary(data);
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       setError(e.message);
  //     } else {
  //       setError("予期しないエラーが発生しました");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getSubjectSummary();
  // }, [span, summaryData, selectedBar, token]);
  // console.log(selectedBar);

  return (
    <>
      <div className={styles.stats}>
        {isLoading ? (
          <p className="loading">loading...</p>
        ) : (
          <>
            <select
              className={styles.select}
              value={span}
              onChange={(e) => setSpan(e.target.value as Span)}
            >
              {spans.map((s, index) => (
                <option key={index} className={styles.option} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <StudyTime
              summaryData={formatSummaryData(summaryData, span)}
              handleBarStart={setSelectedBar}
              selectedBar={selectedBar}
            />
            {summaryData.length > 0 && (
              <StudyRatio
                totalTime={summaryData[selectedBar].total_minutes}
                subjectSummary={subjectSummary}
                startDate={summaryData[selectedBar].start_date}
                span={span}
              />
            )}
            {error && <div>{error}</div>}
          </>
        )}
      </div>
    </>
  );
}
