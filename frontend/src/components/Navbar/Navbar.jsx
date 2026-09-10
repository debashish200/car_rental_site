import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // Check if customer is logged in
  const isLoggedIn = !!localStorage.getItem("access");

  // Handle Logout
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Remove login information
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");

      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        🚗 <span>CarRental</span>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/cars">Cars</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>

      <div className="nav-buttons">

        {isLoggedIn ? (
          // Show Logout when customer is logged in
          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          // Show Login and Register when customer is not logged in
          <>
            <NavLink className="login-btn" to="/login">
              Login
            </NavLink>

            <NavLink className="register-btn" to="/register">
              Register
            </NavLink>
          </>
        )}

      </div>
    </header>
  );
}

export default Navbar;