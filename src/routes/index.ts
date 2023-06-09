import { Router } from "express";
import { questRoutes } from "./quest.routes";

const routes = Router();

routes.use("/quests", questRoutes);

export { routes };
