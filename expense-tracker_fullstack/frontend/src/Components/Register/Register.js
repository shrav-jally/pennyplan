import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success = await register(
      formData.username,
      formData.email,
      formData.password
    );
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <RegisterStyled>
      <div className="register-container">
        <div className="register-content">
          <h2>Create your account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-control">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="submit-btn">
              <button type="submit">Register</button>
            </div>
          </form>
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </RegisterStyled>
  );
};

const RegisterStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(252, 246, 249, 0.78);

  .register-container {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .register-content {
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #222260;
    }
  }

  .input-control {
    margin-bottom: 1rem;

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #222260;
      }
    }
  }

  .submit-btn {
    button {
      width: 100%;
      padding: 0.8rem;
      background: #222260;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #2a2a7c;
      }
    }
  }

  .error-message {
    background: #ff6b6b;
    color: white;
    padding: 0.8rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .login-link {
    text-align: center;
    margin-top: 1rem;

    a {
      color: #222260;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Register;
