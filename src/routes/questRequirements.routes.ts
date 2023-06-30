import { Router } from "express";
import { ListQuestRequirementsController } from "../modules/questRequirements/useCases/listQuestRequirements/ListQuestRequirementsController";
import { GetQuestRequirementController } from "../modules/questRequirements/useCases/getQuestRequirement/GetQuestRequirementController";
import { GetQuestRequirementsByFiltersController } from "../modules/questRequirements/useCases/getQuestRequirementsByFilters/GetQuestRequirementsByFiltersController";

const listQuestRequirementsController = new ListQuestRequirementsController();
const getQuestRequirementController = new GetQuestRequirementController();
const getQuestRequirementsByFiltersController =
  new GetQuestRequirementsByFiltersController();

const questRequirementsRoutes = Router();

questRequirementsRoutes.get("/", listQuestRequirementsController.handle);
questRequirementsRoutes.get("/id/:id", getQuestRequirementController.handle);
questRequirementsRoutes.get(
  "/filters",
  getQuestRequirementsByFiltersController.handle
);

export { questRequirementsRoutes };
