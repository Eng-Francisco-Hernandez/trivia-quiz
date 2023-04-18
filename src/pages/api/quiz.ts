import { shuffleArray } from "@/utils/shuffleArray";
import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "html-entities";

const TRIVIA_BASE_URL = `https://opentdb.com/api.php?`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      const params = Object.keys(query)
        .map((key) => {
          return `${key}=${query[key]}`;
        })
        .join("&");
      try {
        const questions = await fetch(`${TRIVIA_BASE_URL}${params}`);
        const questionsParsed = await questions.json();
        const setOfQuestions = questionsParsed.results.map((question: any) => {
          return {
            question: decode(question.question),
            answered: false,
            answers: shuffleArray([
              ...question.incorrect_answers.map((question: any) =>
                decode(question)
              ),
              question.correct_answer,
            ]).map((answer) => {
              return {
                answer: answer,
                selected: false,
              };
            }),
          };
        });
        return res.status(200).json(setOfQuestions);
      } catch (error: any) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        return res.status(200).json({});
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
