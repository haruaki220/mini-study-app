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
  const [editMinutes, setEditMinutes] = useState<number | "">(0); // number型の入力だが、未入力状態に対応するため空文字も許可
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
                // 数値入力を制御（空文字を許可しつつ、0以上の数値のみ反映）
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
              }} // 編集内容を保存し、表示モードに戻す
            >
              保存
            </Button>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              disabled={false}
              onClick={() => setIsEditing(false)} //編集内容をキャンセルして表示モードに戻す
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
                }} //編集モードに変え、現在の値を編集用stateにコピー
              >
                編集
              </Button>
              <Button
                variant="danger"
                type="button"
                size="sm"
                disabled={false}
                onClick={() => deleteRecord(record.id)} //記録を削除
              >
                削除
              </Button>
            </div>
          </div>
          <div className={`${styles.row} ${styles.row2}`}>
            <p>{formatCreatedAt(record.created_at)}</p> {/* created_atをYYYY//MM/DD形式に変換したものを表示 */}
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
