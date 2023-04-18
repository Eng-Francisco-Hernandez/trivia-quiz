import type { NextApiRequest, NextApiResponse } from "next";

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
        return res.status(200).json(questionsParsed);
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
