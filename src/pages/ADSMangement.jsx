import React from 'react';
import {Row,Col,Container} from "react-bootstrap";
import NewADS from '../Component/ADSType/NewADS';
import {repeatedADSData} from '../Component/ADSType/ADSData';
import ServiceADS from '../Component/ADSType/ServiceADS';
const ADSMangement = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <NewADS />
        </Col>
        <Col md={8}>
          <ServiceADS data={repeatedADSData}/>
        </Col>
      </Row>
    </Container>
    
  )
};

export default ADSMangement;