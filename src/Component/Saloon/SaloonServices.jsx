import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
const SaloonServices = (props) => {
  return (
    <Col lg={8}>
      <Paper className="services-details">
        <h4 className="services">Services</h4>
        <hr />
        {props.data.map((item) => (
          <p className="service-box" key={item.id}>
            <Row>
              <Col lg={2}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="service-image"
                />
              </Col>
              <Col lg={2}>
                <h4 className="title">{item.title}</h4>
                <p className="para">{item.para}</p>
              </Col>
              <Col lg={4}>
                <h4 className="paraOne">{item.para1}</h4>
              </Col>
              <Col lg={2} className='btn'>
                <p
                  className={item.button === "ACTIVE" ? "active" : "inactive"}>
                  {item.button}
                </p>
              </Col>
              <Col lg={2}>
                <h4 className="price">
                  {item.rs}
                  <br />
                  <span>{item.tax}</span>
                </h4>
              </Col>
            </Row>
          </p>
        ))}
        <hr />
      </Paper>
    </Col>
  );
}

export default SaloonServices;
