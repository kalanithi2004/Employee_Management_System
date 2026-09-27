import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employeeApi";
// import "../../App.css"
import "../../styles/employees.css";

function EmployeeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadEmployee();
    }, [id]);

    const loadEmployee = async () => {
        try {
            setLoading(true);

            const data = await getEmployeeById(id);

            setEmployee(data);
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

    if (loading) {
        return <h2>Loading employee...</h2>;
    }

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>

                <button onClick={() => navigate("/employees")}>
                    Back to Employees
                </button>
            </div>
        );
    }

    if (!employee) {
        return <h2>Employee not found</h2>;
    }

    return (
        <div className="employee-details-page">

            <div className="details-header">

                <div>
                    <h1>Employee Details</h1>
                    <p>
                        Employee ID: {employee.id}
                    </p>
                </div>

                <div>
                    <button
                        onClick={() =>
                            navigate(`/employees/edit/${employee.id}`)
                        }
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => navigate("/employees")}
                    >
                        Back
                    </button>
                </div>

            </div>


            <div className="employee-details-card">

                <div className="detail-item">
                    <span>Employee Code</span>
                    <strong>
                        {employee.employee_code || "-"}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>First Name</span>
                    <strong>
                        {employee.first_name || "-"}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Last Name</span>
                    <strong>
                        {employee.last_name || "-"}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Email</span>
                    <strong>
                        {employee.email || "-"}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Phone</span>
                    <strong>
                        {employee.phone || "-"}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Designation</span>
                    <strong>
                        {employee.designation || "-"}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Salary</span>
                    <strong>
                        ₹{employee.salary || 0}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Department</span>
                    <strong>
                        {employee.department?.department_name || "-"}
                    </strong>
                </div>

            </div>

        </div>
    );
}

export default EmployeeDetails;