import React from 'react'
import { Col, Row } from 'react-bootstrap';
import BankDetails from '../EditDetails/Bankdetails/BankDetails.jsx';
import SalonTime from '../EditDetails/Salontime/SalonTime.jsx';
import { salonDetails } from '../../../api/account.api';
import { useEffect, useState } from 'react'
import Services from '../Services/Services.jsx';
import Appointments from '../EditDetails/Appointments/Appointments.jsx';
import SalonDetails from "./Salondetails/SalonDetails.jsx"
import Qrcode from './qrCode/Qrcode.jsx';
import SalonGallery from '../SalonGallery/SalonGallery.jsx';
import VerifyPublishButton from "../Verifypublishbutton/VerifyPublishButton.jsx";
import Salonownerdetails from './Salonownerdetails/Salonownerdetails.jsx';
import Managestaff from './Managestaff/Managestaff.jsx';
import { IoIosArrowDropleftCircle } from "react-icons/io";

function EditsalonManagement({ payload, id, allowEdit, handleBack }) {
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
    } catch (error) {
      console.error('Error fetching salon details:', error);
    }
  };

  useEffect(() => {
    fetchSalonDetailData();
  }, [id]);

  return (
    <div className='bg-white  p-3 ' style={{ border: '3px solid #eae4e4', borderRadius: '5px' }}>
      {allowEdit ? <IoIosArrowDropleftCircle onClick={handleBack} className='cursor-pointer mb-2 fs-4 mr-1'/>: ""}
      <Row>
        <Col md={12}>
          <Salonownerdetails id={id} allowEdit={true}/>
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} >
          <SalonDetails salonDetail={salonDetail}
            fetchSalonDetailData={fetchSalonDetailData}
            allowEdit={allowEdit} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <Managestaff id={id} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <Services service={service}
            salonDetail={salonDetail}
            fetchSalonDetailData={fetchSalonDetailData}
            allowEdit={allowEdit}
          />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <SalonTime workingHours={workingHours}
            salonDetail={salonDetail}
            allowEdit={allowEdit}
            fetchSalonDetailData={fetchSalonDetailData} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12}>
          <BankDetails bankDetails={bankDetails} allowEdit={allowEdit} />
        </Col>
        <hr />
      </Row>

      <Row>
        <Col md={12} >
          <SalonGallery
            salonDetail={salonDetail}
            bannerImages={bannerImages}
            gallaryImages={gallaryImages}
            allowEdit={allowEdit}
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
