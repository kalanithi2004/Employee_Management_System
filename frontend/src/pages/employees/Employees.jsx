import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getEmployees,
  searchEmployees,
  deleteEmployee,
  getEmployeesPagination,
  sortEmployees,
} from "../../api/employeeApi";

import "../../styles/employees.css";
// import "../../App.css"

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const limit = 5;

  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, [page]);

  // =========================
  // GET ALL EMPLOYEES
  // =========================

  const loadEmployees = async () => {
    try {
        setLoading(true);

        const data = await getEmployeesPagination(
            (page - 1) * limit,
            limit
        );

        setEmployees(data || []);

    } catch (error) {
        console.error(error);
        setEmployees([]);
    } finally {
        setLoading(false);
    }
};

  // =========================
  // SEARCH
  // =========================

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);
    setPage(1);

    if (value.trim() === "") {
      loadEmployees();
      return;
    }

    try {
      setLoading(true);

      const data = await searchEmployees(value);

      setEmployees(data || []);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteEmployee(id);

      setEmployees((previousEmployees) =>
        previousEmployees.filter(
          (employee) => employee.id !== id,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
    }
  };

  // =========================
  // SORT
  // =========================

  const handleSort = async () => {
    try {
      setLoading(true);

      const newOrder = sortOrder === "asc" ? "desc" : "asc";

      const data = await sortEmployees(newOrder);

      setEmployees(data || []);
      setSortOrder(newOrder);
    } catch (error) {
      console.error(error);
      setError("Failed to sort employees");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PAGINATION
  // =========================

  const handlePagination = async (newPage) => {
    try {
      setLoading(true);

      const skip = (newPage - 1) * limit;

      const data = await getEmployeesPagination(
        skip,
        limit,
      );

      setEmployees(data || []);
      setPage(newPage);
    } catch (error) {
      console.error(error);
      setError("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="employees-page">
        <div className="loading-box">
          Loading employees...
        </div>
      </div>
    );
  }

  return (
    <div className="employees-page">

      {/* HEADER */}

      <div className="employees-header">

        <div>
          <h1>Employees</h1>

          <p>
            Manage your employees and their information
          </p>
        </div>

        <button
          className="add-employee-btn"
          onClick={() => navigate("/employees/add")}
        >
          + Add Employee
        </button>

      </div>

      {/* TOOLBAR */}

      <div className="employees-toolbar">

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={handleSearch}
          />

        </div>

        <button
          className="sort-btn"
          onClick={handleSort}
        >
          Sort {sortOrder === "asc" ? "↑" : "↓"}
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* EMPLOYEE TABLE */}

      <div className="employee-table-card">

        <table className="employee-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Code</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {employees.map((employee) => (

              <tr key={employee.id}>

                {/* ID */}

                <td>
                  <span className="employee-id">
                    #{employee.id}
                  </span>
                </td>

                {/* NAME */}

                <td>

                  <div className="employee-name">

                    <div className="employee-avatar">
                      {employee.first_name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {employee.first_name}{" "}
                        {employee.last_name}
                      </strong>

                      <span>
                        Employee
                      </span>
                    </div>

                  </div>

                </td>

                {/* CODE */}

                <td>
                  <span className="code-badge">
                    {employee.employee_code}
                  </span>
                </td>

                {/* EMAIL */}

                <td>
                  {employee.email}
                </td>

                {/* PHONE */}

                <td>
                  {employee.phone || "-"}
                </td>

                {/* DESIGNATION */}

                <td>
                  {employee.designation || "-"}
                </td>

                {/* SALARY */}

                <td>
                  <strong>
                    ₹{employee.salary}
                  </strong>
                </td>

                {/* DEPARTMENT */}

                <td>
                  <span className="department-badge">
                    {employee.department?.department_name ||
                      "-"}
                  </span>
                </td>

                {/* ACTIONS */}

                <td>

                  <div className="action-buttons">

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(
                          `/employees/${employee.id}`,
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/employees/edit/${employee.id}`,
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(employee.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {employees.length === 0 && (
          <div className="empty-employees">
            <div>👨‍💼</div>
            <h3>No employees found</h3>
            <p>
              Try another search or add a new employee.
            </p>
          </div>
        )}

      </div>

      {/* PAGINATION */}

      {employees.length > 0 && (
        <div className="pagination">

         <button
        className="pagination-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
    >
        ← Previous
    </button>

    <span>Page {page}</span>

    <button
        className="pagination-btn"
        disabled={employees.length < limit}
        onClick={() => setPage(page + 1)}
    >
        Next →
    </button>

        </div>
      )}

    </div>
  );
}

export default Employees;