// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";
// import "../App.css"

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  return (
    <header className="navbar">

      <div className="navbar-title">
        <h2>Employee Management System</h2>
      </div>

      <div className="navbar-right">

        <div className="user-info">

          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="user-details">
            <strong>
              {user?.username || "Admin"}
            </strong>

            <span>
              {user?.role || "Admin"}
            </span>
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;