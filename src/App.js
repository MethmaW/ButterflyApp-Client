import React, { useState } from "react";
import './App.css';
import axios from "axios";


function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    console.log(name);
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    console.log(email);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(password);
    setPassword(e.target.value);
  };

  const hanldeLogIn = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/user/login",
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePosts = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/posts",
      headers: {
        // "Content-Type": " application/json",
        // "Content-type": "application/x-www-form-urlencoded; charset=ISO-8859-1",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…5MzV9.xDzlnV9A1AhB4A6fK33Y1oxpm7a5_CCumC8dyNQidxg",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTwoFA = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/user/2fa-auth",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };





  return (
    <div>
      <input placeholder="name" onChange={handleName} />
      <input placeholder="email" onChange={handleEmail} />
      <input placeholder="password" onChange={handlePassword} />
      <button onClick={hanldeLogIn}>Log in</button>

      <button onClick={handleTwoFA}>Verify email</button>

      <button onClick={handlePosts}>Show posts</button>
    </div>
  );
}

export default App;
