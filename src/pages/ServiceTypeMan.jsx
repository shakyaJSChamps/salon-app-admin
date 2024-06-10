// ServiceTypeMan.js
import React, { useState } from "react";
import AddServiceType from "../Component/serviceType/AddServiceType";
import ServiceType from "../Component/serviceType/ServiceType";
import { Row, Col, Container } from "react-bootstrap";

const ServiceTypeMan = (props) => {
  const [serviceAdded, setServiceAdded] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setIsEditMode(true);
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <AddServiceType
            setServiceAdded={setServiceAdded}
            selectedRowData={selectedRowData}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            onUpdateService={setIsEditMode}
          />
        </Col>
        <Col md={8}>
          <ServiceType
            serviceAdded={serviceAdded}
            setServiceAdded={setServiceAdded}
            onEdit={handleEdit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceTypeMan;
