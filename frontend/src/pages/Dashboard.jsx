import { useEffect, useState } from "react";
import { getEmployees } from "../api/employeeApi";
import { getDepartments } from "../api/departmentApi";
import "../styles/dashboard.css";
// import "../App.css"

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const employeeData = await getEmployees();
      const departmentData = await getDepartments();

      setEmployees(employeeData || []);
      setDepartments(departmentData || []);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>Welcome to the Employee Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon employee-icon">👨‍💼</div>

          <div>
            <p>Total Employees</p>
            <h2>{employees.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon department-icon">🏢</div>

          <div>
            <p>Total Departments</p>
            <h2>{departments.length}</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Recent Employees</h3>
              <p>Employee information</p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/employees";
              }}
            >
              View All →
            </button>
          </div>

          {employees.slice(0, 5).map((employee) => (
            <div className="employee-row" key={employee.id}>
              {/* key={employee.employee_id} */}
              <div className="employee-avatar">
                {/* {employee.name?.charAt(0).toUpperCase()} */}
                {employee.first_name?.charAt(0).toUpperCase()}
              </div>

              <div className="employee-info">
                <strong>
                    {/* <strong>{employee.name}</strong> */}
                  {employee.first_name} {employee.last_name}
                </strong>
                <span>{employee.email}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Departments</h3>
              <p>Available departments</p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/departments";
              }}
            >
              View All →
            </button>
          </div>

          {departments.slice(0, 5).map((department) => (
            <div className="department-row" key={department.id}>
              <div className="department-icon">🏢</div>

              <strong>{department.department_name}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
