import type { Span } from "../types/study";

export const formatPeriod = (startDate: string, span: Span) => {
  let date = new Date(startDate);
  let period;
  if (span === "1日") {
    period =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "/" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  }
  if (span === "1週間") {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    period =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "/" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      "-" +
      (endDate.getMonth() + 1 < 10
        ? "0" + (endDate.getMonth() + 1)
        : endDate.getMonth() + 1) +
      "/" +
      (endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate());
  }
  if (span === "1か月") {
    period = date.getMonth() + 1 + "月";
  }
  if (span === "1年") {
    period = date.getFullYear() + "年";
  }
  return period;
};
