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
                <hr/>
                {loading && <p>Loading...</p>}
                {appointmentDetails && !loading && (
                    <>
                        <div>
                            <p className='fw-bold'>{appointmentDetails.salon.name}</p>
                        </div>

                        <div className=' mt-1'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Email</p>
                                <p>{appointmentDetails.salon.email || 'manish@gmail.com'}</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-start fw-bold fs-5'>Appointments Details</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Date</p>
                                <p>{new Date(appointmentDetails.date).toLocaleDateString()}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Time</p>
                                <p>{new Date(appointmentDetails.serviceStartTime).toLocaleTimeString()}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Duration</p>
                                <p>{appointmentDetails.duration} minutes</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Home Service</p>
                                <p>{appointmentDetails.homeService ? 'Yes' : 'No'}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Appointment ID</p>
                                <p>{appointmentDetails.appointmentId}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Address</p>
                                <p>{appointmentDetails.salon.address}</p>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Total Payment</p>
                                <p>500</p> {/* Assuming total payment is static, replace if dynamic */}
                            </div>
                        </div>

                        <div>
                            <p className='text-start fw-bold fs-5'>Services</p>
                            {appointmentDetails.services.map(service => (
                                <div key={service.serviceId}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className="fw-bold" style={{ fontSize: "14px" }}>Service Name</p>
                                        <p>{service.serviceName}</p>
                                    </div>

                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className="fw-bold" style={{ fontSize: "14px" }}>Service Price</p>
                                        <p>{service.servicePrice}</p>
                                    </div>


                                  
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className='text-start fw-bold fs-5'>User Details</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Name</p>
                                <p>{appointmentDetails.userAddress.houseNo}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Street Address</p>
                                <p>{appointmentDetails.userAddress.streetAddress}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Landmark</p>
                                <p>{appointmentDetails.userAddress.landmark}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>City</p>
                                <p>{appointmentDetails.userAddress.city}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>State</p>
                                <p>{appointmentDetails.userAddress.state}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Country</p>
                                <p>{appointmentDetails.userAddress.country}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Pincode</p>
                                <p>{appointmentDetails.userAddress.pincode}</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-start fw-bold fs-5'>Review</p>
                            <div>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Rating</p>
                                <p>{appointmentDetails.review ? appointmentDetails.review.rating : 'No rating'}</p>
                            </div>
                            <div>
                                <p className="fw-bold" style={{ fontSize: "14px" }}>Review</p>
                                <p>{appointmentDetails.review ? appointmentDetails.review.review : 'No review'}</p>
                            </div>
                        </div>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default Appointmentpopup;
