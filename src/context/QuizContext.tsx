import React from "react";

export type QuizContextType = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
};

export const QuizContext = React.createContext<QuizContextType>({
  activeStep: 0,
  handleNext: () => {},
  handleBack: () => {},
  handleReset: () => {},
});

export default function QuizProvider({ children }: any) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <QuizContext.Provider
      value={{ activeStep, handleNext, handleBack, handleReset }}
    >
      {children}
    </QuizContext.Provider>
  );
}
