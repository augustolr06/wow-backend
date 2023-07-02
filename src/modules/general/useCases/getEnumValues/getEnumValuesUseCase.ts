import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetEnumValuesDTO, EnumValue } from "./../../dtos/GeneralDTO";

export class GetEnumValuesUseCase {
  async execute(): Promise<GetEnumValuesDTO> {
    /*
      enums disponíveis:
      bindingtype
      inventorytype
      itemclass
      itemsubclass
      damagetype
    */
    const bindingtypeEnum: [] =
      await prisma.$queryRaw`SELECT unnest(enum_range(null::bindingtype)) AS enum_value`;
    if (!bindingtypeEnum || bindingtypeEnum.length === 0) {
      throw new AppError("Bindingtype enum not found", 404);
    }

    const inventorytypeEnum: [] =
      await prisma.$queryRaw`SELECT unnest(enum_range(null::inventorytype)) AS enum_value`;
    if (!inventorytypeEnum || inventorytypeEnum.length === 0) {
      throw new AppError("Inventorytype enum not found", 404);
    }

    const itemclassEnum: [] =
      await prisma.$queryRaw`SELECT unnest(enum_range(null::itemclass)) AS enum_value`;
    if (!itemclassEnum || itemclassEnum.length === 0) {
      throw new AppError("Itemclass enum not found", 404);
    }

    const itemsubclassEnum: [] =
      await prisma.$queryRaw`SELECT unnest(enum_range(null::itemsubclass)) AS enum_value`;
    if (!itemsubclassEnum || itemsubclassEnum.length === 0) {
      throw new AppError("Itemsubclass enum not found", 404);
    }

    const damagetypeEnum: [] =
      await prisma.$queryRaw`SELECT unnest(enum_range(null::damagetype)) AS enum_value`;
    if (!damagetypeEnum || damagetypeEnum.length === 0) {
      throw new AppError("Damagetype enum not found", 404);
    }

    const enumValues: GetEnumValuesDTO[] = [
      {
        bindingtype: bindingtypeEnum.map((bindingtype: EnumValue) =>
          bindingtype.enum_value.replace(/ /g, "_").replace(/-/g, "_")
        ),
        inventorytype: inventorytypeEnum.map((inventorytype: EnumValue) =>
          inventorytype.enum_value.replace(/ /g, "_").replace(/-/g, "_")
        ),
        itemclass: itemclassEnum.map((itemclass: EnumValue) =>
          itemclass.enum_value.replace(/ /g, "_").replace(/-/g, "_")
        ),
        itemsubclass: itemsubclassEnum.map((itemsubclass: EnumValue) =>
          itemsubclass.enum_value.replace(/ /g, "_").replace(/-/g, "_")
        ),
        damagetype: damagetypeEnum.map((damagetype: EnumValue) =>
          damagetype.enum_value.replace(/ /g, "_").replace(/-/g, "_")
        ),
      },
    ];

    return enumValues[0];
  }
}
