import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      console.log(res);
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("username", username);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          cookies.set("hashedPassword", hashedPassword);
          setError(null);
          setIsAuth(true);
        
    }).catch(err => {
      console.log(err);
      if(err.response.status === 400){
        setError({username: "username already exists"})
      }else{
        setError({username: "Something wrong"})

      }
    });
  };
  return (
    <div className="signUp">
      <label> Sign Up</label>
      <span style={{color: "red"}}>{error && error.username}</span>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }} 
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }} 
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }} 
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }} 
      />
      <button className="button" style={{backgroundColor: "gray"}} onClick={signUp} > Sign Up</button>
    </div>
  );
}

export default SignUp;
