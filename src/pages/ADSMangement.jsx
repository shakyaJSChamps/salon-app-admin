import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import NewADS from "../Component/ADSType/NewADS";
import ServiceADS from "../Component/ADSType/ServiceADS";
import { getAdsManagement } from "../api/account.api";
import Notify from "../utils/notify";

const AdsManagement = () => {
  const [adsData, setAdsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState("name");

 
  const fetchData = async () => {
    let REQ_URL = `?${option}=${searchText}`;
    try {
      const response = await getAdsManagement(REQ_URL);
      const adsData = response.data.data.items;
      setAdsData(adsData);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleSearchChange = (searchText) => {
    console.log("Search called ::>", searchText);
    setSearchText(searchText);
  };

  const handleEditRow = (row) => {
    setSelectedRow(row);
  };
  const handleAddAd = (newAd) => {
    setAdsData((prevAdsData) => [...prevAdsData, newAd]);
  };
  const handleUpdateAd = (updatedAd) => {
    setAdsData((prevAdsData) =>
      prevAdsData.map((ad) => (ad.id === updatedAd.id ? updatedAd : ad))
    );
    setSelectedRow(null);
  };

  const handleDeleteRow = (id) => {
    setAdsData((prevAdsData) => prevAdsData.filter((ad) => ad.id !== id));
  };

  useEffect(() => {
    fetchData();
    console.log("called ::>", searchText);
  }, [searchText]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <NewADS
            selectedRow={selectedRow}
            onAddAd={handleAddAd}
            onUpdateAd={handleUpdateAd}
            onClearSelectedRow={() => setSelectedRow(null)}
            allowEdit={true}
          />
        </Col>
        <Col md={8}>
          <ServiceADS
            adsData={adsData}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            searchByText={handleSearchChange}
            setOption={setOption}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdsManagement;
