import { useAuth } from "../../context/AuthContext.tsx";
import { useStudyStats } from "../../hooks/useStudyStats.tsx";
import type { Span } from "../../types/study.ts";
import { spans } from "../../types/study.ts";
import { formatSpan } from "../../utils/formatSpan.ts";
import { formatSummaryData } from "../../utils/formatSummaryData.ts";
import StudyRatio from "../StudyRatio/StudyRatio.tsx";
import StudyTime from "../StudyTime/StudyTime.tsx";
import styles from "./Stats.module.css";

export default function Stats() {
  const { session } = useAuth();
  const token = session?.access_token;

  const {
    span,
    setSpan,
    summaryData,
    subjectSummary,
    barError,
    pieError,
    selectedBar, //棒グラフの選択状態と連動したインデックス
    setSelectedBar,
    barLoading,
    pieLoading,
  } = useStudyStats(token);

  return (
    <>
      <div className={styles.stats}>
        <div className={styles.head}>
          <p>学習時間（分）</p>

          {/* 集計単位（週、月など）を指定するセレクトボックス */}
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
        </div>

        {barLoading ? (
          <div className={styles.barMessage}>loading...</div>
        ) : barError ? (
          <div className={styles.barMessage}>{barError}</div>
        ) : summaryData.length === 0 ? (
          <p className={styles.barMessage}>記録がありません</p>
        ) : (
          <StudyTime
            summaryData={formatSummaryData(summaryData, span)} //rechartsで扱う形式にデータを整形
            setSelectedBar={setSelectedBar}
            selectedBar={selectedBar}
          />
        )}

        <div className={styles.head}>教科ごとの割合</div>

        {barLoading || pieLoading ? ( //棒グラフのloading中円グラフは未確定
          <div className={styles.pieMessage}>loading...</div>
        ) : pieError ? (
          <div className={styles.pieMessage}>{pieError}</div>
        ) : summaryData.length === 0 ? (
          <p className={styles.pieMessage}>記録がありません</p>
        ) : (
          summaryData[selectedBar] && (
            <StudyRatio
              totalTime={summaryData[selectedBar].total_minutes} //選択中の期間の合計学習時間
              subjectSummary={subjectSummary}
              selectedSpan={formatSpan(
                summaryData[selectedBar].start_date, //選択中の期間の開始日
                span,
              )}
            />
          )
        )}
      </div>
    </>
  );
}
