import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Salontime/Salontime.module.css";
import { Grid } from '@mui/material';


function SalonTime() {
    return (
        <div>
            <div className={`${styles.gaps} d-flex justify-content-between align-items-center`}>
                <h4 className={styles.dark}>Salon Time</h4>

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
                            <div >
                                <label className={`${styles.label} fw-bold`}> Day</label><br />
                                <Field
                                    type='textarea'
                                    placeholder='Monday'
                                    name='salonName'
                                    className={`${styles.input} px-2 rounded`}
                                /><br />

                                {/* <ErrorMessage name="salonName" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.label} fw-bold`}> Opening Time</label><br />
                                <Field
                                    type='email'
                                    placeholder='10:00 AM'
                                    name='email'
                                    className={`${styles.input} px-1 rounded`}
                                /><br />

                                {/* <ErrorMessage name="email" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4} className='mb-3'>
                            <div>
                                <label className={`${styles.label} fw-bold`}> Closing Time</label><br />
                                <Field
                                    type='text'
                                    placeholder='11:20 PM'
                                    name='gstNumber'
                                    className={`${styles.input} px-1 rounded`}
                                /><br />

                                {/* <ErrorMessage name="gstNumber" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>


                    </Grid>
                </Form >
            </Formik >
        </div>
    )
}

export default SalonTime
