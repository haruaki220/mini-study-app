// import { useState } from "react";
import type { StudyRatioProps } from "../../types/study.ts";
import { formatPeriod } from "../../utils/formatPeriod.ts";
// import { getEndDate } from "../../utils/getEndDate.ts";
import { toPieData } from "../../utils/toPieData.ts";
import RatioChart from "../Charts/RatioChart.tsx";
import styles from "./StudyRatio.module.css";

export default function StudyRatio({
  totalTime,
  subjectSummary,
  startDate,
  span,
}: StudyRatioProps) {
  // console.log(subjectSummary);
  const pieData = toPieData(subjectSummary, totalTime);
  console.log(pieData);
  return (
    <>
      <div className="studyRatio">
        <div className={styles.head}>
          <p>教科ごとの割合</p>
        </div>
        <p>{formatPeriod(startDate, span)}</p>
        <RatioChart pieData={pieData} />
      </div>
    </>
  );
}
