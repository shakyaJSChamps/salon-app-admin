import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Row, Col, Container } from "react-bootstrap";
import ForgetPassword from "./ForgetPassword";
import image from "../assets/image/logo.png";
import Dlogo from "../assets/image/d-logo.png";
import { Link } from "react-router-dom";

function Login() {
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const handleForgetPasswordClick = () => {
    setShowForgetPassword(true);
  };
  return (
    <>
      <Container className="p-0">
        <Row className=" m-0 p-0">
          <Col sm={8} className="p-0 mt-4">
            <p>
              Welcome to{" "}
              <span>
                <img src={Dlogo} alt="dlogo.png" />
              </span>
            </p>
          </Col>
          <Col
            sm={4}
            className="p-0 d-flex justify-content-center align-items-center mt-4"
          >
            <h6 className="sign-account">
              No Account? <br />
              <span className="sign-up">Sign up</span>
            </h6>
          </Col>
          <Col className="p-0 mt-3">
            <h1>Sign in</h1>
          </Col>
        </Row>
      </Container>
      <form className="form">
        <label className="text">
          Enter your username or email address
          <br />
          <input className="input" placeholder="username or email address" />
        </label>
      </form>
      <form className="form">
        <label className="text">
          Enter your Password
          <br />
          <input className="input" placeholder="Password" />
        </label>
      </form>
      <Container className="p-0">
        <Row className=" m-0 p-0">
          <Col sm={6} className="p-0  mt-3">
            <input className="checkbox" type="checkbox" />
            <label className="px-1">Remember me?</label>
          </Col>

          <Col sm={6} className="p-0">
            <Link to={"/user/forget-password"}
              className="para mt-4"
            >
              Forgot Password
            </Link>
          </Col>
        </Row>
      </Container>
      <button className="button" type="button">
        Sign in
      </button>
    </>
  );
}
export default Login;
