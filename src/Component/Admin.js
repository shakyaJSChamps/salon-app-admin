import React, { Suspense } from "react";
import Paper from "@mui/material/Paper";
import { Row, Col, Container } from "react-bootstrap";
import image from "../assets/image/logo.png";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="login-page">
      <Container fluid>
        <Row className="vh-100">
          <Col
            md={6}
            sm={12}
            className="p-0 d-flex justify-content-center align-items-center  "
          >
            <Paper className="paper px-3" elevation={3}>
              <Suspense fallback={<div>loading ...</div>}>
                <Outlet />
              </Suspense>
            </Paper>
          </Col>
          <Col
            md={6}
            sm={12}
            className="p-0 d-flex justify-content-center align-items-center "
          >
            <div className="second-section">
              <p className="heading">
                Welcome to <br />
              </p>
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
export default Admin;
