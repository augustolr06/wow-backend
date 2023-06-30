import { area } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class ListAreasUseCase {
  async execute(): Promise<area[]> {
    const areas = await prisma.area.findMany();

    return areas;
  }
}
