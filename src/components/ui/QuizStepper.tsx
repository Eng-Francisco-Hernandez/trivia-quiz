import Button from "@mui/material/Button";
import React, { useContext } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { Paper, StepContent } from "@mui/material";
import { QuizContext } from "@/context/QuizContext";
import { steps } from "@/data/constants";
import QuizResults from "./QuizResults";

export default function QuizStepper() {
  const { activeStep, handleReset, results } = useContext(QuizContext);
  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 1 }}>
          <QuizResults />
          <Button onClick={handleReset} sx={{ mt: 2, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </>
  );
}
