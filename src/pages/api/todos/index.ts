import { todos } from "@/data/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const todo = { id: Date.now(), ...req.body };
    todos.push(todo);
    res.status(201).json(todo);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
