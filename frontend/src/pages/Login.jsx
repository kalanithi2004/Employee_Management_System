import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import "../App.css"
import "../styles/auth.css";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [useremail, setUseremail] = useState(location.state?.useremail || "");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
        await login(useremail, password);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Employee Management System</h1>

        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
