import React from 'react';
import { Row ,Col,Container} from "react-bootstrap";
import CouponDetails from '../Component/CouponMan/CouponDetails';
import NewCoupon from '../Component/CouponMan/NewCoupon';
import { repeatedCouponData } from '../Component/CouponMan/CouponData';
const CouponManagement = () => {
  return (
    <Container>
    <Row>
    <Col md={4} >
      <NewCoupon />
    </Col>
    <Col md={8}>
      <CouponDetails data={repeatedCouponData}/>
    </Col>
  </Row>
  </Container>
  )
};

export default CouponManagement;