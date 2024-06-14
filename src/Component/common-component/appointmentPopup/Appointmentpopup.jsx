import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { getAppointmentDetails } from '../../../api/account.api';

const Appointmentpopup = ({ open, onClose, appointment }) => {
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            if (!appointment || !appointment.id) return;
            setLoading(true);
            setError(null);
            try {
                const response = await getAppointmentDetails(appointment.id);
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
    }, [appointment, open]);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box sx={{ width: 400, padding: '20px' }}>
                <Typography variant="h6" gutterBottom className="fw-bold">
                    Appointment Details
                </Typography>
                <hr />
                {loading && <CircularProgress />}
                {error && <Typography color="error">{error}</Typography>}
                {appointmentDetails && !loading && (
                    <>
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <Typography variant="subtitle1" className='fw-bold'>{appointmentDetails.salon.name}</Typography>
                            <Typography variant="body2">Email: {appointmentDetails.salon.email || 'manish@gmail.com'}</Typography>
                        </Paper>

                        <Typography variant="h6" gutterBottom className='fw-bold'>
                            Appointment Details
                        </Typography>
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Date:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{new Date(appointmentDetails.date).toLocaleDateString()}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Time:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{new Date(appointmentDetails.serviceStartTime).toLocaleTimeString()}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Duration:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.duration} minutes</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Home Service:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.homeService ? 'Yes' : 'No'}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment ID:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.appointmentId}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Address:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.salon.address}</Typography></Grid>
                            </Grid>
                        </Paper>

                        <Typography variant="h6" gutterBottom className='fw-bold'>
                            Services
                        </Typography>
                        {appointmentDetails.services.map(service => (
                            <Paper key={service.serviceId} elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Name:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.serviceName}</Typography></Grid>

                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Price:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.servicePrice}</Typography></Grid>

                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Duration:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.serviceDuration}</Typography></Grid>
                                </Grid>
                            </Paper>
                        ))}

                        <Typography variant="h6" gutterBottom className='fw-bold'>
                            User Details
                        </Typography>
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Name:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.houseNo}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Street Address:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.streetAddress}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Landmark:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.landmark}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">City:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.city}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">State:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.state}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Country:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.country}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Pincode:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.pincode}</Typography></Grid>
                            </Grid>
                        </Paper>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default Appointmentpopup;
