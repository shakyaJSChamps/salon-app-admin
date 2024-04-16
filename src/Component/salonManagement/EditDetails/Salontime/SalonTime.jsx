import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Switch } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import styles from '../Salontime/Salontime.module.css';

function SalonTime({ workingHours }) {
    // console.log(workingHours)
    const [hoursData,setHoursData] = useState(workingHours);

    const handleToggle = (index) => {
        const updatedHoursData = [...hoursData];
        updatedHoursData[index].isOpen = !updatedHoursData[index].isOpen;
        setHoursData(updatedHoursData);
    };

    return (
        <div>
            <div className= ' d-flex justify-content-between align-items-center'>
                <h4>Salon Time</h4>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    <button type="submit" className={styles.btn}>
                        Edit
                    </button>
                    <button type="submit" className={styles.btn}>
                        Save
                    </button>
                </div>
            </div>
            <Formik>
                <Form>
                    {workingHours === null ? (
                        <div>No working hours available</div>
                    ) : (
                        workingHours.map((hour, index) => (
                            <Grid container spacing={2} key={hour.id} className='mt-1'>
                                <Grid item xs={3}>
                                    <InputText label="Day" name={`day_${index}`} type="text" value={hour.day} disabled className="form-control input" />
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        type="text"
                                        name={`openingTime_${index}`}
                                        component={InputText}
                                        label="Opening Time"
                                        value={hour.openTime}
                                        className="form-control input"
                                        disabled={!hour.isOpen} // Disable if isOpen is false
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        type="text"
                                        name={`closingTime_${index}`}
                                        component={InputText}
                                        label="Closing Time"
                                        value={hour.closeTime}
                                        className="form-control input"
                                        disabled={!hour.isOpen} // Disable if isOpen is false
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
                        ))
                    )}
                </Form>
            </Formik>
        </div>
    );
}

export default SalonTime;





