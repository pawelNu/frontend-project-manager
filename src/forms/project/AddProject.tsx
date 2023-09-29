import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectDto } from "../../interface/Project";
import baseUrl from "../../config/config";
import axios from "axios";

export const AddProject = () => {
    let navigate = useNavigate();

    const [project, setProject] = useState<ProjectDto>({
        name: "",
    });

    const { name } = project;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post(`${baseUrl}/projects`, project);
        navigate("/projects");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Project</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Project Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter project name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                        >
                            Submit
                        </button>
                        <Link
                            className="btn btn-outline-danger mx-2"
                            to={"/projects"}
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};