import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';
import { Outlet } from 'react-router-dom';
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logOutAuth } from "./services/authService";

function App() {
  const [userInfo, setUserInfo] = useState({
    currentUser: null,
    showAdminboard: false,
    showModeratorboard: false,
  });

  useEffect(() => {
    const Currentuser = getCurrentUser();
    if (Currentuser) {
      setUserInfo((user) => ({
        ...user,
        userReady: true,
        currentUser: Currentuser,
        showAdminboard: Currentuser.roles && Currentuser.roles.includes("ROLE_ADMIN"),
        showModeratorboard: Currentuser.roles && Currentuser.roles.includes("ROLE_MODERATOR"),
      }));
    }
  }, []);

  const logOut = () => {
    logOutAuth();
    setUserInfo({
      currentUser: null,
      showAdminboard: false,
      showModeratorboard: false,
    });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="">
        <div className="container-fluid">
          {/* Left-aligned Brand Title */}
          <Link to="/" className="navbar-brand">
            Auth
          </Link>
          
          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Center-aligned Home and User */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {userInfo.currentUser && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user">
                    User
                  </NavLink>
                </li>
              )}

              
              {userInfo.currentUser ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">{userInfo.currentUser.username}</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={logOut}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Right-aligned Login/Signup/Logout */}
            
          </div>
        </div>
      </nav>

      {/* Outlet to render the current route's component */}
      <Outlet />
    </div>
  );
}

export default App;
