import React from 'react'
import SalonDetails from './Salondetails/SalonDetails'
import { Col, Row } from 'react-bootstrap';
import SalonOwnerDetails from './Salonownerdetails/SalonOwnerDetails';
import BankDetails from './Bankdetails/BankDetails.jsx';
import ManageStaff from './Managestaff/ManageStaff.jsx';
import SalonTime from './Salontime/SalonTime.jsx';
import { salonDetails } from '../../../api/account.api';
import { useEffect, useState } from 'react'
import SalonGallery from '../SalonGallery/SalonGallery.jsx';
import Services from '../Services/Services.jsx';


function EditsalonManagement({ payload, id }) {
  const [salonDetail, setSalonDetail] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [gallaryImages, setGallaryImages] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const [service, setService] = useState([]);


  useEffect(() => {
    const fetchSalonDetailData = async () => {
      try {
        const data = await salonDetails(payload, id);
        setSalonDetail(data?.data?.data?.salon);
        setBankDetails(data?.data?.data?.bankDetail);
        setBannerImages(data?.data?.data?.bannerImages);
        setGallaryImages(data?.data?.data?.gallaryImages);
        setWorkingHours(data?.data?.data?.workingHours);
        setService(data?.data?.data?.services);
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
        <Col md={12} >
          <SalonDetails salonDetail={salonDetail} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <SalonOwnerDetails />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <BankDetails bankDetails={bankDetails} />
        </Col>
        <hr />
      </Row>

      {/* <Row>
        <Col md={12}>
          <ManageStaff />
        </Col>
        <hr />
      </Row> */}

      <Row>
        <Col md={12}>
          <SalonTime workingHours={workingHours} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <Services service={service} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} >
          <SalonGallery
            salonDetail={salonDetail}
            bannerImages={bannerImages}
            gallaryImages={gallaryImages}
            bankDetails={bankDetails}
          />
        </Col>
        <hr />
      </Row>

    </div>
  )
}

export default EditsalonManagement
