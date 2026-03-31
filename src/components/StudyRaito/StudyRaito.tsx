// import { useState } from "react";
import type { StudyRaitoProps } from "../../types/study.ts";
import RaitoChart from "../Charts/RaitoChart.tsx";
import styles from "./StudyRaito.module.css";

export default function StudyRaito({
  totalTime,
  subjectSummary,
}: StudyRaitoProps) {
  console.log(subjectSummary)
  const pieData = subjectSummary.map((s) => {
    return ({
      name: s.subject,
      raito: s.total_minutes / totalTime,
    });
  });
  console.log(pieData)
  return (
    <>
      <div className="studyTime">
        <div className={styles.head}>
          <p>教科ごとの割合</p>
        </div>
        <RaitoChart pieData={pieData} />
      </div>
    </>
  );
}
