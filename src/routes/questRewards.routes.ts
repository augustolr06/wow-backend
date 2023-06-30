import { Router } from "express";
import { ListQuestRewardsController } from "../modules/questRewards/useCases/listQuestRewards/ListQuestRewardsController";
import { GetQuestRewardController } from "../modules/questRewards/useCases/getQuestReward/GetQuestRewardController";
import { GetQuestRewardsByFiltersController } from "../modules/questRewards/useCases/getQuestRewardsByFilters/GetQuestRewardsByFiltersController";

const listQuestRewardsController = new ListQuestRewardsController();
const getQuestRewardController = new GetQuestRewardController();
const getQuestRewardsByFiltersController =
  new GetQuestRewardsByFiltersController();

const questRewardsRoutes = Router();

questRewardsRoutes.get("/", listQuestRewardsController.handle);
questRewardsRoutes.get("/id/:id", getQuestRewardController.handle);
questRewardsRoutes.get("/filters", getQuestRewardsByFiltersController.handle);

export { questRewardsRoutes };
