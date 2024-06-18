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

  const fetchCoupons = async () => {
    let REQ_URL = `?${option}=${searchText}`;
    try {
      const response = await getCouponManagement(REQ_URL);
      const couponData = response.data.data.items;
      setCouponData(couponData || []);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    fetchCoupons(); // Fetch coupons on initial render
  }, [searchText, option]);

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleCouponSaved = (savedCoupon) => {
    setCouponData((prevCouponData) => {
      if (selectedCoupon) {
        // Update existing coupon
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
            allowEdit={true}
          />
        </Col>
        <Col md={8}>
          <CouponDetails
            onEditCoupon={handleEditCoupon}
            couponData={couponData}
            searchByText={setSearchText}
            setOption={setOption}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CouponManagement;