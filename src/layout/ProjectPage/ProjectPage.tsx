import { projectData } from '../../data/projectData'

// TODO display all projects in table
// TODO display project searched by name
// TODO add new project
// TODO update project
// TODO delete project

export const ProjectPage = () => {

    return (
        <div>
            <div>
                <h1>TODO Project Page</h1>
            </div>
            <div>
                <ul>
                    {projectData.map((project) => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
