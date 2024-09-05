import React, { useState } from "react";
import "../Styles/SignIn.css";
import logoSvg from "../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { userSignInRequest } from "../action/api";
function SignIn() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!email || !emailRegex.test(email)) {
      formErrors.email = "Invalid email address.";
    }
    if (!password || !passwordRegex.test(password)) {
      formErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestData = {
      email: email,
      password: password,
    };

    const response = await userSignInRequest(requestData);

    if (response && response.status) {
      const data = response.data;
      if (data && data.userId) {
        localStorage.setItem("userId", data.userId);
        navigate("/");
      }
    } else {
      console.error("Sign-in failed or no userId found.");
    }
  };

  return (
    <div className="main-body">
      <nav>
        <img src={logoSvg} alt="logo" />
      </nav>
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Email or phone number</label>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-control">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Sign In</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <p>
          New to Netflix? <Link to="/signup">Sign up now</Link>
        </p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <p>Learn more.</p>
        </small>
      </div>
    </div>
  );
}

export default SignIn;
