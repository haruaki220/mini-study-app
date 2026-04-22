import type { StudyRatioProps } from "../../types/study.ts";
import { toPieData } from "../../utils/toPieData.ts";
import RatioChart from "../Charts/RatioChart.tsx";

export default function StudyRatio({
  totalTime,
  subjectSummary,
  selectedSpan,
  // pieLoading,
  // pieError,
}: StudyRatioProps) {
  const pieData = toPieData(subjectSummary, totalTime); // rechartsで扱う形にデータを整形
  return (
    <>
      <div className="studyRatio">
        {/* <div className={styles.head}>教科ごとの割合</div> */}
        <p>{selectedSpan}</p>
        {/* 
        {pieLoading ? (
          <div className={styles.message}>loading...</div>
        ) : pieError ? (
          <div className={styles.message}>{pieError}</div>
        ) : ( */}
        <RatioChart pieData={pieData} />
        {/* )} */}
      </div>
    </>
  );
}
