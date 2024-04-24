import React from 'react'
import { GrFormUpload } from "react-icons/gr";
// import { fileUploader } from "../../../../api/account.api";
import { useState, useEffect, useRef } from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "./SalesownerDetails.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import FileUploader from '../../../common-component/Fileuploader/FileUploader'


function SalesOwnerDetails() {

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Sales Owner Details</h4>
      </div>

      <Formik
      // onSubmit={onSubmit}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputText label="First Name" name="firstName" />
            </Grid>

            <Grid item xs={4}>
              <InputText label="Middle Name" name="middleName" />
            </Grid>

            <Grid item xs={4}>
              <InputText label="Last Name" name="LastName" />
            </Grid>

            <Grid item xs={4}>
              <InputText label="Email ID" name="Email" />
            </Grid>

            <Grid item xs={4}>
              <InputText label="Date of Birth" name="dob" type='date' />
            </Grid>

            {/* <Grid item xs={4}>
              <FileUploader label=" Aadhar Front" name="aadharFront" />
            </Grid>

            <Grid item xs={4}>
              <FileUploader label=" Aadhar Back" name="aadharBack" />
            </Grid>

            <Grid item xs={4}>
              <FileUploader label="Pan Card" name="panCard" /> 
  </Grid>*/}

            <Grid item xs={4}>
              <div>
                <label className={`${styles.gender}`}>
                  Gender
                </label><br />
                <Field
                  as="select"
                  name="gender"
                  className={`${styles.inputGender} px-2 form-control input`}
                >
                  <option value="">select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field><br />

                {/* <ErrorMessage name="gender" className={styles.formError} component="div" /> */}
              </div>
            </Grid>
          </Grid>
        </Form>
      </Formik >
    </>
  )
}

export default SalesOwnerDetails;
