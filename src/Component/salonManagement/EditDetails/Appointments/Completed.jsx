import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "./Appointments.module.css";
import { MdOutlineFileDownload } from 'react-icons/md';
import Appointmentpopup from '../../../common-component/appointmentPopup/Appointmentpopup';
import Profile from "../../../../assets/image/Profile.webp"
import { formatDate } from '../../../common-component/Formatdate/Formatdate';
import { getUserInvoice, getVendorInvoice } from '../../../../api/account.api';
import Notify from "../../../../utils/notify"

function Completed({ appointmentData, appointments }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [userInvoice, setUserInvoice] = useState([]);
    const [vendorInvoice, setVendorInvoice] = useState([]);

    const handleOpenDrawer = (appointment) => {
        setSelectedAppointment(appointment);
        setDrawerOpen(true);
        fetchInvoice(appointment.id)
        fetchVendorInvoice(appointment.id)
    };

    const handleCloseDrawer = () => setDrawerOpen(false);
    const completedAppointments = appointmentData ? appointmentData.filter(data => data.status === "COMPLETED") : [];

    const fetchInvoice = async (id) => {
        try {
            const res = await getUserInvoice(id);
            setUserInvoice(res.data.data);
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const handleDownloadInvoice = async () => {
        try {
            if (!userInvoice.invoicePath) {
                return;
            }
            const invoicePath = userInvoice.invoicePath;
            console.log("User", invoicePath)
            const link = document.createElement('a');
            link.href = invoicePath;
            link.setAttribute('download', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const fetchVendorInvoice = async (id) => {
        try {
            const res = await getVendorInvoice(id);
            console.log("response", res);
            setVendorInvoice(res.data.data);
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const downloadInvoice = async () => {
        try {
            if (!vendorInvoice.invoicePath) {
                return;
            }
            const invoicePath = vendorInvoice.invoicePath;
            console.log("Vendor", invoicePath)
            const link = document.createElement('a');
            link.href = invoicePath;
            link.setAttribute('download', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            Notify.error(error.message);
        }
    };

    return (
        <div className='d-flex flex-row flex-wrap gap-5'>
            {completedAppointments?.map((data, index) => (
                <Paper elevation={3} style={{ width: "455px" }} key={index} className={styles.paper}>
                    <div className='d-flex justify-content-around align-items-center'>
                        <div>{data.user.profileImageUrl ? (<img src={data.user.profileImageUrl} style={{ height: "85px", width: "85px" }}></img>)
                            : (<img src={Profile} style={{ height: "85px", width: "85px" }}></img>)}

                        </div>

                        <div className={`d-flex flex-column ${styles.data}`}>
                            <span className={styles.firstName}>{data.user.firstName}</span>
                            <span className={styles.startTime}>{data.serviceStartTime}</span>
                            <span className={styles.startTime}>{data.startTime}</span>
                            <span className={styles.date}>{formatDate(data.date)}</span>
                            <span className={styles.startTime}>{data.appointmentId}</span>
                        </div>

                        <div className={`d-flex flex-column justify-content-start align-items-start ${styles.customDiv}`}>
                            <div className={styles.primDiv}>
                                <div>
                                    <div className={styles.completeStatus}>{data.status}</div>
                                </div>

                                <div class>
                                    <Link
                                        className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
                                        onClick={() => handleOpenDrawer(data)}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>


                            <div className=''>
                                <div className='d-flex justify-content-center align-items-center gap-2 cursor-pointer' onClick={() => { downloadInvoice(), fetchVendorInvoice(data.id) }}>
                                    <Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer" style={{ fontSize: "13px" }}>Vendor Invoice</Link>
                                    <MdOutlineFileDownload className="fs-5 " />
                                </div>
                                <br />
                                <div className='d-flex justify-content-center align-items-center gap-2 cursor-pointer' onClick={() => { handleDownloadInvoice(), fetchInvoice(data.id) }}>
                                    {/* <Invoice invoiceData={invoiceData} buttonName="User Invoice" className={styles.link} /> */}
                                    <Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer" style={{ fontSize: "13px" }}>User Invoice</Link>
                                    <MdOutlineFileDownload className="fs-5" />
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
