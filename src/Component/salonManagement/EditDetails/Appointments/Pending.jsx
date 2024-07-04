import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "./Appointments.module.css";
import Appointmentpopup from '../../../common-component/appointmentPopup/Appointmentpopup';
import Profile from "../../../../assets/image/Profile.webp"

function Pending({ appointmentData, appointments }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const handleOpenDrawer = (appointment) => {
        setSelectedAppointment(appointment);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => setDrawerOpen(false);

    const pendingAppointments = appointmentData ? appointmentData.filter(data => data.status === "PENDING") : [];

    return (
        <div>
            <div className='d-flex flex-row flex-wrap gap-4'>
                {pendingAppointments.map((data, index) => (
                    <Paper elevation={3} style={{ width: "455px" }} key={index} className={styles.paper}>
                        <div className='d-flex justify-content-around align-items-center'>
                            <div>
                                {data?.user?.profileImageUrl ? (
                                    <img src={data?.user?.profileImageUrl} style={{ height: "85px", width: "85px" }} alt="User" />
                                ) : (
                                    <img src={Profile} style={{ height: "85px", width: "85px" }} alt="User" />
                                )}
                            </div>
                            <div>
                                <p className={styles.firstName}>{data.user.firstName}</p>
                                <p className={styles.startTime}>{data.serviceStartTime}</p>
                                <p className={styles.startTime}>{data.serviceType}</p>
                                <p className={styles.date}>{data.date}</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <p className={styles.pendingStatus}>{data.status}</p>
                                <Link
                                    className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
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
        </div>
    );
}

export default Pending;
