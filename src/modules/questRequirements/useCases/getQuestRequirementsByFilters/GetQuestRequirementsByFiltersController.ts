import { Request, Response } from "express";
import { GetQuestRequirementsByFiltersUseCase } from "./GetQuestRequirementsByFiltersUseCase";

export class GetQuestRequirementsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { attributes, filters } = request.query;

    const arrayAtributos = attributes?.toString().split(",") ?? [];
    const arrayFiltros = filters?.toString().split(",") ?? [];

    const separatedAttributes = arrayAtributos.map((attribute) => {
      const [table, column] = attribute.split(".");
      return { table, column };
    });

    const numberFilters = [
      "quest_requirements.id",
      "quest_requirements.max_character_level",
      "quest_requirements.min_character_level",
    ];

    // não possui atributos de array;

    const handledFilters = arrayFiltros.map((filter) => {
      const [table, column, operator, oldValue] = filter.split(".");
      let value;
      if (numberFilters.includes(`${table}.${column}`)) {
        value = Number(oldValue);
      } else {
        value = oldValue;
      }

      return { table, column, operator, value };
    });

    const getQuestRequirementsByFiltersUseCase =
      new GetQuestRequirementsByFiltersUseCase();

    const questRequirements =
      await getQuestRequirementsByFiltersUseCase.execute({
        attributes: separatedAttributes,
        filters: handledFilters,
      });

    return response.json(questRequirements);
  }
}
