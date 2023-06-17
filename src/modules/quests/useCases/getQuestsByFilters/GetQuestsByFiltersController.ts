import { Request, Response } from "express";
import { GetQuestsByFiltersUseCase } from "./GetQuestsByFiltersUseCase";

export class GetQuestsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filters = request.query;
    const { atributos, filtros } = filters;

    const arrayAtributos = atributos?.toString().split(",") ?? [];
    const arrayFiltros = filtros?.toString().split(",") ?? [];

    const separatedAttributes = arrayAtributos.map((attribute) => {
      const [table, column] = attribute.split(".");
      return { table, column };
    });

    // filtros que serão disponibilizados para o usuário:
    // quests.title
    // quest_area.name
    // quest_requirements.min_character_level
    // quest_requirements.max_character_level
    // quest_requirements.faction
    // quest_rewards.experience
    // quest_rewards.money

    // filtros que são do tipo number:
    // quest_requirements.min_character_level
    // quest_requirements.max_character_level
    // quest_rewards.experience
    // quest_rewards.money

    const numberFilters = [
      "quest_requirements.min_character_level",
      "quest_requirements.max_character_level",
      "quest_rewards.experience",
      "quest_rewards.money",
    ];

    const handledFilters = arrayFiltros.map((filter) => {
      const [table, column, operator, oldValue] = filter.split(".");
      let value;
      if (numberFilters.includes(`${table}.${column}`)) {
        value = Number(oldValue);
      } else {
        value = oldValue;
      }

      console.log("VALUE", value);
      console.log("TYPEOF VALUE", typeof value);

      return { table, column, operator, value };
    });

    const getQuestsByFiltersUseCase = new GetQuestsByFiltersUseCase();

    const quests = await getQuestsByFiltersUseCase.execute({
      attributes: separatedAttributes,
      filters: handledFilters,
    });

    return response.json(quests);
  }
}
