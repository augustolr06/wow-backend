import { Request, Response } from "express";
import { GetItemsByFiltersUseCase } from "./GetItemsByFiltersUseCase";

export class GetItemsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { attributes, filters } = request.query;

    const arrayAtributos =
      attributes
        ?.toString()
        .split(",")
        .filter((attribute) => attribute !== "") ?? [];
    const arrayFiltros =
      filters
        ?.toString()
        .split(",")
        .filter((filter) => filter !== "") ?? [];

    const separatedAttributes = arrayAtributos.map((attribute) => {
      const [table, column] = attribute.split(".");
      return { table, column };
    });

    const numberFilters = [
      "item.id",
      "item.durability",
      "item.item_stats",
      "item.level",
      "item.max_count",
      "item.purchase_price",
      "item.purchase_quantity",
      "item.required_level",
      "item.sell_price",
      "item.weapon_stats",
    ];

    const arrayNumberFilters = [];
    const arrayStringFilters = ["item.spells"];

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

    const getItemsByFiltersUseCase = new GetItemsByFiltersUseCase();

    const items = await getItemsByFiltersUseCase.execute({
      attributes: separatedAttributes,
      filters: handledFilters,
    });

    return response.json(items);
  }
}
