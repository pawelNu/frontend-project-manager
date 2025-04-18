import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleConfirmDelete: () => void;
};

export const ConfirmDeleteModal: React.FC<Props> = ({ show, handleClose, handleConfirmDelete }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Confirm Delete
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
