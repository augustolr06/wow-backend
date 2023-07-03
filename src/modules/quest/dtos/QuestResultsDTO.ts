import { quest, quest_requirements, quest_rewards, area } from "@prisma/client";

export interface QuestResultsDTO
  extends quest,
    quest_requirements,
    quest_rewards,
    area {}
