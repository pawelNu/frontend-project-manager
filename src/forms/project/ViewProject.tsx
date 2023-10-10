import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Project } from "../../interface/Project";
import baseUrl from "../../config/config";

export const ViewProject = () => {
    const [project, setProject] = useState<Project>({
        id: "string-string-string-string-string", // this solves the problem with: Type '""' is not assignable to type '`${string}-${string}-${string}-${string}-${string}`'.
        name: "",
        finished: ""
    });

    const { id } = useParams();

    useEffect(() => {
        getProject();
    });

    const getProject = async () => {
        try {
            const result = await axios.get(`${baseUrl}/projects/${id}`);
            setProject(result.data);
        } catch (error) {
            console.error("Error getting project:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-3">Project Details</h2>
                    <div className="card">
                        <div className="card-header">
                            <b>Project id: </b>
                            {project.id}
                            <ul className="list-group list-group-flush mt-1">
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {project.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Finished?: </b>
                                    {project.finished}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/projects"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
