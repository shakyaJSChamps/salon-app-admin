import React from "react";
import { Paper } from "@mui/material";
import { Form, Formik, ErrorMessage } from 'formik';
import { MdOutlineConfirmationNumber } from "react-icons/md";
import InputText from '../common-component/Inputtext/InputText';
import { couponSchema } from "../../utils/schema";
import { addCouponType } from "../../api/account.api";

const AddCoupon = () => {

  const handleSubmit = async (values) => {
    console.log("ADD Coupon Management ::>", values);
    const payload = {
      name: "",
      details: "",
      description: "",
      discountDetails: "",
      startDate: "",
      endDate: "",
      imageUrl: "", 
      createdBy: "",
      isActive: true,
      isDeleted: false,
    };

    console.log("Payload:", payload);

    try {
      const response = await addCouponType(payload);
      console.log("AddCouponType API Response:", response);
    } catch (error) {
      console.error("AddCouponType API Error:", error);
    }
  };

  return (
    <Paper className="coupon-service-paper px-3 mb-1 h-100">
      <div className="d-flex align-items-center">
        <MdOutlineConfirmationNumber />
        <p className="ps-1 fw-bold mb-0">Create New Coupon</p>
      </div>
      <hr className="mt-4" />
      <div className="coupon-form">
        <Formik
          initialValues={{
            couponName: '',
            couponSubName: '',
            couponDescription: '',
            couponDiscount: '',
            startDate: '',
            endDate: '',
          }}
          validationSchema={couponSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="d-flex flex-column">
                <InputText label="Coupon Name" type="text" name="couponName" />
                <ErrorMessage name="couponName" component="div" className="text-danger" />
              </div>
              <div className="d-flex flex-column">
                <InputText label="Coupon Sub Name" type="text" name="couponSubName" />
                <ErrorMessage name="couponSubName" component="div" className="text-danger" />
              </div>
              <div className="d-flex flex-column">
                <label className="fw-bold">Coupon Description</label>
                <textarea className="form-control input" rows="3" cols="25" name="couponDescription"></textarea>
                <ErrorMessage name="couponDescription" component="div" className="text-danger" />
              </div>
              <div className="d-flex flex-column">
                <InputText label="Coupon Discount" type="text" name="couponDiscount" />
                <ErrorMessage name="couponDiscount" component="div" className="text-danger" />
              </div>
              <div className="d-flex flex-column">
                <InputText label="Start Date" type="date" name="startDate" />
                <ErrorMessage name="startDate" component="div" className="text-danger" />
              </div>
              <div className="d-flex flex-column">
                <InputText label="End Date" type="date" name="endDate" />
                <ErrorMessage name="endDate" component="div" className="text-danger" />
              </div>
              <div className="d-flex justify-content-center coupon-btn mt-1">
                <button type="submit" className="button pt-1">ADD COUPON</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default AddCoupon;
