import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import styles from "./Salesdetails.module.css";

function SalesDetails({
  salesPersonName,
  email,
  phoneNumber,
  address,
  gstNumber,
  pincode,
  serviceType,
  state,
}) {
  console.log("SalesDetails props:", {
    salesPersonName,
    email,
    phoneNumber,
    address,
    gstNumber,
    pincode,
    serviceType,
    state,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Sales Details</h4>
      </div>
      <Formik
        initialValues={{
          salesPersonName: salesPersonName || "",
          email: email || "",
          phoneNumber: phoneNumber || "",
          address: address || "",
          gstNumber: gstNumber || "",
          pincode: pincode || "",
          serviceType: serviceType || "",
          state: state || "",
        }}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <InputText
                label="Sales Person Name"
                name="salesPersonName"
                type="text"
                disabled={!isEditing}
                defaultValue={salesPersonName}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Email"
                name="email"
                type="email"
                disabled={!isEditing}
                defaultValue={email}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Phone Number"
                name="phoneNumber"
                type="text"
                disabled={!isEditing}
                defaultValue={phoneNumber}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Address"
                name="address"
                type="text"
                disabled={!isEditing}
                defaultValue={address}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="GST Number"
                name="gstNumber"
                type="text"
                disabled={!isEditing}
                defaultValue={gstNumber}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Pincode"
                name="pincode"
                type="text"
                disabled={!isEditing}
                defaultValue={pincode}
              />
            </Grid>
            <Grid item xs={3}>
              <div>
                <label className={`${styles.label}`}>Service Type</label>
                <br />
                <Field
                  as="select"
                  name="services"
                  className={`${styles.inputService} px-2 form-control input`}
                  disabled={!isEditing}
                >
                  <option value="">select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Both</option>
                </Field>
                <br />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <label className={`${styles.label}`}>State</label>
                <br />
                <Field
                  as="select"
                  name="state"
                  className={`${styles.inputSalon} px-2 form-control input`}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="madhya-pradesh">Madhya Pradesh</option>
                  <option value="andra-pradesh">Andhra Pradesh</option>
                </Field>
                <br />
              </div>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

export default SalesDetails;
