import { QuestionType } from "@/types/components";
import React, { useState } from "react";

export type QuizContextType = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  handleSetQuestions: (questions: QuestionType[]) => void;
  handleSelectAnswer: (
    event: React.ChangeEvent<HTMLInputElement>,
    question: string,
    answer: string
  ) => void;
  questions: QuestionType[];
};

export const QuizContext = React.createContext<QuizContextType>({
  activeStep: 0,
  handleNext: () => {},
  handleBack: () => {},
  handleReset: () => {},
  handleSetQuestions: () => {},
  handleSelectAnswer: () => {},
  questions: [],
});

export default function QuizProvider({ children }: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSetQuestions = (questions: QuestionType[]) => {
    setQuestions(questions);
  };

  const handleSelectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    question: string,
    answer: string
  ) => {
    const newQuestions = questions.map((currentQuestion) => {
      if (currentQuestion.question === question) {
        return {
          ...currentQuestion,
          answered: event.target.checked,
          answers: currentQuestion.answers.map((currentAnswer) => {
            if (currentAnswer.answer === answer) {
              return {
                ...currentAnswer,
                selected: event.target.checked,
              };
            } else {
              return {
                ...currentAnswer,
                selected: false,
              };
            }
          }),
        };
      } else {
        return currentQuestion;
      }
    });
    setQuestions(newQuestions);
  };

  return (
    <QuizContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        handleReset,
        handleSetQuestions,
        handleSelectAnswer,
        questions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
