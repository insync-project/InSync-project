import "express-async-errors";
import express, { Application, Request, Response } from "express";
import { errorHandler } from "./errors";
import { AppDataSource } from "./data-source";
import { User } from "./entities";

const app: Application = express();

app.use(express.json());

app.use(
  "/users",
  async (req: Request, res: Response): Promise<Response | void> => {
    const usersRepository = AppDataSource.getRepository(User);

    let usersList: Array<User> = await usersRepository.find({
      withDeleted: true,
    });

    console.log(usersList);

    return res.status(200).json(usersList);
  }
);

app.use(errorHandler);

export default app;
