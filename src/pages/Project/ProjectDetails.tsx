import { Link } from "react-router-dom";

export const ProjectDetails = () => {
    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-3">Project Details</h2>
                    <div className="card">
                        <div className="card-header">
                            <b>Project id: </b>
                            {/* {project.id} */}
                            <ul className="list-group list-group-flush mt-1">
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {/* {project.name} */}
                                </li>
                                <li className="list-group-item">
                                    <b>Finished?: </b>
                                    {/* {project.finished} */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/all-projects"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
