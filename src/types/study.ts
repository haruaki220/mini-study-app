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
}

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
