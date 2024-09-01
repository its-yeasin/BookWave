import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
