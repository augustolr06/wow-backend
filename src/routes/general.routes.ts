import { Router } from "express";
import { GetTablesController } from "../modules/general/useCases/getTables/GetTablesController";
import { GetColumnsByTableController } from "../modules/general/useCases/getColumnsByTable/GetColumnsByTableController";
import { GetRelationshipsController } from "../modules/general/useCases/getRelationships/getRelationshipsController";
import { GetFiltersController } from "../modules/general/useCases/getFilters/getFiltersController";
import { GetEnumValuesController } from "../modules/general/useCases/getEnumValues/getEnumValuesController";

const getTablesController = new GetTablesController();
const getColumnsByTableController = new GetColumnsByTableController();
const getRelationshipsController = new GetRelationshipsController();
const getFiltersController = new GetFiltersController();
const getEnumValuesController = new GetEnumValuesController();

const generalRoutes = Router();

generalRoutes.get("/tables", getTablesController.handle);
generalRoutes.get("/columns/:table", getColumnsByTableController.handle);
generalRoutes.get("/relationships/:table", getRelationshipsController.handle);
generalRoutes.get("/filters/:table", getFiltersController.handle);
generalRoutes.get("/enums", getEnumValuesController.handle);

export { generalRoutes };
