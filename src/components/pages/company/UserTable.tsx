import { DataTable } from '../../common/DataTable/DataTable';

export type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};

export type FilterConfig<F> = {
    accessor: keyof F;
    label?: string;
    type: 'text' | 'checkbox' | 'select';
    options?: { label: string; value: string | number }[];
};

export type SortState = {
    field: string | null;
    direction: 'asc' | 'desc' | null;
};

export type PaginationType = {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    hasPrevious: boolean;
    hasNext: boolean;
};

export type TableParams<F> = {
    pageNumber: number;
    pageSize: number;
    filters: Partial<F>;
    sort: SortState;
};

const columns = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'email', label: 'Email' },
    { accessor: 'age', label: 'Age' },
];

const filters: FilterConfig<User>[] = [
    {
        accessor: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        accessor: 'age',
        label: 'Age',
        type: 'select',
        options: [
            { label: '18-25', value: 18 },
            { label: '26-35', value: 26 },
            { label: '36+', value: 36 },
        ],
    },
];

const fetchData = async ({ pageNumber, pageSize, filters, sort }: TableParams<User>) => {
    const allData: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 24 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
        { id: 4, name: 'David', email: 'david@example.com', age: 22 },
        { id: 5, name: 'Eve', email: 'eve@example.com', age: 29 },
    ];

    let filteredData = allData;
    if (filters.name) {
        const filterName = filters.name || '';
        filteredData = filteredData.filter((user) => user.name.toLowerCase().includes(filterName.toLowerCase()));
    }

    if (filters.age) {
        const filtersAge = Number(filters.age);
        filteredData = filteredData.filter((user) => user.age >= filtersAge && user.age <= filtersAge + 5);
    }

    if (sort.field) {
        filteredData.sort((a, b) => {
            if (a[sort.field as keyof User] < b[sort.field as keyof User]) return sort.direction === 'asc' ? -1 : 1;
            if (a[sort.field as keyof User] > b[sort.field as keyof User]) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const paginatedData = filteredData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    const pagination: PaginationType = {
        pageNumber,
        pageSize,
        totalPages,
        totalElements,
        hasPrevious: pageNumber > 1,
        hasNext: pageNumber < totalPages,
    };

    return {
        data: paginatedData,
        pagination,
    };
};

export function UserTable() {
    return (
        <div className="container">
            <h1>User Table</h1>
            <DataTable<User, User> columns={columns} filters={filters} fetchData={fetchData} pageSize={3} />
        </div>
    );
}
