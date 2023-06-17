import { Router } from "express";
import { GetTablesController } from "../modules/general/useCases/getTables/GetTablesController";
import { GetColumnsByTableController } from "../modules/general/useCases/getColumnsByTable/GetColumnsByTableController";

const getTablesController = new GetTablesController();
const getColumnsByTableController = new GetColumnsByTableController();

const generalRoutes = Router();

generalRoutes.get("/tables", getTablesController.handle);
generalRoutes.get("/columns/:table", getColumnsByTableController.handle);

export { generalRoutes };
