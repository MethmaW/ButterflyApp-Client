import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Cookies from "js-cookie";

//redux
import { useSelector } from 'react-redux'



import { Login, Register, Reset, Search, Results } from "./rootImport";


function App() {


  let authToken = "";

  try {
    authToken = Cookies.get("BD_AUTH");
  } catch (err) {
    // console.log("Cookie doesn't exist");
  }


  // redux
  const viewReducer = useSelector((state) => state.viewReducer);



  return (
    <>
      {!authToken && viewReducer === "LOGIN" && <Login />}
      {!authToken && viewReducer === "REGISTER" && <Register />}
      {!authToken && viewReducer === "RESET" && <Reset />}
      {authToken && viewReducer !== "RESULTS" && <Search />}
      {authToken && viewReducer === "RESULTS" && <Results />}
    </>
  );
}

export default App;
