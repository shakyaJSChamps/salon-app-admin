import React from "react";
import Dlogo from "../assets/image/d-logo.png";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

function ForgetPassword() {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email"),
  });

  const { values,errors,
    handleBlur,
    handleChange,
    handleSubmit,touched} = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Values ::>", values);
    },
  });

  return (
    <>
      <Container className="p-0">
        <Row className=" m-0 p-0">
          <Col sm={8} className="p-0 mt-4">
            <img className="d-logo " src={Dlogo} type="d-logo.png" />
          </Col>
          <Col
            sm={4}
            className="p-0 d-flex justify-content-center align-items-center mt-4"
          >
            <h6 className="sign-account back-sign">
              <Link to="/user/login" className="link-style">
                Back to Sign In
              </Link>
            </h6>
          </Col>
          <Col className="p-0 mt-3">
            <h1 className="for-password">
              Forgot <br />
              Password
            </h1>
          </Col>
        </Row>
      </Container>
      <div className="main-form d-flex justify-content-center align-items-center">
        <form className="form mt-3 mb-2" onSubmit={handleSubmit}>
          <label className="text Forget_text  ">
            Enter your registered email address for the <br />
            verification to get the 4 digits code.
            <br />
            <br />
            <input className="input mt-3" name="email" placeholder="EMAIL ADDRESS" id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur} />
               {errors.email && touched.email ? (
                <>
                <br />
                <span className="invalid-feedback text-danger small">{errors.email}</span>
                </>
            ) : null}
          </label>
          <div className=" mt-4">
            <button className=" Forget_btn" type="button">
              <Link
                className="continue-link link-style"
                to="/user/verification"
              >
                CONTINUE
              </Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
