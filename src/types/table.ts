export type SortColumn = string  | number;
export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}
export const rotateTableDirection: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compareColumn = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;