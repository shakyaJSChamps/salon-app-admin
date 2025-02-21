import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Grid, Switch, TextField } from '@mui/material';
import styles from './Salontime.module.css';
import { updateSalonTime } from '../../../../api/account.api';
import Notify from '../../../../utils/notify';
import { salonTimeSchema } from '../../../../utils/schema';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; 
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';

function SalonTime({ workingHours, salonDetail, allowEdit, fetchSalonDetailData }) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const updateDetails = async (values) => {
        try {
            const updatedData = daysOfWeek.map((day, index) => ({
                day,
                isOpen: values[`isOpen${index}`],
                openTime: values[`openTime${index}`] ? dayjs(values[`openTime${index}`]).format('hh:mm A') : '',
                closeTime: values[`closeTime${index}`] ? dayjs(values[`closeTime${index}`]).format('hh:mm A') : ''
            }));

            const response = await updateSalonTime(updatedData, salonDetail.id);
            fetchSalonDetailData();
            Notify.success(response.data.message);
            setIsEditing(false);
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        }
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Salon Time</h4>
                {
                    allowEdit ? (
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
                    ) : (
                        null
                    )
                }
            </div>
            <Formik
                initialValues={{
                    ...daysOfWeek.reduce((acc, day, index) => {
                        const hour = workingHours ? workingHours.find(h => h.day === day) : null;
                        acc[`isOpen${index}`] = hour ? hour.isOpen : false;
                        acc[`openTime${index}`] = hour ? dayjs(hour.openTime, 'hh:mm A').format() : null;
                        acc[`closeTime${index}`] = hour ? dayjs(hour.closeTime, 'hh:mm A').format() : null;
                        return acc;
                    }, {})
                }}
                validationSchema={salonTimeSchema}
                onSubmit={updateDetails}
                enableReinitialize
            >
                {({ handleChange, values, setFieldValue }) => (
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker
                                                value={values[`openTime${index}`] ? dayjs(values[`openTime${index}`]) : null}
                                                onChange={(newValue) => setFieldValue(`openTime${index}`, newValue ? newValue.format() : null)}
                                                disabled={!isEditing}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={3} className='mt-4'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker
                                                value={values[`closeTime${index}`] ? dayjs(values[`closeTime${index}`]) : null}
                                                onChange={(newValue) => setFieldValue(`closeTime${index}`, newValue ? newValue.format() : null)}
                                                disabled={!isEditing}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
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
    );
}

export default SalonTime;
