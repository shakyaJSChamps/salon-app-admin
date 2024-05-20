import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import NewADS from "../Component/ADSType/NewADS";
import ServiceADS from "../Component/ADSType/ServiceADS";
import { getAdsManagement } from "../api/account.api";

const AdsManagement = () => {
  const [adsData, setAdsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAdsManagement();
      console.log("Ads Management Response:", response);
      setAdsData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditRow = (row) => {
    console.log("Row selected for edit:", row);
    setSelectedRow(row);
  };

  const handleAddAd = (newAd) => {
    setAdsData((prevAdsData) => [...prevAdsData, newAd]);
  };

  const handleUpdateAd = (updatedAd) => {
    setAdsData((prevAdsData) =>
      prevAdsData.map((ad) => (ad.id === updatedAd.id ? updatedAd : ad))
    );
    setSelectedRow(null); // Clear the selected row after updating
  };

  const handleDeleteRow = (id) => {
    setAdsData((prevAdsData) => prevAdsData.filter((ad) => ad.id !== id));
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <NewADS selectedRow={selectedRow} onAddAd={handleAddAd} onUpdateAd={handleUpdateAd} onClearSelectedRow={() => setSelectedRow(null)} />
        </Col>
        <Col md={8}>
          <ServiceADS
            adsData={adsData}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdsManagement;
