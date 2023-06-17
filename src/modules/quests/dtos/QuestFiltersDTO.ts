// export interface QuestFiltersDTO {
//   "quests.id"?: number;
//   "quests.title"?: string;
//   "quests.area"?: number;
//   "quests.description"?: string;
//   "quests.requirements"?: number;
//   "quests.rewards"?: number;
//   "requirements.id"?: number;
//   "requirements.min_character_level"?: number;
//   "requirements.max_character_level"?: number;
//   "requirements.faction"?: string;
//   "rewards.id"?: number;
//   "rewards.experience"?: number;
//   "rewards.money"?: number;
//   "rewards.reputation"?: number[];
//   "rewards.items"?: number[];
//   "area.id"?: number;
//   "area.name"?: string;
// }

export interface QuestFiltersDTO {
  attributes?: {
    table: string;
    column: string;
  }[];
  filters?: {
    table: string;
    column: string;
    operator: string;
    value: string | number;
  }[];
}
