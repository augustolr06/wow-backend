import { quest } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestFiltersDTO } from "../../dtos/QuestFiltersDTO";

export class GetQuestsByFiltersUseCase {
  async execute(filters: QuestFiltersDTO): Promise<quest[]> {
    // implementar o caso de uso
    return [];
  }
}
