import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetColumnsDTO } from "../../dtos/GeneralDTO";

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

    const columnsInfo: [] =
      await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = ${table}`;

    const columns = columnsInfo?.map((column) => {
      return column["column_name"];
    });
    return {
      columns,
    };
  }
}
