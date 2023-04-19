import { shuffleArray } from "@/utils/shuffleArray";
import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "html-entities";
import { v4 as uuidv4 } from "uuid";

const TRIVIA_BASE_URL = `https://opentdb.com/api.php?`;

var ACTIVE_QUIZZES: any[] = [];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      const quizId = uuidv4();
      const params = Object.keys(query)
        .map((key) => {
          return `${key}=${query[key]}`;
        })
        .join("&");
      try {
        const questions = await fetch(`${TRIVIA_BASE_URL}${params}`);
        const questionsParsed = await questions.json();
        ACTIVE_QUIZZES.push({
          quizId: quizId,
          questions: questionsParsed.results.map((question: any) => {
            return {
              question: decode(question.question),
              correctAnswer: decode(question.correct_answer),
            };
          }),
        });
        const setOfQuestions = questionsParsed.results.map((question: any) => {
          return {
            question: decode(question.question),
            answered: false,
            answers: shuffleArray([
              ...question.incorrect_answers.map((answer: any) =>
                decode(answer)
              ),
              decode(question.correct_answer),
            ]).map((answer) => {
              return {
                answer: answer,
                selected: false,
              };
            }),
          };
        });
        return res
          .status(200)
          .json({ quizId: quizId, questions: setOfQuestions });
      } catch (error: any) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        const results: any = { score: 0, questions: [] };
        const activeQuizQuestions = ACTIVE_QUIZZES.find(
          (quiz) => quiz.quizId === req.body.quizId
        ).questions;
        req.body.answers.forEach((answer: any) => {
          let correctAnswer = activeQuizQuestions.find(
            (question: any) => question.question === answer.question
          );
          if (correctAnswer.correctAnswer === answer.answer) {
            (results.score = results.score + 1),
              results.questions.push({
                ...answer,
                correct: true,
              });
          } else {
            results.questions.push({
              ...answer,
              correct: false,
              correctAnswer: correctAnswer.correctAnswer,
            });
          }
        });
        ACTIVE_QUIZZES = ACTIVE_QUIZZES.filter(
          (quiz) => quiz.quizId !== req.body.quizId
        );
        console.log(ACTIVE_QUIZZES.length)
        return res.status(200).json(results);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
