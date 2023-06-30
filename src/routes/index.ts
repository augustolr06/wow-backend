import { Router } from "express";
import { generalRoutes } from "./general.routes";
import { questRoutes } from "./quest.routes";
import { itemRoutes } from "./item.routes";
import { areaRoutes } from "./area.routes";
import { questRequirementsRoutes } from "./questRequirements.routes";
import { questRewardsRoutes } from "./questRewards.routes";
import { itemStatsRoutes } from "./itemStats.routes";
import { weaponStatsRoutes } from "./weaponStats.routes";

const routes = Router();

routes.use("/general", generalRoutes);
routes.use("/quests", questRoutes);
routes.use("/items", itemRoutes);
routes.use("/areas", areaRoutes);
routes.use("/questRequirements", questRequirementsRoutes);
routes.use("/questRewards", questRewardsRoutes);
routes.use("/itemStats", itemStatsRoutes);
routes.use("/weaponStats", weaponStatsRoutes);

export { routes };
