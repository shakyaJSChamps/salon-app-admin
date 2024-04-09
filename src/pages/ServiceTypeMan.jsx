// ServiceTypeMan.js
import React, { useState } from "react";
import AddServiceType from "../Component/ServiceType/AddServiceType";
import ServiceType from "../Component/ServiceType/ServiceType";
import { Row, Col, Container } from "react-bootstrap";

const ServiceTypeMan = (props) => {
  const [serviceAdded, setServiceAdded] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
  };

  return (
    <Container>
      <Row>
        <Col md={4} className="mt-3">
          <AddServiceType
            setServiceAdded={setServiceAdded}
            selectedRowData={selectedRowData}
          />
        </Col>
        <Col md={8} className="mt-3">
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
