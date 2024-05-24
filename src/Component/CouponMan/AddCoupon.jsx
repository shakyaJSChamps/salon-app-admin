import React from "react";
import { Paper } from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { MdOutlineConfirmationNumber } from "react-icons/md";
import InputText from '../common-component/Inputtext/InputText';
// import { couponSchema } from "../../utils/schema";
import { addCouponType } from "../../api/account.api";
import Notify from "../../utils/notify";

const AddCoupon = () => {

  const handleSubmit = async (values,{resetForm}) => {
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString();
    };

    const formattedValues = {
      ...values,
      startDate: formatDate(values.startDate),
      endDate: formatDate(values.endDate),
    };

    console.log("ADD Coupon Management ::>", formattedValues);
    try {
      const response = await addCouponType(formattedValues);
      console.log("AddCouponType API Response:", response);
      Notify.success(response.data.message);
      resetForm();
    } catch (error) {
      Notify.error(error.message);
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
            name: "",
            details: "",
            description: "",
            discountDetails: "",
            startDate: "",
            endDate: "",
            imageUrl: "https://example.com/summer-sale-image.jpg",
            createdBy: "admin@example",
            isActive: true,
            isDeleted: false,
          }}
        // validationSchema={couponSchema}
        onSubmit={handleSubmit}
        >
        {() => (
          <Form>
            <div className="d-flex flex-column">
              <InputText label="Coupon Name" type="text" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="d-flex flex-column">
              <InputText label="Coupon Sub Name" type="text" name="details" />
              <ErrorMessage name="details" component="div" className="text-danger" />
            </div>
            <div className="d-flex flex-column">
              <label className="fw-bold">Coupon Description</label>
              <Field as="textarea" className="form-control input" rows="3" cols="25" name="description" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>
            <div className="d-flex flex-column">
              <InputText label="Coupon Discount" type="text" name="discountDetails" />
              <ErrorMessage name="discountDetails" component="div" className="text-danger" />
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
