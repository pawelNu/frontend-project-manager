export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" data-bs-toggle="offcanvas" href="#sidebar" aria-controls="sidebar">
                    Menu
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Placeholder
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
