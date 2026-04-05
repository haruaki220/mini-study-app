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

  return (
    <>
      <div className={styles.stats}>
        {isLoading ? (
          <p className="loading">loading...</p>
        ) : summaryData.length > 0 ? (
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
        ) : (
          <p className={styles.message}>記録がありません</p>
        )}
      </div>
    </>
  );
}
