import { useState } from "react";
import type { StudyItemProps } from "../../types/study.ts";
import Button from "../Button/Button.tsx";
import styles from "./StudyItem.module.css";

export default function StudyItem({
  record,
  deleteRecord,
  updateRecord,
}: StudyItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSubject, setEditSubject] = useState<string>("");
  const [editMinutes, setEditMinutes] = useState<number | "">(0);
  const [editMemo, setEditMemo] = useState<string>("");

  const alignCreatedAt = (created_at:string) => {
    created_at=created_at.slice(0,10);
    created_at=created_at.replaceAll("-","/");
    return created_at;
  }

  return (
    <li className={styles.studyItem}>
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
            <textarea
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
            />
          </div>

          {/* <button
            onClick={() => {
              updateRecord(record.id, editSubject, editMinutes, editMemo);
              setIsEditing(false);
            }}
          >
            保存
          </button> */}
          <Button
            variant="primary"
            type="button"
            size="sm"
            disabled={false}
            onClick={() => {
              updateRecord(record.id, editSubject, editMinutes, editMemo);
              setIsEditing(false);
            }}
          >
            保存
          </Button>
          {/* <button onClick={() => setIsEditing(false)}>キャンセル</button> */}
          <Button
            variant="ghost"
            type="button"
            size="sm"
            disabled={false}
            onClick={() => setIsEditing(false)}
          >
            取り消し
          </Button>
        </>
      ) : (
        <>
          <div className={styles.row}>
            <p className={styles.title}>{record.subject}</p>
            <div className={styles.buttonSection}>
              <Button
                variant="secondary"
                type="button"
                size="sm"
                disabled={false}
                onClick={() => {
                  setIsEditing(true);
                  setEditSubject(record.subject);
                  setEditMinutes(record.minutes);
                  setEditMemo(record.memo);
                }}
              >
                編集
              </Button>
              <Button
                variant="danger"
                type="button"
                size="sm"
                disabled={false}
                onClick={() => deleteRecord(record.id)}
              >
                削除
              </Button>
            </div>
          </div>
          <div className={`${styles.row} ${styles.row2}`}>
            <p>{alignCreatedAt(record.created_at)}</p>
            <p className={styles.minutes}>{record.minutes}分</p>
          </div>
          <div className={`${styles.row} ${styles.row3}`}>
            <p className={styles.memo}>{record.memo}</p>
          </div>
          {/* <button
            onClick={() => {
              setIsEditing(true);
              setEditSubject(record.subject);
              setEditMinutes(record.minutes);
              setEditMemo(record.memo);
            }}
          >
            編集
          </button> */}

          {/* <button onClick={() => deleteRecord(record.id)}>削除</button> */}
        </>
      )}
    </li>
  );
}
