import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      setError(null)
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      console.log(res);
      setError(null);
      setIsAuth(true);
    }).catch(err => {
      if(err.response.status === 400){
        setError({msg:"Invalid Username or password"});
      }
    });
  };
  return (
    <div className="login">
      <label> Login</label>
      <span style={{color: "red"}} >{error && error.msg}</span>
      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }} 
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }} 
      />
      <button className="button" style={{backgroundColor: "green"}} type="button" onClick={login}> Login</button>
    </div>
  );
}

export default Login;
