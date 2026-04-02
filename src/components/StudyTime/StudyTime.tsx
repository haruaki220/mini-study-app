import type { StudyTimeProps } from "../../types/study.ts";
import TimeChart from "../Charts/TimeChart.tsx";
import styles from "./StudyTime.module.css";

export default function StudyTime({
  summaryData,
  handleBarStart,
  selectedBar,
}: StudyTimeProps) {
  return (
    <>
      <div className="studyTime">
        <div className={styles.head}>
          <p>学習時間（分）</p>
        </div>
        <TimeChart
          summaryData={summaryData}
          handleBarStart={handleBarStart}
          selectedBar={selectedBar}
        />
      </div>
    </>
  );
}
