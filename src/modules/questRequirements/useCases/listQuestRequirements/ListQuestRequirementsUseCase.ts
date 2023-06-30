import { quest_requirements } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class ListQuestRequirementsUseCase {
  async execute(): Promise<quest_requirements[]> {
    const questRequirements = await prisma.quest_requirements.findMany();

    return questRequirements;
  }
}
