import React from 'react'
import SalonDetails from './Salondetails/SalonDetails'
import { Col, Row } from 'react-bootstrap';
import SalonOwnerDetails from './Salonownerdetails/SalonOwnerDetails';

function EditsalonManagement() {
  return (
    <div>
      <Row>
        <Col md={6}>
          <SalonDetails />
        </Col>

        <Col md={6}>
          <SalonOwnerDetails/>
        </Col>
      </Row>
    </div>



  )
}

export default EditsalonManagement
