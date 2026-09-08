import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub
} from "react-icons/fa";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue your journey.</p>
        </div>

        <form>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

          <div className="login-options">

            <label>

              <input type="checkbox" />

              Remember Me

            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button className="login-btn">

            Login

          </button>

        </form>

        <div className="divider">

          <span>OR</span>

        </div>

        <div className="social-login">

          <button>

            <FaGoogle />

            Google

          </button>

          {/* <button>

            <FaGithub />

            GitHub

          </button> */}

        </div>

        <div className="register-link">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;