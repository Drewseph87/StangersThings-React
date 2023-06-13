import React from "react";
import { loginUser } from "../api";

export const loginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  token,
  setToken,
}) => {
  const handleSubmit = (event) => {
    // const username = event.target.username.value;

    event.preventDefault();
    setUsername("");
    setPassword("");

    const loginData = async () => {
      try {
        const result = await loginUser(username, password);
        localStorage.setItem("token", JSON.stringify(result.token));
        setToken(token);
      } catch (error) {
        console.error(error);
      }
    };
    loginData();
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    //console.log(setUsername);
  };

  return (
    <div id="container">
      <div id="navbar">Login Here!</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <div href="REGISTER URL INSERT HERE">Need to Register? Click Here!</div>
    </div>
  );
};

export default loginForm;
