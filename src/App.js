import React from 'react';
import {Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRoute from './AppRoute';
import "../src/assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  const authToken = useSelector(state => state.authInfo.token);
  const location = useLocation();

  //If user is already logged in redirect to dashboard
  if(authToken && location.pathname === "/admin/login"){
    return <Navigate to={"/"} />;
  } 

  return (
    <>
    <AppRoute authToken={authToken}/>
    <ToastContainer></ToastContainer>
    </>
      
  );
}

export default App;
