import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CouponDetails from "../Component/CouponMan/CouponDetails";
import AddCoupon from "../Component/CouponMan/AddCoupon";
import { getCouponManagement } from "../api/account.api";

const CouponManagement = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponData, setCouponData] = useState([]);

  const fetchCoupons = async (pageNumber = 1) => {
    try {
      const response = await getCouponManagement(pageNumber);
      console.log("ALL Coupon Management ::>", response);
      setCouponData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching coupon data:", error);
    }
  };

  useEffect(() => {
    fetchCoupons(); // Fetch coupons on initial render
  }, []);

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
          />
        </Col>
        <Col md={8}>
          <CouponDetails
            onEditCoupon={handleEditCoupon}
            couponData={couponData}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CouponManagement;
