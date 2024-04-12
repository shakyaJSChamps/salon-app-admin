import React from 'react'
import SalonDetails from './Salondetails/SalonDetails'
import { Col, Row } from 'react-bootstrap';
import SalonOwnerDetails from './Salonownerdetails/SalonOwnerDetails';
import BankDetails from './Bankdetails/BankDetails.jsx';

function EditsalonManagement() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <SalonDetails />
        </Col>
        <hr/>
      </Row>

      <Row>
        <Col md={12}>
          <SalonOwnerDetails/>
        </Col>
        <hr/>
      </Row>

      <Row>
        <Col md={12}>
          <BankDetails/>
        </Col>
        <hr/>
      </Row>

    </div>



  )
}

export default EditsalonManagement
