import { useAuth } from "../../context/AuthContext.tsx";
import { useStudyRecords } from "../../hooks/useStudyRecords.tsx";
import { supabase } from "../../lib/supabase.ts";
import Button from "../Button/Button.tsx";
import Stats from "../Stats/Stats.tsx";
import StudyForm from "../StudyForm/StudyForm.tsx";
import StudyList from "../StudyList/StudyList.tsx";
import styles from "./StudyApp.module.css";
// import { addRecord } from "../../api/api.ts";

function StudyApp() {
  // const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]);
  // const [location, setLocation] = useState<"studyForm" | "studyList" | "stats">(
  //   "studyList",
  // );

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

  // const addRecord = async (
  //   subject: string,
  //   minutes: number | "",
  //   memo: string,
  // ) => {
  //   if (!subject.trim()) return;
  //   if (minutes === "") return;
  //   try{
  //     await postRecord(subject, minutes, memo, token );
  //     setStudyRecords(await fetchRecords (token));
  //   } catch(e) {
  //     if(e instanceof Error){
  //       setError(e.message);
  //     }
  //     else {
  //       setError("予期しないエラーが発生しました")
  //     }
  //   }

  //   // if (!subject.trim()) return;
  //   // if (minutes === "") return;
  //   // if (!token) return;
  //   // const response = await fetch("http://localhost:3000/api/study", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Authorization: `Bearer ${token}`,
  //   //   },
  //   //   body: JSON.stringify({
  //   //     // id: crypto.randomUUID(),
  //   //     subject: subject,
  //   //     minutes: minutes,
  //   //     memo: memo,
  //   //   }),
  //   // });
  //   // const data = await response.json();
  //   // console.log(data);
  //   // fetchRecords();
  // };

  // const deleteRecord = async (id: string) => {
  //   try{
  //     await removeRecord(id, token);
  //     setStudyRecords(await fetchRecords(token));
  //   } catch(e) {
  //     if(e instanceof Error){
  //       setError(e.message);
  //     } else {
  //       setError("予期しないエラーが発生しました")
  //     }
  //   }

  //   // if (!token) return;
  //   // const response = await fetch(`http://localhost:3000/api/study/${id}`, {
  //   //   method: "DELETE",
  //   //   headers: { Authorization: `Bearer ${token}` },
  //   // });
  //   // const data = await response.json();
  //   // console.log(data);
  //   // fetchRecords();
  // };

  // const updateRecord = async (
  //   id: string,
  //   editSubject: string,
  //   editMinutes: number | "",
  //   editMemo: string,
  // ) => {
  //   if (!editSubject.trim()) return;
  //   if (editMinutes === "") return;
  //   try{
  //     await putRecord(id, editSubject, editMinutes, editMemo, token);
  //     setStudyRecords(await fetchRecords(token));
  //   } catch(e) {
  //     if(e instanceof Error){
  //       setError(e.message);
  //     } else{
  //       setError("予期しないエラーが発生しました")
  //     }
  //   }

  //   // if (editMinutes === "") return;
  //   // if (!token) return;
  //   // const response = await fetch(`http://localhost:3000/api/study/${id}`, {
  //   //   method: "PUT",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Authorization: `Bearer ${token}`,
  //   //   },
  //   //   body: JSON.stringify({
  //   //     subject: editSubject,
  //   //     minutes: editMinutes,
  //   //     memo: editMemo,
  //   //   }),
  //   // });
  //   // const data = await response.json();
  //   // console.log(data);
  //   // fetchRecords();
  // };

  // const fetchRecords = async () => {
  //   if (!token) return;
  //   const response = await fetch("http://localhost:3000/api/study", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   setStudyRecords(data);
  // };

  // useEffect(() => {
  //   fetchRecords();
  // }, [token]);

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
        {/* <Button onClick={handleLogout}>ログアウト</Button> */}
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
        {/* <button onClick={()=>setLocation("studyList")}>記録リスト</button> */}
        {/* <button onClick={()=>setLocation("studyForm")}>記録追加</button> */}
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

    // <>
    //   <StudyForm addRecord={addRecord} />
    //   <StudyList
    //     studyRecords={studyRecords}
    //     deleteRecord={deleteRecord}
    //     updateRecord={updateRecord}
    //   />
    //   <button onClick={handleLogout}>ログアウト</button>
    // </>
  );
}

export default StudyApp;
