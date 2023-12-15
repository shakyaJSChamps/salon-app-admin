import React from "react";
import image from "../assets/image/logo.png";
import Paper from "@mui/material/Paper";
import { Row, Col, Container } from "react-bootstrap";
function Login() {
  return (
    <div className="stylarx-page">
      <Container fluid>
        <Row className="stylarx-m">
          <Col md={6} sm={12} className="p-0 d-flex justify-content-center align-items-center mt-5 ">
            <Paper className="paper" elevation={3}>
              <Container className="p-0">
                <Row className=" m-0 p-0">
                  <Col sm={8} className="p-0">
                    <h4>
                      Welcome to <span>STYLRAX</span>
                    </h4>
                  </Col>
                  <Col sm={4} className="p-0 d-flex justify-content-center align-itemscenter">
                    <h6 className="sign-account">
                      No Account? <br />
                      <span className="sign-up">Sign up</span>
                    </h6>
                  </Col>
                  <Col className="p-0">
                    <h1>Sign in</h1>
                  </Col>
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
              <Container className="p-0">
                <Row className=" m-0 p-0">
                  <Col sm={6} className="p-0">
                    <input className="checkbox" type="checkbox" />
                    <label className="px-1">Remember me?</label>
                  </Col>
                  <Col sm={6} className="p-0">
                    <p className="para">Forgot Password</p>
                  </Col>
                </Row>
              </Container>
              <button className="button" type="button">
                Sign in
              </button>
            </Paper>
          </Col>
          <Col md={6} sm={12} className="p-0 d-flex justify-content-center align-items-center ">
            <div className="second-section">
              <h1 className="heading">
                Welcome to <br />
              </h1>
              <div className="stylrax">
                <img src={image} alt="logo.png" />
              </div>
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
  );
}
export default Login;
