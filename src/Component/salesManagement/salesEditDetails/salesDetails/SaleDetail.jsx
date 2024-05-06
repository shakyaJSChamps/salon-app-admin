import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import styles from "./Salesdetails.module.css";

function SalesDetails({selectedSalesPerson,
  createsaleperson,
  email,
  phoneNumber,
  countryCode,
  dob,
  gender,
}) {
  console.log("selectedSalesPerson ::>", selectedSalesPerson);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Sales Details</h4>
      </div>
      <Formik
        initialValues={{
          createsaleperson: createsaleperson || "",
          email: email || "",
          phoneNumber: phoneNumber || "",
          countryCode: countryCode || "",
          dob: dob || "",
          gender: gender || "",
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
                label="Create Sales Person"
                name="createsaleperson"
                type="text"
                // disabled={!isEditing}
                defaultValue={createsaleperson}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Email"
                name="email"
                type="email"
                // disabled={!isEditing}
                defaultValue={email}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Phone Number"
                name="phoneNumber"
                type="text"
                // disabled={!isEditing}
                defaultValue={phoneNumber}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText
                label="Country Code"
                name="countryCode"
                type="number"
                // disabled={!isEditing}
                defaultValue={countryCode}
              />
            </Grid>
            <Grid item xs={3}>
              <InputText label="Date of Birth" name="dob" type='date' />
            </Grid>
            <Grid item xs={3}>
              <div>
                <label className={`${styles.label}`}>Gender</label>
                <br />
                <Field
                  as="select"
                  name="gender"
                  className={`${styles.inputgender} px-2 form-control input`}
                  // disabled={!isEditing}
                >
                  <option value="">select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Both</option>
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
