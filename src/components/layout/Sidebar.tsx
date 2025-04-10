import { ThemeToggleButton } from './ThemeToggleButton';

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
            levelName: 'Projects',
            subLevel: [
                { levelName: 'All projects', linkTo: '/all-projects' },
                { levelName: 'Add new project', linkTo: '/add-new-project' },
            ],
        },
        {
            levelName: 'Users',
            subLevel: [
                { levelName: 'All users', linkTo: '/' },
                { levelName: 'Empty', linkTo: '/' },
            ],
        },
        {
            levelName: 'Account',
            subLevel: [
                { levelName: 'New...', linkTo: '/' },
                { levelName: 'Profile', linkTo: '/' },
                { levelName: 'Settings', linkTo: '/' },
                { levelName: 'Sign out', linkTo: '/' },
            ],
        },
    ];

    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header">
                    <a href="/" className="d-flex align-items-center text-decoration-none offcanvas-title d-sm-block">
                        <h5>
                            <i className="bi bi-chat-right-text-fill"></i>
                            Sidebar
                        </h5>
                    </a>
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
                                                    <a href={sublevel.linkTo}>{sublevel.levelName}</a>
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
