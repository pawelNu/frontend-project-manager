import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';
import { routes } from '../routes';
import { sidebarElements } from '../common';

export type TSidebarItem = {
    label: string;
    linkTo?: string;
    subMenu?: TSidebarItem[];
};

// FIXME sidebar elements are not open at opened page
export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const closeSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const bs = window.bootstrap;
        const instance = bs?.Offcanvas.getInstance(sidebar);
        if (instance) {
            instance.hide();
        }
    };

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
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header">
                    <Link
                        to={routes.page.main()}
                        className="d-flex align-items-center text-decoration-none offcanvas-title d-sm-block"
                        onClick={() => handleLinkClick(routes.page.main())}>
                        <h5>
                            <i className="bi bi-chat-right-text-fill"></i>
                            Main Page
                        </h5>
                    </Link>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body px-0">
                    <div className="accordion" id="sidebarMenu">
                        {renderMenu(sidebarElements, isActive, undefined, handleLinkClick)} <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

const renderMenu = (
    elements: TSidebarItem[],
    isActive: (item: TSidebarItem) => boolean,
    level: number = 0,
    handleLinkClick: (link: string | undefined) => void,
) => {
    return elements.map((item, index) => {
        const accordionId = `accordion-${level}-${index}`;
        const isCurrentPathActive = isActive(item);

        return (
            <div key={index}>
                {item.subMenu ? (
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={`${accordionId}-heading`}>
                            <button
                                className={`accordion-button ${isCurrentPathActive ? '' : 'collapsed'}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${accordionId}-collapse`}
                                aria-expanded={isCurrentPathActive ? 'true' : 'false'}
                                aria-controls={`${accordionId}-collapse`}>
                                {item.label}
                            </button>
                        </h2>
                        <div
                            id={`${accordionId}-collapse`}
                            className={`accordion-collapse collapse ${isCurrentPathActive ? 'show' : ''}`}
                            aria-labelledby={`${accordionId}-heading`}>
                            <div className="accordion-body">
                                <div className="list-group">
                                    {renderMenu(item.subMenu, isActive, level + 1, handleLinkClick)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        className={`list-group-item list-group-item-action rounded-0 ${isCurrentPathActive ? ' active' : ''}`}
                        onClick={() => handleLinkClick(item.linkTo)}>
                        {item.label}
                    </button>
                )}
            </div>
        );
    });
};
