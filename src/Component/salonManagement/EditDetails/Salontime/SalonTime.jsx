import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Switch } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import styles from '../Salontime/Salontime.module.css';

function SalonTime({ workingHours }) {
    // console.log(workingHours)
    const [hoursData, setHoursData] = useState("");

    const handleToggle = (index) => {
        const updatedHoursData = [...workingHours];
        updatedHoursData[index].isOpen = !updatedHoursData[index].isOpen;
        setHoursData(updatedHoursData);
    };



    return (
        <div>
            <div className=' d-flex justify-content-between align-items-center'>
                <h4>Salon Time</h4>
            </div>
            <Formik>
                    <Form>
                        {workingHours === null ? (
                            <div>No working hours available</div>
                        ) : (
                            <>
                                <label className={styles.label}>Day</label>
                                {workingHours.map((hour, index) => (
                                    <Grid container spacing={2} key={hour.id} className='mb-3'>
                                        <Grid item xs={3}>
                                            {/* <InputText label="Day" name={`day_${index}`} type="text" value={hour.day} disabled className="form-control input" /> */}
                                            <p className={styles.day}>{hour.day}</p>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Field
                                                type="text"
                                                id='openingTime'
                                                name={`openingTime${index}`}
                                                component={InputText}
                                                label="Opening Time"
                                                value={hour.openTime}
                                                className="form-control input"
                                                disabled={!hour.isOpen}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Field
                                                type="text"
                                                id="cloasingTime"
                                                name={`closingTime${index}`}
                                                component={InputText}
                                                label="Closing Time"
                                                value={hour.closeTime}
                                                className="form-control input"
                                                disabled={!hour.isOpen}
                                            />
                                        </Grid>
                                        <Grid item xs={3} className="d-flex justify-content-center align-items-center">
                                            <Switch
                                                checked={hour.isOpen}
                                                onChange={() => handleToggle(index)}
                                                color="default"
                                                inputProps={{ 'aria-label': 'Toggle' }}
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </>


                        )}
                    </Form>
            </Formik>
        </div >
    );
}

export default SalonTime;





