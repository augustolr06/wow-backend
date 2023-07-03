import { Request, Response } from "express";
import { GetQuestRewardsByFiltersUseCase } from "./GetQuestRewardsByFiltersUseCase";

export class GetQuestRewardsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { attributes, filters } = request.query;

    const arrayAtributos = attributes?.toString().split(",") ?? [];
    const arrayFiltros = filters?.toString().split(",") ?? [];

    const separatedAttributes = arrayAtributos.map((attribute) => {
      const [table, column] = attribute.split(".");
      return { table, column };
    });

    const numberFilters = [
      "quest_rewards.id",
      "quest_rewards.experience",
      "quest_rewards.money",
    ];

    const arrayNumberFilters = [
      "quest_rewards.reputation",
      "quest_rewards.items",
    ];

    // Não possui atributos de array de string;

    const handledFilters = arrayFiltros.map((filter) => {
      const [table, column, operator, oldValue] = filter.split(".");
      let value;
      if (numberFilters.includes(`${table}.${column}`)) {
        value = Number(oldValue);
      } else {
        value = oldValue;
      }

      if (arrayNumberFilters.includes(`${table}.${column}`)) {
        value = oldValue.split("|").map((item) => Number(item));
      }

      return { table, column, operator, value };
    });

    const getQuestRewardsByFiltersUseCase =
      new GetQuestRewardsByFiltersUseCase();

    const questRewards = await getQuestRewardsByFiltersUseCase.execute({
      attributes: separatedAttributes,
      filters: handledFilters,
    });

    return response.json(questRewards);
  }
}
