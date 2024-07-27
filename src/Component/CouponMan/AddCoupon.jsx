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
import { format } from "date-fns";
import { formatInputDate } from "../common-component/Formatdate/Formatdate";

const AddCoupon = ({ selectedCoupon, onCouponSaved, setSelectedCoupon, allowEdit }) => {
  const initialFormValues = {
    name: "",
    details: "",
    description: "",
    discountDetails: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    createdBy: "admin@example.com",
    isActive: true,
    isDeleted: false,
  };

  const [initialValues, setInitialValues] = useState(initialFormValues);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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
      setUploadedImageUrl(selectedCoupon.imageUrl || "");
    } else {
      setInitialValues(initialFormValues);
      setUploadedImageUrl("");
    }
  }, [selectedCoupon]);

  const handleSubmit = async (values, { resetForm }) => {
    // const formatDate = (date) => {
    //   const d = new Date(date);
    //   return d.toISOString();
    // };

    const formatPayloadDate = (date) => {
      return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    };

    const formattedValues = {
      ...values,
      startDate: formatPayloadDate(values.startDate),
      endDate: formatPayloadDate(values.endDate),
      imageUrl: uploadedImageUrl,
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
      setSelectedCoupon(null);
      setUploadedImageUrl("");
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const clearForm = () => {
    setSelectedCoupon(null);
    setInitialValues(initialFormValues);
    setUploadedImageUrl("");
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Paper className="coupon-service-paper px-3 mb-1 h-100">
      <div className="d-flex justify-content-start align-items-center">
        <MdOutlineConfirmationNumber className="fs-3" />
        <p className="font ps-1 mb-0">
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
                <label style={{ fontWeight: "500" }}>Coupon Description</label>
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
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("endDate", "");
                  }}
                  min={currentDate}
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
                  min={values.startDate || currentDate}
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex flex-column">
                <label style={{ fontWeight: "500" }}>Coupon Image</label>
                {uploadedImageUrl && (
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={uploadedImageUrl}
                      alt="Coupon"
                      className="mb-2"
                      style={{ width: "300px", height: "150px" }}
                    />
                  </div>
                )}

                <ImageUpdate
                  name="imageUrl"
                  buttonName={selectedCoupon ? "Update Image" : "Add Image"}
                  inputClassName="form-control input"
                  onImageUpload={(url) => {
                    setUploadedImageUrl(url);
                    setFieldValue("imageUrl", url);
                  }}
                  imageUrl={uploadedImageUrl}
                  allowEdit={allowEdit}
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-center coupon-btn">
                <button type="submit" className="button mt-2 mb-2">
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
