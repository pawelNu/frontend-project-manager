import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { AxiosResponse } from 'axios';
import { UUIDTypes } from 'uuid';
import { useFetchDataApi } from '../../hooks/useFetchDataApi';

// 🔸 1. Typy
type SortDirection = 'asc' | 'desc' | null;

type SortState = {
    field: string | null;
    direction: SortDirection;
};

type FilterType = 'text' | 'select' | 'checkbox';

type FilterOption = {
    label: string;
    value: string | number | boolean;
};

export type FilterConfig<F> = {
    accessor: keyof F;
    type: FilterType;
    label?: string;
    options?: FilterOption[];
};

export type Column<T> = {
    accessor: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
};

export type PaginationType = {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    sortingField: string | null;
    isAscendingSorting: boolean | null;
    hasPrevious: boolean;
    hasNext: boolean;
};

export type DataTableRef = {
    removeItem: (id: UUIDTypes) => void;
};

export type DataTableProps<ArgumentsType, ResponseDataType, FiltersType = Record<string, unknown>> = {
    columns: Column<ResponseDataType>[];
    filters?: FilterConfig<FiltersType>[];
    getDataFunction: (filters: ArgumentsType) => Promise<AxiosResponse<ResponseDataType>>;
};

// 🔸 2. Komponenty pomocnicze
export function DataTablePagination({
    pagination,
    onPageChange,
}: {
    pagination: PaginationType;
    onPageChange: (page: number) => void;
}) {
    const { pageNumber, totalPages } = pagination;

    return (
        <nav>
            <ul className="pagination justify-content-end mt-3">
                <li className={`page-item ${pageNumber <= 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(pageNumber - 1)}>
                        Previous
                    </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx} className={`page-item ${pageNumber === idx + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(idx + 1)}>
                            {idx + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${pageNumber >= totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(pageNumber + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export function DataTableFilters<F>({
    filters,
    filterState,
    onChange,
}: {
    filters: FilterConfig<F>[];
    filterState: Partial<F>;
    onChange: (newFilters: Partial<F>) => void;
}) {
    const handleChange = <K extends keyof F>(key: K, value: F[K]) => {
        onChange({ ...filterState, [key]: value });
    };

    return (
        <div className="row g-2">
            {filters.map((filter) => (
                <div key={String(filter.accessor)} className="col">
                    <label>{filter.label ?? String(filter.accessor)}</label>

                    {filter.type === 'text' && (
                        <input
                            type="text"
                            className="form-control"
                            value={(filterState[filter.accessor] as string) || ''}
                            onChange={(e) => handleChange(filter.accessor, e.target.value as F[typeof filter.accessor])}
                        />
                    )}

                    {filter.type === 'checkbox' && (
                        <input
                            type="checkbox"
                            checked={Boolean(filterState[filter.accessor])}
                            onChange={(e) =>
                                handleChange(filter.accessor, e.target.checked as F[typeof filter.accessor])
                            }
                        />
                    )}

                    {filter.type === 'select' && (
                        <select
                            className="form-select"
                            value={String(filterState[filter.accessor] || '')}
                            onChange={(e) =>
                                handleChange(filter.accessor, e.target.value as F[typeof filter.accessor])
                            }>
                            <option value="">-- Wybierz --</option>
                            {filter.options?.map((opt) => (
                                <option key={String(opt.value)} value={String(opt.value)}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </div>
    );
}

export const DataTable = forwardRef(DataTableInner);

// 🔸 3. Główna tabela
function DataTableInner<
    ArgumentsType,
    ResponseDataType extends { id: UUIDTypes },
    FiltersType = Record<string, unknown>,
>(
    { columns, filters = [], getDataFunction }: DataTableProps<ArgumentsType, ResponseDataType, FiltersType>,
    ref: React.Ref<DataTableRef>,
) {
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ResponseDataType[] | undefined>(undefined);
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

    const [filterState, setFilterState] = useState<FiltersType>({} as FiltersType);
    const [sort, setSort] = useState<SortState>({ field: null, direction: null });

    const {
        data: apiData,
        loading,
        error: apiError,
        request,
    } = useFetchDataApi<[ArgumentsType], ResponseDataType>(getDataFunction);

    useEffect(() => {
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

    useImperativeHandle(ref, () => ({
        removeItem: (id: UUIDTypes) => {
            setData((prev) => prev?.filter((item) => item.id !== id));
            setPagination((prev) => ({
                ...prev,
                totalElements: prev.totalElements - 1,
            }));
        },
    }));

    const getCellValue = (row: ResponseDataType, accessor: string) => {
        return accessor.split('.').reduce((acc: any, key) => acc?.[key], row);
    };

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="container">
                <DataTableFilters<FiltersType>
                    filters={filters}
                    filterState={filterState}
                    onChange={handleFilterChange}
                />
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    onClick={() => col.sortable && handleSort(col.accessor.toString())}
                                    style={{ cursor: col.sortable ? 'pointer' : 'default' }}>
                                    {col.label}
                                    {sort.field === col.accessor && (
                                        <span>{sort.direction === 'asc' ? ' 🔼' : ' 🔽'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
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
}
