// https://getbootstrap.com/docs/5.3/components/offcanvas/
// https://www.cssscript.com/responsive-sidebar-bootstrap-offcanvas/ -> 2. The HTML structure for the offcanvas sidebar.

import { Link } from "react-router-dom"

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
                    {/* https://getbootstrap.com/docs/5.2/content/reboot/#horizontal-rules */}
                    <hr className="border border-dark my-1 opacity-100"></hr>
                        <li className="mb-1">
                            <button
                                className="btn btn-toggle align-items-center rounded"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#projects-collapse"
                                aria-expanded="true"
                            >
                                Projects
                            </button>
                            <div className="collapse show" id="projects-collapse">
                            <hr className="border border-dark my-1 opacity-100 opacity-100"></hr>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to={`/projects`} className="btn btn-toggle align-items-center rounded ps-5">All projects</Link></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Empty</a></li>
                                </ul>
                            </div>
                        </li>
                        <hr className="border border-dark my-1 opacity-100"></hr>
                        <li className="mb-1">
                            <button
                                className="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#users-collapse"
                                aria-expanded="false"
                            >
                                Users
                            </button>
                            <div className="collapse" id="users-collapse">
                            <hr className="border border-dark my-1 opacity-100"></hr>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to={`/app-users`} className="btn btn-toggle align-items-center rounded ps-5">All users</Link></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Empty</a></li>
                                </ul>
                            </div>
                        </li>
                        <hr className="border border-dark my-1 opacity-100"></hr>
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
                            <hr className="border border-dark my-1 opacity-100"></hr>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">New</a></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Processed</a></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Shipped</a></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Returned</a></li>
                                </ul>
                            </div>
                        </li>
                        <hr className="border border-dark my-1 opacity-100"></hr>
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
                            <hr className="border border-dark my-1 opacity-100"></hr>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">New...</a></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Profile</a></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Settings</a></li>
                                    <li><a href="/#" className="btn btn-toggle align-items-center rounded ps-5">Sign out</a></li>
                                </ul>
                            </div>
                        </li>
                        <hr className="border border-dark my-1 opacity-100"></hr>
                    </ul>
                </div>
            </div>
        </div>
    )
}