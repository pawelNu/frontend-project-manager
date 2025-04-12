import { useState } from 'react';

export type PaginationType = {
    first: number;
    prev: number | null;
    current: number;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    pageSize: number;
};

export type PageActions = {
    updatePageState: (num: number | null, size: number, replace: boolean) => void;
};

export const Pagination = ({ pagination, actions }: { pagination: PaginationType; actions: PageActions }) => {
    const [pageSize, setPageSize] = useState<number>(pagination.pageSize);

    const changePageNumberAndSize = (e: React.MouseEvent, num: number | null, size: number) => {
        e.preventDefault();
        if (num !== null) {
            actions.updatePageState(num, size, true);
            setPageSize(size);
        }
    };

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {pagination.prev !== null && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={(e) => changePageNumberAndSize(e, pagination.prev, pageSize)}>
                                Previous
                            </button>
                        </li>
                    )}
                    {pagination.current !== pagination.first && (
                        <>
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={(e) => changePageNumberAndSize(e, pagination.first, pageSize)}>
                                    {pagination.first}
                                </button>
                            </li>
                            <li className="page-item disabled">
                                <button className="page-link">{'...'}</button>
                            </li>
                        </>
                    )}

                    {pagination.prev !== null && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={(e) => changePageNumberAndSize(e, pagination.prev, pageSize)}>
                                {pagination.prev}
                            </button>
                        </li>
                    )}

                    <li className="page-item active">
                        <button
                            className={`page-link ${pagination.current === pagination.first || pagination.current === pagination.last ? 'disabled' : ''}`}
                            onClick={(e) => changePageNumberAndSize(e, pagination.first, pageSize)}>
                            {pagination.current}
                        </button>
                    </li>

                    {pagination.next !== null && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={(e) => changePageNumberAndSize(e, pagination.next, pageSize)}>
                                {pagination.next}
                            </button>
                        </li>
                    )}

                    {pagination.current !== pagination.last && (
                        <>
                            <li className="page-item disabled">
                                <button className="page-link">{'...'}</button>
                            </li>
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={(e) => changePageNumberAndSize(e, pagination.last, pageSize)}>
                                    {pagination.last}
                                </button>
                            </li>
                        </>
                    )}
                    {pagination.next !== null && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={(e) => changePageNumberAndSize(e, pagination.next, pageSize)}>
                                Next
                            </button>
                        </li>
                    )}
                    <li>
                        <div className="btn-group ms-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Page size: {pageSize}
                            </button>
                            <ul className="dropdown-menu">
                                {[5, 10, 25, 50].map((pageSize, index) => (
                                    <li key={index}>
                                        <button
                                            className="dropdown-item"
                                            onClick={(e) => changePageNumberAndSize(e, pagination.first, pageSize)}>
                                            Page size: {pageSize}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};
