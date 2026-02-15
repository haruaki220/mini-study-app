export type StudyRecord = {
  id: string;
  subject: string;
};

export type StudyFormProps = {
  addRecord: (subject: string) => void;
  handleAddStudy: (subject: string) => void;
};

export type StudyListProps = {
  studyRecords: StudyRecord[];
  deleteRecord: (id: string) => void;
  updateRecord: (id: string, editedSubject: string) => void;
};

export type StudyItemProps = {
  record: StudyRecord;
  deleteRecord: (id: string) => void;
  updateRecord: (id: string, editedSubject: string) => void;
};
