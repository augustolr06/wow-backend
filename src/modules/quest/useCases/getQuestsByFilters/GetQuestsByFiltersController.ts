import { Request, Response } from "express";
import { GetQuestsByFiltersUseCase } from "./GetQuestsByFiltersUseCase";

export class GetQuestsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { attributes, filters } = request.query;

    const arrayAtributos = attributes?.toString().split(",") ?? [];
    const arrayFiltros = filters?.toString().split(",") ?? [];

    const separatedAttributes = arrayAtributos.map((attribute) => {
      const [oldTable, column] = attribute.split(".");
      const table = oldTable === "area" ? "area_quest_areaToarea" : oldTable;
      return { table, column };
    });

    const numberFilters = [
      "quest.id",
      "quest_requirements.id",
      "quest_requirements.min_character_level",
      "quest_requirements.max_character_level",
      "quest_rewards.id",
      "quest_rewards.experience",
      "quest_rewards.money",
      "area_quest_areaToarea.id",
    ];

    const arrayStringFilters = ["quest_rewards.reputation"];
    const arrayNumberFilters = ["quest_rewards.items"];

    const handledFilters = arrayFiltros.map((filter) => {
      const [oldTable, column, operator, oldValue] = filter.split(".");
      let value;
      const table = oldTable === "area" ? "area_quest_areaToarea" : oldTable; // TODO: remover isso se der certo no front
      if (numberFilters.includes(`${table}.${column}`)) {
        value = Number(oldValue);
      } else {
        value = oldValue;
      }

      if (arrayStringFilters.includes(`${table}.${column}`)) {
        value = oldValue.split("|");
      }

      if (arrayNumberFilters.includes(`${table}.${column}`)) {
        value = oldValue.split("|").map((item) => Number(item));
      }

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
