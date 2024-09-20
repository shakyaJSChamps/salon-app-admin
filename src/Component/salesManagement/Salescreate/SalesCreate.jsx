import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import styles from "../../salesManagement/Salescreate/Salescreate.module.css"
import Notify from "../../../utils/notify.js";
import InputText from "../../common-component/Inputtext/InputText.jsx";
import { addSalesDetails } from "../../../api/account.api.js";
import ImageUpdate from "../../common-component/Imageupdate/ImageUpdate.jsx";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { salesDetailsSchema } from "../../../utils/schema.js";
import { format } from 'date-fns';

function SalesCreate(allowEdit) {
  const [updatedImageUrls, setUpdatedImageUrls] = useState({});

  console.log("Sales Create", allowEdit);
  const [saleDetails, setSaleDetails] = useState({
    bankdocumentImageUrl: "",
    panCardImageUrl: "",
    aadharFrontImageUrl: "",
    aadharBackImageUrl: "",
    profileImageUrl: "",
  });

  const addSales = async (values, { resetForm }) => {
    try {
      const formattedDOB = formatPayloadDate(values.dob);
      const dataToSend = {
        ...values,
        dob: formattedDOB,
        ...saleDetails,
      };
      const res = await addSalesDetails(dataToSend);
      resetForm();
      setSaleDetails({
        bankdocumentImageUrl: "",
        panCardImageUrl: "",
        aadharFrontImageUrl: "",
        aadharBackImageUrl: "",
        profileImageUrl: "",
      });
      setUpdatedImageUrls({
        bankdocumentImageUrl: "",
        panCardImageUrl: "",
        aadharFrontImageUrl: "",
        aadharBackImageUrl: "",
        profileImageUrl: "",
      });
      Notify.success(res.data.message);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleImageUpload = (fieldName, imagePath, setFieldValue) => {
    setSaleDetails((prevState) => ({
      ...prevState,
      [fieldName]: imagePath,
    }));
    setUpdatedImageUrls((prevState) => ({
      ...prevState,
      [fieldName]: imagePath,
    }));
    setFieldValue(fieldName, imagePath);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/sales-person');
  }

  const getMinDOBDate = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()).toISOString().split("T")[0];
  };

  const formatPayloadDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy');
  };

  return (
    <div className={styles.mainDiv}>
      <IoIosArrowDropleftCircle onClick={handleBack} className='cursor-pointer mb-2 fs-4 mr-1' />
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Sales Details</h4>
        <div className="d-flex justify-content-start align-items-center mb-3">
          <button type="submit" form="salesDetails" className={styles.button}>
            save
          </button>
        </div>
      </div>
      <Formik
        initialValues={
          {
            phoneNumber: "",
            countryCode: "",
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            gender: "",
            email: "",
            accountNumber: "",
            accountHolderName: "",
            bankName: "",
            ifscCode: "",
            address: "",
            bankdocumentImageUrl: saleDetails.bankdocumentImageUrl || "",
            panCardImageUrl: saleDetails.panCardImageUrl || "",
            aadharFrontImageUrl: saleDetails.aadharFrontImageUrl || "",
            aadharBackImageUrl: saleDetails.aadharBackImageUrl || "",
            profileImageUrl: saleDetails.profileImageUrl || "",
            upiId: ""
          }
        }
        onSubmit={addSales}
        validationSchema={salesDetailsSchema}
      >

        {({ setFieldValue }) => (
          <Form id="salesDetails">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputText
                  label="First Name"
                  name="firstName"
                  type="text"
                />
                <ErrorMessage name="firstName" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Middle Name"
                  name="middleName"
                  type="text"
                />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="LastName"
                  name="lastName"
                  type="text"
                />
                <ErrorMessage name="lastName" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Email"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  maxLength={10}
                />
                <ErrorMessage name="phoneNumber" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Country Code"
                  name="countryCode"
                  type="text"
                />
                <ErrorMessage name="countryCode" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="DOB"
                  name="dob"
                  type="date"
                  max={getMinDOBDate()}
                />
                <ErrorMessage name="dob" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Gender"
                  as="select"
                  name="gender"
                  className="input"
                  type="text"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </InputText>
                <ErrorMessage name="gender" component="div" className={styles.error} />
              </Grid>
            </Grid>
            <hr />

            <h4 className="color-primary">Bank Details</h4>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputText
                  label="Account Number"
                  name="accountNumber"
                  type="text"
                />
                <ErrorMessage name="accountNumber" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Account Holder Name"
                  name="accountHolderName"
                  type="text"
                />
                <ErrorMessage name="accountHolderName" component="div" className={styles.error} />

              </Grid>
              <Grid item xs={4}>
                <InputText
                  label="Bank Name"
                  name="bankName"
                  type="text"
                />
                <ErrorMessage name="bankName" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="IFSC Code"
                  name="ifscCode"
                  type="text"
                />
                <ErrorMessage name="ifscCode" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="UPI Id"
                  name="upiId"
                  type="text"
                />
                <ErrorMessage name="upiId" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Address"
                  name="address"
                  type="text"
                />
                <ErrorMessage name="address" component="div" className={styles.error} />
              </Grid>
            </Grid>

            <hr />

            <h4>Personal Attachments</h4>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label style={{ fontWeight: 500 }}>CancelCheque/Passbook</label>
                {updatedImageUrls.bankdocumentImageUrl && (
                  <img
                    src={updatedImageUrls.bankdocumentImageUrl}
                    style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                    alt="Bank Document"
                  />
                )}
                <ImageUpdate
                  name="bankdocumentImageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  allowEdit={allowEdit}
                  onImageUpload={(imagePath) =>
                    handleImageUpload("bankdocumentImageUrl", imagePath, setFieldValue)
                  }

                />
                <ErrorMessage name="bankdocumentImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <div className="d-flex flex-column">
                  <label style={{ fontWeight: 500 }}>Pancard</label>
                  {updatedImageUrls.panCardImageUrl && (
                    <img
                      src={updatedImageUrls.panCardImageUrl}
                      style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                      alt="Pancard"
                    />
                  )}
                </div>

                <ImageUpdate
                  name="panCardImageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  allowEdit={allowEdit}
                  onImageUpload={(imagePath) =>
                    handleImageUpload("panCardImageUrl", imagePath, setFieldValue)
                  }

                />
                <ErrorMessage name="panCardImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <div className="d-flex flex-column">
                  <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                  {updatedImageUrls.aadharFrontImageUrl && (
                    <img
                      src={updatedImageUrls.aadharFrontImageUrl}
                      style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                      alt="Aadhar Front"
                    />
                  )}
                </div>

                <ImageUpdate
                  name="aadharFrontImageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  allowEdit={allowEdit}
                  onImageUpload={(imagePath) =>
                    handleImageUpload("aadharFrontImageUrl", imagePath, setFieldValue)
                  }

                />
                <ErrorMessage name="aadharFrontImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <div className="d-flex flex-column">
                  <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                  {updatedImageUrls.aadharBackImageUrl && (
                    <img
                      src={updatedImageUrls.aadharBackImageUrl}
                      style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                      alt="Aadhar Back"
                    />
                  )}
                </div>
                <ImageUpdate
                  name="aadharBackImageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  allowEdit={allowEdit}
                  onImageUpload={(imagePath) =>
                    handleImageUpload("aadharBackImageUrl", imagePath, setFieldValue)
                  }

                />
                <ErrorMessage name="aadharBackImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <div className="d-flex flex-column">
                  <label style={{ fontWeight: 500 }}>Profile Image</label>
                  {updatedImageUrls.profileImageUrl && (
                    <img
                      src={updatedImageUrls.profileImageUrl}
                      style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                      alt="Profile Image"
                    />
                  )}
                </div>
                <ImageUpdate
                  name="profileImageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  allowEdit={allowEdit}
                  onImageUpload={(imagePath) =>
                    handleImageUpload("profileImageUrl", imagePath, setFieldValue)
                  }

                />
                <ErrorMessage name="profileImageUrl" component="div" className={styles.error} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik >
    </div>
  );
}

export default SalesCreate;
