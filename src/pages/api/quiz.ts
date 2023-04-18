import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        return res.status(200).json({});
      } catch (error: any) {
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
