import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dlogo from "../assets/image/d-logo.png";
import OTPInput from "react-otp-input";

function Verification() {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // focus on next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  // console.log("myOtp =", otp);
  return (
    <>
      <Container className="p-0">
        <Row className=" m-0 p-0">
          <Col sm={8} className="p-0 mt-4">
            <img className="d-logo" src={Dlogo} type="d-logo.png" />
          </Col>
          <Col
            sm={4}
            className="p-0 d-flex justify-content-center align-items-center mt-4"
          >
            <h6 className="sign-account back-sign">
              <Link to="/admin/login" className="link-style">
                Back to Sign In
              </Link>
            </h6>
          </Col>
          <Col className="p-0 mt-4">
            <h2 className="for-password">Verification</h2>
          </Col>
        </Row>
      </Container>
      <div className="main-form d-flex justify-content-center align-items-center">
      <form className="form ">
        <label className="otp-input mt-3 m-auto">
          Enter the 4 digit code that is send on your <br />
          registered email address.
          <br />
        </label>
        <div className="d-flex justify-content-between my-3">
        {otp.map((data, index) => {
            return (
              <input
                className="otp-field "
                maxLength={1}
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        {/* <h6 className="v-timer text-center mt-2 text-danger">00:30</h6> */}
        <button className="forget_btn " type="button">
        <Link className="continue-link link-style" to="/">
          VERIFY
        </Link>
      </button>
      <h5 className="resend-text mt-3">
        If you didn’t receive a code!
      </h5>
        {/* <h6 className="resend-otp text-center">Resend</h6> */}
      </form>
      </div>
    </>
  );
}

export default Verification;
