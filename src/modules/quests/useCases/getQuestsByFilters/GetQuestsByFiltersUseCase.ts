import { quest } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestFiltersDTO } from "../../dtos/QuestFiltersDTO";

export class GetQuestsByFiltersUseCase {
  async execute(filters: QuestFiltersDTO): Promise<quest[]> {
    // verificando se os filtros foram passados
    console.log("filters before: ", filters);
    if (!filters) {
      throw new AppError("Filters not found");
    }

    /** TASKS:
     * - separar os atributos de quests e de seus relacionamentos.
     * - Tratar cada atributo de acordo com o tipo de dado.
     * - buscar as quests de acordo com os filtros;
     */

    // separando os atributos de quests e de seus relacionamentos
    // questAttributes => separar as keys de filters por ponto (split(".")). Ex: "area.id" => ["area", "id"]. Se a primeira posição do array for igual a "quests", então questAttributes = ["id"].
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

    const requirementsAttributes = Object.keys(filters)
      .filter((key) => {
        const keyArray = key.split(".");
        return keyArray[0] === "requirements";
      })
      .map((key) => {
        const keyArray = key.split(".");
        return keyArray[1];
      });

    const areaAttributes = Object.keys(filters)
      .filter((key) => {
        const keyArray = key.split(".");
        return keyArray[0] === "area";
      })
      .map((key) => {
        const keyArray = key.split(".");
        return keyArray[1];
      });

    // tratando cada atributo de acordo com o tipo de dado
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
        filters[key] = value.split(",");
      }
    });

    // testando se os atributos de quests foram tratados corretamente
    console.log("filters after: ", filters);

    // buscando as quests de acordo com os filtros

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
