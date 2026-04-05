import type { Span } from "../types/study";

export const formatPeriod = (startDate: string, span: Span) => {
  let date = new Date(startDate);
  let period;
  if (span === "1日") {
    period = startDate.slice(5, 10).replaceAll("-", "/");
  } else if (span === "1週間") {
    date.setDate(date.getDate() + 6);
    period =
      startDate.slice(5).replaceAll("-", "/") +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "/" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  } else if (span === "1か月") {
    period = date.getMonth() + 1 + "月";
  } else if (span === "1年") {
    period = date.getFullYear() + "年";
  }
  return period;
};
