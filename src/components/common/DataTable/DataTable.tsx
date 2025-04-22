import { useState, useEffect } from 'react';
import { DataTableHeader, SortState } from './DataTableHeader';
import { DataTableFilters, FilterConfig } from './DataTableFilters';
import { DataTablePagination } from './DataTablePagination';
import { PaginationType } from '../Pagination';
import { AxiosResponse } from 'axios';
import { PaginatedResponse } from '../../common';
import { useGetApi } from '../../../hooks/useGetApi';
import { useParams } from 'react-router-dom';

export type Column<T> = {
    accessor: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
};

export type TableParams<F> = {
    pageNumber: number;
    pageSize: number;
    filters: Partial<F>;
    sort: SortState;
};

type Props<T, F = Record<string, unknown>> = {
    columns: Column<T>[];
    filters?: FilterConfig<F>[];
    getDataFunction: (pageNumber: number, pageSize: number) => Promise<AxiosResponse<PaginatedResponse<T>>>;
};

export function DataTable<T, F = Record<string, unknown>>({ columns, filters = [], getDataFunction }: Props<T, F>) {
    const { pageNumber, pageSize } = useParams();
    const page = isNaN(Number(pageNumber)) ? 1 : Number(pageNumber);
    const size = isNaN(Number(pageSize)) ? 10 : Number(pageSize);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T[] | undefined>(undefined);
    const [pagination, setPagination] = useState<PaginationType>({
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
    });

    const [filterState, setFilterState] = useState<F>({} as F);
    const [sort, setSort] = useState<SortState>({ field: null, direction: null });
    const { data: apiData, loading, error: apiError, request } = useGetApi(getDataFunction);

    useEffect(() => {
        request(page, size);
        setError(apiError);
    }, [apiError, page, request, size]);

    useEffect(() => {
        if (apiData) {
            setData(apiData.data);
            setPagination({
                pageNumber: apiData.page.pageNumber + 1,
                pageSize: apiData.page.pageSize,
                totalPages: apiData.page.totalPages,
                totalElements: apiData.page.totalElements,
                first: apiData.page.first,
                last: apiData.page.last,
                sortingField: apiData.page.sortingField,
                isAscendingSorting: apiData.page.isAscendingSorting,
                hasPrevious: apiData.page.hasPrevious,
                hasNext: apiData.page.hasNext,
            });
        }
    }, [apiData, data]);

    const handleSort = (field: string) => {
        setSort((prev) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handleFilterChange = (updated: Partial<F>) => {
        setFilterState((prev) => ({ ...prev, ...updated }));
        setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    };

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageNumber: page }));
    };

    const getNestedValue = (obj: unknown, path: string): unknown => {
        return path.split('.').reduce<unknown>((acc, key) => {
            if (typeof acc === 'object' && acc !== null && key in acc) {
                return (acc as Record<string, unknown>)[key];
            }
            return undefined;
        }, obj);
    };

    const getCellValue = (row: T, accessor: string): React.ReactNode => {
        const value = getNestedValue(row, accessor);
        return value !== null && value !== undefined ? String(value) : '';
    };

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <DataTableFilters<F> filters={filters} filterState={filterState} onChange={handleFilterChange} />
                <table className="table table-hover mt-3">
                    <DataTableHeader columns={columns} sort={sort} onSort={handleSort} />
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length}>Loading...</td>
                            </tr>
                        ) : (
                            data?.map((row, idx) => (
                                <tr key={idx}>
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx}>
                                            {col.render ? col.render(row) : getCellValue(row, col.accessor.toString())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <DataTablePagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
        </>
    );
}
