import React from 'react';
import { Row ,Col,Container} from "react-bootstrap";
import CouponDetails from '../Component/CouponMan/CouponDetails';
import { repeatedCouponData } from '../Component/CouponMan/CouponData';
import AddCoupon from '../Component/CouponMan/AddCoupon';
const CouponManagement = () => {
  return (
    <Container>
    <Row>
    <Col md={4}>
      <AddCoupon />
    </Col>
    <Col md={8} >
      <CouponDetails data={repeatedCouponData} />
    </Col>
  </Row>
  </Container>
  )
};

export default CouponManagement;