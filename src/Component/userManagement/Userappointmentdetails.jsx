import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { getAppointmentbyId } from '../../api/account.api';
import { formatDate } from "../common-component/Formatdate/Formatdate.jsx";
import { addDurationToStartTime } from '../common-component/Addtimeduration/Addtimeduration.jsx';
import { FaIndianRupeeSign } from 'react-icons/fa6';

const Userappointmentdetails = ({ open, onClose, selectedAppointment }) => {
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            if (!selectedAppointment || !selectedAppointment.id) return;
            setLoading(true);
            try {
                const response = await getAppointmentbyId(selectedAppointment.id);
                setAppointmentDetails(response.data.data);
            } catch (error) {
                setError('Error fetching appointment details. Please try again later.');
                console.error('Error fetching appointment details:', error);
            }
            setLoading(false);
        };
        if (open) {
            fetchAppointmentDetails();
        }
    }, [selectedAppointment, open]);


    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box sx={{ width: 400, padding: '20px' }}>
                {loading && <CircularProgress />}
                <>
                    {
                        appointmentDetails &&
                        <>
                            <Typography variant="h6" gutterBottom className='fw-bold'>
                                User Details
                            </Typography>
                            <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }} className=''>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Username:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userName}</Typography></Grid>
                                </Grid>
                            </Paper>
                        </>
                    }

                    <Typography variant="h6" gutterBottom className='fw-bold'>
                        Appointment Details
                    </Typography>
                    {appointmentDetails &&
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <Grid container spacing={1}>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Booking Date:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{formatDate(appointmentDetails.date)}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Booking Start Time:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.startTime}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Booking End Time:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{addDurationToStartTime(appointmentDetails.startTime, appointmentDetails.duration)}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment Date:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{formatDate(appointmentDetails.serviceDate)}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment Id:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.appointmentId}</Typography></Grid>
                                {
                                    appointmentDetails.serviceStartTime &&
                                    <>
                                        <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment Start Time:</Typography></Grid>
                                        <Grid item xs={6}><Typography variant="body2">{appointmentDetails.serviceStartTime}</Typography></Grid>
                                    </>
                                }

                                {
                                    appointmentDetails.serviceEndTime &&
                                    <>
                                        <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment End Time:</Typography></Grid>
                                        <Grid item xs={6}><Typography variant="body2">{appointmentDetails.serviceEndTime}</Typography></Grid>
                                    </>
                                }

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment For:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.serviceType}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Duration:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.duration} min</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Home Service:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.homeService ? "Yes" : "No"}</Typography></Grid>

                            </Grid>
                        </Paper>
                    }


                    <Typography variant="h6" gutterBottom className='fw-bold'>
                        Services
                    </Typography>

                    {appointmentDetails && appointmentDetails.services.map((data, index) => (
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }} key={index}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Category:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{data.serviceCategory}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Name:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{data.serviceName}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Price:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2"><FaIndianRupeeSign />{data.servicePrice}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Duration:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{data.serviceDuration} min</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Type:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{data.type}</Typography></Grid>

                            </Grid>
                        </Paper>
                    ))}
                </>
            </Box>
        </Drawer>
    );
};

export default Userappointmentdetails;
