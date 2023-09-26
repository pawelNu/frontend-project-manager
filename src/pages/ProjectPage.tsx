import { useEffect, useState } from 'react';
import { Project } from '../interface/Project';
import baseUrl from '../config/config'
import { UUID } from 'crypto';
import { Link } from 'react-router-dom';

// TODO display project searched by name
// TODO add new project

export const ProjectPage = () => {

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjectsData = async () => {

            const projectsUrl: string = `${baseUrl}/projects`

            const responseProjects = await fetch(projectsUrl)

            if (!responseProjects.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonProjects = await responseProjects.json();

            const projectsData: Project[] = responseJsonProjects

            setProjects(projectsData)

        }
        fetchProjectsData()
    }, [])

    async function deleteProject(id: UUID) {
        try {
            const url = `${baseUrl}/projects/${id}`

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Something went wrong while deleting the project.');
            }

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
                                            <li><a className="dropdown-item bg-info" href="/#">View</a></li>
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
