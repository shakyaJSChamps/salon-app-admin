import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SalesDetails from "../salesManagement/salesEditDetails/salesDetails/SaleDetail";
import SalesBankDetails from "../salesManagement/salesEditDetails/salesbankDetails/SalesBankDetails";
import SalesOwnerDetails from "../salesManagement/salesEditDetails/salesOwnerDetails/SalesOwnerDetails";
import SaleTime from "./salesEditDetails/SaleTime/SaleTime";
import SalesService from "./servicesSale/SaleService";
import SalesGallery from "../salesManagement/SalesGallery/SalesGallery";

const SalesCreate = ({ salesPersonData }) => {
  console.log("SalesPersonData ::", salesPersonData);
  const [bankDetailsData, setBankDetailsData] = useState({
    accountNumber: "1234567890",
    accountHolderName: "John Doe",
    bankName: "XYZ Bank",
    ifscCode: "ABC123456",
    documentImageUrl: "url_to_document_image"
  });

  // Sample saleTimes data
  const [saleTimes, setSaleTimes] = useState([
    {
      id: 1,
      day: "Monday",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      isOpen: true,
    },
    // Add more days as needed
  ]);

  // Sample saleService data
  const [saleService, setSaleService] = useState([
    {
      id: 1,
      serviceName: "Service 1",
      duration: "1 hour",
      price: "$50",
      serviceType: "Type 1",
      categoryId: "Category 1",
    },
    // Add more services as needed
  ]);

  // Sample bannerImages and galleryImages data
  const [bannerImages, setBannerImages] = useState([
    "url_to_banner_image_1",
    "url_to_banner_image_2",
    // Add more banner images as needed
  ]);

  const [galleryImages, setGalleryImages] = useState([
    "url_to_gallery_image_1",
    "url_to_gallery_image_2",
    // Add more gallery images as needed
  ]);

  return (
    <div
      className="bg-white p-3 "
      style={{ border: "3px solid #eae4e4", borderRadius: "5px" }}
    >
      <Container>
        <Row>
          <Col md={12}>
            <SalesDetails
              salesPersonName={salesPersonData?.name || ""}
              email={salesPersonData?.email || ""}
              phoneNumber={salesPersonData?.phoneNumber || ""}
              address={salesPersonData?.address || ""}
              gstNumber={salesPersonData?.gstNumber || ""}
              pincode={salesPersonData?.pincode || ""}
              serviceType={salesPersonData?.serviceType || ""}
              state={salesPersonData?.state || ""}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <SalesBankDetails bankDetails={bankDetailsData} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <SalesOwnerDetails />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <SaleTime saleTimes={saleTimes} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <SalesService saleService={saleService} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <SalesGallery
              bannerImages={bannerImages}
              galleryImages={galleryImages}
              bankDetails={bankDetailsData}
            />
          </Col>
        </Row>
        <hr />
      </Container>
    </div>
  );
};

export default SalesCreate;
