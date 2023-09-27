import { AppUser } from '../interface/AppUser'
import baseUrl from '../config/config'
import { useEffect, useState } from 'react';
import { UUID } from 'crypto';

// TODO display user searched by name
// TODO add new user
// TODO update user
// TODO view user data

export const AppUsersPage = () => {

    const [appUsers, setAppUsers] = useState<AppUser[]>([])

    useEffect(() => {
        const fetchAppUsersData = async () => {

            const appUsersUrl: string = `${baseUrl}/app-users`

            const responseAppUsers = await fetch(appUsersUrl)

            if (!responseAppUsers.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonAppUsers = await responseAppUsers.json();

            const appUsersData: AppUser[] = responseJsonAppUsers

            setAppUsers(appUsersData)

        }
        fetchAppUsersData()
    }, [])

    async function deleteAppUser(id: UUID) {
        try {
            const url = `${baseUrl}/app-users/${id}`

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Something went wrong while deleting the user.');
            }

            // delete project from local state table
            setAppUsers((prevAppUsers) => prevAppUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }

    }

    return (
        <div>
            <div>
                <h1>TODO User Page</h1>
            </div>
            <div className='container'>
                {/* https://getbootstrap.com/docs/5.3/content/tables/#table-borders */}
                {/* https://getbootstrap.com/docs/5.3/content/tables/#hoverable-rows */}
                <table className="table table-bordered table-hover table-sm border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {appUsers.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {/* https://getbootstrap.com/docs/5.3/components/dropdowns/#single-button */}
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Action
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item bg-info" href="/#">View</a></li>
                                            <li><a className="dropdown-item bg-warning" href="/#">Update</a></li>
                                            <li><hr className="dropdown-divider"></hr></li>
                                            <li><button className="dropdown-item bg-danger text-white" onClick={() => deleteAppUser(user.id)}>Delete</button></li>
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
