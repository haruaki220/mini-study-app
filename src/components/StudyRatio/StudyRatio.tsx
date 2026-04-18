import type { StudyRatioProps } from "../../types/study.ts";
import { toPieData } from "../../utils/toPieData.ts";
import RatioChart from "../Charts/RatioChart.tsx";
import styles from "./StudyRatio.module.css";

export default function StudyRatio({
  totalTime,
  subjectSummary,
  selectedSpan,
}: StudyRatioProps) {
  const pieData = toPieData(subjectSummary, totalTime); // rechartsで扱う形にデータを整形
  return (
    <>
      <div className="studyRatio">
        <div className={styles.head}>
          教科ごとの割合
        </div>
        <p>{selectedSpan}</p>
        <RatioChart pieData={pieData} />
      </div>
    </>
  );
}
