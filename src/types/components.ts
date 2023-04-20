export interface AnswerType {
  answer: string;
  selected: boolean;
}

export interface QuestionType {
  question: string;
  answered: boolean;
  answers: AnswerType[];
}

export interface QuestionResultType {
  question:string;
  answer: string;
  correct:boolean;
  correctAnswer?: string;
}

export interface ResultsType {
  score: number;
  questions: QuestionResultType[];
}
