import React from 'react'
import SalonDetails from './Salondetails/SalonDetails'
import { Col, Row } from 'react-bootstrap';
import SalonOwnerDetails from './Salonownerdetails/SalonOwnerDetails';
import BankDetails from './Bankdetails/BankDetails.jsx';
import ManageStaff from './Managestaff/ManageStaff.jsx';
import SalonTime from './Salontime/SalonTime.jsx';
import { salonDetails } from '../../../api/account.api'; 
import { useEffect, useState } from 'react'


function EditsalonManagement({ payload, id }) {
  const [salonDetail, setSalonDetail] = useState([]);
  const [bankDetails, setBankDetails] = useState([]); 

  useEffect(() => {
    const fetchSalonDetailData = async () => {
      try {
        const data = await salonDetails(payload, id); 
        setSalonDetail(data?.data?.data?.salon); 
        setBankDetails(data?.data?.data?.bankDetail);
        console.log(data)
      } catch (error) {
        console.error('Error fetching salon details:', error);
      }
    };
    fetchSalonDetailData();
  }, [id]);

  return (
    <div className='bg-white  p-3 ' style={{ border: '3px solid #eae4e4', borderRadius: '5px' }}>
      <Row>
        <Col md={12} className='mb-3'>
          <SalonDetails salonDetail={salonDetail} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} className='mb-3'>
          <SalonOwnerDetails />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} className='mb-3'>
          <BankDetails bankDetails={bankDetails}/>
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} className='mb-3'>
          <ManageStaff />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} className='mb-3'>
          <SalonTime />
        </Col>
        <hr />
      </Row>

    </div>
  )
}

export default EditsalonManagement
