import { Router } from "express";
import { questRoutes } from "./quest.routes";
import { generalRoutes } from "./general.routes";

const routes = Router();

routes.use("/quests", questRoutes);
routes.use("/general", generalRoutes);

export { routes };
