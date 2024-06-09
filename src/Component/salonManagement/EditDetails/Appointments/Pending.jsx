import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "./Appointments.module.css";
import Appointmentpopup from '../../../common-component/appointmentPopup/Appointmentpopup';

function Pending({ appointmentData }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleOpenDrawer = (appointment) => {
        setSelectedAppointment(appointment);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => setDrawerOpen(false);

    const pendingAppointments = appointmentData ? appointmentData.filter(data => data.status === "PENDING") : [];

    return (
        <div className='d-flex flex-row flex-wrap gap-4'>
            {pendingAppointments.map((data, index) => (
                <Paper elevation={3} style={{ width: "455px" }} key={index} className={styles.paper}>
                    <div className='d-flex justify-content-center align-items-center gap-5'>
                        <div>
                            <img src={data?.user?.profileImageUrl} style={{ height: "79px" }} alt="User" />
                        </div>

                        <div>
                            <p>{data.user.firstName}</p>
                            <p>{data.serviceStartTime}</p>
                            <p>{data.serviceType}</p>
                            <p>{data.date}</p>
                        </div>

                        <div className='d-flex flex-column gap-1'>
                            <p>{data.status}</p>
                            <Link
                                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer"
                                onClick={() => handleOpenDrawer(data)}
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </Paper>
            ))}
            <Appointmentpopup
                open={drawerOpen}
                onClose={handleCloseDrawer}
                appointment={selectedAppointment}
            />
        </div>
    );
}

export default Pending;
