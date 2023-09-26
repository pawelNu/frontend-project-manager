// https://getbootstrap.com/docs/5.3/components/offcanvas/
// https://www.cssscript.com/responsive-sidebar-bootstrap-offcanvas/ -> 2. The HTML structure for the offcanvas sidebar.

export const Sidebar = () => {
    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                <div className="offcanvas-header border-bottom">
                    <a href="/" className="d-flex align-items-center text-decoration-none offcanvas-title d-sm-block">
                        <h5>
                            <i className="bi bi-chat-right-text-fill"></i>
                            Sidebar
                        </h5>
                    </a>
                    
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body px-0">
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <button
                                className="btn btn-toggle align-items-center rounded"
                                data-bs-toggle="collapse"
                                data-bs-target="#projects-collapse"
                                aria-expanded="true"
                            >
                                Projects
                            </button>
                            {/* TODO add link to /projects page http://localhost:3000/projects */}
                            <div className="collapse show" id="projects-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/#" className="rounded">Overview</a></li>
                                    <li><a href="/#" className="rounded">Updates</a></li>
                                    <li><a href="/#" className="rounded">Reports</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button
                                className="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#users-collapse"
                                aria-expanded="false"
                            >
                                Users
                            </button>
                            {/* TODO add link to /users page http://localhost:3000/app-users */}
                            <div className="collapse" id="users-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/#" className="rounded">Overview</a></li>
                                    <li><a href="/#" className="rounded">Weekly</a></li>
                                    <li><a href="/#" className="rounded">Monthly</a></li>
                                    <li><a href="/#" className="rounded">Annually</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button
                                className="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#orders-collapse"
                                aria-expanded="false"
                            >
                                Orders
                            </button>
                            <div className="collapse" id="orders-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/#" className="rounded">New</a></li>
                                    <li><a href="/#" className="rounded">Processed</a></li>
                                    <li><a href="/#" className="rounded">Shipped</a></li>
                                    <li><a href="/#" className="rounded">Returned</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-top my-3"></li>
                        <li className="mb-1">
                            <button
                                className="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#account-collapse"
                                aria-expanded="false"
                            >
                                Account
                            </button>
                            <div className="collapse" id="account-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/#" className="rounded">New...</a></li>
                                    <li><a href="/#" className="rounded">Profile</a></li>
                                    <li><a href="/#" className="rounded">Settings</a></li>
                                    <li><a href="/#" className="rounded">Sign out</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}