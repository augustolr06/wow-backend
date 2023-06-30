import { Router } from "express";
import { ListAreasController } from "../modules/area/useCases/listAreas/ListAreasController";
import { GetAreaController } from "../modules/area/useCases/getArea/GetAreaController";
import { GetAreasByFiltersController } from "../modules/area/useCases/getAreasByFilters/GetAreasByFiltersController";

const listAreasController = new ListAreasController();
const getAreaController = new GetAreaController();
const getAreasByFiltersController = new GetAreasByFiltersController();

const areaRoutes = Router();

areaRoutes.get("/", listAreasController.handle);
areaRoutes.get("/id/:id", getAreaController.handle);
areaRoutes.get("/filters", getAreasByFiltersController.handle);

export { areaRoutes };
