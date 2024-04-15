import React from 'react'
import { Grid } from '@mui/material';
import styles from "../Managestaff/Managestaff.module.css";
import { Form, Formik, Field, ErrorMessage } from "formik"
import InputText from '../../../common-component/Inputtext/InputText';


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
                            <InputText label="Name" name="name" />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Mobile Number" name="mobileNumber" />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Category" name="category" />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Email ID" name="email" />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Date Of Birth" name="Dob" type="date"/>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.gender}`}>
                                    Gender
                                </label><br />
                                <Field
                                    as="select"
                                    name="gender"
                                    className={`${styles.inputGender} px-1 rounded form-control input`}
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
