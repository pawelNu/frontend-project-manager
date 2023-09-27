import { useEffect, useState } from 'react';
import { Project } from '../interface/Project';
import baseUrl from '../config/config'
import { UUID } from 'crypto';
import { Link } from 'react-router-dom';
import axios from 'axios';

// TODO display project searched by name
// TODO add new project

export const ProjectPage = () => {

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        getAllProjects()
    }, [])

    const getAllProjects = async () => {
        try {
        const result = await axios.get(`${baseUrl}/projects`)
        setProjects(result.data)
        } catch (error) {
            console.error("Error getting all projects: ", error)
        }
    }

    const deleteProject = async (id: UUID) => {
        try {
            await axios.get(`${baseUrl}/projects/${id}`)

            // delete project from local state table
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
        }

    }

    return (
        <div>
            <div>
                <h1>TODO Project Page</h1>
            </div>
            <div className='container'>
                {/* https://getbootstrap.com/docs/5.3/content/tables/#table-borders */}
                {/* https://getbootstrap.com/docs/5.3/content/tables/#hoverable-rows */}
                {/* https://getbootstrap.com/docs/5.3/content/tables/#small-tables */}
                <table className="table table-bordered table-hover table-sm border shadow">
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
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Action
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item bg-info" to={`/view-project/${project.id}`}>View</Link></li>
                                            <li><Link className="dropdown-item bg-warning" to={`/update-project/${project.id}`}>Update</Link></li>
                                            <li><hr className="dropdown-divider"></hr></li>
                                            <li><button className="dropdown-item bg-danger text-white" onClick={() => deleteProject(project.id)}>Delete</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
