import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getDepartments,
    deleteDepartment
} from "../../api/departmentApi";
// import "../../App.css"
import "../../styles/Department.css";

function Department() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            setLoading(true);

            const data = await getDepartments();

            setDepartments(data);
            setError("");

        } catch (error) {
            console.error(error);
            setError("Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDepartment(id);

            setDepartments(
                departments.filter(
                    (department) => department.id !== id
                )
            );

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to delete department"
            );
        }
    };

    if (loading) {
        return <h2>Loading departments...</h2>;
    }

    return (
        <div className="department-page">
            <div className="page-header">

                <div>
                    <h1>Departments</h1>
                    <p>Manage your departments</p>
                </div>

                <button
                    onClick={() => navigate("/departments/add")}
                >
                    + Add Department
                </button>

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
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {departments.map((department) => (

                        <tr key={department.id}>

                            <td>
                                {department.id}
                            </td>

                            <td>
                                {department.department_name}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/departments/edit/${department.id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(department.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {departments.length === 0 && (
                <p>No departments found.</p>
            )}

        </div>
    );
}

export default Department;