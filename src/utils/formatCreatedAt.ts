//created_at(ISO文字列)をYYYY/MM/DD形式に変換
export const formatCreatedAt = (created_at: string) => {
  const date = new Date(created_at); //処理用日付オブジェクト
  const formattedData =
    date.getFullYear() +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0"); 
  return formattedData;
};
