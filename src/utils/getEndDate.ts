import type { Span } from "../types/study";

export const getEndDate = (start_date: string, span: Span) => {
  const end_date = new Date(start_date); //処理用日付オブジェクト
  if (span === "1日") {
    end_date.setDate(end_date.getDate() + 1);
  } else if (span === "1週間") {
    end_date.setDate(end_date.getDate() + 7);
  } else if (span === "1か月") {
    end_date.setMonth(end_date.getMonth() + 1);
  } else if (span === "1年") {
    end_date.setFullYear(end_date.getFullYear() + 1);
  } // APIの仕様に合わせて「終了日の翌日」を返す（[start, end) の範囲）
  const year = end_date.getFullYear();
  const month = String(end_date.getMonth() + 1).padStart(2, "0");
  const day = String(end_date.getDate()).padStart(2, "0");
  const formattedEndDate = year + "-" + month + "-" + day;
  return formattedEndDate;
};
