import { Router } from "express";
import { ListWeaponStatsController } from "../modules/weaponStats/useCases/listWeaponStats/ListWeaponStatsController";
import { GetWeaponStatController } from "../modules/weaponStats/useCases/getWeaponStat/GetWeaponStatController";
import { GetWeaponStatsByFiltersController } from "../modules/weaponStats/useCases/getWeaponStatsByFilters/GetWeaponStatsByFiltersController";

const listWeaponStatsController = new ListWeaponStatsController();
const getWeaponStatController = new GetWeaponStatController();
const getWeaponStatsByFiltersController =
  new GetWeaponStatsByFiltersController();

const weaponStatsRoutes = Router();

weaponStatsRoutes.get("/", listWeaponStatsController.handle);
weaponStatsRoutes.get("/id/:id", getWeaponStatController.handle);
weaponStatsRoutes.get("/filters", getWeaponStatsByFiltersController.handle);

export { weaponStatsRoutes };
