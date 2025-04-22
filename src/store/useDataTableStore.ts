// store/createDataTableStore.ts
import { create } from 'zustand';
import { PaginationType } from '../components/common/Pagination';
import { SortState } from '../components/common/DataTable/DataTableHeader';

export type DataTableStore<T, F> = {
    data: T[] | undefined;
    pagination: PaginationType;
    filters: Partial<F>;
    sort: SortState;
    loading: boolean;
    error: string | null;
    setData: (data: T[]) => void;
    setPagination: (pagination: PaginationType) => void;
    setFilters: (filters: Partial<F>) => void;
    setSort: (sort: SortState) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export const createDataTableStore = <T, F = Record<string, unknown>>() =>
    create<DataTableStore<T, F>>((set) => ({
        data: [],
        pagination: {
            pageNumber: 1,
            pageSize: 10,
            totalPages: 1,
            totalElements: 0,
            first: true,
            last: true,
            sortingField: null,
            isAscendingSorting: null,
            hasPrevious: false,
            hasNext: false,
        },
        filters: {},
        sort: { field: null, direction: null },
        loading: false,
        error: null,
        setData: (data) => set({ data }),
        setPagination: (pagination) => set({ pagination }),
        setFilters: (filters) => set({ filters }),
        setSort: (sort) => set({ sort }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
    }));
