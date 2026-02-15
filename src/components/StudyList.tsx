import type { StudyListProps } from "../types/study.ts";
import StudyItem from "./StudyItem";

export default function StudyList({
  studyRecords,
  deleteRecord,
  updateRecord,
}: StudyListProps) {
  return (
    <>
      <ul>
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
