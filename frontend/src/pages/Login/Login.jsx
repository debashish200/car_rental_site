import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove error when user starts typing again
    if (error) {
      setError("");
    }
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // Send login request to Django
      const response = await loginUser(formData);

      // Save authentication information through AuthContext
      login(response.data);

      console.log("Login successful");
      console.log("Role:", response.data.role);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        // Django returned an error
        if (err.response.status === 400) {
          setError("Invalid username or password.");
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please check your credentials.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        // Request did not reach Django
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left Section */}
        <div className="login-left">

          <div className="login-brand">
            🚗
          </div>

          <h1>Welcome Back!</h1>

          <p>
            Login to your CarRental account and continue your journey.
          </p>

          <div className="login-info">
            <div className="info-item">
              <span>🚘</span>
              <div>
                <h3>Find Your Car</h3>
                <p>Explore cars that match your needs.</p>
              </div>
            </div>

            <div className="info-item">
              <span>🔐</span>
              <div>
                <h3>Secure Booking</h3>
                <p>Book your favorite car securely.</p>
              </div>
            </div>

            <div className="info-item">
              <span>⚡</span>
              <div>
                <h3>Easy & Fast</h3>
                <p>Simple booking with a smooth experience.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Section */}
        <div className="login-right">

          <div className="login-form-container">

            <h2>Login</h2>

            <p className="login-subtitle">
              Enter your credentials to access your account.
            </p>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="form-group">

                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                />

              </div>

              {/* Password */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={loading}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* Forgot Password */}
              <div className="forgot-password">
                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* Divider */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="google-login-btn"
              onClick={() =>
                alert("Google login will be implemented later.")
              }
            >
              <span>G</span>
              Continue with Google
            </button>

            {/* Register */}
            <p className="register-text">
              Don't have an account?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;