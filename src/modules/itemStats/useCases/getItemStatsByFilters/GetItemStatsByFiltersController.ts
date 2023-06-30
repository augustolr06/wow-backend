import { Request, Response } from "express";
import { GetItemStatsByFiltersUseCase } from "./GetItemStatsByFiltersUseCase";

export class GetItemStatsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { attributes, filters } = request.query;

    const arrayAtributos = attributes?.toString().split(",") ?? [];
    const arrayFiltros = filters?.toString().split(",") ?? [];

    const separatedAttributes = arrayAtributos.map((attribute) => {
      const [table, column] = attribute.split(".");
      return { table, column };
    });

    // TODO: escolher os filtros numericos para colocar aqui
    const numberFilters = ["item_stats.agility"];

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

    const getItemStatsByFiltersUseCase = new GetItemStatsByFiltersUseCase();

    const itemStats = await getItemStatsByFiltersUseCase.execute({
      attributes: separatedAttributes,
      filters: handledFilters,
    });

    return response.json(itemStats);
  }
}
