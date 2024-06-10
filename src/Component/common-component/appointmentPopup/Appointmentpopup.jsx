import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getAppointmentDetails } from '../../../api/account.api';

const Appointmentpopup = ({ open, onClose, appointment }) => {
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            if (!appointment || !appointment.id) return;
            setLoading(true);
            try {
                const response = await getAppointmentDetails(appointment.id);
                setAppointmentDetails(response.data.data);
            } catch (error) {
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
                {loading && <p>Loading...</p>}
                {appointmentDetails && !loading && (
                    <>
                        <div>
                            <p className='fw-bold'>{appointmentDetails.salon.name}</p>
                        </div>

                        <div className=' mt-1'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Email</p>
                                <p style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.salon.email || 'manish@gmail.com'}</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-start fw-bold ' style={{ fontSize: "16px" }}>Appointments Details</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Date</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{new Date(appointmentDetails.date).toLocaleDateString()}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Time</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{new Date(appointmentDetails.serviceStartTime).toLocaleTimeString()}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Duration</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.duration} minutes</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Home Service</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.homeService ? 'Yes' : 'No'}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Appointment ID</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.appointmentId}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Address</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.salon.address}</p>
                            </div>
                            <hr />
                        </div>

                        <div>
                            <p className='text-start fw-bold ' style={{ fontSize: "16px" }}>Services</p>
                            {appointmentDetails.services.map(service => (
                                <div key={service.serviceId}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className="fw-bold" style={{ fontSize: "14px" }}>Service Name</p>
                                        <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{service.serviceName}</p>
                                    </div>

                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className="fw-bold" style={{ fontSize: "14px" }}>Service Price</p>
                                        <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{service.servicePrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className='text-start fw-bold ' style={{ fontSize: "16px" }}>User Details</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Name</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.houseNo}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Street Address</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.streetAddress}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Landmark</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.landmark}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>City</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.city}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>State</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.state}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Country</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.country}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Pincode</p>
                                <p className='text-muted' style={{ fontSize: "13px", lineHeight: "1px" }}>{appointmentDetails.userAddress.pincode}</p>
                            </div>
                        </div>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default Appointmentpopup;
