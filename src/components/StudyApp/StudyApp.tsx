import { useAuth } from "../../context/AuthContext.tsx";
import { useStudyRecords } from "../../hooks/useStudyRecords.tsx";
import { supabase } from "../../lib/supabase.ts";
import Button from "../Button/Button.tsx";
import Stats from "../Stats/Stats.tsx";
import StudyForm from "../StudyForm/StudyForm.tsx";
import StudyList from "../StudyList/StudyList.tsx";
import styles from "./StudyApp.module.css";

function StudyApp() {

  const { session } = useAuth();
  const token = session?.access_token;

  const {
    studyRecords,
    location,
    setLocation,
    error,
    addRecord,
    deleteRecord,
    updateRecord,
  } = useStudyRecords(token);

  const handleLogout = async () => {
    const ok = window.confirm("ログアウトしますか");
    if (!ok) return;
    await supabase.auth.signOut();
  };

  return (
    <>
      <div className={styles.header}>
        {location === "studyForm" && (
          <p className={styles.headerTitle}>記録追加</p>
        )}
        {location === "studyList" && (
          <p className={styles.headerTitle}>記録リスト</p>
        )}
        {location === "stats" && (
          <p className={styles.headerTitle}>統計データ</p>
        )}
        <Button
          variant="danger"
          type="button"
          size="sm"
          disabled={false}
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </div>
      <div className={styles.mainContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            {location === "studyForm" && <StudyForm addRecord={addRecord} />}
            {location === "studyList" && (
              <StudyList
                studyRecords={studyRecords}
                deleteRecord={deleteRecord}
                updateRecord={updateRecord}
              />
            )}
            {location === "stats" && <Stats />}
          </>
        )}
      </div>

      <div className={styles.buttonNav}>
        <Button
          variant="nav"
          type="button"
          size="md"
          disabled={false}
          active={location === "studyList"}
          onClick={() => setLocation("studyList")}
        >
          記録リスト
        </Button>

        <Button
          variant="nav"
          type="button"
          size="md"
          disabled={false}
          active={location === "studyForm"}
          onClick={() => setLocation("studyForm")}
        >
          記録追加
        </Button>

        <Button
          variant="nav"
          type="button"
          size="md"
          disabled={false}
          active={location === "stats"}
          onClick={() => setLocation("stats")}
        >
          統計データ
        </Button>
      </div>
    </>
  );
}

export default StudyApp;
