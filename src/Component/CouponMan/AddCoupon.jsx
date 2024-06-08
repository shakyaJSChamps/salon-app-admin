import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";
import InputText from "../common-component/Inputtext/InputText";
import { couponSchema } from "../../utils/schema";
import { addCouponType, putCouponType } from "../../api/account.api";
import Notify from "../../utils/notify";
import ImageUpdate from "../common-component/Imageupdate/ImageUpdate";

const AddCoupon = ({ selectedCoupon, onCouponSaved, setSelectedCoupon }) => {
  const initialFormValues = {
    name: "",
    details: "",
    description: "",
    discountDetails: "",
    startDate: "",
    endDate: "",
    imageUrl: "https://example.com/summer-sale-image.jpg",
    createdBy: "admin@example.com",
    isActive: true,
    isDeleted: false,
  };

  const [initialValues, setInitialValues] = useState(initialFormValues);

  useEffect(() => {
    if (selectedCoupon) {
      setInitialValues({
        ...selectedCoupon,
        startDate: selectedCoupon.startDate
          ? new Date(selectedCoupon.startDate).toISOString().split("T")[0]
          : "",
        endDate: selectedCoupon.endDate
          ? new Date(selectedCoupon.endDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setInitialValues(initialFormValues);
    }
  }, [selectedCoupon]);

  const handleSubmit = async (values, { resetForm }) => {
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString();
    };

    const formattedValues = {
      ...values,
      startDate: formatDate(values.startDate),
      endDate: formatDate(values.endDate),
    };

    try {
      let response;
      if (selectedCoupon) {
        response = await putCouponType(formattedValues, selectedCoupon.ID);
      } else {
        response = await addCouponType(formattedValues);
      }
      Notify.success(response.data.message);
      resetForm();
      onCouponSaved(response.data.data);
      setSelectedCoupon(null); // Reset to add mode
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const clearForm = () => {
    setSelectedCoupon(null);
    setInitialValues(initialFormValues);
  };

  return (
    <Paper className="coupon-service-paper px-3 mb-1 h-100">
      <div className="d-flex align-items-center">
        <MdOutlineConfirmationNumber />
        <p className="ps-1 fw-bold mb-0">
          {selectedCoupon ? "Edit Coupon" : "Create New Coupon"}
        </p>
        {selectedCoupon && (
          <BiPlusCircle
            onClick={clearForm}
            className="cursor-pointer ms-auto"
          />
        )}
      </div>
      <hr className="mt-3 mb-0" />
      <div className="coupon-form">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={couponSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              <div className="d-flex flex-column">
                <InputText
                  label="Coupon Name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <InputText
                  label="Coupon Details"
                  type="text"
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <label className="fw-bold">Coupon Description</label>
                <Field
                  as="textarea"
                  className="form-control input"
                  rows="1"
                  cols="25"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <InputText
                  label="Discount Details"
                  type="text"
                  name="discountDetails"
                  value={values.discountDetails}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="discountDetails"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <InputText
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={values.startDate}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <InputText
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={values.endDate}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <label className="fw-bold">Coupon Image</label>
                {selectedCoupon ? (
                  <>
                    <img src={values.imageUrl} alt="Coupon" className="mb-2" />
                    <ImageUpdate
                      name="imageUrl"
                      buttonName="Update Image"
                      inputClassName="form-control input"
                      onImageUpload={(url) => {
                        setFieldValue("imageUrl", url);
                      }}
                      imageUrl={values.imageUrl}
                    />
                    <ErrorMessage
                      name="imageUrl"
                      component="div"
                      className="text-danger"
                    />
                  </>
                ) : (
                  <ImageUpdate
                  name="imageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  onImageUpload={(url) => {
                    setFieldValue("imageUrl", url);
                  }}
                  imageUrl={values.imageUrl}
                  />
                )}
              </div>
              <div className="d-flex justify-content-center coupon-btn">
                <button type="submit" className="button">
                  {selectedCoupon ? "UPDATE COUPON" : "ADD COUPON"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default AddCoupon;