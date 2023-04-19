import { Box, Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { QuizContext } from "@/context/QuizContext";

export default function QuizReviewAndSubmit() {
  const { handleNext, handleBack, questions, quizId, handleSetResults } =
    useContext(QuizContext);

  const handleSubmit = async () => {
    const answers: { question: string; answer: string }[] = [];
    questions.forEach((question) => {
      answers.push({
        question: question.question,
        answer: question.answers.filter((answer) => answer.selected)[0].answer,
      });
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId: quizId, answers: answers }),
      }
    );
    const results = await response.json();
    handleSetResults(results);
    handleNext();
  };

  return (
    <>
      <h3>Please review your answers and hit submit when you are ready.</h3>
      <div className="quiz-questions-container">
        <ol>
          {questions.map((question, index) => {
            return (
              <div key={index}>
                <li>{question.question}</li>
                <Grid sx={{ mt: 2, mb: 2 }} container>
                  <Grid item key={index} xs={6} md={6}>
                    {question.answers.map((answer, index) => (
                      <div key={index}>
                        {answer.selected && (
                          <div className="answer-container">
                            <strong>Answer:</strong> {answer.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </Grid>
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
            onClick={handleSubmit}
            sx={{ mt: 2, mr: 1 }}
            size="small"
          >
            Confirm and submit
          </Button>
          <Button onClick={handleBack} sx={{ mt: 2, mr: 1 }} size="small">
            Back
          </Button>
        </div>
      </Box>
    </>
  );
}
