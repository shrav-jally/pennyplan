import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/Icons";

function Navigation({ active, setActive, user, onLogout }) {
  const navigate = useNavigate();

  console.log("Navigation component received user:", user);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <NavStyled>
      <div className="user-con">
        <div className="text">
          <h2>{user?.username || "User"}</h2>
          <p>Manage your expenses</p>
        </div>
        <div className="avatar">
          <img
            src={`https://robohash.org/${user?.username || "user"}.png`}
            alt=""
          />
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${active === item.id ? "active" : ""}`}
            onClick={() => setActive(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
        <li className="menu-item" onClick={handleLogout}>
          {signout}
          <span>Logout</span>
        </li>
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
    border: 2px solid #ffffff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text {
    h2 {
      color: #222260;
      font-size: 1.4rem;
      font-weight: 700;
    }
    p {
      color: #222260;
      opacity: 0.8;
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .menu-item {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.3rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease;
      color: #222260;
      padding-left: 1rem;
      position: relative;
      i {
        color: #222260;
        font-size: 1.4rem;
        transition: all 0.4s ease;
      }
    }

    .menu-item:hover {
      color: #222260;
      i {
        color: #222260;
      }
    }

    .menu-item.active {
      color: #222260;
      i {
        color: #222260;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #222260;
        border-radius: 0 10px 10px 0;
      }
    }
  }
`;

export default Navigation;
