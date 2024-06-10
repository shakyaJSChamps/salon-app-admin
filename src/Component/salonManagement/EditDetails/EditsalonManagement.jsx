import React from 'react'
import { Col, Row } from 'react-bootstrap';
import BankDetails from '../EditDetails/bankDetails/BankDetails.jsx';
import SalonTime from '../EditDetails/salonTime/SalonTime.jsx';
import { salonDetails } from '../../../api/account.api';
import { useEffect, useState } from 'react'
import SalonGallery from '../salonGallery/SalonGallery.jsx';
import Services from '../Services/Services.jsx';
import VerifyPublishButton from '../verifyPublishButton/VerifyPublishButton.jsx';
import Appointments from '../EditDetails/appointments/Appointments.jsx';
import  SalonDetails from "../EditDetails/salonDetails/SalonDetails.jsx"
import Qrcode from './qrCode/Qrcode.jsx';

function EditsalonManagement({ payload, id, onServicesChange }) {
  const [salonDetail, setSalonDetail] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [gallaryImages, setGallaryImages] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const [service, setService] = useState([]);


  const fetchSalonDetailData = async () => {
    try {
      const data = await salonDetails(payload, id);
      setSalonDetail(data?.data?.data?.salon);
      setBankDetails(data?.data?.data?.bankDetail);
      setBannerImages(data?.data?.data?.bannerImages);
      setGallaryImages(data?.data?.data?.galleryImages);
      setWorkingHours(data?.data?.data?.workingHours);
      setService(data?.data?.data?.services);
      console.log("All Salon Data -> ", data);
    } catch (error) {
      console.error('Error fetching salon details:', error);
    }
  };

  useEffect(() => {
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
          <Services service={service}
            salonDetail={salonDetail}
            fetchSalonDetailData={fetchSalonDetailData}
          />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <SalonTime workingHours={workingHours} salonDetail={salonDetail} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <BankDetails bankDetails={bankDetails} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} >
          <SalonGallery
            salonDetail={salonDetail}
            bannerImages={bannerImages}
            gallaryImages={gallaryImages}
          />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <Appointments salonDetail={salonDetail} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <Qrcode salonDetail={salonDetail} />
        </Col>
        <hr />
      </Row>


      <Row>
        <Col md={12}>
          <VerifyPublishButton salonDetail={salonDetail} />
        </Col>
      </Row>

    </div>
  )
}

export default EditsalonManagement
