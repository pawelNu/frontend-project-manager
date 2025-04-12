import { useCallback, useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes';
import { Company, getCompanies } from '../../../client/company';
import { PaginationType } from '../../common';

export const CompanyList = () => {
    const { pageNumber, pageSize } = useParams();
    const navigate = useNavigate();
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState<number>(10);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [pagination, setPagination] = useState<PaginationType>({
        first: 1,
        prev: null,
        current: currentPageNumber,
        next: null,
        last: 1,
        pages: 1,
        items: 1,
        pageSize: currentPageSize,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const setPageNumberAndSize = (
        pageNumber: string | undefined,
        pageSize: string | undefined,
        setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>,
        setCurrentPageSize: React.Dispatch<React.SetStateAction<number>>,
        navigate: NavigateFunction,
    ) => {
        const page = Number(pageNumber);
        const size = Number(pageSize);

        if (isNaN(page) && isNaN(size)) {
            setCurrentPageNumber(1);
            setCurrentPageSize(10);
            navigate(routes.company.list(1, 10), { replace: true });
        } else {
            setCurrentPageNumber(page);
            setCurrentPageSize(size);
        }
    };

    const getCompanyList = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getCompanies(currentPageNumber, currentPageSize);
            if (result.success) {
                setCompanies(result.data.data);
                setPagination({
                    first: result.data.first,
                    prev: result.data.prev,
                    current: result.data.prev === null ? result.data.first : result.data.prev + 1,
                    next: result.data.next,
                    last: result.data.last,
                    pages: result.data.pages,
                    items: result.data.items,
                    pageSize: pagination.pageSize,
                });
            }
        } catch (err) {
            console.log(' getCompanyList   err:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPageNumber, currentPageSize, pagination.pageSize]);

    useEffect(() => {
        setPageNumberAndSize(pageNumber, pageSize, setCurrentPageNumber, setCurrentPageSize, navigate);
        getCompanyList();
    }, [pageNumber, pageSize, navigate, getCompanyList]);

    return (
        <div className="container">
            <h1>Company List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul></ul>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Nip</th>
                        <th>Regon</th>
                        <th>Website</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{company.name}</td>
                            <td>{company.nip}</td>
                            <td>{company.regon}</td>
                            <td>{company.website}</td>
                            <td>
                                <Link
                                    to={routes.company.details(company.id.toString())}
                                    className="link-opacity-75-hover">
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
