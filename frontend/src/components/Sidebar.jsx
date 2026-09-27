import { NavLink } from "react-router-dom";
import "../styles/layout.css";
// import "../App.css"
function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Employees",
      path: "/employees",
      icon: "👨‍💼",
    },
    {
      name: "Departments",
      path: "/departments",
      icon: "🏢",
    },
    {
      name: "Users",
      path: "/users",
      icon: "👥",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">EM</div>

        <div>
          <h2>Employee</h2>
          <span>Management</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <div className="sidebar-bottom">
        <p>Employee Management</p>
        <span>v1.0</span>
      </div>

    </aside>
  );
}

export default Sidebar;