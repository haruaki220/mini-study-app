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
    error,
    selectedBar, //棒グラフの選択状態と連動したインデックス
    setSelectedBar,
    isLoading,
  } = useStudyStats(token);

  return (
    <>
      <div className={styles.stats}>
        {isLoading ? (
          <p className="loading">loading...</p>
        ) : summaryData.length > 0 ? ( //学習時間の集計データがある場合のみ統計UIを表示し、未記録時はメッセージを表示
          <>
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

            <StudyTime
              summaryData={formatSummaryData(summaryData, span)} //rechartsで扱う形式にデータを整形
              setSelectedBar={setSelectedBar}
              selectedBar={selectedBar}
            />
            {summaryData[selectedBar] && (
              <StudyRatio
                totalTime={summaryData[selectedBar].total_minutes} //選択中の期間の合計学習時間
                subjectSummary={subjectSummary}
                selectedSpan={formatSpan(
                  summaryData[selectedBar].start_date, //選択中の期間の開始日
                  span,
                )}
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
