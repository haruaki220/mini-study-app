import { useEffect, useState } from "react";
// import type { Span } from "../../types/study.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import type { SubjectSummaryItem, SummaryItem } from "../../types/study.ts";
import StudyRaito from "../StudyRaito/StudyRaito.tsx";
import StudyTime from "../StudyTime/StudyTime.tsx";
import styles from "./Stats.module.css";

const spans = ["1日", "1週間", "1か月", "1年"] as const;
export type Span = (typeof spans)[number];

export default function Stats() {
  const { session } = useAuth();
  const token = session?.access_token;
  const [span, setSpan] = useState<Span>("1日");
  const [summaryData, setSummaryData] = useState<SummaryItem[]>([]);
  const [selectedBar, setSelectedBar] = useState<number>(0);
  const [subjectSummary, setSubjectSummary] = useState<SubjectSummaryItem[]>(
    [],
  );

  const spanList = {
    "1日": "day",
    "1週間": "week",
    "1か月": "month",
    "1年": "year",
  };

  const arrangeSummaryData = () => {
    let data: {
      name: string;
      minutes: number;
      // start_date: string;
    }[] = [];
    if (span === "1日") {
      data = summaryData.map((d) => ({
        name: d.start_date.slice(5).split("-").join("/"),
        minutes: d.total_minutes,
        // start_date: d.start_date,
      }));
      console.log(data);
    } else if (span === "1週間") {
      data = summaryData.map((d) => {
        const dateObj = new Date(d.start_date);
        // console.log(date)
        const end_date = new Date(dateObj);
        end_date.setDate(end_date.getDate() + 6);
        // console.log(end_date)

        const month =
          end_date.getMonth() + 1 < 10
            ? "0" + (end_date.getMonth() + 1)
            : end_date.getMonth() + 1;
        const date =
          end_date.getDate() < 10
            ? "0" + end_date.getDate()
            : end_date.getDate();
        return {
          name:
            d.start_date.slice(5).split("-").join("/") +
            "-" +
            month +
            "/" +
            date,
          minutes: d.total_minutes,
          // start_date: d.start_date
        };
      });
      console.log(data);
    } else if (span === "1か月") {
      data = summaryData.map((d) => ({
        name: d.start_date.slice(5, 7),
        minutes: d.total_minutes,
        // start_date: d.start_date
      }));
      console.log(data);
    } else if (span === "1年") {
      data = summaryData.map((d) => ({
        name: d.start_date.slice(0, 4),
        minutes: d.total_minutes,
        // start_date: d.start_date
      }));
      console.log(data);
    }
    return data;
  };

  const fetchSummaryData = async () => {
    const response = await fetch(
      `http://localhost:3000/api/study/summary?span=${spanList[span]}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await response.json();
    console.log(data);
    setSummaryData(data);
    // setSelectedBarStart(data[data.length - 1].start_date);
    setSelectedBar(data.length - 1);
  };

  useEffect(() => {
    if (!token) return;
    fetchSummaryData();
  }, [span]);

  // const handleBarStart = () => {
  //   // console.log(start_date)
  //   setSelectedBar();
  // };

  const calculateEndDate = () => {
    const end_date = new Date(summaryData[selectedBar].start_date);
    console.log(end_date);
    if (span === "1日") {
      end_date.setDate(end_date.getDate() + 1);
      console.log(end_date);
    } else if (span === "1週間") {
      end_date.setDate(end_date.getDate() + 7);
      console.log(end_date);
    } else if (span === "1か月") {
      end_date.setMonth(end_date.getMonth() + 1);
      console.log(end_date);
    } else if (span === "1年") {
      end_date.setFullYear(end_date.getFullYear() + 1);
      console.log(end_date);
    }
    const year = end_date.getFullYear();
    const month = end_date.getMonth()+1<10? "0" + (end_date.getMonth() + 1) : end_date.getMonth();
    const date = end_date.getDate() < 10? "0" + end_date.getDate() : end_date.getDate();
    const arrangedEnd=year + "-" + month + "-" + date;
    console.log(arrangedEnd)
    return arrangedEnd;
  };

  const fetchSubjectSummary = async () => {
    if (summaryData.length === 0) return;
    const start_date = summaryData[selectedBar].start_date;
    const end_date = calculateEndDate();
    const response = await fetch(
      `http://localhost:3000/api/study/subject_summary?start_date=${start_date}&end_date=${end_date}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await response.json();
    console.log(data);
    setSubjectSummary(data);
  };

  useEffect(() => {
    fetchSubjectSummary();
  }, [summaryData,selectedBar]);
  console.log(selectedBar)
  return (
    <div className={styles.statsWrapper}>
      <select
        className={styles.select}
        value={span}
        onChange={(e) => setSpan(e.target.value as Span)}
      >
        {spans.map((s, index) => (
          <option key={index} className={styles.option} value={s}>
            {s}
          </option>
        ))}
      </select>
      <StudyTime
        summaryData={arrangeSummaryData()}
        handleBarStart={setSelectedBar}
        selectedBar={selectedBar}
      />
      {summaryData.length > 0 && (
        <StudyRaito
          totalTime={summaryData[selectedBar].total_minutes}
          subjectSummary={subjectSummary}
        />
      )}
    </div>
  );
}
