import React from 'react'
import { Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Services/Services.module.css";

function Services() {
    return (
        <Formik>
            <Form>
                <div className=' d-flex justify-content-between align-items-center'>
                    <h4>Services</h4>

                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <button type='submit' className={styles.btn}>Edit</button>
                        <button type='submit' className={styles.btn}>Save</button>
                    </div>
                </div>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <label className={styles.label}>
                            Gender
                        </label><br />
                        <Field
                            as="select"
                            name="services"
                            className='px-1 rounded form-control input'
                        // disabled={!isEditing}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Both</option>
                        </Field><br />

                        {/* <ErrorMessage name="services" className={styles.formError} component="div" /> */}
                    </Grid>

                    <Grid item xs={4}>
                        <label className={styles.label}>
                            Service Availability
                        </label><br />
                        <Field
                            as="select"
                            name="services"
                            className='px-1 rounded form-control input'
                        // disabled={!isEditing}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Both</option>
                        </Field><br />

                        {/* <ErrorMessage name="services" className={styles.formError} component="div" /> */}
                    </Grid>

                    <Grid item xs={4}>
                        <label className={styles.label}>
                            Select Category
                        </label><br />
                        <Field
                            as="select"
                            name="services"
                            className='px-1 rounded form-control input'
                        // disabled={!isEditing}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Both</option>
                        </Field><br />

                        {/* <ErrorMessage name="services" className={styles.formError} component="div" /> */}
                    </Grid>

                </Grid>
            </Form>
        </Formik>
    )
}

export default Services
