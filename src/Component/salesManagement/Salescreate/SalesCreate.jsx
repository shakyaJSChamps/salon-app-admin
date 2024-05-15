import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import styles from "../../salesManagement/Salescreate/Salescreate.module.css"
import Notify from "../../../utils/notify.js";
import InputText from "../../common-component/Inputtext/InputText.jsx";
import { addSalesDetails } from "../../../api/account.api.js";
import { handleOnFileSelect } from "../../common-component/Imageuploader/ImageUploader.jsx";
import SalesImageUploader from "../../common-component/Salesimageuploader/SalesImageUploader.jsx";
import { salesDetailsSchema } from "../../../utils/schema.js";

function SalesCreate() {

  const addSales = async (values) => {
    try {
      const res = await addSalesDetails(values)
      console.log("response:::>", res.data);
      Notify.success(res.data.message);
    } catch (error) {
      Notify.error(error.message);
    }
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
            bankdocumentImageUrl: "",
            panCardImageUrl: "",
            aadharFrontImageUrl: "",
            aadharBackImageUrl: "",
            profileImageUrl: "",
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
                <SalesImageUploader name="bankdocumentImageUrl" buttonName="Upload" label="Passbook/Cancelcheque" onFileSelect={(e) => handleOnFileSelect(e, "bankdocumentImageUrl", setFieldValue)} />
                <ErrorMessage name="bankdocumentImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="panCardImageUrl" buttonName="Upload" label="Pancard" onFileSelect={(e) => handleOnFileSelect(e, "panCardImageUrl", setFieldValue)} />
                <ErrorMessage name="panCardImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="aadharFrontImageUrl" buttonName="Upload" label="Aadhar Front" onFileSelect={(e) => handleOnFileSelect(e, "aadharFrontImageUrl", setFieldValue)} />
                <ErrorMessage name="aadharFrontImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="aadharBackImageUrl" buttonName="Upload" label="Aadhar Back" onFileSelect={(e) => handleOnFileSelect(e, "aadharBackImageUrl", setFieldValue)} />
                <ErrorMessage name="aadharBackImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="profileImageUrl" buttonName="Upload" label="Profile Image" onFileSelect={(e) => handleOnFileSelect(e, "profileImageUrl", setFieldValue)} />
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

