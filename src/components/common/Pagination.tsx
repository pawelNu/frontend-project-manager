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
    updatePageState: (num: number | null, size: number) => void;
};

export const Pagination = ({ pagination, actions }: { pagination: PaginationType; actions: PageActions }) => {
    const [pageSize, setPageSize] = useState<number>(pagination.pageSize);
    const pageBuffor = 2;

    const changePageNumberAndSize = (e: React.MouseEvent, num: number | null, size: number) => {
        e.preventDefault();
        if (num !== null) {
            actions.updatePageState(num, size);
            setPageSize(size);
        }
    };

    return (
        <>
            <nav aria-label="Page navigation example" className="mb-3">
                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                    <ul className="pagination justify-content-center mb-0">
                        <li className="page-item">
                            <button
                                className={getDisabledStyle(pagination.current === pagination.first)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.first, pageSize)}>
                                {'<<'}
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                className={getDisabledStyle(pagination.prev === null)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.prev, pageSize)}>
                                {'<'}
                            </button>
                        </li>

                        {[...Array(pageBuffor)]
                            .map((_, i) => i + 1)
                            .reverse()
                            .map((num) => {
                                const pageBefore = pagination.current - num;
                                if (pageBefore >= pagination.first) {
                                    return (
                                        <li key={num} className="page-item">
                                            <button
                                                className="page-link"
                                                onClick={(e) => changePageNumberAndSize(e, pageBefore, pageSize)}>
                                                {pageBefore}
                                            </button>
                                        </li>
                                    );
                                }
                            })}

                        <li className="page-item active">
                            <button className="page-link">{pagination.current}</button>
                        </li>

                        {[...Array(pageBuffor)].map((_, i) => {
                            const pageAfter = pagination.current + (i + 1);
                            if (pageAfter <= pagination.last) {
                                return (
                                    <li key={i} className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={(e) => changePageNumberAndSize(e, pageAfter, pageSize)}>
                                            {pageAfter}
                                        </button>
                                    </li>
                                );
                            }
                        })}
                        <li className="page-item">
                            <button
                                className={getDisabledStyle(pagination.next === null)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.next, pageSize)}>
                                {'>'}
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                className={getDisabledStyle(pagination.current === pagination.last)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.last, pageSize)}>
                                {'>>'} {pagination.last}
                            </button>
                        </li>
                    </ul>
                    <div className="btn-group">
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
                </div>
            </nav>
        </>
    );
};

function getDisabledStyle(condition: boolean): string {
    return condition ? 'page-link disabled' : 'page-link ';
}
