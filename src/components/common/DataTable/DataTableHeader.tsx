import { Column } from './DataTable';

export type SortState = {
    field: string | null;
    direction: 'asc' | 'desc' | null;
};

type Props<T> = {
    columns: Column<T>[];
    sort: SortState;
    onSort: (field: string) => void;
};

export function DataTableHeader<T>({ columns, sort, onSort }: Props<T>) {
    return (
        <thead>
            <tr>
                {columns.map((col, idx) => (
                    <th
                        key={idx}
                        onClick={() => col.sortable && onSort(col.accessor.toString())}
                        style={{ cursor: col.sortable ? 'pointer' : 'default' }}>
                        {col.label}
                        {col.sortable && sort.field === col.accessor && (
                            <span> {sort.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
