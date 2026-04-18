import type { FormatSummaryItem, Span, SummaryItem } from "../types/study.ts";

//学習時間の集計データを棒グラフ表示用に変換
export const formatSummaryData = (summaryData: SummaryItem[], span: Span) => {
  let formattedData: FormatSummaryItem[] = []; //フォーマットしたデータを入れる配列
  if (span === "1日") {
    formattedData = summaryData.map((d) => {
      const date = new Date(d.start_date); //処理用日付オブジェクト
      return {
        name:
          String(date.getMonth() + 1).padStart(2, "0") +
          "/" +
          String(date.getDate()).padStart(2, "0"), //MM/DDに変換
        minutes: d.total_minutes,
      };
    });
  } else if (span === "1週間") {
    formattedData = summaryData.map((d) => {
      const date = new Date(d.start_date); //処理用日付オブジェクト
      const start_date =
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(date.getDate()).padStart(2, "0"); //MM/DDに変換
      date.setDate(date.getDate() + 6); //開始日の6日後（終了日）に設定
      const end_date =
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(date.getDate()).padStart(2, "0"); //MM/DDに変換
      return {
        name: start_date + "-" + end_date, //MM/DD-MM/DDに変換
        minutes: d.total_minutes,
      };
    });
  } else if (span === "1か月") {
    formattedData = summaryData.map((d) => {
      const date = new Date(d.start_date); //処理用日付オブジェクト
      return {
        name: String(date.getMonth() + 1).padStart(2, "0"), //MMに変換
        minutes: d.total_minutes,
      };
    });
  } else if (span === "1年") {
    formattedData = summaryData.map((d) => {
      const date = new Date(d.start_date); //処理用日付オブジェクト
      return {
        name: String(date.getFullYear()), //YYYYに変換
        minutes: d.total_minutes,
      };
    });
  }
  return formattedData;
};
