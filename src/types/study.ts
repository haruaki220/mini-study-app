export type StudyRecord = {
  id: string;
  subject: string;
  minutes: number;
  memo: string;
  created_at: string;
};

export type StudyFormProps = {
  addRecord: (subject: string, minutes: number | "", memo: string) => void;
};

export type StudyListProps = {
  studyRecords: StudyRecord[];
  deleteRecord: (id: string) => void;
  updateRecord: (
    id: string,
    editSubject: string,
    editMinutes: number | "",
    editMemo: string,
  ) => void;
  isLoading: boolean;
};

export type StudyItemProps = {
  record: StudyRecord;
  deleteRecord: (id: string) => void;
  updateRecord: (
    id: string,
    editSubject: string,
    editMinutes: number | "",
    editMemo: string,
  ) => void;
};

export type Location = "studyForm" | "studyList" | "stats";

export type ButtonProps = {
  variant: "primary" | "secondary" | "danger" | "ghost" | "nav";
  type?: "button" | "submit" | "reset";
  size: "sm" | "md" | "lg";
  disabled: boolean;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export type InputProps = {
  tag: "input" | "textarea";
  id?: string;
  type?: "password" | "email" | "text" | "number";
  value: string | number | "";
  size: "sm" | "md" | "lg";
  placeholder?: string;
  min?: number;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
};

export type SummaryItem = {
  start_date: string;
  total_minutes: number;
};

export type FormatSummaryItem = {
  name: string;
  minutes: number;
};

export type StudyTimeProps = {
  summaryData: FormatSummaryItem[];
  setSelectedBar: (index: number) => void;
  selectedBar: number;
};

export type TimeChartProps = {
  summaryData: FormatSummaryItem[];
  setSelectedBar: (index: number) => void;
  selectedBar: number;
};

export type SubjectSummaryItem = {
  subject: string;
  total_minutes: number;
};

export type StudyRatioProps = {
  totalTime: number;
  subjectSummary: SubjectSummaryItem[];
  selectedSpan: string;
};

export type RatioChartProps = {
  pieData: {
    name: string;
    ratio: number;
  }[];
};

export const spanList = {
  "1日": "day",
  "1週間": "week",
  "1か月": "month",
  "1年": "year",
} as const; //UI表示用の期間（日本語）とAPI用キーのspan対応表
export type Span = keyof typeof spanList; //UIで使用する期間の型
export type SpanKey = (typeof spanList)[Span]; //APIリクエストで使用する期間パラメータの型

export const spans = Object.keys(spanList) as Span[]; //セレクトボックス用の期間リスト
