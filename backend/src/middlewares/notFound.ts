import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "No Found 404" })
}

export default notFound