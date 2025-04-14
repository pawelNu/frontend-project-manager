import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UUIDTypes } from 'uuid';

type Props = {
    id: UUIDTypes;
    detailsLink: string;
    editLink: string;
    deleteItem: (id: string) => Promise<{ success: boolean; error?: string }>;
};

export const ActionsButton: React.FC<Props> = ({ id, detailsLink, editLink, deleteItem }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState<string>('');

    const handleClose = () => {
        setShowDeleteModal(false);
        setError('');
    };

    const handleShow = () => setShowDeleteModal(true);

    const confirmDelete = async () => {
        const result = await deleteItem(id.toString());
        if (!result.success) {
            if (result.error) {
                setError(result.error);
                setShowDeleteModal(false);
                setShowErrorModal(true);
            } else {
                setError('Unknown error: file: ActionsButton.tsx:   confirmDelete   confirmDelete');
                setShowDeleteModal(false);
                setShowErrorModal(true);
            }
        } else {
            handleClose();
        }
    };

    return (
        <>
            <div className="ms-3">
                <div className="dropdown">
                    <a
                        className="btn btn-secondary dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Actions
                    </a>

                    <ul className="dropdown-menu">
                        <li>
                            <Link to={detailsLink} className="dropdown-item">
                                Details
                            </Link>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Edit
                            </a>
                        </li>
                        <li>
                            <button className="dropdown-item bg-danger text-white" href="#">
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
