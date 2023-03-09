import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import { usersRoutes } from "./routers/users.routes";
import { projectsRoutes } from "./routers/projects.routes";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);

app.use(errorHandler);

export default app;
