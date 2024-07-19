import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { getAppointmentDetails } from '../../../api/account.api';
import { formatDate } from '../Formatdate/Formatdate';
import { addDurationToStartTime } from '../Addtimeduration/Addtimeduration';
import { FaIndianRupeeSign } from "react-icons/fa6";

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
                    Salon Details
                </Typography>
                <hr />
                {loading && <CircularProgress />}
                {error && <Typography color="error">{error}</Typography>}
                {appointmentDetails && !loading && (
                    <>
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }} className=''>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Salon Name:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.salon.name}</Typography></Grid>
                            </Grid>
                        </Paper>

                        <Typography variant="h6" gutterBottom className='fw-bold'>
                            Appointment Details
                        </Typography>
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

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment ID:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.appointmentId}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment Start Time:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.serviceStartTime}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Appointment End Time:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.serviceEndTime}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service for:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.serviceType}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Duration:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.duration} min</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Home Service:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.homeService ? 'Yes' : 'No'}</Typography></Grid>


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
                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Category:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.serviceCategory}</Typography></Grid>

                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Name:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.serviceName}</Typography></Grid>

                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Price:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2"><FaIndianRupeeSign />{service.servicePrice}</Typography></Grid>

                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Duration:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.serviceDuration} min</Typography></Grid>

                                    <Grid item xs={6}><Typography variant="body2" className="fw-bold">Service Type:</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="body2">{service.type}</Typography></Grid>

                                </Grid>
                            </Paper>
                        ))}

                        <Typography variant="h6" gutterBottom className='fw-bold'>
                            User Details
                        </Typography>
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Name:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{`${appointmentDetails.userDetails.firstName} ${appointmentDetails.userDetails.middleName} ${appointmentDetails.userDetails.lastName}`}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Phone Number:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userDetails.phoneNumber}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Email:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userDetails.email}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Gender:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userDetails.gender}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">City:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.city}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">State:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.state}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Country:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.country}</Typography></Grid>

                                {
                                    appointmentDetails.homeService ? (
                                        <>
                                            <Grid item xs={6}><Typography variant="body2" className="fw-bold">Street Address:</Typography></Grid>
                                            <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.streetAddress}</Typography></Grid>

                                            <Grid item xs={6}><Typography variant="body2" className="fw-bold">House Number:</Typography></Grid>
                                            <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.houseNo}</Typography></Grid>


                                            <Grid item xs={6}><Typography variant="body2" className="fw-bold">Lankmark:</Typography></Grid>
                                            <Grid item xs={6}><Typography variant="body2">{appointmentDetails.userAddress.houseNo}</Typography></Grid>
                                        </>

                                    ) : (null)

                                }
                            </Grid>
                        </Paper>

                        <Typography variant="h6" gutterBottom className='fw-bold'>
                            Payment Details
                        </Typography>
                        <Paper elevation={2} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <Grid container spacing={1}>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Payment  Status:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.paymentStatus.paymentStatus}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Payment Mode:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.paymentStatus.paymentMode}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Discount:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{appointmentDetails.paymentStatus.discount}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Subtotal:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2"><FaIndianRupeeSign />{appointmentDetails.paymentStatus.subTotal}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="body2" className="fw-bold">Total:</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2"><FaIndianRupeeSign />{appointmentDetails.paymentStatus.total}</Typography></Grid>

                            </Grid>
                        </Paper>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default Appointmentpopup;
