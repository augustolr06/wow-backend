import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetColumnsDTO } from "../../dtos/GetTablesAndColumnsNamesDTO";

type TableExists = [
  {
    exists: boolean;
  }
];

export class GetColumnsByTableUseCase {
  async execute(table: string): Promise<GetColumnsDTO> {
    const tableExists: TableExists =
      await prisma.$queryRaw`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = ${table})`;

    if (!tableExists[0].exists) {
      throw new AppError("Table does not exist!");
    }

    const columns: GetColumnsDTO["columns"] =
      await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = ${table}`;

    return {
      columns,
    };
  }
}
