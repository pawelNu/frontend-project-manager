import { useState, useEffect, useCallback } from 'react';
import { Column, FilterConfig, SortState, PaginationType, TableParams } from './types';
import { DataTableHeader } from './DataTableHeader';
import { DataTableFilters } from './DataTableFilters';
import { DataTablePagination } from './DataTablePagination';

type Props<T, F = Record<string, unknown>> = {
    columns: Column<T>[];
    filters?: FilterConfig<F>[];
    fetchData: (params: TableParams<F>) => Promise<{
        data: T[];
        pagination: PaginationType;
    }>;
    pageSize?: number;
};

export function DataTable<T, F = Record<string, unknown>>({
    columns,
    filters = [],
    fetchData,
    pageSize = 10,
}: Props<T, F>) {
    const [data, setData] = useState<T[]>([]);
    const [pagination, setPagination] = useState<PaginationType>({
        pageNumber: 1,
        pageSize,
        totalPages: 1,
        totalElements: 0,
        hasPrevious: false,
        hasNext: false,
    });

    const [filterState, setFilterState] = useState<F>({} as F);
    const [sort, setSort] = useState<SortState>({ field: null, direction: null });
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);
        const res = await fetchData({
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
            filters: filterState,
            sort,
        });
        setData(res.data);
        setPagination(res.pagination);
        setLoading(false);
    }, [fetchData, filterState, pagination.pageNumber, pagination.pageSize, sort]);

    useEffect(() => {
        loadData();
    }, [loadData]);

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
        <div>
            <DataTableFilters<F> filters={filters} filterState={filterState} onChange={handleFilterChange} />
            <table className="table table-bordered table-hover mt-3">
                <DataTableHeader columns={columns} sort={sort} onSort={handleSort} />
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length}>Loading...</td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
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
    );
}
