import { useState } from "react";
import type { StudyItemProps } from "../types/study.ts";

export default function StudyItem({
  record,
  deleteRecord,
  updateRecord,
}: StudyItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");
  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button
            onClick={() => {
              updateRecord(record.id, editValue);
              setIsEditing(false);
            }}
          >
            保存
          </button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </>
      ) : (
        <>
          <span>{record.subject}</span>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditValue(record.subject);
            }}
          >
            編集
          </button>
          <button onClick={() => deleteRecord(record.id)}>削除</button>
        </>
      )}
    </li>
  );
}
