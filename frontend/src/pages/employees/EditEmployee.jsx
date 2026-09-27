import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getEmployeeById,
    updateEmployee
} from "../../api/employeeApi";
import { getDepartments } from "../../api/departmentApi";
// import "../../App.css"
import "../../styles/employees.css";

function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        employee_code: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
        department_id: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);

            const [employee, departmentData] = await Promise.all([
                getEmployeeById(id),
                getDepartments()
            ]);

            setDepartments(departmentData);

            setFormData({
                employee_code: employee.employee_code || "",
                first_name: employee.first_name || "",
                last_name: employee.last_name || "",
                email: employee.email || "",
                phone: employee.phone || "",
                designation: employee.designation || "",
                salary: employee.salary || "",
                department_id: employee.department_id || ""
            });

            setError("");

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to load employee"
            );

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const employeeData = {
                employee_code: formData.employee_code,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                designation: formData.designation,
                salary: Number(formData.salary),
                department_id: Number(formData.department_id)
            };

            await updateEmployee(id, employeeData);

            alert("Employee updated successfully");

            navigate("/employees");

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to update employee"
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <h2>Loading employee...</h2>;
    }

    return (
        <div className="employee-form-page">

            <h1>Edit Employee</h1>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Employee Code</label>

                    <input
                        type="text"
                        name="employee_code"
                        value={formData.employee_code}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>First Name</label>

                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Last Name</label>

                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Phone</label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Designation</label>

                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Salary</label>

                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Department</label>

                    <select
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.department_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Updating..." : "Update Employee"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditEmployee;