import React, { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { QuizContext } from "@/context/QuizContext";

export default function QuizFill() {
  const { handleNext, handleBack, handleSelectAnswer, questions } =
    useContext(QuizContext);
  const [incompleteQuiz, setIncompleteQuiz] = useState(false);

  const checkValidAnswers = () => {
    setIncompleteQuiz(false);
    for (let index = 0; index < questions.length; index++) {
      if (!questions[index].answered) {
        setIncompleteQuiz(true);
        return;
      }
    }
    handleNext();
  };

  return (
    <>
      {incompleteQuiz && (
        <Alert severity="warning">
          Please answer all the questions and then hit continue.
        </Alert>
      )}
      <div className="quiz-questions-container">
        <ol>
          {questions.map((question, index) => {
            return (
              <div key={index}>
                <li>{question.question}</li>
                <Grid sx={{ mt: 2, mb: 2 }} container>
                  {question.answers.map((answer, index) => (
                    <Grid item key={index} xs={6} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={answer.selected}
                            onChange={(e) =>
                              handleSelectAnswer(
                                e,
                                question.question,
                                answer.answer
                              )
                            }
                          />
                        }
                        label={answer.answer}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            );
          })}
        </ol>
      </div>
      <Box sx={{ ml: 3 }}>
        <div>
          <Button
            variant="contained"
            onClick={checkValidAnswers}
            sx={{ mt: 2, mr: 1 }}
            size="small"
          >
            Continue
          </Button>
          <Button onClick={handleBack} sx={{ mt: 2, mr: 1 }} size="small">
            Back
          </Button>
        </div>
      </Box>
    </>
  );
}
