import { useEffect, useState } from 'react';
import { projectData } from '../../../data/projectData'
import { Project } from '../../../interface/Project';

// TODO display project searched by name
// TODO add new project
// TODO update project
// TODO delete project

export const ProjectPage = () => {

    // const [projects, setProjects] = useState<Project[]>([])

    // useEffect

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
                        {projectData.map((project, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{project.name}</td>
                                <td>
                                    {/* https://getbootstrap.com/docs/5.3/components/dropdowns/#single-button */}
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Action
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item bg-info" href="#">View</a></li>
                                            <li><a className="dropdown-item bg-warning" href="#">Update</a></li>
                                            <li><hr className="dropdown-divider"></hr></li>
                                            <li><a className="dropdown-item bg-danger text-white" href="#">Delete</a></li>
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
