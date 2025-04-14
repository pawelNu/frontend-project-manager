import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes';
import { Company, getCompanies, handleDeleteCompany } from '../../../client/company';
import { ErrorResponse } from '../../common';
import { Pagination, PaginationType } from '../../common/Pagination';
import { ActionsButton } from '../../common/ActionButton';

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
                {error && !companies && (
                    <p style={{ color: 'red' }}>
                        {error.type}: {error.message}
                    </p>
                )}
                {companies && (
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
                                {companies.map((company, index) => (
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
