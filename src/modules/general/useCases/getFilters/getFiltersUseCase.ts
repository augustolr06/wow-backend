import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetFiltersDTO } from "./../../dtos/GeneralDTO";

export class GetFiltersUseCase {
  async execute(table: string): Promise<GetFiltersDTO[]> {
    const filtersInfo: [] = await prisma.$queryRaw`
      SELECT table_name, column_name, udt_name FROM information_schema.columns WHERE table_name = ${table}
    `;

    if (!filtersInfo.length) {
      throw new AppError("Table does not exist!");
    }

    const filters = filtersInfo?.map((filter) => {
      const name = `${filter["table_name"]}.${filter["column_name"]}`;
      const type = `${filter["udt_name"]}`;
      return {
        name,
        type,
      };
    });

    return filters;
  }
}
