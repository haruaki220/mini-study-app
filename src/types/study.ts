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
  isLoading:boolean;
};

export type StudyItemProps = {
  record: StudyRecord;
  deleteRecord: (id: string) => void;
  updateRecord: (
    id: string,
    editedSubject: string,
    editMinutes: number | "",
    editMemo: string,
  ) => void;
};

export type AuthProps = {
  setMode: () => void;
};

export type ButtonProps = {
  variant: "primary" | "secondary" | "danger" | "ghost" | "nav";
  type: "button" | "submit" | "reset" | undefined;
  size: "sm" | "md" | "lg";
  disabled: boolean;
  children: string;
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
      | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => void;
};

export type SummaryItem = {
  start_date: string;
  total_minutes: number;
};

export type formatSummaryItem = {
  name: string;
  minutes: number;
};

export type StudyTimeProps = {
  summaryData: formatSummaryItem[];
  handleBarStart: (index: number) => void;
  selectedBar: number;
};

export type TimeChartProps = {
  summaryData: formatSummaryItem[];
  handleBarStart: (index: number) => void;
  selectedBar: number;
};

export type SubjectSummaryItem = {
  subject: string;
  total_minutes: number;
};

export type StudyRatioProps = {
  totalTime: number;
  subjectSummary: SubjectSummaryItem[];
  startDate: string;
  span: Span;
};

export type RatioChartProps = {
  pieData: {
    name: string;
    ratio: number;
  }[];
};

//Span型とその元となる配列
// export const spans = ["1日", "1週間", "1か月", "1年"] as const;
// export type Span = (typeof spans)[number];

export const spanList = {
  "1日": "day",
  "1週間": "week",
  "1か月": "month",
  "1年": "year",
} as const;
export type Span = keyof typeof spanList;
export type SpanKey = (typeof spanList)[Span];

export const spans = Object.keys(spanList) as Span[];
