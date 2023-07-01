export interface GetTablesDTO {
  tables: string[];
}

export interface GetColumnsDTO {
  columns: Column[];
}

type Column = {
  column_name: string;
};
