import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDepartment } from "../../api/departmentApi";
// import "../../App.css"
import "../../styles/Department.css";

function AddDepartment() {

    const navigate = useNavigate();

    const [departmentName, setDepartmentName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!departmentName.trim()) {
            setError("Department name is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await createDepartment({
                department_name: departmentName
            });

            alert("Department created successfully");

            navigate("/departments");

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to create department"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="department-form-page">

            <h1>Add Department</h1>

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
                        placeholder="Enter department name"
                        required
                    />
                </div>

                <div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Department"}
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

export default AddDepartment;