import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import user from "../assets/image/user.png";
import salons from "../assets/image/salons.png";
import booking from "../assets/image/booking.png";
import cancelled from "../assets/image/cancelled.png";
import email from "../assets/image/email.png";
import CountUp from 'react-countup';
import { salonCount, userCount } from "../api/account.api";
import { useEffect, useState } from "react";



const Dashboard = () => {

  const [userCountData, setUserCountData] = useState(null);
  // const [salonCountData, setSalonCountData] = useState(null);

  const getUserCount = async () => {
    try {
      const response = await userCount();
      setUserCountData(response.data.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  // const getSalonCount = async () => {
  //   try {
  //     const response = await salonCount();
  //     console.log("Salon count",response);
  //     setSalonCountData(response.data.data.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getUserCount();
    // getSalonCount();
  }, []);

  const uData = [2000, 3000, 3200];
  const vData = [3200, 4000, 3200];

  const data = [
    {
      id: 1,
      imageSrc: user,
      title: "Total User",
      value: <CountUp start={0} end={userCountData} duration={5} />,
      color: "red",
    },
    {
      id: 2,
      imageSrc: salons,
      title: "Total Salons",
      value: <CountUp start={0} end={325} duration={5} />,
      color: "green",
    },
  ];

  const data1 = [
    {
      id: 1,
      imageSrc: booking,
      title: "Total Completed Booking",
      value: <CountUp start={0} end={4856} duration={5} />,
      color: "green",
    },
    {
      id: 2,
      imageSrc: cancelled,
      title: "Total Cancelled Booking",
      value: <CountUp start={0} end={99} duration={5} />,
      color: "red",
    },
    {
      id: 3,
      imageSrc: email,
      title: "Total Upcoming Bookings",
      value: <CountUp start={0} end={451} duration={5} />,
      color: "green",
    },
  ];

  return (
    <>
      <Row className="p-0 m-3">
        <Col lg={5}>
          <Row className="totalTwo-counts">
            {data1.map((item, index) => (
              <Col key={item.id} lg={12} className="mb-3">
                <Paper className={`total-paper ${index === 0 ? 'extra-padding' : ''} ${index === 2 ? 'extra-padding' : ''}`}>
                  <Row>
                    <Col lg={4}>
                      <img src={item.imageSrc} alt={item.title} className="user-image" />
                    </Col>
                    <Col lg={4}>
                      <h5>{item.title}</h5>
                    </Col>
                    <Col lg={4}>
                      <h6>{item.value}</h6>
                    </Col>
                  </Row>
                </Paper>
              </Col>
            ))}
          </Row>
          <Row className="totalOne-counts">
            {data.map((item, index) => (
              <Col key={item.id} lg={12} className="mb-3">
                <Paper className={`paperOne ${index === 0 ? 'first-paper' : ''} ${index === 1 ? 'second-paper' : ''}`}>
                  <Row>
                    <Col lg={4}>
                      <img src={item.imageSrc} alt={item.title} className="user-image" />
                    </Col>
                    <Col lg={4}>
                      <div className="total">
                        <div><h5>{item.title}</h5></div>
                      </div>
                    </Col>

                    <Col lg={4}>
                      <div>
                        <div className="mt-4"><h6>{item.value}</h6></div>
                      </div>
                    </Col>
                  </Row>
                </Paper>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={5}>
          <Paper className="booking-graph">
            <h4 className="text-center py-2">Bookings</h4>
            <PieChart
              className="booking"
              data={[
                { value: 13, color: "#000000" },
                { value: 5, color: "#D9D9D9" },
                { value: 2, color: "#6F6B7D" },
              ]}
              radius={30}
              lineWidth={40}
              startAngle={-1}
              lengthAngle={360}
              animate
              cx={150}
              cy={150}
            />
            <div className="d-flex justify-content-center align-items-center">
              <ul className="booking-list">
                <li >Upcoming Bookings</li>
                <li>Completed Bookings</li>
                <li>Cancelled Bookings</li>
              </ul>
            </div>
          </Paper>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
