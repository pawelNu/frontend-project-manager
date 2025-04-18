import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UUIDTypes } from 'uuid';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { InfoModal } from './InfoModal';
import { toast } from 'react-toastify';

type Props = {
    id: UUIDTypes;
    detailsLink: string;
    editLink: string;
    deleteItem: (id: string) => Promise<{ success: boolean; error?: string }>;
    onDeleteSuccess?: () => void;
};

export const ActionsButton: React.FC<Props> = ({ id, detailsLink, editLink, deleteItem, onDeleteSuccess }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [info, setInfo] = useState<string>('');

    const handleClose = () => {
        setShowDeleteModal(false);
        setInfo('');
    };

    const handleShow = () => setShowDeleteModal(true);

    const confirmDelete = async () => {
        const result = await deleteItem(id.toString());
        if (!result.success) {
            if (result.error) {
                setInfo(result.error);
                setShowDeleteModal(false);
                setShowInfoModal(true);
            } else {
                setInfo('Unknown error: file: ActionsButton.tsx:   confirmDelete   confirmDelete');
                setShowDeleteModal(false);
                setShowInfoModal(true);
            }
        } else {
            handleClose();
            if (onDeleteSuccess) onDeleteSuccess();
            toast.success('Successfully deleted item!');
        }
    };

    return (
        <div className="ms-3">
            <DropdownButton id="actions-dropdown" variant="secondary" title="Actions">
                <Link to={detailsLink} className="dropdown-item">
                    Details
                </Link>
                <Link to={editLink} className="dropdown-item">
                    Edit
                </Link>
                <Dropdown.Item className="bg-danger text-white" onClick={handleShow}>
                    Delete
                </Dropdown.Item>
            </DropdownButton>

            <ConfirmDeleteModal show={showDeleteModal} handleClose={handleClose} handleConfirmDelete={confirmDelete} />

            {info && <InfoModal message={info} show={showInfoModal} handleClose={handleClose} />}
        </div>
    );
};
