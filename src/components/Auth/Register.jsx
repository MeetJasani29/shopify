import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewUserAsync } from "../../services/action/auth.action";
import { FaUser, FaEnvelope, FaLock, FaUnlock } from "react-icons/fa";
import "./Login.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreated, error } = useSelector((state) => state.auth);

  const [inputForm, setInputForm] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputForm.password === inputForm.cpassword) {
      dispatch(addNewUserAsync(inputForm));
    } else {
      alert("Password & Confirm Password do not match!");
    }
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/login");
    }
  }, [isCreated, navigate]);

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title py-3">
          <FaUnlock /> Register <FaUnlock />
        </h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-user">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={inputForm.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-user">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputForm.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-user">
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

          <div className="input-user">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              value={inputForm.cpassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit mt-2">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
