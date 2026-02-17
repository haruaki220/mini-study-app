import { useState } from "react";
import type { StudyItemProps } from "../types/study.ts";

export default function StudyItem({
  record,
  deleteRecord,
  updateRecord,
}: StudyItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSubject, setEditSubject] = useState<string>("");
  const [editMinutes, setEditMinutes] = useState<number|"">(0);
  const [editMemo, setEditMemo] = useState<string>("");

  return (
    <li>
      {isEditing ? (
        <>
          <div>
            <span>教科：</span>
            <input
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
            />
          </div>
          <div>
            <span>時間：</span>
            <input
              type="number"
              min={0}
              value={editMinutes}
              onChange={(e) => {
                const v = e.target.value;

                if (v === "") {
                  setEditMinutes("");
                  return;
                }

                const value = Number(e.target.value);
                if (value >= 0) setEditMinutes(value);
              }}
            />
          </div>
          <div>
            <span>メモ：</span>
            <textarea value={editMemo} onChange={(e) => setEditMemo(e.target.value)}/>
          </div>

          <button
            onClick={() => {
              updateRecord(record.id, editSubject, editMinutes, editMemo);
              setIsEditing(false);
            }}
          >
            保存
          </button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </>
      ) : (
        <>
          <div>
            <span>教科：{record.subject}</span>
          </div>
          <div>
            <span>時間：{record.minutes}</span>
          </div>
          <div>
            <span>メモ：{record.memo}</span>
          </div>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditSubject(record.subject);
              setEditMinutes(record.minutes);
              setEditMemo(record.memo);
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
