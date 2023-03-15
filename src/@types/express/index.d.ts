import { Project } from "../../entities";

declare global {
  namespace Express {
    interface Request {
      userTokenInfos: {
        email: string | undefined;
        id: string | undefined;
        admin: boolean | undefined;
      };
      projectInfos: Project;
    }
  }
}
