import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Dlogo from "../assets/image/DLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { storeToken } from "../features/authInfo";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    touched,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // console.log("Values :: ", values);
      try {
        await validationSchema.validate(values);
        // console.log("Validation passed");
        dispatch(storeToken("daskldjaj"));
        resetForm();
        setRememberMe(false);
        navigate("/dashboard");
      } catch (error) {
        console.error("Validation error:", error.errors);
      }
    },
  });

  return (
    <>
      <Container className="p-0">
        <Row className="m-0 p-0">
          <Col sm={8} className="p-0 mt-4 ">
            <p className="">
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
          <Col className="p-0 mt-3 ">
            <h1 className="">Sign in</h1>
          </Col>
        </Row>
      </Container>
      <div className="main-form d-flex justify-content-center align-items-center">
        <form className="form mt-3 mb-2 w-100" onSubmit={handleSubmit}>
          <label className="text mb-3">
            Enter your username or email address
          </label>
          <input
            className="email-input"
            placeholder="username or email address"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <span className="error text-danger small">{errors.email}</span>
          )}
          <br />
          <label className="text mt-3">
            Enter your Password
          </label>
          <br />
          <input
            className="password-input"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && (
            <span className="error text-danger small">{errors.password}</span>
          )}
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
              <Link to={"/admin/forget-password"} className="para mt-4">
                Forgot Password
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-end">
          <button
            className={`button ${
              !(isValid && dirty && rememberMe) ? "disable" : ""
            }`}
            type="submit"
            disabled={!isValid || !dirty || !rememberMe}
          >
            Sign in
          </button>
          </div>
          {(!isValid || !dirty || !rememberMe) && (
            <div className="error text-danger small mt-2 text-center">
              Please fill in all fields and check the Remember me box.
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Login;
