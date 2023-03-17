import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

export const validateAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    if(!req.userTokenInfos.admin){
        throw new AppError("User is not a admin!", 403)
    }

    next()
}