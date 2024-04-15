import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Salontime/Salontime.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';


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
                            <InputText label="Day" name="day"/>
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Opening Time" name="openingTime" type="time"/>
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Closing Time" name="closingTime" type="time"/>
                        </Grid>

                    </Grid>
                </Form >
            </Formik >
        </div>
    )
}

export default SalonTime
