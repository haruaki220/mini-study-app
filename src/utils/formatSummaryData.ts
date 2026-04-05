import type { formatSummaryItem, Span, SummaryItem } from "../types/study.ts";

export const formatSummaryData = (summaryData: SummaryItem[], span: Span) => {
  let data: formatSummaryItem[] = [];
  if (span === "1日") {
    data = summaryData.map((d) => ({
      name: d.start_date.slice(5).replaceAll("-", "/"),
      minutes: d.total_minutes,
    }));
  } else if (span === "1週間") {
    data = summaryData.map((d) => {
      const end_date = new Date(d.start_date);
      end_date.setDate(end_date.getDate() + 6);

      const month =
        end_date.getMonth() + 1 < 10
          ? "0" + (end_date.getMonth() + 1)
          : end_date.getMonth() + 1;
      const date =
        end_date.getDate() < 10 ? "0" + end_date.getDate() : end_date.getDate();
      return {
        name:
          d.start_date.slice(5).replaceAll("-", "/") + "-" + month + "/" + date,
        minutes: d.total_minutes,
      };
    });
  } else if (span === "1か月") {
    data = summaryData.map((d) => ({
      name: d.start_date.slice(5, 7),
      minutes: d.total_minutes,
    }));
  } else if (span === "1年") {
    data = summaryData.map((d) => ({
      name: d.start_date.slice(0, 4),
      minutes: d.total_minutes,
    }));
  }
  return data;
};
