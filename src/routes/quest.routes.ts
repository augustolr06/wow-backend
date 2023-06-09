import { Router } from "express";
import { GetQuestController } from "../modules/quests/useCases/getQuests/GetQuestController";
import { ListQuestsController } from "../modules/quests/useCases/listQuests/ListQuestsController";

const getQuestController = new GetQuestController();
const listQuestsController = new ListQuestsController();

const questRoutes = Router();

questRoutes.get("/:id", getQuestController.handle);
questRoutes.get("/", listQuestsController.handle);

export { questRoutes };
