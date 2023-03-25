import "express-async-errors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { errorHandler } from "./errors";
import { usersRoutes } from "./routers/users.routes";
import { technologiesRoutes } from "./routers/technologies.routes";
import { projectsRoutes } from "./routers/projects.routes";
import { teamsRoutes } from "./routers/teamsProjects.routes";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (request, response) => {
  return response.json({
    message: "Termos de Serviço",
  });
});

app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/technologies", technologiesRoutes);
app.use("/teams", teamsRoutes);

app.use(errorHandler);

export default app;
