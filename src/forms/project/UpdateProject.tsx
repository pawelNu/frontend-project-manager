import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProjectDto } from '../../interface/Project';
import baseUrl from '../../config/config'
import axios from "axios";

export const UpdateProject = () => {

    let navigate = useNavigate()

    const { id } = useParams()

    const [project, setProject] = useState<ProjectDto>({
        name: ""
    })

    const { name } = project

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const getProject = async (id: string | undefined) => {
            try {
                const result = await axios.get(`${baseUrl}/projects/${id}`)
                setProject(result.data)
            } catch (error) {
                console.error('Error getting project: ', error);
            }
        }
        getProject(id)
    }, [id])
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await axios.put(`${baseUrl}/projects/${id}`, project)
            navigate("/projects")
        } catch (error) {
            console.error('Error updating project: ', error)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Project</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor="Name" className='form-label'>Name</label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-outline-primary'>
                            Submit
                        </button>
                        <Link
                            className='btn btn-outline-danger mx-2'
                            to="/projects">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
