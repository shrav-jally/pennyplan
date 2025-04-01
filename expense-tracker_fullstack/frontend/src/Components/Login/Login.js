import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", formData.email);
    const success = await login(formData.email, formData.password);
    if (success) {
      console.log("Login successful");
      console.log("User data in localStorage:", localStorage.getItem("user"));
      navigate("/dashboard");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <LoginStyled>
      <div className="login-container">
        <div className="login-content">
          <h2>Sign in to your account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            <div className="submit-btn">
              <button type="submit">Sign in</button>
            </div>
          </form>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(252, 246, 249, 0.78);

  .login-container {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .login-content {
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

  .register-link {
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

export default Login;
