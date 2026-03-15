import type { StudyListProps } from "../../types/study.ts";
import StudyItem from "../StudyItem/StudyItem.tsx";
import styles from "./StudyList.module.css";

export default function StudyList({
  studyRecords,
  deleteRecord,
  updateRecord,
}: StudyListProps) {
  return (
    <>
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
    </>
  );
}
