import { Router } from "express";
import { ListQuestsController } from "../modules/quest/useCases/listQuests/ListQuestsController";
import { GetQuestController } from "../modules/quest/useCases/getQuest/GetQuestController";
import { GetQuestsByFiltersController } from "../modules/quest/useCases/getQuestsByFilters/GetQuestsByFiltersController";

const listQuestsController = new ListQuestsController();
const getQuestController = new GetQuestController();
const getQuestsByFiltersController = new GetQuestsByFiltersController();

const questRoutes = Router();

questRoutes.get("/", listQuestsController.handle);
questRoutes.get("/id/:id", getQuestController.handle);
questRoutes.get("/filters", getQuestsByFiltersController.handle);

export { questRoutes };
