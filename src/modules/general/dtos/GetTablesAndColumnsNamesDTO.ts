export interface GetTablesDTO {
  tables: [];
}

export interface GetColumnsDTO {
  columns: Column[];
}

type Column = {
  column_name: string;
};
