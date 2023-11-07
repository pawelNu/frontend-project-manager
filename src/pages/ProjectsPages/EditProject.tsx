import { Link } from "react-router-dom";

export const EditProject = () => {
    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-3">Edit Project</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter project name"
                                name="name"
                                // value={name}
                                // onChange={(e) => onInputChange(e)}
                            />
                            {/* {error && <p className="text-danger">{error}</p>} */}
                            <div className="mb-3">
                                <label
                                    htmlFor="finished"
                                    className="form-label"
                                >
                                    Finished?
                                </label>
                                {/* TODO add bootstrap css to options list */}
                                <select
                                    className="form-select"
                                    name="finished"
                                    // value={finished}
                                    // onChange={(e) => onFinishedChange(e)}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            {/* {error && <p className="text-danger">{error}</p>} */}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                        >
                            Submit
                        </button>
                        <Link
                            className="btn btn-outline-danger mx-2"
                            to="/all-projects"
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
