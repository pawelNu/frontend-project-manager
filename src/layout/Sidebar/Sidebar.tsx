// https://getbootstrap.com/docs/5.3/components/offcanvas/

export const Sidebar = () => {
    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="dropdown mt-3">
                        <a className="btn btn-outline-primary" href="/#" role="button">
                            Projects
                        </a>
                        <div className="dropdown-divider"></div>
                        <button className="btn btn-outline-primary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown">
                            Dropdown button2
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/#">Action2</a></li>
                            <li><a className="dropdown-item" href="/#">Another action2</a></li>
                            <li><a className="dropdown-item" href="/#">Something else here2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}