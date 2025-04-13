import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes';
import { Company, getCompanies } from '../../../client/company';
import { ErrorResponse } from '../../common';
import { Pagination, PaginationType } from '../../common/Pagination';

export const CompanyList = () => {
    const { pageNumber, pageSize } = useParams();
    const navigate = useNavigate();
    const page = isNaN(Number(pageNumber)) ? 1 : Number(pageNumber);
    const size = isNaN(Number(pageSize)) ? 10 : Number(pageSize);
    const [companies, setCompanies] = useState<Company[]>([]);
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
    console.log(' CompanyList   pagination:', pagination);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorResponse | null>(null);

    const updatePageState = useCallback(
        (pageNum: number | null, pageSize: number) => {
            if (pageNum !== null) {
                console.log('updatePageState');
                navigate(routes.company.list(pageNum, pageSize));
            }
        },
        [navigate],
    );

    const getCompanyList = useCallback(async (page: number, size: number) => {
        console.log('getCompanyList');
        setLoading(true);
        setError(null);
        try {
            const result = await getCompanies(page, size);
            if (result.success) {
                setCompanies(result.data.data);
                setPagination({
                    first: result.data.first,
                    prev: result.data.prev,
                    current: page,
                    next: result.data.next,
                    last: result.data.last,
                    pages: result.data.pages,
                    items: result.data.items,
                    pageSize: size,
                });
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.log(' getCompanyList   err:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCompanyList(page, size);
    }, [getCompanyList, page, size]);

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
