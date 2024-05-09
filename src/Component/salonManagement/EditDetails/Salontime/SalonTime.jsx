import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Switch } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import styles from '../Salontime/Salontime.module.css';
import { updateSalonTime } from '../../../../api/account.api';
import Notify from '../../../../utils/notify';

function SalonTime({ workingHours, salonDetail }) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const updateDetails = async (values) => {
        try {
            // Ensure workingHours is not null or undefined
            if (!workingHours) {
                throw new Error("workingHours is null or undefined");
            }

            // Prepare updated data
            const updatedData = daysOfWeek.map((day, index) => ({
                day,
                isOpen: values[`isOpen${index}`],
                openTime: values[`openTime${index}`],
                closeTime: values[`closeTime${index}`]
            }));

            // Call API to update salon time
            const response = await updateSalonTime(updatedData, salonDetail.id);
            Notify.success(response.data.message);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        }
    };

    return (
        <>
            {workingHours ? ( // Check if workingHours is not null or undefined
                <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4>Salon Time</h4>
                        <div className="d-flex justify-content-start align-items-center mb-3">
                            {!isEditing && (
                                <button type="button" className={styles.btn} onClick={handleEditClick}>
                                    Edit
                                </button>
                            )}
                            {isEditing && (
                                <button type="submit" form="salonTime" className={styles.btn}>
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            ...daysOfWeek.reduce((acc, day, index) => {
                                const hour = workingHours.find(h => h.day === day);
                                acc[`isOpen${index}`] = hour ? hour.isOpen : false;
                                acc[`openTime${index}`] = hour ? hour.openTime : '';
                                acc[`closeTime${index}`] = hour ? hour.closeTime : '';
                                return acc;
                            }, {})
                        }}
                        onSubmit={updateDetails}
                        enableReinitialize
                    >
                        {({ handleChange, values, setFieldValue}) => (
                            <Form id="salonTime">
                                <Grid container spacing={2} className='mb-3'>
                                    <Grid item xs={2}>
                                        <label className={styles.label}>Day</label>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <label className={styles.label}>Opening Time</label>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <label className={styles.label}>Closing Time</label>
                                    </Grid>
                                </Grid>

                                {daysOfWeek.map((day, index) => (
                                    <Grid container spacing={2} key={index} className='mb-3'>
                                        <Grid item xs={2}>
                                            <p className={styles.day}>{day}</p>
                                        </Grid>

                                        <Grid item xs={3} className='mt-4'>
                                            <Field
                                                type="text"
                                                id={`openTime${index}`}
                                                name={`openTime${index}`}
                                                placeholder="Enter Time"
                                                component={InputText}
                                                value={values[`openTime${index}`]}
                                                className="form-control input"
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={3} className='mt-4'>
                                            <Field
                                                type="text"
                                                id={`closeTime${index}`}
                                                name={`closeTime${index}`}
                                                component={InputText}
                                                placeholder="Enter Time"
                                                value={values[`closeTime${index}`]}
                                                className="form-control input"
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={2} className="d-flex justify-content-center align-items-center mt-3 flex-column">
                                            <div>
                                                {values[`isOpen${index}`] ? 'Open' : 'Close'}
                                            </div>
                                            <Switch
                                                checked={values[`isOpen${index}`]}
                                                onChange={(event) => {
                                                    setFieldValue(`isOpen${index}`, event.target.checked);
                                                }}
                                                color="default"
                                                inputProps={{ 'aria-label': 'Toggle' }}
                                                disabled={!isEditing}
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : (
                <div>
                    <p>Error: workingHours is null or undefined.</p>
                    <p>Please ensure that workingHours is properly initialized.</p>
                </div>
            )}
        </>
    );
}

export default SalonTime;
