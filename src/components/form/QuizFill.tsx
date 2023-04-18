import { QuizContext } from "@/context/QuizContext";
import { Box, Button } from "@mui/material";
import React, { useContext } from "react";

export default function QuizFill() {
  const { handleNext, handleBack, questions } = useContext(QuizContext);

  return (
    <div style={{
        maxHeight: "60vh",
        overflow: "scroll"
    }}>
      {questions.map((question, index) => {
        return <div style={{
            marginLeft: "20px"
        }}>
            <li key={index}>{question.question}</li>
            {question.incorrect_answers.map(ans => <div>{ans}</div>)}
            <div>{question.correct_answer}</div>
        </div>;
      })}
      <Box sx={{ mb: 2, ml: 1 }}>
        <div>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
            size="small"
          >
            Continue
          </Button>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }} size="small">
            Back
          </Button>
        </div>
      </Box>
    </div>
  );
}
