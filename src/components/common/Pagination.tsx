import { useState } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';

export type PaginationType = {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    sortingField: boolean | null;
    isAscendingSorting: boolean | null;
    hasPrevious: boolean;
    hasNext: boolean;
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
                                className={getDisabledStyle(pagination.first)}
                                onClick={(e) => changePageNumberAndSize(e, 1, pageSize)}>
                                {'<<'}
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                className={getDisabledStyle(!pagination.hasPrevious)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.pageNumber - 1, pageSize)}>
                                {'<'}
                            </button>
                        </li>

                        {[...Array(pageBuffor)]
                            .map((_, i) => i + 1)
                            .reverse()
                            .map((num) => {
                                const pageBefore = pagination.pageNumber - num;
                                if (pageBefore >= 1) {
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
                            <button className="page-link">{pagination.pageNumber}</button>
                        </li>

                        {[...Array(pageBuffor)].map((_, i) => {
                            const pageAfter = pagination.pageNumber + (i + 1);
                            console.log(' {[...Array   pageNumber:', pagination.pageNumber);
                            console.log(' {[...Array   pageAfter:', pageAfter);
                            if (pageAfter <= pagination.totalPages) {
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
                                className={getDisabledStyle(!pagination.hasNext)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.pageNumber + 1, pageSize)}>
                                {'>'}
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                className={getDisabledStyle(pagination.last)}
                                onClick={(e) => changePageNumberAndSize(e, pagination.totalPages, pageSize)}>
                                {'>>'} {pagination.totalPages}
                            </button>
                        </li>
                    </ul>
                    <div className="btn-group">
                        <DropdownButton
                            id="dropdown-item-button"
                            variant="outline-primary"
                            title={`Page size: ${pageSize}`}>
                            {[5, 10, 25, 50].map((pageSize, index) => (
                                <Dropdown.Item
                                    as="button"
                                    key={index}
                                    onClick={(e) => changePageNumberAndSize(e, 1, pageSize)}>
                                    {pageSize}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                </div>
            </nav>
        </>
    );
};

function getDisabledStyle(condition: boolean): string {
    return condition ? 'page-link disabled' : 'page-link ';
}
