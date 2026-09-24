export type YoklamaRecord = {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherTitle: string;
  absentNames: string;
  absentNumbers: string;
  lessonHour: string;
  allPresent: boolean;
  submittedAt: string;
};

export type SubmitYoklamaInput = {
  teacherId: string;
  teacherName: string;
  teacherTitle: string;
  absentNames: string;
  absentNumbers: string;
  lessonHour: string;
  allPresent: boolean;
};

export type ChatMessage = {
  role: "user" | "model";
  text: string;
};
