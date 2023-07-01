import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetTablesDTO } from "../../dtos/GeneralDTO";

export class GetTablesUseCase {
  async execute(): Promise<GetTablesDTO> {
    const tablesInfo: [] = await prisma.$queryRaw`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE';`;

    if (!tablesInfo) {
      throw new AppError("Tables not found", 404);
    }

    const tables = tablesInfo?.map((table) => {
      return table["table_name"];
    });

    return {
      tables,
    };
  }
}
