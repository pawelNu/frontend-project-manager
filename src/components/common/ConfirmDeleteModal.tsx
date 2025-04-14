// TODO create modal
// https://getbootstrap.com/docs/5.3/components/modal/#static-backdrop
// https://getbootstrap.com/docs/5.3/components/modal/#vertically-centered

type Props = {
    show: boolean;
    handleClose: () => void;
    handleConfirmDelete: () => void;
};

export const ConfirmDeleteModal: React.FC<Props> = ({ show, handleClose, handleConfirmDelete }) => {
    return (
        <>
            {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
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
        </Modal> */}
        </>
    );
};
