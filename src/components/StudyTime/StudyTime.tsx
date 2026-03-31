import type { StudyTimeProps } from "../../types/study.ts";
import TimeChart from "../Charts/TimeChart.tsx";
import styles from "./StudyTime.module.css";

export default function StudyTime({ summaryData, handleBarStart, selectedBar }: StudyTimeProps) {
  // const data = summaryData.map((d) => ({
  //   ...d,
  //   start_date: d.start_date.split("-").join("/"),
  // }));
  // console.log(data);
  return (
    <>
      <div className="studyTime">
        <div className={styles.head}>
          <p>学習時間</p>
          {/* <select
            className={styles.select}
            value={span}
            onChange={(e) => changeSpan(e.target.value as Span)}
          >
            {spans.map((s) => (
              <option className={styles.option} value={s}>{s}</option>
            ))}
          </select> */}
        </div>
        <TimeChart summaryData={summaryData} handleBarStart={handleBarStart} selectedBar={selectedBar}/>
      </div>
    </>
  );
}
