import { useRef } from 'react';
import { DataTable, DataTableRef } from '../../common/DataTableWrapper';
import { getCompaniesFiltered } from '../../../services/company';

export const CompanyTable = () => {
    const tableRef = useRef<DataTableRef>(null);

    const columns = [
        { accessor: 'name', label: 'Nazwa', sortable: true },
        { accessor: 'nip', label: 'NIP', sortable: true },
        { accessor: 'regon', label: 'REGON' },
    ];

    const filters = [
        { accessor: 'name', label: 'Nazwa', type: 'text' },
        { accessor: 'nip', label: 'NIP', type: 'text' },
        { accessor: 'regon', label: 'REGON', type: 'text' },
    ];

    const getData = async (pageNumber: number, pageSize: number) => {
        const payload = {
            filters: {
                name: [], // tu normalnie podajesz np. ['Firma A'] z inputów
                nip: [],
                regon: [],
            },
            page: {
                pageNumber: pageNumber - 1,
                pageSize,
                sortedBy: null,
                direction: null,
            },
        };

        return getCompaniesFiltered(payload);
    };

    return (
        <div>
            <h2>Lista firm</h2>
            <DataTable ref={tableRef} columns={columns} filters={filters} getDataFunction={getData} />
        </div>
    );
};
