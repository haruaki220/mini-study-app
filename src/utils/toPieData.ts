import type { SubjectSummaryItem } from "../types/study";

export const toPieData = (
  subjectSummary: SubjectSummaryItem[],
  totalTime: number,
) => {
  const pieData = subjectSummary.map((s) => {
    return {
      name: s.subject,
      ratio: s.total_minutes / totalTime,
    };
  });
  return pieData;
};
