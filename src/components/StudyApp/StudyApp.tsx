import barChart from "../../assets/barChart.png";
import list from "../../assets/list.png";
import plus from "../../assets/plus.png";
import { useAuth } from "../../context/AuthContext.tsx";
import { useStudyRecords } from "../../hooks/useStudyRecords.tsx";
import { supabase } from "../../lib/supabase.ts";
import type { Location } from "../../types/study.ts";
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
    location, //表示中の画面を管理する状態
    loading,
    setLocation,
    error,
    setError,
    getRecords,
    addRecord,
    deleteRecord,
    updateRecord,
  } = useStudyRecords(token);

  //supabaseのAuthAPIを使用したログアウト処理
  const handleLogout = async () => {
    const ok = window.confirm("ログアウトしますか");
    if (!ok) return;
    await supabase.auth.signOut();
  };

  //クリックされたナビボタンに応じた画面遷移と遷移時のエラーリセット処理
  const navClick = (next: Location) => {
    setLocation(next);
    setError("");
  };

  return (
    <>
      <div className={styles.header}>
        {/* locationに応じてヘッダータイトルを切り替え */}
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
        {/* {error ? (
          <p className={styles.error}>{error}</p>
        ) : ( */}
        <>
          {/* locationに応じて表示画面を切り替え */}
          {location === "studyForm" && (
            <StudyForm addRecord={addRecord} error={error} />
          )}
          {location === "studyList" && (
            <StudyList
              studyRecords={studyRecords}
              deleteRecord={deleteRecord}
              updateRecord={updateRecord}
              loading={loading}
              error={error}
            />
          )}
          {location === "stats" && <Stats />}
        </>
        {/* )} */}
      </div>

      <div className={styles.buttonNav}>
        <Button
          variant="nav"
          type="button"
          size="md"
          disabled={false}
          active={location === "studyList"}
          onClick={() => {
            navClick("studyList");
            getRecords();
          }}
        >
          <img src={list} alt="icon" width={28} />
          <p>記録リスト</p>
        </Button>

        <Button
          variant="nav"
          type="button"
          size="md"
          disabled={false}
          active={location === "studyForm"}
          onClick={() => navClick("studyForm")}
        >
          <img src={plus} alt="icon" width={28} />
          <p>記録追加</p>
        </Button>

        <Button
          variant="nav"
          type="button"
          size="md"
          disabled={false}
          active={location === "stats"}
          onClick={() => navClick("stats")}
        >
          <img src={barChart} alt="icon" width={28} />
          <p>統計データ</p>
        </Button>
      </div>
    </>
  );
}

export default StudyApp;
