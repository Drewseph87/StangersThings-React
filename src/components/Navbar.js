import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Add this line
    console.log("Logged out");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  };

  return (
    <div id="container">
      <div id="navbar">
        <Link to="/">Posts</Link>
        {!token ? <Link to="/Login">Login</Link> : null}
        {!token ? <Link to="/Register">Register</Link> : null}
        {token ? <Link to="/MakePost">New Post</Link> : null}
        {token ? <a onClick={logout}>Logout?</a> : null}
      </div>
    </div>
  );
};

export default Navbar;
