export interface GetTablesDTO {
  tables: string[];
}

export interface GetColumnsDTO {
  columns: Column[];
}

export interface GetFiltersDTO {
  name: string;
  type: string;
}

type Column = {
  column_name: string;
};

type Enum = string[];
export type EnumValue = {
  enum_value: string;
};

export interface GetEnumValuesDTO {
  bindingtype: Enum;
  inventorytype: Enum;
  itemclass: Enum;
  itemsubclass: Enum;
  damagetype: Enum;
}
