import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import NewADS from "../Component/ADSType/NewADS";
import ServiceADS from "../Component/ADSType/ServiceADS";
import { getAdsManagement } from "../api/account.api";

const AdsManagement = () => {
  const [adsData, setAdsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditRow = (row) => {
    console.log("Row selected for edit:", row);
    setSelectedRow(row);
  };

  const handleAddAd = (newAd) => {
    setAdsData((prevAdsData) => [...prevAdsData, newAd]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdsManagement();
        console.log("Ads Management Response:", response);
        setAdsData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [adsData]); 
  

  return (
    <Container>
      <Row>
        <Col md={4}>
          <NewADS selectedRow={selectedRow} onAddAd={handleAddAd} />
        </Col>
        <Col md={8}>
          <ServiceADS adsData={adsData} onEditRow={handleEditRow} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdsManagement;
