import { Router } from "express";
import { ListItemStatsController } from "../modules/itemStats/useCases/listItemStats/ListItemStatsController";
import { GetItemStatController } from "../modules/itemStats/useCases/getItemStat/GetItemStatController";
import { GetItemStatsByFiltersController } from "../modules/itemStats/useCases/getItemStatsByFilters/GetItemStatsByFiltersController";

const listItemStatsController = new ListItemStatsController();
const getItemStatController = new GetItemStatController();
const getItemStatsByFiltersController = new GetItemStatsByFiltersController();

const itemStatsRoutes = Router();

itemStatsRoutes.get("/", listItemStatsController.handle);
itemStatsRoutes.get("/id/:id", getItemStatController.handle);
itemStatsRoutes.get("/filters", getItemStatsByFiltersController.handle);

export { itemStatsRoutes };
