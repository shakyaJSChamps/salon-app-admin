import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { doLogin } from "../../api/account.api";
import { storeToken } from "../../features/authInfo";
import { useDispatch } from "react-redux";
import Notify from "../../utils/notify";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/image/DLogo.png";
import { LoginSchema } from "../../utils/schema";

const initialValues = {
  email: "",
  password: "",
};

const App = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const { email, password } = values;
      const res = await doLogin({ email, password });
      // const { authToken: token,  } = res.data.data;
      const token = res.data.data.authToken;
      const userInfo = {
        email: res.data.data.email,
        role: res.data.data.role,
      };
      dispatch(storeToken({ token, userInfo }));
      navigate("/dashboard");
      setSubmitting(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <>
      <Container className="p-0">
        <Row className="m-0 p-0 px-3">
          <Col sm={8} className="p-0 mt-4 ">
            <p className="">
              Welcome to{" "}
              <span>
                <img src={logo} alt="stylrax logo" />
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
          <Col className="p-0 mt-2 ">
            <h1 className="">Sign in</h1>
          </Col>
        </Row>
      </Container>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <div className="main-form ">
            <Form className="d-flex flex-column">
              <div className="form-group px-3 mt-2">
                <label htmlFor="email" className="fw-bold">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  className={`mt-2 form-control input  ${props.touched.email && props.errors.email
                    ? "is-invalid"
                    : ""
                    }`}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group px-3 mt-3">
                <label htmlFor="password" className="mt-3  fw-bold">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className={`mt-2 form-control input ${props.touched.password && props.errors.password
                    ? "is-invalid"
                    : "Password is wrong"
                    }`}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>
              <Link to={"/forget-password"} className="ms-auto link me-3 mt-4">
                Forget Password
              </Link>
              <button
                type="submit"
                className="button  ms-auto mt-4 me-3"
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? <Loader /> : "Submit"}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default App;
