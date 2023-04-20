import React, { useContext } from "react";
import { QuizContext } from "@/context/QuizContext";
import { Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function QuizResults() {
  const { results } = useContext(QuizContext);
  return (
    <>
      <h2>
        Score: {results.score}/{results.questions.length}
      </h2>
      <div className="quiz-questions-container">
        <ol>
          {results.questions.map((question, index) => {
            return (
              <div key={index}>
                <li>
                  <div className="question-result-container">
                    {question.question}
                    {question.correct ? (
                      <CheckCircleIcon className="ml-5" color="success" />
                    ) : (
                      <CancelIcon className="ml-5" color="error" />
                    )}
                  </div>
                </li>
                <Grid sx={{ mt: 2, mb: 2 }} container>
                  <Grid item key={index} xs={6} md={4}>
                    <div
                      className={`answer-container ${
                        question.correct ? "correct" : "incorrect"
                      }`}
                    >
                      <strong>Answer:</strong> {question.answer}
                    </div>
                    {!question.correct && (
                      <div className="answer-container correct mt-10">
                        <strong>Correct answer:</strong>{" "}
                        {question.correctAnswer}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </ol>
      </div>
    </>
  );
}
