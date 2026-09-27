import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../api/employeeApi";
import { getDepartments } from "../../api/departmentApi";
// import "../../App.css"
import "../../styles/employees.css";

function AddEmployee() {

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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load departments");
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

        setError("");
        setLoading(true);

        try {

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

            await createEmployee(employeeData);

            alert("Employee created successfully");

            navigate("/employees");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to create employee"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="employee-form-page">

            <h1>Add Employee</h1>

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
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Employee"}
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

export default AddEmployee;