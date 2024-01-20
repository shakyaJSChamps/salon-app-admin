import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dlogo from "../assets/image/DLogo.png";
import OTPInput from "react-otp-input";

function Verification() {
  const [otp, setOtp] = useState(new Array(4).fill(""));


  const handleChange = (element, index) => {
    const enteredValue = element.value;
  
    if (!/^\d+$/.test(enteredValue)) {
      // If the entered value is not a number, do not update the state
      console.log("Invalid input: Please enter numeric values only.");
      return false;
    }
  
    // Use the callback function to log the updated state
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = +enteredValue; // Convert string to number using unary plus
      console.log("Entered Value:", enteredValue);
      console.log("Updated OTP:", newOtp);
      return newOtp;
    });
  
    // focus on the next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  
  useEffect(() => {
    console.log("Updated OTP in useEffect:", JSON.stringify(otp));
  }, [otp]);
  
  console.log("Outside useEffect:", JSON.stringify(otp));
  
  
  
  
  
  
  
  // const handleChange = (element, index) => {
  //   console.log("Element ::>", element);
  //   const enteredValue = element.value;
  
  //   if (!/^\d+$/.test(enteredValue)) {
  //     // If the entered value is not a number, do not update the state
  //     console.log("Invalid input: Please enter numeric values only.");
  //     return false;
  //   }
  
  //   // Use the callback function to log the updated state
  //   setOtp((prevOtp) => {
  //     const newOtp = [...prevOtp];
  //     newOtp[index] = enteredValue;
  //     console.log("Updated OTP:", newOtp);
  //     return newOtp;
  //   });
  
  //   // focus on the next element
  //   if (element.nextSibling) {
  //     element.nextSibling.focus();
  //   }
  // };
  
  // useEffect(() => {
  //   console.log("Updated OTP:", otp);
  // }, [otp]);
  // const handleChange = (element, index) => {
  //   if (isNaN(element.value)) return false;

  //   setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

  //   // focus on next element
  //   if (element.nextSibling) {
  //     element.nextSibling.focus();
  //   }
  // };
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
              <Link to="/login" className="link-style">
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
      <form className="form  w-100">
        <label className="otp-input mt-3 m-auto">
          Enter the 4 digit code that is send on your <br />
          registered email address.
          <br />
        </label>
        <div className="otp-box d-flex justify-content-center  my-3">
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
        <div className="d-flex justify-content-center">
        <button className="forget_btn " type="button">
        <Link className="continue-link link-style" to="/new-password">
          VERIFY
        </Link>
      </button>
        </div>
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