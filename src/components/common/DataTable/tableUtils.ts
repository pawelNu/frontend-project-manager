import { forwardRef } from 'react';
import { UUIDTypes } from 'uuid';
import { DataTable, DataTableProps, DataTableRef } from './DataTable';

export function createDataTable<ResponseDataType extends { id: UUIDTypes }, FiltersType = Record<string, unknown>>() {
    return forwardRef<DataTableRef, DataTableProps<ArgumentsType, ResponseDataType, FiltersType>>(
        DataTable,
    ) as React.ForwardRefExoticComponent<
        DataTableProps<ArgumentsType, ResponseDataType, FiltersType> & React.RefAttributes<DataTableRef>
    >;
}
