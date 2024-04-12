import React from 'react'
import { Grid } from '@mui/material';
import styles from "../Managestaff/Managestaff.module.css";
import { Form, Formik, Field, ErrorMessage } from "formik"


function ManageStaff() {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className={styles.manage}>Manage Staff</h4>

                <div className='d-flex justify-content-start align-items-center mb-3'>
                    <button type='submit' className={styles.btn}>Edit</button>
                    <button type='submit' className={styles.btn}>Save</button>
                </div>
            </div>

            <Formik
            // onSubmit={onSubmit}
            >
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div>
                                <label className={styles.label}>Name</label><br />
                                <Field
                                    type='text'
                                    placeholder='Jhon'
                                    name='firstName'
                                    className={`${styles.input} px-1 rounded`}
                                /><br />

                                {/* <ErrorMessage name="firstName" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.label}`}>Mobile Number</label><br />
                                <Field
                                    type='text'
                                    placeholder='Jhon'
                                    name='middleName'
                                    className={`${styles.input} px-1 rounded`}
                                /><br />

                                {/* <ErrorMessage name="middleName" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.label}`}>Category</label><br />
                                <Field
                                    type='text'
                                    placeholder='Jhon'
                                    name='lastName'
                                    className={`${styles.input} px-1 rounded`}
                                /><br />
                                {/* <ErrorMessage name="lastName" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.label}`} > Email ID</label><br />
                                <Field
                                    type='email'
                                    placeholder='Jhon'
                                    name='email'
                                    className={`${styles.input} px-1 rounded`}
                                /><br />

                                {/* <ErrorMessage name="email" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.dob}`}> Date of Birth</label><br />
                                <Field
                                    type='date'
                                    placeholder='Jhon'
                                    name='dob'
                                    className={`${styles.inputDob} px-1 rounded`}
                                /><br />
                                {/* <ErrorMessage name="dob" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.gender}`}>
                                    Gender
                                </label><br />
                                <Field
                                    as="select"
                                    name="gender"
                                    className={`${styles.inputGender} px-1 rounded`}
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

export default ManageStaff
