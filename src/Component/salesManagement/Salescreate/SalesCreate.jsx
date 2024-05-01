import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import styles from "../../salesManagement/Salescreate/Salescreate.module.css"
import Notify from "../../../utils/notify.js";
import InputText from "../../common-component/Inputtext/InputText.jsx";
import { addSalesDetails } from "../../../api/account.api.js";
import { handleOnFileSelect } from "../../common-component/Imageuploader/ImageUploader.jsx";
import SalesImageUploader from "../../common-component/Salesimageuploader/SalesImageUploader.jsx";
import { salesDetailsSchema } from "../../../utils/schema.js";

function SalesCreate() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  }

  const addSales = async (values) => {
    try {
      const salesData = {
        phoneNumber: values.phoneNumber,
        countryCode: values.countryCode,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        dob: values.dob,
        gender: values.gender,
        email: values.email,
        accountNumber: values.accountNumber,
        accountHolderName: values.accountHolderName,
        bankName: values.bankName,
        ifscCode: values.ifscCode,
        address: values.address,
        bankdocumentImageUrl: values.bankdocumentImageUrl,
        panCardImageUrl: values.panCardImageUrl,
        aadharFrontImageUrl: values.aadharFrontImageUrl,
        aadharBackImageUrl: values.aadharBackImageUrl,
        profileImageUrl: values.profileImageUrl,
      }

      const res = await addSalesDetails(salesData)
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
          {!isEditing && (
            <button type="button" onClick={handleEditClick} className={styles.button} >
              Add
            </button>
          )}
          {isEditing && (
            <button type="submit" form="salesDetails" className={styles.button}>
              Save
            </button>
          )}
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
          }
        }
        onSubmit={addSales}
        validationSchema={salesDetailsSchema}
      // enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form id="salesDetails">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputText
                  label="First Name"
                  name="firstName"
                  type="text"
                  disabled={!isEditing}
                />
                <ErrorMessage name="firstName" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Middle Name"
                  name="middleName"
                  type="text"
                  disabled={!isEditing}
                />
                <ErrorMessage name="middleName" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="LastName"
                  name="lastName"
                  type="text"
                  disabled={!isEditing}
                />
                <ErrorMessage name="lastName" component="div" className={styles.error} />

              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Email"
                  name="email"
                  type="email"
                  disabled={!isEditing}
                />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  disabled={!isEditing}
                />
                <ErrorMessage name="phoneNumber" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Country Code"
                  name="countryCode"
                  type="text"
                  disabled={!isEditing}
                />
                <ErrorMessage name="countryCode" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="DOB"
                  name="dob"
                  type="text"
                  disabled={!isEditing}
                />
                <ErrorMessage name="dob" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <div>
                  <label>Gender</label>
                  <br />
                  <Field
                    as="select"
                    name="gender"
                    className=" px-2 form-control input"
                    disabled={!isEditing}
                    type="text"
                  >
                    <option value="">select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Both</option>
                  </Field>
                  <br />
                  <ErrorMessage name="gender" component="div" className={styles.error} />
                </div>
              </Grid>
            </Grid>
            <hr />

            <h4 className="color-primary">Bank Details</h4>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputText
                  label="Account Number"
                  name="accountNumber"
                  disabled={!isEditing}
                  type="text"
                />
                <ErrorMessage name="accountNumber" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Account Holder Name"
                  name="accountHolderName"
                  disabled={!isEditing}
                  type="text"
                />
                <ErrorMessage name="accountHolderName" component="div" className={styles.error} />

              </Grid>
              <Grid item xs={4}>
                <InputText
                  label="Bank Name"
                  name="bankName"
                  disabled={!isEditing}
                  type="text"
                />
                <ErrorMessage name="bankName" component="div" className={styles.error} />
              </Grid>
              <Grid item xs={4}>
                <InputText
                  label="IFSC Code"
                  name="ifscCode"
                  disabled={!isEditing}
                  type="text"
                />
                <ErrorMessage name="ifscCode" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Address"
                  name="address"
                  disabled={!isEditing}
                  type="text"
                />
                <ErrorMessage name="address" component="div" className={styles.error} />
              </Grid>
            </Grid>

            <hr />

            <h4>Personal Attachments</h4>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <SalesImageUploader name="bankdocumentImageUrl" label="Passbook/Cancelcheque" onFileSelect={(e) => handleOnFileSelect(e, "bankdocumentImageUrl", setFieldValue)} />
                <ErrorMessage name="bankdocumentImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="panCardImageUrl" label="Pancard" onFileSelect={(e) => handleOnFileSelect(e, "panCardImageUrl", setFieldValue)} />
                <ErrorMessage name="panCardImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="aadharFrontImageUrl" label="Aadhar Front" onFileSelect={(e) => handleOnFileSelect(e, "aadharFrontImageUrl", setFieldValue)} />
                <ErrorMessage name="aadharFrontImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="aadharBackImageUrl" label="Aadhar Back" onFileSelect={(e) => handleOnFileSelect(e, "aadharBackImageUrl", setFieldValue)} />
                <ErrorMessage name="aadharBackImageUrl" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <SalesImageUploader name="profileImageUrl" label="Profile Image" onFileSelect={(e) => handleOnFileSelect(e, "profileImageUrl", setFieldValue)} />
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

