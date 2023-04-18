import { QuestionType } from "@/types/components";
import React, { useState } from "react";

export type QuizContextType = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  handleSetQuestions: (questions: QuestionType[]) => void;
  questions: QuestionType[];
};

export const QuizContext = React.createContext<QuizContextType>({
  activeStep: 0,
  handleNext: () => {},
  handleBack: () => {},
  handleReset: () => {},
  handleSetQuestions: () => {},
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

  return (
    <QuizContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        handleReset,
        handleSetQuestions,
        questions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
