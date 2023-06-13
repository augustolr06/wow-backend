import { quest } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestFiltersDTO } from "../../dtos/QuestFiltersDTO";

export class GetQuestsByFiltersUseCase {
  async execute(filters: QuestFiltersDTO): Promise<quest[]> {
    if (!filters) {
      throw new AppError("Filters not found");
    }

    const questAttributes = Object.keys(filters)
      .filter((key) => {
        const keyArray = key.split(".");
        return keyArray[0] === "quests";
      })
      .map((key) => {
        const keyArray = key.split(".");
        return keyArray[1];
      });

    const rewardsAttributes = Object.keys(filters)
      .filter((key) => {
        const keyArray = key.split(".");
        return keyArray[0] === "rewards";
      })
      .map((key) => {
        const keyArray = key.split(".");
        return keyArray[1];
      });

    const rewardsIncludes: Record<string, boolean> = {};
    for (let i = 0; i < rewardsAttributes.length; i++) {
      rewardsIncludes[rewardsAttributes[i]] = true;
    }

    const requirementsAttributes = Object.keys(filters)
      .filter((key) => {
        const keyArray = key.split(".");
        return keyArray[0] === "requirements";
      })
      .map((key) => {
        const keyArray = key.split(".");
        return keyArray[1];
      });

    const requirementsIncludes: Record<string, boolean> = {};
    for (let i = 0; i < requirementsAttributes.length; i++) {
      requirementsIncludes[requirementsAttributes[i]] = true;
    }

    const areaAttributes = Object.keys(filters)
      .filter((key) => {
        const keyArray = key.split(".");
        return keyArray[0] === "area";
      })
      .map((key) => {
        const keyArray = key.split(".");
        return keyArray[1];
      });

    const areaIncludes: Record<string, boolean> = {};
    for (let i = 0; i < areaAttributes.length; i++) {
      areaIncludes[areaAttributes[i]] = true;
    }

    Object.entries(filters).map(([key, value]) => {
      if (
        key === "quests.id" ||
        key === "quests.area" ||
        key === "quests.requirements" ||
        key === "quests.rewards" ||
        key === "rewards.id" ||
        key === "rewards.experience" ||
        key === "rewards.money" ||
        key === "requirements.id" ||
        key === "requirements.max_character_level" ||
        key === "requirements.min_character_level" ||
        key === "area.id"
      ) {
        filters[key] = Number(value);
      }
    });
    // tratando o atributos do tipo array
    Object.entries(filters).map(([key, value]) => {
      if (
        key === "rewards.reputation" ||
        key === "rewards.items" ||
        key === "requirements.faction"
      ) {
        filters[key] = value && value.split(",");
      }
    });

    Object.keys(rewardsIncludes).length === 0 && console.log("rewardsIncludes");
    Object.keys(requirementsIncludes).length === 0 &&
      console.log("requirementsIncludes");
    Object.keys(areaIncludes).length === 0 && console.log("areaIncludes");

    const quests = await prisma.quest.findMany({
      where: {
        AND: questAttributes.map((atribute) => {
          return {
            [atribute]:
              filters[("quests." + atribute) as keyof QuestFiltersDTO],
          };
        }),
        quest_rewards: {
          AND: rewardsAttributes.map((atribute) => {
            return {
              [atribute]:
                filters[("rewards." + atribute) as keyof QuestFiltersDTO],
            };
          }),
        },
        quest_requirements: {
          AND: requirementsAttributes.map((atribute) => {
            return {
              [atribute]:
                filters[("requirements." + atribute) as keyof QuestFiltersDTO],
            };
          }),
        },
        area_quest_areaToarea: {
          AND: areaAttributes.map((atribute) => {
            return {
              [atribute]:
                filters[("area." + atribute) as keyof QuestFiltersDTO],
            };
          }),
        },
      },
      include: {
        quest_rewards:
          Object.keys(rewardsIncludes).length !== 0
            ? {
                select: rewardsIncludes,
              }
            : false,
        quest_requirements:
          Object.keys(requirementsIncludes).length !== 0
            ? {
                select: requirementsIncludes,
              }
            : false,
        area_quest_areaToarea:
          Object.keys(areaIncludes).length !== 0
            ? {
                select: areaIncludes,
              }
            : false,
      },
    });

    if (!quests) {
      throw new AppError("Quests not found");
    }

    return quests;
  }
}

// rascunho para a documentação desse endpoint
// /** Como deve ser a requisição:
//  * para os atributos de quests:
//  * - quests.nome_do_atributo=valor
//  * para os atributos de rewards:
//  * - rewards.nome_do_atributo=valor
//  * para os atributos de requirements:
//  * - requirements.nome_do_atributo=valor
//  * para os atributos de area:
//  * - area.nome_do_atributo=valor
//  * Para qualquer atributo que seja um array:
//  * - nome_do_atributo=valor1,valor2,valor3
//  * Exemplo de requisição:
//  * GET /quests/filters?quests.id=1&quests.name=quest1&quests.area=1&quests.requirements=1&quests.rewards=1&rewards.id=1&rewards.experience=100&rewards.money=100&rewards.reputation=1,2,3&rewards.items=1,2,3&requirements.id=1&requirements.max_character_level=10&requirements.min_character_level=1&requirements.faction=1,2,3&area.id=1&area.name=area1
