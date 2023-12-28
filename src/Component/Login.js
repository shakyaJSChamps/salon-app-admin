import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Dlogo from "../assets/image/d-logo.png";
import { Link } from "react-router-dom";

function Login() {
  
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
      <div className="main-form d-flex justify-content-center align-items-center">
        <form className="form mt-3 mb-2">
          <label className="text  mb-3">
            Enter your username or email address
            <br />
            <input className="input" placeholder="username or email address" />
          </label>
          <br />
          <label className="text">
            Enter your Password
            <br />
            <input className="input" placeholder="Password" />
          </label>
          <div className="checkbox-main d-flex justify-content-between mt-3 mb-3">
            <div className="checkbox">
              <input className="checkbox" type="checkbox" />
              <label className="px-1">Remember me?</label>
            </div>
            <div className="forget-link">
              <Link to={"/user/forget-password"} className="para mt-4">
                Forgot Password
              </Link>
            </div>
          </div>
          <button className="button" type="button">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
