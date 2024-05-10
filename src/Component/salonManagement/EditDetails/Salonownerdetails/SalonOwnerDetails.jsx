import React from 'react'
import { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "../Salonownerdetails/Salonownerdetails.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import { updateSalonOwner } from '../../../../api/account.api';
import Notify from "../../../../utils/notify";
import { salonOwnerDetailsSchema } from '../../../../utils/schema';



function SalonOwnerDetails({ salonOwner }) {
  // console.log(salonOwner)

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const updateSalon = async (values, { setSubmitting }) => {
    try {
      const response = await updateSalonOwner(values, salonOwner.userId);
      // console.log("salonOwnerDetails ->", response);
      Notify.success(response.data.message);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Salon Owner Details</h4>
        <div className="d-flex justify-content-start align-items-center mb-3">
          {!isEditing && (
            <button type="button" className={styles.btn} onClick={handleEditClick}>
              Edit
            </button>
          )}
          {isEditing && (
            <button type="submit" form="salonOwner" className={styles.btn}>
              Save
            </button>
          )}
        </div>
      </div>

      <Formik
        initialValues={{
          address: salonOwner.address || '',
          dateOfBirth: salonOwner.dateOfBirth || '',
          firstName: salonOwner.firstName || '',
          gender: salonOwner.gender || '',
          lastName: salonOwner.lastName || '',
          middleName: salonOwner.middleName || '',
        }}
        validationSchema={salonOwnerDetailsSchema}
        onSubmit={updateSalon}
        enableReinitialize
      >
        {({ handleChange, values, isSubmitting }) => (
          <Form id="salonOwner">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputText
                  label="First Name"
                  name="firstName"
                  disabled={!isEditing}
                  onChange={handleChange}
                  value={values.firstName}
                />
                <ErrorMessage name="firstName" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Middle Name"
                  name="middleName"
                  disabled={!isEditing}
                  onChange={handleChange}
                  value={values.middleName}
                />
                <ErrorMessage name="middleName" component="div" className={styles.error} />

              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Last Name"
                  name="lastName"
                  disabled={!isEditing}
                  onChange={handleChange}
                  value={values.lastName}
                />
                <ErrorMessage name="lastName" component="div" className={styles.error} />

              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Address"
                  name="address"
                  disabled={!isEditing}
                  onChange={handleChange}
                  value={values.address}
                />
                <ErrorMessage name="address" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <InputText
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  disabled={!isEditing}
                  onChange={handleChange}
                  value={values.dateOfBirth}
                />
                <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
              </Grid>

              <Grid item xs={4}>
                <div>
                  <label className={`${styles.gender}`}>
                    Gender
                  </label><br />
                  <Field
                    as="select"
                    name="gender"
                    className={`${styles.inputGender} px-2 form-control input`}
                    disabled={!isEditing}
                    onChange={handleChange}
                    value={values.gender}
                  >
                    <option value="">{values.gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field><br />

                  <ErrorMessage name="gender" component="div" className={styles.error}/>
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik >
    </>
  )
}

export default SalonOwnerDetails
