import { CompanyNotFull, getCompanies, handleDeleteCompany } from '../../../services/company';
import { ActionsButton } from '../../common/ActionButton';
import { Column, DataTableRef } from '../../common/DataTable/DataTable';
import { routes } from '../../routes';
import { FilterConfig } from '../../common/DataTable/DataTableFilters';
import { OutSideLink } from '../../common/Utils';
import { useRef } from 'react';
import { createDataTable } from '../../common/DataTable/tableUtils';

// const filters: FilterConfig<CompanyNotFull>[] = [
//     {
//         accessor: 'name',
//         label: 'Name',
//         type: 'text',
//     },
//     // {
//     //     accessor: 'age',
//     //     label: 'Age',
//     //     type: 'select',
//     //     options: [
//     //         { label: '18-25', value: 18 },
//     //         { label: '26-35', value: 26 },
//     //         { label: '36+', value: 36 },
//     //     ],
//     // },
// ];

// const fetchData = async ({ pageNumber, pageSize, filters, sort }: TableParams<CompanyNotFull>) => {
//     const allData: CompanyNotFull[] = [
//         { id: uuidv4(), name: 'Alice', email: 'alice@example.com', age: 24 },
//         { id: uuidv4(), name: 'Bob', email: 'bob@example.com', age: 30 },
//         { id: uuidv4(), name: 'Charlie', email: 'charlie@example.com', age: 35 },
//         { id: uuidv4(), name: 'David', email: 'david@example.com', age: 22 },
//         { id: uuidv4(), name: 'Eve', email: 'eve@example.com', age: 29 },
//     ];

//     let filteredData = allData;
//     if (filters.name) {
//         const filterName = filters.name || '';
//         filteredData = filteredData.filter((user) => user.name.toLowerCase().includes(filterName.toLowerCase()));
//     }

//     if (filters.age) {
//         const filtersAge = Number(filters.age);
//         filteredData = filteredData.filter((user) => user.age >= filtersAge && user.age <= filtersAge + 5);
//     }

//     if (sort.field) {
//         filteredData.sort((a, b) => {
//             if (a[sort.field as keyof CompanyNotFull] < b[sort.field as keyof CompanyNotFull])
//                 return sort.direction === 'asc' ? -1 : 1;
//             if (a[sort.field as keyof CompanyNotFull] > b[sort.field as keyof CompanyNotFull])
//                 return sort.direction === 'asc' ? 1 : -1;
//             return 0;
//         });
//     }

//     const totalElements = filteredData.length;
//     const totalPages = Math.ceil(totalElements / pageSize);
//     const paginatedData = filteredData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

//     const pagination: PaginationType = {
//         pageNumber,
//         pageSize,
//         totalPages,
//         totalElements,
//         first,
//         last,
//         sortingField,
//         isAscendingSorting,
//         hasPrevious,
//         hasNext,
//     };

//     return {
//         data: paginatedData,
//         pagination,
//     };
// };

const filters: FilterConfig<CompanyNotFull>[] = [
    {
        accessor: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        accessor: 'nip',
        label: 'NIP',
        type: 'text',
    },
    {
        accessor: 'regon',
        label: 'REGON',
        type: 'text',
    },
];

export const CompanyTable = () => {
    const tableRef = useRef<DataTableRef>(null);
    const columns: Column<CompanyNotFull>[] = [
        { accessor: 'name', label: 'Name', sortable: true },
        { accessor: 'nip', label: 'NIP' },
        { accessor: 'regon', label: 'REGON' },
        {
            accessor: 'website',
            label: 'Website',
            render: (company) => <OutSideLink href={company.website} />,
        },
        {
            accessor: 'actions',
            label: 'Actions',
            render: (company) => (
                <ActionsButton
                    id={company.id}
                    detailsLink={routes.company.details(company.id.toString())}
                    editLink={routes.company.edit(company.id.toString())}
                    deleteItem={handleDeleteCompany}
                    onDeleteSuccess={() => {
                        if (tableRef.current) {
                            tableRef.current.removeItem(company.id);
                        }
                    }}
                />
            ),
        },
    ];

    const CompanyDataTable = createDataTable<CompanyNotFull, CompanyNotFull>();
    return (
        <div className="container">
            <h1>User Table</h1>
            <CompanyDataTable ref={tableRef} columns={columns} filters={filters} getDataFunction={getCompanies} />
        </div>
    );
};
