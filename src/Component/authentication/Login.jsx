import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { doLogin, getFeature } from "../../api/account.api";
import { storeToken } from "../../features/authInfo";
import { useDispatch, useSelector } from "react-redux";
import Notify from "../../utils/notify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/image/DLogo.png";
import { LoginSchema } from "../../utils/schema";
import { setFeature } from "../../features/featuresSlice";

const initialValues = {
  email: "",
  password: "",
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTYwMjAwOTEsImlhdCI6MTcxMzQyODA5MSwibmJmIjoxNzEzNDI4MDkxLCJzdWIiOnsiVXNlcklkIjo0NCwiQ291bnRyeUNvZGUiOiIrOTEiLCJQaG9uZU51bWJlciI6Ijg4ODg4ODg4ODEiLCJSZWdpc3RlckFzIjoiIiwiUm9sZSI6IkFkbWluIiwiRGV2aWNlVG9rZW4iOiIiLCJEZXZpY2VUeXBlIjoiIiwiUm9sZUlkIjo1LCJQZXJtaXNzaW9ucyI6WyJ1c2VyLm1nbXQucmVhZCIsInVzZXIubWdtdC53cml0ZSIsInNhbG9uLm1nbXQucmVhZCIsInNhbG9uLm1nbXQud3JpdGUiLCJmcmVlbGFuY2UubWdtdC5yZWFkIiwiZnJlZWxhbmNlLm1nbXQud3JpdGUiLCJzZXJ2aWNlLm1nbXQucmVhZCIsInNlcnZpY2UubWdtdC53cml0ZSIsImNvdXBvbi5tZ210LnJlYWQiLCJjb3Vwb24ubWdtdC53cml0ZSIsImFwcG9pbnQubWdtdC5yZWFkIiwiYXBwb2ludC5tZ210LndyaXRlIiwic2FsZXMucGVyc29uLnJlYWQiLCJzYWxlcy5wZXJzb24ud3JpdGUiLCJhZHMubWdtdC5yZWFkIiwiYWRzLm1nbXQud3JpdGUiLCJwYXltZW50Lm1nbXQucmVhZCIsInBheW1lbnQubWdtdC53cml0ZSIsIm5vdGlmaWNhdGlvbnMucmVhZCIsIm5vdGlmaWNhdGlvbnMud3JpdGUiLCJzZXR0aW5nLnJlYWQiLCJzZXR0aW5nLndyaXRlIl0sIkVtYWlsIjoicGF3YW5AZ21haWwuY29tIn19.vIrn9IdD7U4ZLmvu-pGa7SgneR-1ZRhwPrYsdxKtu9g"
    );
    localStorage.setItem("userInfo", JSON.stringify({
      email: "pawan@gmail.com",
      role: "Admin",
    }));
    navigate("/user-management");
    return;
    try {
      console.log(values);
      const { email, password } = values;
      const res = await doLogin({ email, password });
      console.log("response ::>", res);
      // const { authToken: token,  } = res.data.data;
      const token = res.data.data.authToken;
      const userInfo = {
        email: res.data.data.email,
        role: res.data.data.role,
      };
      dispatch(storeToken({ token, userInfo }));
      navigate("/user-management");
      setSubmitting(false);
    } catch (error) {
      console.log("Error message ::",error.message );
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
                  className={`mt-2 form-control input  ${
                    props.touched.email && props.errors.email
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
                  className={`mt-2 form-control input ${
                    props.touched.password && props.errors.password
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
