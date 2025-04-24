import { useState, useEffect, useImperativeHandle } from 'react';
import { DataTableHeader, SortState } from './DataTableHeader';
import { DataTableFilters, FilterConfig } from './DataTableFilters';
import { DataTablePagination } from './DataTablePagination';
import { PaginationType } from '../Pagination';
import { AxiosResponse } from 'axios';
import { useFetchDataApi } from '../../../hooks/useFetchDataApi';
import { useParams } from 'react-router-dom';
import { UUIDTypes } from 'uuid';

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

export type DataTableRef = {
    removeItem: (id: UUIDTypes) => void;
};

export type DataTableProps<ArgumentsType, ResponseDataType, FiltersType = Record<string, unknown>> = {
    columns: Column<ResponseDataType>[];
    filters?: FilterConfig<FiltersType>[];
    getDataFunction: (filters: ArgumentsType) => Promise<AxiosResponse<ResponseDataType>>;
};

export const DataTable = <
    ArgumentsType,
    ResponseDataType extends { id: UUIDTypes },
    FiltersType = Record<string, unknown>,
>(
    { columns, filters = [], getDataFunction }: DataTableProps<ArgumentsType, ResponseDataType, FiltersType>,
    ref: React.Ref<DataTableRef>,
) => {
    const { pageNumber, pageSize } = useParams();
    const page = isNaN(Number(pageNumber)) ? 1 : Number(pageNumber);
    const size = isNaN(Number(pageSize)) ? 10 : Number(pageSize);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ResponseDataType[] | undefined>(undefined);
    const [pagination, setPagination] = useState<PaginationType>({
        pageNumber: page,
        pageSize: size,
        totalPages: 1,
        totalElements: 0,
        first: true,
        last: true,
        sortingField: null,
        isAscendingSorting: null,
        hasPrevious: false,
        hasNext: false,
    });

    const [filterState, setFilterState] = useState<FiltersType>({} as FiltersType);
    const [sort, setSort] = useState<SortState>({ field: null, direction: null });
    const {
        data: apiData,
        loading,
        error: apiError,
        request,
    } = useFetchDataApi<[ArgumentsType], ResponseDataType>(getDataFunction);

    useEffect(() => {
        // TODO refactor to filters object
        request(pagination.pageNumber, pagination.pageSize);
        setError(apiError);
    }, [apiError, pagination.pageNumber, pagination.pageSize, request]);

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
    }, [apiData]);

    const handleSort = (field: string) => {
        setSort((prev) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handleFilterChange = (updated: Partial<FiltersType>) => {
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

    const getCellValue = (row: ResponseDataType, accessor: string): React.ReactNode => {
        const value = getNestedValue(row, accessor);
        return value !== null && value !== undefined ? String(value) : '';
    };

    useImperativeHandle(ref, () => ({
        removeItem: (id: UUIDTypes) => {
            console.log(' useImperativeHandle   id:', id);
            setData((prev) => prev?.filter((item) => item.id !== id));
            setPagination((prev) => ({
                ...prev,
                totalElements: prev.totalElements - 1,
            }));
        },
    }));

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <DataTableFilters<FiltersType>
                    filters={filters}
                    filterState={filterState}
                    onChange={handleFilterChange}
                />
                <table className="table table-hover mt-3">
                    <DataTableHeader columns={columns} sort={sort} onSort={handleSort} />
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length}>Loading...</td>
                            </tr>
                        ) : (
                            data?.map((row) => (
                                <tr key={row.id.toString()}>
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
};
