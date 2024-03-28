import React from "react";
import { styled } from "styled-components";
import logo from "../../assets/images/wheel-logo.png";
import profile from "../../assets/images/user-profile.png";
import exit from "../../assets/images/exit.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
  background-color: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 999;
  .container {
    max-width: 1240px;
    margin: 0 auto;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 0;
  }
  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    > img {
      height: 60px;
    }
    > p {
      font-size: 24px;
      font-weight: 900;
      text-transform: uppercase;
      color: #333;
      margin-left: 10px;
    }
  }
  .authBtns {
    > ul {
      display: flex;
      align-items: center;
      > li {
        list-style-type: none;
        margin-left: 20px;
        &:first-of-type {
          margin-left: 0;
        }
        &:nth-of-type(1) {
          > a {
            border: 1px solid #333;
            background: #333;
            color: #fff;
            transition: all 0.5s ease;
            &:hover {
              border: 1px solid #c4c4c4;
              background: #c4c4c4;
              color: #333;
            }
          }
        }
        &:nth-of-type(2) {
          > a {
            border: 1px solid #333;
            color: #333;
            background: #fff;
            transition: all 0.5s ease;
            &:hover {
              border: 1px solid #c4c4c4;
              background: #c4c4c4;
              color: #333;
            }
          }
        }
        > a {
          color: #333;
          text-decoration: none;
          padding: 12px 35px;
          border-radius: 10px;
        }
      }
    }
  }
  .loginInfo {
    display: flex;
    align-items: center;
  }
  .userInfo {
    display: flex;
    align-items: center;
    > p {
      margin-left: 5px;
      color: #333;
      text-decoration: none;
      margin-bottom: 0;
      margin-top: 8px;
      > a {
        text-decoration: none;
        font-size: 18px;
        color: #333;
      }
    }
    > button {
      margin-left: 30px;
      height: 30px;
      background: transparent;
      outline: none;
      border: unset;
      cursor: pointer;
    }
  }
  .profile {
    height: 40px;
  }
  .exit {
    height: 30px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <div className="container">
        <div className="wrapper">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
            <p>Autotaškas</p>
          </Link>
          {loggedInUser ? (
            <div className="loginInfo">
              <div className="userInfo">
                <img className="profile" src={profile} alt="Profile" />
                <p>
                  <Link to={`/user/${loggedInUser.userName}`}>
                    {loggedInUser.userName}
                  </Link>
                </p>
                <button
                  onClick={() => {
                    setLoggedInUser(false);
                    navigate("/");
                  }}
                >
                  <img className="exit" src={exit} alt="exit" />
                </button>
              </div>
            </div>
          ) : (
            <nav className="authBtns">
              <ul>
                <li>
                  <NavLink to="/user/register">Registruotis</NavLink>
                </li>
                <li>
                  <NavLink to="/user/login">Prisijungti</NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
