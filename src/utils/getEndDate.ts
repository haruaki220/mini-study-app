import type { Span } from "../types/study";

export const getEndDate = (start_date: string, span: Span) => {
  const end_date = new Date(start_date);
  console.log(end_date);
  if (span === "1日") {
    end_date.setDate(end_date.getDate() + 1);
    console.log(end_date);
  } else if (span === "1週間") {
    end_date.setDate(end_date.getDate() + 7);
    console.log(end_date);
  } else if (span === "1か月") {
    end_date.setMonth(end_date.getMonth() + 1);
    console.log(end_date);
  } else if (span === "1年") {
    end_date.setFullYear(end_date.getFullYear() + 1);
    console.log(end_date);
  }
  const year = end_date.getFullYear();
  const month =
    end_date.getMonth() + 1 < 10
      ? "0" + (end_date.getMonth() + 1)
      : end_date.getMonth() + 1;
  const date =
    end_date.getDate() < 10 ? "0" + end_date.getDate() : end_date.getDate();
  const arrangedEndDate = year + "-" + month + "-" + date;
  console.log(arrangedEndDate);
  return arrangedEndDate;
};
