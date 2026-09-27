import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDepartments,
    updateDepartment
} from "../../api/departmentApi";
// import "../../App.css"
import "../../styles/Department.css";

function EditDepartment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [departmentName, setDepartmentName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDepartment();
    }, [id]);

    const loadDepartment = async () => {
        try {
            setLoading(true);

            const departments = await getDepartments();

            const department = departments.find(
                (item) => item.id === Number(id)
            );

            if (!department) {
                setError("Department not found");
                return;
            }

            setDepartmentName(
                department.department_name || ""
            );

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to load department"
            );

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!departmentName.trim()) {
            setError("Department name is required");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await updateDepartment(id, {
                department_name: departmentName
            });

            alert("Department updated successfully");

            navigate("/departments");

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to update department"
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <h2>Loading department...</h2>;
    }

    return (
        <div className="department-form-page">

            <h1>Edit Department</h1>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Department Name</label>

                    <input
                        type="text"
                        value={departmentName}
                        onChange={(e) =>
                            setDepartmentName(e.target.value)
                        }
                        required
                    />
                </div>

                <div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Department"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/departments")
                        }
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditDepartment;