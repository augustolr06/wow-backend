import { area } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AreaDTO } from "../../dtos/AreaDTO";
import { AppError } from "../../../../errors/AppError";

export class GetAreaUseCase {
  async execute(id: AreaDTO["id"]): Promise<area> {
    const area = await prisma.area.findUnique({
      where: {
        id,
      },
    });

    if (!area) {
      throw new AppError("Area does not exists!");
    }

    return area;
  }
}
