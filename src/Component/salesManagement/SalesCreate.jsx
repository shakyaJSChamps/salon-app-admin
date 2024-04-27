import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SalesDetails from "../salesManagement/salesEditDetails/salesDetails/SaleDetail";
import SalesBankDetails from "../salesManagement/salesEditDetails/salesbankDetails/SalesBankDetails";
import SalesGallery from "../salesManagement/SalesGallery/SalesGallery";
import SalesButton from "./salesButton/salesButton";

const SalesCreate = () => {
  const [bankDetailsData, setBankDetailsData] = useState({
    accountNumber: "",
    accountHolderName: "",
    bankName: "",
    ifscCode: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Logic to save the data
    console.log("Data saved!");
    setIsEditing(false); 
  };

  return (
    <div
      className="bg-white p-3 "
      style={{ border: "3px solid #eae4e4", borderRadius: "5px" }}
    >
      <Container>
        <Row>
          <Col md={12}>
            <SalesButton
              isEditing={isEditing}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <SalesDetails  />
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
            <SalesGallery
              bankDetails={bankDetailsData}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SalesCreate;
