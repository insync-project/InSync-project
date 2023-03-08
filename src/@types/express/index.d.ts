import { IUser } from "../../interfaces/users.interfaces";
// alterar para um import válido quando existir um no código;

declare global {
  namespace Express {
    interface Request {
      userTokenInfos: {
        email: string | undefined;
        id: string | undefined;
        admin: boolean | undefined;
      };
    }
  }
}
