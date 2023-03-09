import { NextFunction, Request, Response } from "express";
import { VerifyErrors, VerifyOptions, verify } from "jsonwebtoken";
import { AppError } from "../../errors";

export const tokenValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authToken: string | undefined = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = authToken.split(" ")[1];

  verify(
    token,
    String(process.env.SECRET_KEY),
    (error: VerifyErrors | null, decoded: any): VerifyOptions => {
      if (error) {
        throw new AppError(error.message, 401);
      }

      req.userTokenInfos = {
        email: decoded.email,
        admin: decoded.admin,
        id: decoded.sub,
      };

      // req.userTokenInfos.admin = decoded.admin;
      // req.userTokenInfos.email = decoded.email;
      // req.userTokenInfos.id = decoded.sub;

      return {};
    }
  );

  return next();
};
