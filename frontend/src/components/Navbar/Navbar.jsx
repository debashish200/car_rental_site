import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
        <NavLink className="login-btn" to="/login">
          Login
        </NavLink>

        <NavLink className="register-btn" to="/register">
          Register
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;