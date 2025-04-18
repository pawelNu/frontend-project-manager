import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';
import { routes } from '../routes';
import { sidebarElements } from '../common';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import Nav from 'react-bootstrap/esm/Nav';
import Collapse from 'react-bootstrap/esm/Collapse';

export type TSidebarItem = {
    label: string;
    linkTo?: string;
    subMenu?: TSidebarItem[];
};

export const Sidebar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const closeSidebar = () => setShow(false);

    const handleLinkClick = (link: string | undefined) => {
        if (link === undefined) {
            link = routes.page.main();
        }
        closeSidebar();
        navigate(link);
    };

    const isActive = (item: TSidebarItem): boolean => {
        if (item.linkTo === currentPath) {
            return true;
        }

        if (item.subMenu) {
            return item.subMenu.some(isActive);
        }

        return false;
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Menu
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Link
                            to={routes.page.main()}
                            className="text-decoration-none"
                            onClick={() => handleLinkClick(routes.page.main())}>
                            <h5>
                                <i className="bi bi-chat-right-text-fill"></i>
                                Main Page
                            </h5>
                        </Link>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {sidebarElements.map((item, idx) => (
                            <SidebarMenuItemRB
                                key={idx}
                                item={item}
                                isActive={isActive}
                                handleLinkClick={handleLinkClick}
                            />
                        ))}
                        <div className="mt-3">
                            <ThemeToggleButton />
                        </div>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

const SidebarMenuItemRB = ({
    item,
    isActive,
    handleLinkClick,
}: {
    item: TSidebarItem;
    isActive: (item: TSidebarItem) => boolean;
    handleLinkClick: (link: string | undefined) => void;
}) => {
    const [open, setOpen] = useState(isActive(item));

    return (
        <>
            {item.subMenu ? (
                <>
                    <Nav.Link
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        className={`d-flex justify-content-between ${isActive(item) ? 'fw-bold' : ''}`}>
                        {item.label}
                        <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                    </Nav.Link>
                    <Collapse in={open}>
                        <div className="ms-3">
                            {item.subMenu.map((subItem, idx) => (
                                <SidebarMenuItemRB
                                    key={idx}
                                    item={subItem}
                                    isActive={isActive}
                                    handleLinkClick={handleLinkClick}
                                />
                            ))}
                        </div>
                    </Collapse>
                </>
            ) : (
                <Nav.Link
                    onClick={() => handleLinkClick(item.linkTo)}
                    className={isActive(item) ? 'fw-bold text-primary' : ''}>
                    {item.label}
                </Nav.Link>
            )}
        </>
    );
};
