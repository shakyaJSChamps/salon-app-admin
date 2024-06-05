import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CouponDetails from "../Component/CouponMan/CouponDetails";
import AddCoupon from "../Component/CouponMan/AddCoupon";
import { getCouponManagement } from "../api/account.api";
import Notify from "../utils/notify";

const CouponManagement = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponData, setCouponData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState("name");

  const fetchCoupons = async (pageNumber = 1) => {
    console.log("  ::", pageNumber);
    // let REQ_URL = `?name=${searchText}`;
    let REQ_URL;
    if (option === "name") {
      REQ_URL = `?name=${searchText}`;
    } else if (option === "date"){
      REQ_URL = `?date=${searchText}`
    }
    console.log("Coupon Search url ::", REQ_URL);
    try {
      const response = await getCouponManagement( REQ_URL);
      console.log("ALL Coupon Management ::>", response);
      const couponData = response.data.data.items;
      console.log("coupon Data ::", couponData);
      setCouponData(couponData || []);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleSearchChange = (searchText) => {
    console.log("Search called ::>", searchText);
    setSearchText(searchText);
  };

  useEffect(() => {
    fetchCoupons(); // Fetch coupons on initial render
    console.log("called ::>", searchText);
  }, [searchText]);

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleCouponSaved = (savedCoupon) => {
    setCouponData((prevCouponData) => {
      if (selectedCoupon) {
        // Update the existing coupon
        return prevCouponData.map((coupon) =>
          coupon.ID === savedCoupon.ID ? savedCoupon : coupon
        );
      } else {
        // Add new coupon
        return [savedCoupon, ...prevCouponData];
      }
    });
    setSelectedCoupon(null); // Reset selected coupon after save
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <AddCoupon
            selectedCoupon={selectedCoupon}
            onCouponSaved={handleCouponSaved}
            setSelectedCoupon={setSelectedCoupon} 
          />
        </Col>
        <Col md={8}>
          <CouponDetails
            onEditCoupon={handleEditCoupon}
            couponData={couponData}
            searchByText={handleSearchChange}
            setOption={setOption}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CouponManagement;
