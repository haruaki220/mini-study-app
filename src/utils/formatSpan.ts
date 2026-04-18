import type { Span } from "../types/study";

// spanに応じて表示用の期間ラベルを生成する
// 例:
// 1日 → "MM/DD"
// 1週間 → "MM/DD-MM/DD"
// 1か月 → "M月"
// 1年 → "YYYY年"
export const formatSpan = (startDate: string, span: Span) => {
  const date = new Date(startDate); //処理用日付オブジェクト
  let formattedSpan = "";
  if (span === "1日") {
    formattedSpan =
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(date.getDate()).padStart(2, "0"); //MM/DDに変換
  } else if (span === "1週間") {
    const start_date =
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(date.getDate()).padStart(2, "0"); //MM/DDに変換
    date.setDate(date.getDate() + 6); //開始日の6日後（終了日）に設定
    const end_date =
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(date.getDate()).padStart(2, "0"); //MM/DDに変換
    formattedSpan = start_date + "-" + end_date; //MM/DD-MM/DDに変換
    
    // date.setDate(date.getDate() + 6); //start_dateの6日後（終了日）に設定
    // formattedSpan =
    //   startDate.slice(5).replaceAll("-", "/") +
    //   "-" +
    //   String(date.getMonth() + 1).padStart(2, "0") +
    //   "/" +
    //   String(date.getDate()).padStart(2, "0"); //MM/DD-MM/DDに変換
  } else if (span === "1か月") {
    formattedSpan = date.getMonth() + 1 + "月"; //(M or MM)月に変換
  } else if (span === "1年") {
    formattedSpan = date.getFullYear() + "年"; //YYYY年に変換
  }
  return formattedSpan;
};
