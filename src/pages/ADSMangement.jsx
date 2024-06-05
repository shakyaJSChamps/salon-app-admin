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
    console.log("search text ::>", searchText)
    // let REQ_URL = `?name=${searchText}&city=${searchText}&${option}=${searchText}`;
    let REQ_URL;
    if (option === "name") {
      REQ_URL = `?name=${searchText}`;
    } else if (option === "city") {
      REQ_URL = `?city=${searchText}`;
    }else if (option === "date"){
      REQ_URL = `?date=${searchText}`
    }
    console.log("Search URL:", REQ_URL);
    try {
      const response = await getAdsManagement(REQ_URL);
      console.log("Ads Management Response:", response);
      const adsData = response.data.data.items;
      console.log("Ads Data:", adsData);
      setAdsData(adsData);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  // Function to handle search text change
  const handleSearchChange = (searchText) => {
    console.log("Search called ::>", searchText);
    setSearchText(searchText);
  };

  // Function to handle row selection for edit
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
    setSelectedRow(null); // Clear the selected row after updating
  };

  const handleDeleteRow = (id) => {
    setAdsData((prevAdsData) => prevAdsData.filter((ad) => ad.id !== id));
  };

  // Fetch data on component mount
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
