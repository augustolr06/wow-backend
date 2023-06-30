export interface AreaFiltersDTO {
  attributes?: {
    table: string;
    column: string;
  }[];
  filters?: {
    table: string;
    column: string;
    operator: string;
    value: string | number;
  }[];
}