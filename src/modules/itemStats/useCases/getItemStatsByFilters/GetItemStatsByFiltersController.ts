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

    // todas as colunas são do tipo number.
    const handledFilters = arrayFiltros.map((filter) => {
      const [table, column, operator, value] = filter.split(".");

      return { table, column, operator, value: Number(value) };
    });

    const getItemStatsByFiltersUseCase = new GetItemStatsByFiltersUseCase();

    const itemStats = await getItemStatsByFiltersUseCase.execute({
      attributes: separatedAttributes,
      filters: handledFilters,
    });

    return response.json(itemStats);
  }
}
