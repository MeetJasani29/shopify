import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import { loginUserAsync } from "../../services/action/auth.action";
import "./Login.css"; 
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);
  const [inputForm, setInputForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(inputForm));
  };


  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          <FaUnlock /> Login <FaUnlock />
        </h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="d-flex input-user pt-3">
            <FaUser className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputForm.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex input-user pt-3">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={inputForm.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Login</button>
        </form>
        <p className="register-link">
          No Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;