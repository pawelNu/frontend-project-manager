import { Link } from "react-router-dom";
import { allProjects } from "../../data/AllProjectsData";

export const AllProjectsPage = () => {
    return (
        <div className="container-fluid p-3">
            <div className="border rounded p-1 mt-2 shadow">
                <h2 className="text-center m-3">Projects</h2>
                <div className="container-fluid p-3">
                    <div className="d-flex justify-content-between align-items-center col-7">
                        <Link
                            type="button"
                            className="btn btn-primary me-2"
                            to={"/add-new-project"}
                        >
                            Add new project
                        </Link>
                        {/* TODO add filtering by project name */}
                        {/* <div className="input-group col">
                            <input
                                type="text"
                                className="form-control me-2 rounded"
                                placeholder="Search by project name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="container-fluid p-3">
                    <table className="table table-bordered table-hover table-sm border">
                        <thead>
                            <tr>
                                {/* TODO add filter row displayed after clicking button filter */}
                                <th scope="col">#</th>
                                {/* TODO add sorting by clicking at column name */}
                                <th scope="col">Project name</th>
                                <th scope="col">Finished?</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {allProjects.map((project, index) => (
                                <tr key={project.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>{project.isFinished}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Actions
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link
                                                        className="dropdown-item bg-info"
                                                        to={`/view-project/${project.id}`}
                                                    >
                                                        View
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="dropdown-item bg-warning"
                                                        to={`/edit-project/${project.id}`}
                                                    >
                                                        Edit
                                                    </Link>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider"></hr>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item bg-danger text-white"
                                                        // onClick={() =>
                                                        //     deleteProject(
                                                        //         project.id
                                                        //     )
                                                        // }
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
