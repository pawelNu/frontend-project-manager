export type Column<T> = {
    accessor: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
};

export type FilterOption = { label: string; value: string | number | boolean };

export type FilterConfig = {
    accessor: string;
    label?: string;
    type: 'text' | 'select' | 'checkbox' | 'number';
    options?: FilterOption[];
};

export type SortState = {
    field: string | null;
    direction: 'asc' | 'desc' | null;
};

export type TableParams<F = Record<string, unknown>> = {
    pageNumber: number;
    pageSize: number;
    filters: F;
    sort: SortState;
};

export type PaginationType = {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    hasPrevious: boolean;
    hasNext: boolean;
};
