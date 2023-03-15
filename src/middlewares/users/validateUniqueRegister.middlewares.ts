import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const validateUniqueRegisterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.body.email && req.body.nickname) {
    const registerToValidate: User | null = await usersRepository.findOne({
      where: [{ email: req.body.email }, { nickname: req.body.nickname }],
      withDeleted: true,
    });
    console.log(registerToValidate);
    if (registerToValidate) {
      if (registerToValidate.email === req.body.email) {
        throw new AppError("Invalid Email", 409);
      } else {
        throw new AppError("Invalid nickname", 409);
      }
    }
  }

  next();
};
