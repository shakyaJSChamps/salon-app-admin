import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "./Appointments.module.css";
import Invoice from '../../../common-component/invoice/Invoice';
import { MdOutlineFileDownload } from 'react-icons/md';
import Appointmentpopup from '../../../common-component/appointmentPopup/Appointmentpopup';

function Completed({ appointmentData }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleOpenDrawer = (appointment) => {
        setSelectedAppointment(appointment);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => setDrawerOpen(false);

    const completedAppointments = appointmentData ? appointmentData.filter(data => data.status === "COMPLETED") : [];

    const invoiceData = {
        image: null,
        name: "Aniket Singh",
        address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        phone: "(603) 555-0123",
        email: "tim.jennings@example.com",
        paymentMethod: "Credit Card",
        billName: "Aniket Singh",
        type: "Service",
        tax: "$50",
        amount: "$500",
        total: "$550",
    };

    return (
        <div className='d-flex flex-row flex-wrap gap-5'>
            {completedAppointments.map((data, index) => (
                <Paper elevation={3} style={{ width: "455px" }} key={index} className={styles.paper}>
                    <div className='d-flex justify-content-center align-items-center gap-3'>
                        <div>
                            <img src={data?.user?.profileImageUrl} style={{ height: "79px" }}></img>
                        </div>

                        <div className='d-flex flex-column gap-3'>
                            <span>{data.user.firstName}</span>
                            <span>{data.serviceStartTime}</span>
                            <span>{data.startTime}</span>
                            <span>{data.date}</span>
                        </div>

                        <div className='d-flex flex-column  gap-2'>
                            
                            <div>{data.status}</div>

                            <div>
                                <Link
                                    className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer"
                                    onClick={() => handleOpenDrawer(data)}
                                >
                                    View Details
                                </Link>
                            </div>

                            <div className='mt-2'>
                                <div className='d-flex justify-content-center align-items-center gap-2'>
                                    <Invoice invoiceData={invoiceData} buttonName="Salon Invoice" />
                                    <MdOutlineFileDownload className="fs-5 cursor-pointer" />
                                </div>
                                <br />
                                <div className='d-flex justify-content-center align-items-center gap-2'>
                                    <Invoice invoiceData={invoiceData} buttonName="User Invoice" />
                                    <MdOutlineFileDownload className="fs-5 cursor-pointer" />
                                </div>
                            </div>


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

export default Completed;
