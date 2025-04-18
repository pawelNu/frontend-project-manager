import { ReactNode } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';

type Props = {
    message?: string;
    children?: ReactNode;
    show: boolean;
    handleClose: () => void;
};

export const InfoModal: React.FC<Props> = ({ message, children, show, handleClose }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title>Info Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children ? children : message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
