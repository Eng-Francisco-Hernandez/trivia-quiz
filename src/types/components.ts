export interface AnswerType {
  answer: string;
  selected: boolean;
}

export interface QuestionType {
  question: string;
  answered: boolean;
  answers: AnswerType[];
}
