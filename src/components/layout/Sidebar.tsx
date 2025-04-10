import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';
import { routes } from '../routes';

export type TSidebar = {
    levelName: string;
    subLevel: TSubLevel[];
};

type TSubLevel = {
    levelName: string;
    linkTo: string;
};

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const sidebarElements: TSidebar[] = [
        {
            levelName: 'Companies',
            subLevel: [
                { levelName: 'All companies', linkTo: routes.companies.list() },
                { levelName: 'Add company', linkTo: routes.companies.create() },
            ],
        },
        {
            levelName: 'Account',
            subLevel: [
                { levelName: 'New...', linkTo: routes.pages.main() },
                { levelName: 'Profile', linkTo: routes.pages.main() },
                { levelName: 'Settings', linkTo: routes.pages.main() },
                { levelName: 'Sign out', linkTo: routes.pages.main() },
            ],
        },
    ];

    const closeSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const bs = window.bootstrap;
        const instance = bs?.Offcanvas.getInstance(sidebar);
        if (instance) {
            instance.hide();
        }
    };

    const handleLinkClick = (link: string) => {
        closeSidebar();
        navigate(link);
    };

    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header">
                    <Link
                        to={routes.pages.main()}
                        className="d-flex align-items-center text-decoration-none offcanvas-title d-sm-block"
                        onClick={() => handleLinkClick(routes.pages.main())}>
                        <h5>
                            <i className="bi bi-chat-right-text-fill"></i>
                            Main Page
                        </h5>
                    </Link>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body px-0">
                    <div className="accordion" id="sidebarMenu">
                        {sidebarElements.map((element, index) => {
                            const isOnPath = element.subLevel.some((subLink) => currentPath === subLink.linkTo);
                            return (
                                <div key={element.levelName} className="accordion-item">
                                    <h2 className="accordion-header" id={element.levelName + 'Heading' + index}>
                                        <button
                                            className={`accordion-button ${isOnPath ? '' : ' collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={'#' + element.levelName + 'Collapse' + index}
                                            aria-expanded={isOnPath ? 'true' : 'false'}
                                            aria-controls={element.levelName + 'Collapse' + index}>
                                            {element.levelName}
                                        </button>
                                    </h2>
                                    <div
                                        id={element.levelName + 'Collapse' + index}
                                        className={`accordion-collapse collapse ${isOnPath ? 'show' : ''}`}
                                        aria-labelledby={element.levelName + 'Heading' + index}
                                        data-bs-parent="#sidebarMenu">
                                        <div className="accordion-body">
                                            {listElement(element, handleLinkClick, currentPath)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
const listElement = (element: TSidebar, handleLinkClick: (link: string) => void, currentPath: string) => {
    return (
        <div className="list-group">
            {element.subLevel.map((sublevel, subIndex) => {
                const isCurrentPath = currentPath === sublevel.linkTo;
                return (
                    // <Link key={subIndex} to={sublevel.linkTo} onClick={() => handleLinkClick(sublevel.linkTo)}>
                    <button
                        key={subIndex}
                        type="button"
                        className={`list-group-item list-group-item-action rounded-0 ${isCurrentPath ? ' active' : ''}`}
                        aria-current={isCurrentPath ? 'true' : 'false'}
                        onClick={() => handleLinkClick(sublevel.linkTo)}>
                        {sublevel.levelName}
                    </button>
                    // </Link>
                );
            })}
        </div>
    );
};

{
    /* <div class="list-group">
  <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
    The current button
  </button>
  <button type="button" class="list-group-item list-group-item-action">A second button item</button>
  <button type="button" class="list-group-item list-group-item-action">A third button item</button>
  <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
</div> */
}
