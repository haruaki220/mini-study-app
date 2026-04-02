import { useState } from "react";
import type { StudyItemProps } from "../../types/study.ts";
import { formatCreatedAt } from "../../utils/formatCreatedAt.ts";
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
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

  return (
    <li className={styles.studyItem}>
      {isEditing ? (
        <>
          <div className={styles.editRow}>
            <label className={styles.label} htmlFor="subject">
              教科：
            </label>
            <Input
              tag="input"
              id="subject"
              type="text"
              size="md"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
            />
          </div>
          <div className={styles.editRow}>
            <label className={styles.label} htmlFor="minutes">
              時間：
            </label>
            <Input
              tag="input"
              id="minutes"
              type="number"
              size="md"
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
          <div className={styles.editRow}>
            <label className={styles.label} htmlFor="memo">
              メモ：
            </label>
            <Input
              tag="textarea"
              id="memo"
              size="md"
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
            />
          </div>

          <div className={styles.buttonSection}>
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
            <Button
              variant="ghost"
              type="button"
              size="sm"
              disabled={false}
              onClick={() => setIsEditing(false)}
            >
              取り消し
            </Button>
          </div>
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
            <p>{formatCreatedAt(record.created_at)}</p>
            <p className={styles.minutes}>{record.minutes}分</p>
          </div>
          <div className={`${styles.row} ${styles.row3}`}>
            <p className={styles.memo}>{record.memo}</p>
          </div>
        </>
      )}
    </li>
  );
}
