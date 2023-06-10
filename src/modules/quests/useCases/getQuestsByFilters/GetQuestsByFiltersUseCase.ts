import { quest } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestFiltersDTO } from "../../dtos/QuestFiltersDTO";

export class GetQuestsByFiltersUseCase {
  async execute(filters: QuestFiltersDTO): Promise<quest[]> {
    // verificando se os filtros foram passados
    if (!filters) {
      throw new AppError("Filters not found");
    }

    // tratando os filtros de acordo com o tipo de dado
    Object.entries(filters).map(([key, value]) => {
      if (
        key === "id" ||
        key === "area" ||
        key === "requirements" ||
        key === "rewards"
      ) {
        filters[key] = Number(value);
      }
    });

    // buscando as quests de acordo com os filtros
    const quests = await prisma.quest.findMany({
      where: {
        AND:
          filters &&
          Object.entries(filters).map(([key, value]) => {
            return {
              [key]: value,
            };
          }),
        quest_rewards: {
          money: 30,
        },
      },
    });

    if (!quests) {
      throw new AppError("Quests not found");
    }

    return quests;
  }
}
