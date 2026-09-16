import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
} from "react-icons/fa";

import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const registrationData = {
        ...formData,
        role: role,
      };

      const response = await registerUser(registrationData);

      console.log("Registration Success:", response.data);

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Registration Error:", err);

      if (err.response) {
        console.log("Server Response:", err.response.data);

        if (err.response.data.username) {
          setError(err.response.data.username[0]);
        } else if (err.response.data.email) {
          setError(err.response.data.email[0]);
        } else if (err.response.data.password) {
          setError(err.response.data.password[0]);
        } else if (err.response.data.role) {
          setError(err.response.data.role[0]);
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(
            "Registration failed. Please check your details."
          );
        }
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Header */}
        <div className="register-header">
          <h1>Create Account</h1>
          <p>
            Join CarRental as a customer or agency owner.
          </p>
        </div>

        {/* Role Selection */}
        <div className="role-selection">

          <h3>Register As</h3>

          <div className="role-options">

            {/* Customer */}
            <div
              className={`role-card ${
                role === "customer" ? "active" : ""
              }`}
              onClick={() => setRole("customer")}
            >
              <FaUser />

              <h4>Customer</h4>

              <p>
                Browse cars and book your favorite vehicle.
              </p>
            </div>

            {/* Agency */}
            <div
              className={`role-card ${
                role === "agency" ? "active" : ""
              }`}
              onClick={() => setRole("agency")}
            >
              <FaBuilding />

              <h4>Agency Owner</h4>

              <p>
                Manage your cars and receive customer bookings.
              </p>
            </div>

          </div>

        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>

          {/* Username */}
          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}
          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          {/* Error */}
          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="register-success">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : `Register as ${
                  role === "customer"
                    ? "Customer"
                    : "Agency Owner"
                }`}
          </button>

        </form>

        {/* Login Link */}
        <div className="login-link">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;