import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AppRoute from "./AppRoute";
import "../src/assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const authToken = useSelector((state) => state.authInfo.token);
  const location = useLocation();

  //If user is already logged in redirect to dashboard
  if (authToken && location.pathname === "/login") {
    return <Navigate to={"/user-management"} />;
  }else if(authToken && location.pathname === "/"){
    return <Navigate to={"/user-management"} />;
  }

  return (
    <>
      <AppRoute authToken={authToken} />
      <ToastContainer />
    </>
  );
}

export default App;
