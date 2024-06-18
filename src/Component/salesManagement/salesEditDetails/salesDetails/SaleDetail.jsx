import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import styles from "./Salesdetails.module.css";
import { addSalesDetails } from "../../../../api/account.api";
import Notify from "../../../../utils/notify";

function SalesDetails() {
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
        accountNumber: "600000000",
        accountHolderName: "RAKesh",
        bankName: "RAKesh SBI",
        ifscCode: "Rakesh12222",
        address: "ALIGAN",
        bankdocumentImageUrl: "https://example.com/bank_documentrakesh.jpg",
        panCardImageUrl: "https://example.com/pan_cardrakesh.jpg",
        aadharFrontImageUrl: "https://example.com/aadhar_frontrakesh.jpg",
        aadharBackImageUrl: "https://example.com/aadhar_backrakesh.jpg",
        profileImageUrl: "https://example.com/profile_picturerakesh.jpg",
      }

      const res = await addSalesDetails(salesData)
      console.log("response:::>", res.data);
      Notify.success(res.data.message);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className={styles.color}>Sales Details</h4>
        <div className="d-flex justify-content-start align-items-center mb-3">
          {!isEditing && (
            <button type="button" className={styles.btn} onClick={handleEditClick}>
              Add
            </button>
          )}
          {isEditing && (
            <button type="submit" form="salesDetails" className={styles.btn}>
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
          }
        }
        onSubmit={addSales}
        // enableReinitialize
      >
        <Form id="salesDetails">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <InputText
                label="First Name"
                name="firstName"
                type="text"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={3}>
              <InputText
                label="Middle Name"
                name="middleName"
                type="text"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={3}>
              <InputText
                label="LastName"
                name="lastName"
                type="text"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={3}>
              <InputText
                label="Email"
                name="email"
                type="email"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Phone Number"
                name="phoneNumber"
                type="text"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Country Code"
                name="countryCode"
                type="text"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="DOB"
                name="dob"
                type="text"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={3}>
              <div>
                <label className={`${styles.label}`}>Gender</label>
                <br />
                <Field
                  as="select"
                  name="gender"
                  className={`${styles.inputgender} px-2 form-control input`}
                  disabled={!isEditing}
                  type="text"
                >
                  <option value="">select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Both</option>
                </Field>
                <br />
              </div>
            </Grid>

            <Grid item xs={4}>
              <InputText
                label="Account Number"
                name="accountNumber"
              // disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="Account Holder Name"
                name="accountHolderName"
              // disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="Bank Name"
                name="bankName"
              // disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="IFSC Code"
                name="ifscCode"
              // disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="Address"
                name="address"
              // disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik >
    </>
  );
}

export default SalesDetails;
