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
routes.use("/quest", questRoutes);
routes.use("/item", itemRoutes);
routes.use("/area", areaRoutes);
routes.use("/quest_requirements", questRequirementsRoutes);
routes.use("/quest_rewards", questRewardsRoutes);
routes.use("/item_stats", itemStatsRoutes);
routes.use("/weapon_stats", weaponStatsRoutes);

export { routes };
