import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetRelationshipsUseCase {
  async execute(table: string): Promise<any> {
    const tableInfo: [] = await prisma.$queryRaw`
      SELECT constraint_name, table_name, constraint_type
      FROM information_schema.table_constraints WHERE table_schema = 'public' AND table_name = ${table}
    `;

    if (!tableInfo) {
      throw new AppError("Tables not found", 404);
    }

    const constraints: [] = await prisma.$queryRaw`
      SELECT constraint_name, unique_constraint_name
      FROM information_schema.referential_constraints WHERE constraint_schema = 'public'
    `;

    constraints.forEach((constraint: any) => {
      tableInfo.map((table: any) => {
        if (table["constraint_name"] === constraint["constraint_name"]) {
          table["constraint_name"] = constraint["unique_constraint_name"];
        }
      });
    });

    const relationships = tableInfo.map((table: any) => {
      if (table["constraint_type"] === "FOREIGN KEY") {
        return table["constraint_name"].replace(/_pkey/g, "");
      }
    });

    return {
      relationships,
    };
  }
}
