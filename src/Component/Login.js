import React from "react";
import image from "../assets/image/logo.png";
import Paper from "@mui/material/Paper";
import { Row, Col, Container } from "react-bootstrap";
function Login() {
  return (
    <div className="container-fluid">
         <div className="login-form">
      <div className="image ">
        <Container className="login-page">
          <Row>
            <Col md={6} sm={12}>
              <Paper className="paper" elevation={3}>
                <Container>
                  <Row>
                    <Col sm={8}>
                      <h4>
                        Welcome to <span>STYLRAX</span>
                      </h4>
                    </Col>
                    <Col sm={4}>
                      <h6 className="sign-account">
                        No Account? <br />
                        <span className="sign-up">Sign up</span>
                      </h6>
                    </Col>
                    <h1>Sign in</h1>
                  </Row>
                </Container>
                <form className="form">
                  <label className="text">
                    Enter your username or email address
                    <br />
                    <input
                      className="input"
                      placeholder="username or email address"
                    />
                  </label>
                </form>
                <form className="form">
                  <label className="text">
                    Enter your Password
                    <br />
                    <input className="input" placeholder="Password" />
                  </label>
                </form>
                <Container>
                  <Row>
                    <Col sm={6}>
                      <input className="checkbox" type="checkbox" />
                      <label className="px-1">Remember me?</label>
                    </Col>
                    <Col sm={6}>
                      <p className="para">Forgot Password</p>
                    </Col>
                  </Row>
                </Container>
                <button className="button" type="button">
                  Sign in
                </button>
              </Paper>
            </Col>
            <Col md={6} sm={12}>
              <div className="second-section">
                <h1 className="heading">
                  Welcome to <br />
                  <span className="stylrax">
                    <img src={image} alt="logo.png" />
                  </span>
                </h1>
                <div className="second-para">
                  <p>
                    The Best barbers & Salon in this
                    <br />
                    century for your good looks and beauty
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    </div>
  );
}
export default Login;
