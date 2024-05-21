import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import styles from "../../salesManagement/Salescreate/Salescreate.module.css"
import Notify from "../../../utils/notify.js";
import InputText from "../../common-component/Inputtext/InputText.jsx";
import { addSalesDetails } from "../../../api/account.api.js";
import ImageUpdate from "../../common-component/Imageupdate/ImageUpdate.jsx";
// import { salesDetailsSchema } from "../../../utils/schema.js";

function SalesCreate() {
  const [updatedImageUrls, setUpdatedImageUrls] = useState({});

  const [saleDetails, setSaleDetails] = useState({
    bankdocumentImageUrl: "",
    panCardImageUrl: "",
    aadharFrontImageUrl: "",
    aadharBackImageUrl: "",
    profileImageUrl: "",
  });

  const addSales = async (values) => {
    try {
      const dataToSend = {
        ...values,
        ...saleDetails, // Include image paths from state
      };
      const res = await addSalesDetails(dataToSend)
      console.log("response:::>", res.data);
      Notify.success(res.data.message);
    } catch (error) {
      Notify.error(error.message);
    }
  };


  const handleImageUpload = (fieldName, imagePath) => {
    setSaleDetails((prevState) => ({
      ...prevState,
      [fieldName]: imagePath,
    }));
    setUpdatedImageUrls((prevState) => ({
      ...prevState,
      [fieldName]: imagePath, // Update the state with the new image URL
    }));
  };

  return (
    <div className={styles.mainDiv}>
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
      // validationSchema={salesDetailsSchema}
      >

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
              <ErrorMessage name="middleName" component="div" className={styles.error} />
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
                max={new Date().toISOString().split("T")[0]}
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
                <option value="">select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Both</option>
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
                onImageUpload={(imagePath) =>
                  handleImageUpload("bankdocumentImageUrl", imagePath)
                }
              />
              <ErrorMessage name="bankdocumentImageUrl" component="div" className={styles.error} />
            </Grid>

            <Grid item xs={4}>
              <label style={{ fontWeight: 500 }}>Pancard</label>
              {updatedImageUrls.panCardImageUrl && (
                <img
                  src={updatedImageUrls.panCardImageUrl}
                  style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                  alt="Pancard"
                />
              )}
              <ImageUpdate
                name="panCardImageUrl"
                buttonName="Add Image"
                inputClassName="form-control input"
                onImageUpload={(imagePath) =>
                  handleImageUpload("panCardImageUrl", imagePath)
                }
              />
              <ErrorMessage name="panCardImageUrl" component="div" className={styles.error} />
            </Grid>

            <Grid item xs={4}>
              <label style={{ fontWeight: 500 }}>Aadhar Front</label>
              {updatedImageUrls.aadharFrontImageUrl && (
                <img
                  src={updatedImageUrls.aadharFrontImageUrl}
                  style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                  alt="Aadhar Front"
                />
              )}
              <ImageUpdate
                name="aadharFrontImageUrl"
                buttonName="Add Image"
                inputClassName="form-control input"
                onImageUpload={(imagePath) =>
                  handleImageUpload("aadharFrontImageUrl", imagePath)
                }
              />
              <ErrorMessage name="aadharFrontImageUrl" component="div" className={styles.error} />
            </Grid>

            <Grid item xs={4}>
              <label style={{ fontWeight: 500 }}>Aadhar Back</label>
              {updatedImageUrls.aadharBackImageUrl && (
                <img
                  src={updatedImageUrls.aadharBackImageUrl}
                  style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                  alt="Aadhar Back"
                />
              )}
              <ImageUpdate
                name="aadharBackImageUrl"
                buttonName="Add Image"
                inputClassName="form-control input"
                onImageUpload={(imagePath) =>
                  handleImageUpload("aadharBackImageUrl", imagePath)
                }
              />
              <ErrorMessage name="aadharBackImageUrl" component="div" className={styles.error} />
            </Grid>

            <Grid item xs={4}>
            <label style={{ fontWeight: 500 }}>Profile Image</label>
              {updatedImageUrls.profileImageUrl && (
                <img
                  src={updatedImageUrls.profileImageUrl}
                  style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                  alt="Profile Image"
                />
              )}
              <ImageUpdate
                name="profileImageUrl"
                buttonName="Add Image"
                inputClassName="form-control input"
                onImageUpload={(imagePath) =>
                  handleImageUpload("profileImageUrl", imagePath)
                }
              />
              <ErrorMessage name="profileImageUrl" component="div" className={styles.error} />
            </Grid>
          </Grid>
        </Form>
      </Formik >
    </div>
  );
}

export default SalesCreate;

