// import { userData } from '../../../data/userData'
import { User } from '../../../interface/User'
import baseUrl from '../../../config/config'
import { useEffect, useState } from 'react';

// TODO display user searched by name
// TODO add new user
// TODO update user
// TODO delete user

export const UsersPage = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect (() => {
        const fetchUsersData = async () => {

            const usersUrl: string = `${baseUrl}/users`

            const responseUsers = await fetch(usersUrl)

            if (!responseUsers.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonUsers = await responseUsers.json();

            const usersData: User[] = responseJsonUsers

            setUsers(usersData)

        }
        fetchUsersData()
    }, [])

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
                        {users.map((user, index) => (
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
