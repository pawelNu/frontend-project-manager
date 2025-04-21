import { PaginationType } from './types';

type Props = {
    pagination: PaginationType;
    onPageChange: (page: number) => void;
};

export function DataTablePagination({ pagination, onPageChange }: Props) {
    const { pageNumber, totalPages } = pagination;

    return (
        <nav>
            <ul className="pagination justify-content-end mt-3">
                <li className={`page-item ${pageNumber <= 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(pageNumber - 1)}>
                        Previous
                    </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx} className={`page-item ${pageNumber === idx + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(idx + 1)}>
                            {idx + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${pageNumber >= totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(pageNumber + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
