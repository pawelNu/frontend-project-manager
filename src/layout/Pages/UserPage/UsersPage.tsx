import { userData } from '../../../data/userData'

// TODO display all users in table
// TODO display user searched by name
// TODO add new user
// TODO update user
// TODO delete user

export const UsersPage = () => {
    return(
        <div>
            <div>
            <h1>TODO Users Page</h1>
            </div>
            <div>
                <ul>
                    {userData.map((user) => (
                        <li key={user.id}>{user.firstName} {user.lastName} {user.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
