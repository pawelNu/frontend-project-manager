import { useEffect, useState } from "react";
import { Project } from "../interface/Project";
import baseUrl from "../config/config";
import { UUID } from "crypto";
import { Link } from "react-router-dom";
import axios from "axios";

// TODO display project searched by name search starts after a while
// TODO add confirmation when deleting
// TODO add message after adding project
// TODO add message after update project

export const ProjectPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllProjects();
    }, []);

    const getAllProjects = async () => {
        try {
            const result = await axios.get(`${baseUrl}/projects`);
            setProjects(result.data);
        } catch (error) {
            console.error("Error getting all projects: ", error);
        }
    };

    const deleteProject = async (id: UUID) => {
        try {
            await axios.get(`${baseUrl}/projects/${id}`);

            // delete project from local state table
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== id)
            );
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const result = await axios.get(
                `${baseUrl}/projects/find-name-containing?searchTerm=${searchTerm}`
            );
            setProjects(result.data);
        } catch (error) {
            console.error("Error searching for project name: ", error);
        }
    };

    return (
        <div className="container">
            <div className="border rounded p-1 mt-2 shadow">
                <div className="d-flex justify-content-center align-items-center my-2">
                    <div className="border shadow-sm col-2">
                        <h2 className="text-center m-1">Projects</h2>
                    </div>
                </div>
                <div className="container my-2">
                    <div className="d-flex justify-content-between align-items-center col-7">
                        <Link
                            type="button"
                            className="btn btn-primary me-2"
                            to={"/add-project"}
                        >
                            Add project
                        </Link>
                        <div className="input-group col">
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
                        </div>
                    </div>
                </div>
                <div className="container">
                    {/* https://getbootstrap.com/docs/5.3/content/tables/#table-borders */}
                    {/* https://getbootstrap.com/docs/5.3/content/tables/#hoverable-rows */}
                    {/* https://getbootstrap.com/docs/5.3/content/tables/#small-tables */}
                    <table className="table table-bordered table-hover table-sm border">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Project name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {projects.map((project, index) => (
                                <tr key={project.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td>
                                        {/* https://getbootstrap.com/docs/5.3/components/dropdowns/#single-button */}
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Action
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
                                                        to={`/update-project/${project.id}`}
                                                    >
                                                        Update
                                                    </Link>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider"></hr>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item bg-danger text-white"
                                                        onClick={() =>
                                                            deleteProject(
                                                                project.id
                                                            )
                                                        }
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
