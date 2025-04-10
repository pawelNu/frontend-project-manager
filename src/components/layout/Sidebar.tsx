import { Link } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';
import { routes } from '../routes';

export const Sidebar = () => {
    type TSidebar = {
        levelName: string;
        subLevel: TSubLevel[];
    };

    type TSubLevel = {
        levelName: string;
        linkTo: string;
    };

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

    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header">
                    <Link
                        to={routes.pages.main()}
                        className="d-flex align-items-center text-decoration-none offcanvas-title d-sm-block"
                        onClick={closeSidebar}>
                        <h5>
                            <i className="bi bi-chat-right-text-fill"></i>
                            Main Page
                        </h5>
                    </Link>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body px-0">
                    <div className="accordion" id="sidebarMenu">
                        {sidebarElements.map((element, index) => (
                            <div key={element.levelName} className="accordion-item">
                                <h2 className="accordion-header" id={element.levelName + 'Heading' + index}>
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={'#' + element.levelName + 'Collapse' + index}
                                        aria-expanded="true"
                                        aria-controls={element.levelName + 'Collapse' + index}>
                                        {element.levelName}
                                    </button>
                                </h2>
                                <div
                                    id={element.levelName + 'Collapse' + index}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={element.levelName + 'Heading' + index}
                                    data-bs-parent="#sidebarMenu">
                                    <div className="accordion-body">
                                        <ul className="list-unstyled">
                                            {element.subLevel.map((sublevel, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link to={sublevel.linkTo} onClick={closeSidebar}>
                                                        {sublevel.levelName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
