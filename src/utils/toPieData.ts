import type { SubjectSummaryItem } from "../types/study";

//教科別学習時間を円グラフ表示用データ（割合）に変換
export const toPieData = (
  subjectSummary: SubjectSummaryItem[],
  totalTime: number,
) => {
  return subjectSummary.map((s) => ({
    name: s.subject,
    ratio: totalTime > 0 ? s.total_minutes / totalTime : 0,
  }));
};
