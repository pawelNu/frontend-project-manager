import { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { Column, DataTable, Filters } from '../../common/DataTableWrapper';
import { CompanyNotFull, getCompaniesFiltered } from '../../../services/company';
import { useFetchDataApi } from '../../../hooks/useFetchDataApi';
import { OutSideLink } from '../../common/Utils';

export const CompanyTable = () => {
    const [filters, setFilters] = useState({
        name: [],
        nip: [],
        regon: [],
    });
    const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10, totalPages: 1 });

    // Wywołanie hooka useFetchDataApi
    const { data, loading, error, request } = useFetchDataApi(getCompaniesFiltered);

    // Funkcja do aktualizacji filtrów i wywoływania requestu
    useEffect(() => {
        const companyFilters = {
            filters,
            page: {
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize,
                sortedBy: null, // Możesz dodać sortowanie, jeśli chcesz
                direction: null, // Możesz dodać kierunek sortowania
            },
        };

        request(companyFilters);
    }, [filters, pagination.pageNumber, pagination.pageSize, request]);

    // Obsługa paginacji
    const handlePageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageNumber: page }));
    };

    // Funkcja wyświetlająca dane w tabeli
    const handleFiltersChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    const columns: Column<CompanyNotFull>[] = [
        { label: 'Name', accessor: 'name' },
        { label: 'NIP', accessor: 'nip' },
        { label: 'Regon', accessor: 'regon' },
        { label: 'Website', accessor: 'website', render: (company) => <OutSideLink href={company.website} /> },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Filters
                filters={[{ accessor: 'name', label: 'Name', type: 'text' }]}
                onFilterChange={handleFiltersChange}
            />
            <DataTable
                columns={columns}
                data={data?.data || []} // Załaduj dane z odpowiedzi API
            />
            <Pagination
                pageNumber={pagination.pageNumber}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
