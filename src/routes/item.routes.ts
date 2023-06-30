import { Router } from "express";
import { ListItemsController } from "../modules/item/useCases/listItems/ListItemsController";
import { GetItemController } from "../modules/item/useCases/getItem/GetItemController";
import { GetItemsByFiltersController } from "../modules/item/useCases/getItemsByFilters/GetItemsByFiltersController";

const listItemsController = new ListItemsController();
const getItemController = new GetItemController();
const getItemsByFiltersController = new GetItemsByFiltersController();

const itemRoutes = Router();

itemRoutes.get("/", listItemsController.handle);
itemRoutes.get("/id/:id", getItemController.handle);
itemRoutes.get("/filters", getItemsByFiltersController.handle);

export { itemRoutes };
