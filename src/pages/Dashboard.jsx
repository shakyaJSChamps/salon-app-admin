import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
import user from "../assets/image/user.png";
import salons from "../assets/image/salons.png";
import booking from "../assets/image/booking.png";
import cancel from "../assets/image/cancelled.png";
import email from "../assets/image/email.png";
import CountUp from 'react-countup';
import { appointmentCount, salonCount, userCount } from "../api/account.api";
import { useEffect, useState } from "react";
import ChartComponent from "../Component/Chart/Piechart";

const Dashboard = () => {

  const [userCountData, setUserCountData] = useState(null);
  const [salonCountData, setSalonCountData] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [cancelled, setCancelled] = useState(null);
  const [upcoming, setUpcoming] = useState(null);

  const getUserCount = async () => {
    try {
      const response = await userCount();
      setUserCountData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalonCount = async () => {
    try {
      const response = await salonCount();
      setSalonCountData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentCount = async () => {
    try {
      const response = await appointmentCount();
      setCompleted(response.data.data.COMPLETED);
      setCancelled(response.data.data.CANCELLED);
      setUpcoming(response.data.data.PENDING);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCount();
    getSalonCount();
    getAppointmentCount();
  }, []);


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
      value: <CountUp start={0} end={salonCountData} duration={5} />,
      color: "green",
    },

    {
      id: 3,
      imageSrc: booking,
      title: "Total Completed Booking",
      value: <CountUp start={0} end={completed} duration={5} />,
      color: "green",
    },
    {
      id: 4,
      imageSrc: cancel,
      title: "Total Cancelled Booking",
      value: <CountUp start={0} end={cancelled} duration={5} />,
      color: "red",
    },
    {
      id: 5,
      imageSrc: email,
      title: "Total Upcoming Bookings",
      value: <CountUp start={0} end={upcoming} duration={5} />,
      color: "green",
    },
  ];


  return (
    <>
      <Row className="p-0 m-3">
        <Col lg={5}>
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
        <Col lg={6}>
          <Paper>
            <h4 className="text-center py-2">Bookings</h4>
            <ChartComponent completed={completed} cancelled={cancelled} upcoming={upcoming}/>
          </Paper>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
