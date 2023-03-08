import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";

const app: Application = express();

app.use(express.json());

app.use(errorHandler);

export default app;
