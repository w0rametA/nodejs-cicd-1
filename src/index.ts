import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { max, min, avg } from "./utils";

type HandlerFunc = (req: Request, res: Response) => Promise<Response>;

dotenv.config();

async function main() {
  const port = process.env.PORT || 8000;
  const app = express();

  app.get("/max", newCalcHandler(max));
  app.get("/min", newCalcHandler(min));
  app.get("/avg", newCalcHandler(avg));

  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
}

function newCalcHandler(calcFunc: (numbers: number[]) => number): HandlerFunc {
  return (req: Request, res: Response): Promise<Response> => {
    const { numbers } = req.body;
    if (!numbers) {
      return Promise.resolve(
        res.status(400).json({ error: "missing `numbers` in body" }).end(),
      );
    }

    try {
      const m = calcFunc(numbers);
      return Promise.resolve(
        res.status(200).json({ numbers, ops: "max", result: m }).end(),
      );
    } catch (err) {
      return Promise.resolve(res.status(400).json({ error: err }).end());
    }
  };
}

main();
