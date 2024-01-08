import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Dlogo from "../assets/image/d-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const [rememberMe, setRememberMe] = React.useState(false);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log("Value :: ", values);
      setRememberMe(false);
      action.resetForm();
      localStorage.setItem('token', 'myValue');
      navigate("/");
    },
  });
  // console.log("Error ::>", errors);
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
        <form className="form mt-3 mb-2" onSubmit={handleSubmit}>
          <label className="text  mb-3">
            Enter your username or email address
            <br />
            <input
              className="input"
              placeholder="username or email address"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <>
                <br />
                <span className="error text-danger small">{errors.email}</span>
              </>
            ) : null}
          </label>
          <br />
          <label className="text">
            Enter your Password
            <br />
            <input
              className="input"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <>
                <br />
                <span className="error text-danger small">
                  {errors.password}
                </span>
              </>
            ) : null}
          </label>
          <div className="checkbox-main d-flex justify-content-between mt-3 mb-3">
            <div className="checkbox">
              <input
                className="checkbox"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="px-1">Remember me?</label>
            </div>
            <div className="forget-link">
              <Link to={"/user/forget-password"} className="para mt-4">
                Forgot Password
              </Link>
            </div>
          </div>
          <button
            className="button"
            type="submit"
            disabled={
              !isValid ||
              !dirty ||
              values.email === "" ||
              values.password === "" ||
              !rememberMe
            }
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
