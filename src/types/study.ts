export type StudyRecord = {
  id: string;
  subject: string;
  minutes: number;
  memo:string;
};

export type StudyFormProps = {
  addRecord: (subject: string, minutes: number|"", memo:string) => void;
};

export type StudyListProps = {
  studyRecords: StudyRecord[];
  deleteRecord: (id: string) => void;
  updateRecord: (id: string, editSubject: string, editMinutes:number|"", editMemo: string) => void;
};

export type StudyItemProps = {
  record: StudyRecord;
  deleteRecord: (id: string) => void;
  updateRecord: (id: string, editedSubject: string, editMinutes:number|"", editMemo: string) => void;
};
