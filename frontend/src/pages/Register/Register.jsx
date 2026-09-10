import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import "./Register.css";

function Register() {

  const [showPassword,setShowPassword]=useState(false);

  const [showConfirmPassword,setShowConfirmPassword]=useState(false);

  return (

    <div className="register-page">

      <div className="register-card">

        <div className="register-header">

          <h1>Create Account 🚗</h1>

          <p>Join our Car Rental Platform</p>

        </div>

        <form>

          <div className="input-group">

            <FaUser className="input-icon"/>

            <input
              type="text"
              placeholder="Full Name"
            />

          </div>

          <div className="input-group">

            <FaUser className="input-icon"/>

            <input
              type="text"
              placeholder="Username"
            />

          </div>

          <div className="input-group">

            <FaEnvelope className="input-icon"/>

            <input
              type="email"
              placeholder="Email Address"
            />

          </div>

          <div className="input-group">

            <FaPhone className="input-icon"/>

            <input
              type="tel"
              placeholder="Phone Number"
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <span
              className="password-toggle"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <div className="input-group">

            <FaLock className="input-icon"/>

            <input
              type={showConfirmPassword ? "text":"password"}
              placeholder="Confirm Password"
            />

            <span
              className="password-toggle"
              onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <div className="role-group">

            <label>Select Account Type</label>

            <select>

              <option>Customer</option>

              <option>Agency Owner</option>

            </select>

          </div>

          <div className="terms">

            <input type="checkbox"/>

            <span>
              I agree to the Terms & Conditions
            </span>

          </div>

          <button className="register-btn">

            Create Account

          </button>

        </form>

        <div className="login-link">

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </div>

      </div>

    </div>

  )

}

export default Register;