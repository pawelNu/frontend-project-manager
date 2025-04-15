import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';

type Props = {
    message: string;
    show: boolean;
    handleClose: () => void;
};

export const InfoModal: React.FC<Props> = ({ message, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Info Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
