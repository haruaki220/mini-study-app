import type { StudyListProps } from "../../types/study.ts";
import StudyItem from "../StudyItem/StudyItem.tsx";
import styles from "./StudyList.module.css";

export default function StudyList({
  studyRecords,
  deleteRecord,
  updateRecord,
  loading,
  error,
}: StudyListProps) {
  const alertError = (message: string) => {
    window.alert(message);
  };

  return (
    <>
      {error && alertError(error)}
      {loading ? (
        <p className={styles.message}>loading...</p>
      ) : studyRecords.length === 0 ? (
        <p className={styles.message}>記録がありません</p>
      ) : (
        <ul className={styles.studyList}>
          {studyRecords.map((record) => (
            <StudyItem
              key={record.id}
              record={record}
              deleteRecord={deleteRecord}
              updateRecord={updateRecord}
            />
          ))}
        </ul>
      )}
    </>
  );
}
