import React from "react";
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import user from "../assets/image/user.png";
import salons from "../assets/image/salons.png";
import revenue1 from "../assets/image/revenue1.png";
import booking2 from "../assets/image/booking2.png";
import revenue from "../assets/image/revenue.png";
import running from "../assets/image/running.png";
import email from "../assets/image/email.png";
import totalUser from "../assets/image/totalUser.png";
import booking from "../assets/image/booking.png";
import frame from "../assets/image/frame.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import cancelled from "../assets/image/cancelled.png";

const Dashboard = () => {
  return (
    <Row className="total-counts p-0 m-3">
      <Col lg={3}>
        <Paper className="paper">
          <Row>
            <Col lg={6}>
              <img src={user} alt="user.png" className="user-image" />
            </Col>
            <Col lg={6}>
              <div className="total">
                <h5>Total User</h5>
                <h6>777</h6>
                <p style={{ color: "red", fontSize: "10px" }}>
                  <span>
                    <ArrowDownwardIcon sx={{ fontSize: "15px" }} />
                  </span>
                  25% Decrease
                </p>
              </div>
            </Col>
          </Row>
        </Paper>
      </Col>
      <Col lg={3}>
        <Paper className="paper">
          <Row>
            <Col lg={6}>
              <img src={salons} alt="user.png" className="user-image" />
            </Col>
            <Col lg={6}>
              <div className="total">
                <h5>Total Salons</h5>
                <h6>777</h6>
                <p style={{ color: "green", fontSize: "10px" }}>
                  <span>
                    <ArrowUpwardIcon sx={{ fontSize: "15px" }} />
                  </span>
                  25% Increase
                </p>
              </div>
            </Col>
          </Row>
        </Paper>
      </Col>
      <Col lg={3}>
        <Paper className="paper">
          <Row>
            <Col lg={6}>
              <img src={revenue1} alt="user.png" className="user-image" />
            </Col>
            <Col lg={6}>
              <div className="total">
                <h5>Total Revenue</h5>
                <h6>777</h6>
                <p style={{ color: "green", fontSize: "10px" }}>
                  <span>
                    <ArrowUpwardIcon sx={{ fontSize: "15px" }} />
                  </span>
                  25% Increase
                </p>
              </div>
            </Col>
          </Row>
        </Paper>
      </Col>
      <Col lg={3}>
        <Paper className="paper">
          <Row>
            <Col lg={6}>
              <img src={running} alt="user.png" className="user-image" />
            </Col>
            <Col lg={6}>
              <div className="total">
                <h5>Total freelancer</h5>
                <h6>777</h6>
                <p style={{ color: "green", fontSize: "10px" }}>
                  <span>
                    <ArrowDownwardIcon sx={{ fontSize: "15px" }} />
                  </span>
                  25% Increase
                </p>
              </div>
            </Col>
          </Row>
        </Paper>
      </Col>
      <Row className="total-counts p-0 m-3">
        <Col lg={4}>
          <Paper className="total-paper">
            <Row>
              <Col lg={4}>
                <img src={booking} alt="user.png" className="user-image" />
              </Col>
              <Col lg={4}>
                <h5>
                  Total <br /> Completed Booking
                </h5>
              </Col>
              <Col lg={4}>
                <h6>777</h6>
                <p
                  style={{
                    color: "green",
                    fontSize: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <span>
                    <ArrowUpwardIcon sx={{ fontSize: "12px" }} />
                  </span>
                  25% Increase
                </p>
              </Col>
            </Row>
          </Paper>
        </Col>
        <Col lg={4}>
          <Paper className="total-paper pb-2">
            <Row>
              <Col lg={4}>
                <img src={cancelled} alt="user.png" className="user-image" />
              </Col>
              <Col lg={4}>
                <h5>
                  Total <br /> Cancelled Booking
                </h5>
              </Col>
              <Col lg={4}>
                <h6>777</h6>
                <p style={{ color: "red", fontSize: "10px" }}>
                  <span>
                    <ArrowDownwardIcon sx={{ fontSize: "12px" }} />
                  </span>
                  25% Decrease
                </p>
              </Col>
            </Row>
          </Paper>
        </Col>
        <Col lg={4}>
          <Paper className="total-paper pb-2">
            <Row>
              <Col lg={4}>
                <img src={email} alt="user.png" className="user-image" />
              </Col>
              <Col lg={4}>
                <h5>
                  Total
                  <br /> Upcoming Bookings
                </h5>
              </Col>
              <Col lg={4}>
                <h6>777</h6>
                <p style={{ color: "green", fontSize: "10px" }}>
                  <span>
                    <ArrowUpwardIcon sx={{ fontSize: "12px" }} />
                  </span>
                  25% Increase
                </p>
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
      <Row className="total-counts p-0 m-3">
        <Col lg={3}>
          <Paper className="registeredUser">
            <h4>Total User</h4>
            <p>total registered</p>
            <img src={totalUser} alt="user.png" className="user-image" />
          </Paper>
        </Col>
        <Col lg={3}>
          <Paper className="booking-graph">
            <h4>Bookings</h4>
            <img src={booking2} alt="user.png" className="user-image" />
            <ul className="booking-list">
              <li>Upcoming Bookings</li>
              <li>Completed Bookings</li>
              <li>Cancelled Bookings</li>
            </ul>
          </Paper>
        </Col>
        <Col lg={6}>
          <Paper className="graph-revennue">
            <h4>Total Revenue</h4>
            <h3>777</h3>

            <img src={revenue} alt="user.png" className="user-image" />
            <img src={frame} alt="user.png" className="frame" />
          </Paper>
        </Col>
      </Row>
    </Row>
  );
};

export default Dashboard;