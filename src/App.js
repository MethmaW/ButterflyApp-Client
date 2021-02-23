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
    
      <Router>
        {/* Browser paths  */}
        {!authToken && (
          <Route exact path="/user/register" component={Register} />
        )}

        {!authToken && <Route exact path="/user/login" component={Login} />}

        {!authToken && (
          <Route exact path="/user/reset-password" component={Reset} />
        )}

        {viewReducer === "RESULTS" && (
          <Route exact path="/results" component={Results} />
        )}

        {/* Public paths */}
        <Route path="/user/login">
          {viewReducer === "REGISTER" && <Redirect to="/user/register" />}
        </Route>

        <Route path="/user/login">
          {viewReducer === "RESET" && <Redirect to="/user/reset-password" />}
        </Route>

        <Route path="/reset-password">
          {viewReducer === "LOGIN" && <Redirect to="/user/login" />}
        </Route>

        {/* Private paths */}
        {authToken && viewReducer !== "RESULTS" && <Search />}
        <Route path="/search">
          {viewReducer === "RESULTS" && <Redirect to="/results" />}
        </Route>

        {/* Redirect paths */}
        <Route path="/">{authToken && <Redirect to="/search" />}</Route>
        <Route path="/">{!authToken && <Redirect to="/user/login" />}</Route>
        <Route path="/">
          {viewReducer === "LOGIN" && <Redirect to="/user/login" />}
        </Route>
      </Router>
    </>
  );
}

export default App;
