import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes';
import { Company, getCompanies, handleDeleteCompany } from '../../../services/company';
import { Pagination } from '../../common/Pagination';
import { ActionsButton } from '../../common/ActionButton';
import { useGetApi } from '../../../hooks/useGetApi';
import { PaginationType } from '../../common/Pagination';
import { useMemoizedGetServiceFunction } from '../../../hooks/useMemoizedServiceFunctions';

export const CompanyList = () => {
    const { pageNumber, pageSize } = useParams();
    const navigate = useNavigate();
    const page = isNaN(Number(pageNumber)) ? 1 : Number(pageNumber);
    const size = isNaN(Number(pageSize)) ? 10 : Number(pageSize);
    const [companies, setCompanies] = useState<Company[] | undefined>([]);
    console.log(' CompanyList   companies:', companies);
    const [pagination, setPagination] = useState<PaginationType>({
        first: 1,
        prev: null,
        current: page,
        next: null,
        last: 1,
        pages: 1,
        items: 1,
        pageSize: size,
    });
    const [error, setError] = useState<string | null>(null);
    console.log(' CompanyList   error:', error);
    const memoizedGetCompanies = useMemoizedGetServiceFunction(getCompanies);
    const { data, loading, error: apiError, request } = useGetApi(memoizedGetCompanies);

    const updatePageState = useCallback(
        (pageNum: number | null, pageSize: number) => {
            if (pageNum !== null) {
                navigate(routes.company.list(pageNum, pageSize));
            }
        },
        [navigate],
    );

    useEffect(() => {
        request(page, size);
        setError(apiError);
    }, [apiError, page, request, size]);

    useEffect(() => {
        if (data) {
            setCompanies(data.data);
            setPagination({
                first: data.first,
                prev: data.prev,
                current: page,
                next: data.next,
                last: data.last,
                pages: data.pages,
                items: data.items,
                pageSize: size,
            });
        }
    }, [data, page, size]);

    return (
        <>
            <div className="container">
                <h1>Company List</h1>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {companies && !error && (
                    <>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Nip</th>
                                    <th>Regon</th>
                                    <th>Website</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company: Company, index: number) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{company.name}</td>
                                        <td>{company.nip}</td>
                                        <td>{company.regon}</td>
                                        <td>
                                            <a href={company.website} target="_blank">
                                                {company.website}
                                            </a>
                                        </td>
                                        <td>
                                            <ActionsButton
                                                id={company.id}
                                                detailsLink={routes.company.details(company.id.toString())}
                                                editLink={routes.company.edit(company.id.toString())}
                                                deleteItem={handleDeleteCompany}
                                                onDeleteSuccess={() => request(page, size)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination pagination={pagination} actions={{ updatePageState }} />
                    </>
                )}
            </div>
        </>
    );
};
