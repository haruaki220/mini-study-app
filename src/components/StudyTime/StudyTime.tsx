import type { StudyTimeProps } from "../../types/study.ts";
import TimeChart from "../Charts/TimeChart.tsx";
import styles from "./StudyTime.module.css";

export default function StudyTime({
  summaryData,
  setSelectedBar,
  selectedBar,
  // barLoading,
  // barError,
}: StudyTimeProps) {
  return (
    <>
      <div className="studyTime">
        {/* <div className={styles.head}>
          <p>学習時間（分）</p>
        </div> */}

        {/* {barLoading ? (
          <div className={styles.message}>loading...</div>
        ) : barError ? (
          <div className={styles.message}>{barError}</div>
        ) : ( */}
          <TimeChart
            summaryData={summaryData}
            setSelectedBar={setSelectedBar}
            selectedBar={selectedBar}
          />
        {/* )} */}
      </div>
    </>
  );
}
