import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Employees from "./pages/employees/Employees";
import AddEmployee from "./pages/employees/AddEmployee";
import EditEmployee from "./pages/employees/EditEmployee";
import EmployeeDetails from "./pages/employees/EmployeeDetails";

import Department from "./pages/departments/Department";
import AddDepartment from "./pages/departments/AddDepartment";
import EditDepartment from "./pages/departments/EditDepartment";

import Users from "./pages/users/Users";

import "./App.css";


function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="main-area">
                <Navbar />

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}


function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                {/* Protected */}
                <Route element={<ProtectedRoute />}>

                    <Route element={<Layout />}>

                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Employees */}
                        <Route path="/employees" element={<Employees />} />
                        <Route
                            path="/employees/add"
                            element={<AddEmployee />}
                        />
                        <Route
                            path="/employees/edit/:id"
                            element={<EditEmployee />}
                        />
                        <Route
                            path="/employees/:id"
                            element={<EmployeeDetails />}
                        />

                        {/* Departments */}
                        <Route
                            path="/departments"
                            element={<Department />}
                        />
                        <Route
                            path="/departments/add"
                            element={<AddDepartment />}
                        />
                        <Route
                            path="/departments/edit/:id"
                            element={<EditDepartment />}
                        />

                        {/* Users */}
                        <Route path="/users" element={<Users />} />

                    </Route>

                </Route>


                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;