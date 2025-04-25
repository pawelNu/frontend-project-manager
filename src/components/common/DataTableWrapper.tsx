// Typy dla Filtrów, Tabeli i Paginacji
type FilterType = 'text' | 'select' | 'checkbox';

type FilterOption = {
    label: string;
    value: string | number | boolean;
};

type FilterConfig = {
    accessor: string;
    label: string;
    type: FilterType;
    options?: FilterOption[];
};

export type Column<T> = {
    label: string;
    accessor: keyof T;
    render?: (data: T) => React.ReactNode; // Funkcja renderująca komórkę
};

type PaginationProps = {
    pageNumber: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

type FiltersProps = {
    filters: FilterConfig[];
    onFilterChange: (filters: any) => void;
};

// Komponent DataTable (generyczny)
export function DataTable<T>({ columns, data }: DataTableProps<T>) {
    return (
        <div className="container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor as string}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => {
                                const cellData = row[col.accessor];

                                // Sprawdzamy, czy jest funkcja renderująca
                                if (col.render) {
                                    return (
                                        <td key={String(col.accessor)}>
                                            {col.render(row)} {/* Wywołujemy funkcję renderującą */}
                                        </td>
                                    );
                                }

                                // Jeśli nie ma funkcji renderującej, wyświetlamy wartość komórki
                                // Musimy zadbać o to, by 'cellData' było kompatybilne z JSX
                                return (
                                    <td key={String(col.accessor)}>
                                        {cellData !== null && cellData !== undefined ? cellData : '-'}{' '}
                                        {/* Zastępujemy null/undefined np. znakiem "-" */}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Komponent Pagination
export function Pagination({ pageNumber, totalPages, onPageChange }: PaginationProps) {
    return (
        <nav>
            <button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}>
                Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
                <button key={idx} onClick={() => onPageChange(idx + 1)}>
                    {idx + 1}
                </button>
            ))}
            <button disabled={pageNumber === totalPages} onClick={() => onPageChange(pageNumber + 1)}>
                Next
            </button>
        </nav>
    );
}

// Komponent Filters (generyczny)
export function Filters({ filters, onFilterChange }: FiltersProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, accessor: string) => {
        onFilterChange({ [accessor]: e.target.value });
    };

    return (
        <div>
            {filters.map((filter) => (
                <div key={filter.accessor}>
                    <label>{filter.label}</label>
                    {filter.type === 'text' && <input type="text" onChange={(e) => handleChange(e, filter.accessor)} />}
                    {filter.type === 'select' && (
                        <select onChange={(e) => handleChange(e, filter.accessor)}>
                            {filter.options?.map((option) => (
                                <option key={String(option.value)} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </div>
    );
}
