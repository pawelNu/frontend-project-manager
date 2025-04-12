import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes';
import { Company, getCompanies } from '../../../client/company';
import { ErrorResponse } from '../../common';
import { Pagination, PaginationType } from '../../common/Pagination';

// TODO fix redundant useEffect calls
export const CompanyList = () => {
    const { pageNumber, pageSize } = useParams();
    const navigate = useNavigate();
    const page = isNaN(Number(pageNumber)) ? 1 : Number(pageNumber);
    const size = isNaN(Number(pageSize)) ? 10 : Number(pageSize);
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
    console.log(' CompanyList   pagination:', pagination);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorResponse | null>(null);

    const updatePageState = useCallback(
        (pageNum: number | null, pageSize: number, replace: boolean = false) => {
            if (pageNum !== null) {
                console.log('updatePageState');
                setCurrentPageNumber(pageNum);
                setCurrentPageSize(pageSize);
                navigate(routes.company.list(pageNum, pageSize), { replace: replace });
            }
        },
        [navigate],
    );

    const getCompanyList = useCallback(async () => {
        console.log('getCompanyList');
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
                    pageSize: currentPageSize,
                });
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.log(' getCompanyList   err:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPageNumber, currentPageSize]);

    useEffect(() => {
        getCompanyList();
    }, [getCompanyList]);

    return (
        <>
            <div className="container">
                <h1>Company List</h1>
                {loading && <p>Loading...</p>}
                {error && (
                    <p style={{ color: 'red' }}>
                        {error.details}: {error.message}
                    </p>
                )}
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
            <Pagination pagination={pagination} actions={{ updatePageState }} />
        </>
    );
};
