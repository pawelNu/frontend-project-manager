import { forwardRef } from 'react';
import { UUIDTypes } from 'uuid';
import { DataTable, DataTableProps, DataTableRef } from './DataTable';

export function createDataTable<T extends { id: UUIDTypes }, F = Record<string, unknown>>() {
    return forwardRef<DataTableRef, DataTableProps<T, F>>(DataTable) as React.ForwardRefExoticComponent<
        DataTableProps<T, F> & React.RefAttributes<DataTableRef>
    >;
}
