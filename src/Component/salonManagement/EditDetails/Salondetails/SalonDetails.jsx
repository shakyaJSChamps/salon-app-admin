import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Salondetails/Salondetails.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';




function SalonDetails() {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Salon Details</h4>

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
                            <InputText label="Salon Name" name="salonName" type=""text/>
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Email ID" name="email" type="email"/>
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Gst Number" name="gstNumber" type="text"/>
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Address" name="address" type="text"/>
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Salon State PinCode" name="salonStatePincode" type="text"/>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.label}`}>
                                    Salon State
                                </label><br />
                                <Field
                                    as="select"
                                    name="state"
                                    className={`${styles.inputSalon} px-1 rounded form-control input`}
                                >
                                    <option value="">select</option>
                                    <option value="uttar-pradesh">Uttar-Pradesh</option>
                                    <option value="madhya-pradesh">Madhya-Pradesh</option>
                                    <option value="andra-pradesh">Andra-Pradesh</option>
                                </Field><br />

                                {/* <ErrorMessage name="state" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <label className={`${styles.label}`}>
                                    Service For
                                </label><br />
                                <Field
                                    as="select"
                                    name="services"
                                    className={`${styles.inputService} px-1 rounded form-control input`}
                                >
                                    <option value="">select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Field><br />

                                {/* <ErrorMessage name="services" className={styles.formError} component="div" /> */}
                            </div>
                        </Grid>
                    </Grid>
                </Form >
            </Formik >
        </>
    )
}

export default SalonDetails


