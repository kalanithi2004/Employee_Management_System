import { useEffect, useState } from "react";
import { getUsers } from "../../api/authApi";
// import "../../App.css"
import "../../styles/User.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);

            const data = await getUsers();

            setUsers(data);
            setError("");
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.detail ||
                "Failed to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading users...</h2>;
    }

    return (
        <div className="users-page">
            <div className="page-header">
                <div>
                    <h1>Users</h1>
                    <p>Manage system users</p>
                </div>
            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email || "-"}</td>
                            <td>{user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default Users;