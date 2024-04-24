// SalesCreate.jsx
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SalesDetails from "../salesManagement/salesEditDetails/salesDetails/SaleDetail";
import SalesBankDetails from "../salesManagement/salesEditDetails/salesbankDetails/SalesBankDetails";
import SalesOwnerDetails from "../salesManagement/salesEditDetails/salesOwnerDetails/SalesOwnerDetails";
import SaleTime from "./salesEditDetails/SaleTime/SaleTime";

const SalesCreate = ({ salesPersonData }) => {
  console.log("SalesPersonData ::", salesPersonData);
  const [bankDetailsData, setBankDetailsData] = useState({
    accountNumber: "1234567890",
    accountHolderName: "John Doe",
    bankName: "XYZ Bank",
    ifscCode: "ABC123456",
  });

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
            <SaleTime />
          </Col>
          <hr />
        </Row>
      </Container>
    </div>
  );
};

export default SalesCreate;
