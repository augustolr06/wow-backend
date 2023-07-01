import { Router } from "express";
import { GetTablesController } from "../modules/general/useCases/getTables/GetTablesController";
import { GetColumnsByTableController } from "../modules/general/useCases/getColumnsByTable/GetColumnsByTableController";
import { GetRelationshipsController } from "../modules/general/useCases/getRelationships/getRelationshipsController";

const getTablesController = new GetTablesController();
const getColumnsByTableController = new GetColumnsByTableController();
const getRelationshipsController = new GetRelationshipsController();

const generalRoutes = Router();

generalRoutes.get("/tables", getTablesController.handle);
generalRoutes.get("/columns/:table", getColumnsByTableController.handle);
generalRoutes.get("/relationships/:table", getRelationshipsController.handle);

export { generalRoutes };
