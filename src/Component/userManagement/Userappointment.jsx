import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from "../salonManagement/EditDetails/Appointments/Appointments.module.css";
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Userappointmentdetails from './Userappointmentdetails';
import { formatDate } from "../common-component/Formatdate/Formatdate.jsx";
import { MdOutlineFileDownload } from 'react-icons/md';
import { getUserInvoice } from '../../api/account.api.js';
import Notify from "../../utils/notify.js"

function Userappointment({ appointments }) {
    const [activeComponent, setActiveComponent] = useState('Completed');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [userInvoice, setUserInvoice] = useState([]);


    const getButtonClass = (component) => {
        return activeComponent === component ? `${styles.button} ${styles.active}` : styles.button;
    };

    const filteredAppointments = (status) => {
        return Array.isArray(appointments) ? appointments.filter(data => data.status === status) : [];
    };

    const handleOpenDrawer = (appointment) => {
        setDrawerOpen(true);
        setSelectedAppointment(appointment);
    };

    const handleCloseDrawer = () => setDrawerOpen(false);

    const fetchInvoice = async (appointment) => {
        const id = appointment.id;
        try {
            const res = await getUserInvoice(id);
            setUserInvoice(res.data.data);
        } catch (error) {
            Notify.error(error.message)
        }
    };

    const handleDownloadInvoice = async () => {
        try {

            if (!userInvoice.invoicePath) {
                return;
            }
            const invoicePath = userInvoice.invoicePath;
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
        <div>
            <h5>Appointments</h5>
            <div className='d-flex justify-content-evenly align-items-center mb-3'>
                <button className={getButtonClass('Rejected')} onClick={() => setActiveComponent('Rejected')}>Rejected</button>
                <button className={getButtonClass('Pending')} onClick={() => setActiveComponent('Pending')}>Upcoming</button>
                <button className={getButtonClass('Confirmed')} onClick={() => setActiveComponent('Confirmed')}>Confirmed</button>
                <button className={getButtonClass('Cancelled')} onClick={() => setActiveComponent('Cancelled')}>Cancelled</button>
                <button className={getButtonClass('Completed')} onClick={() => setActiveComponent('Completed')}>Completed</button>
            </div>

            <div className='d-flex flex-column gap-4 mb-4'>
                <Row>
                    <Col md={12}>
                        {activeComponent === 'Rejected' && (
                            <ul>
                                <div className='d-flex flex-row flex-wrap gap-4'>
                                    {filteredAppointments('REJECTED').map((appointment, index) => (
                                        <Paper elevation={3} style={{ width: "450px" }} key={index} className={styles.paper}>
                                            <div className='d-flex justify-content-around align-items-center'>
                                                <div>
                                                    <p className={styles.firstName}>{appointment.salon}</p>
                                                    <p className={styles.startTime}>{appointment.serviceStartTime}</p>
                                                    <p className={styles.startTime}>{appointment.serviceType}</p>
                                                    <p className={styles.date}>{formatDate(appointment.date)}</p>
                                                    <p className={styles.startTime}>{appointment.appointmentId}</p>
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <p className={styles.pendingStatus}>{appointment.status}</p>
                                                    <Link
                                                        className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
                                                        onClick={() => handleOpenDrawer(appointment)}
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Paper>
                                    ))}

                                    {selectedAppointment && (
                                        <Userappointmentdetails
                                            open={drawerOpen}
                                            onClose={handleCloseDrawer}
                                            selectedAppointment={selectedAppointment}
                                        />
                                    )}
                                </div>
                            </ul>
                        )}

                        {activeComponent === 'Pending' && (
                            <ul>
                                <div className='d-flex flex-row flex-wrap gap-4'>
                                    {filteredAppointments('PENDING').map((appointment, index) => (
                                        <Paper elevation={3} style={{ width: "450px" }} key={index} className={styles.paper}>
                                            <div className='d-flex justify-content-around align-items-center'>
                                                <div>
                                                    <p className={styles.firstName}>{appointment.salon}</p>
                                                    <p className={styles.startTime}>{appointment.serviceStartTime}</p>
                                                    <p className={styles.startTime}>{appointment.serviceType}</p>
                                                    <p className={styles.date}>{formatDate(appointment.date)}</p>
                                                    <p className={styles.startTime}>{appointment.appointmentId}</p>
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <p className={styles.pendingStatus}>{appointment.status}</p>
                                                    <Link
                                                        className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
                                                        onClick={() => handleOpenDrawer(appointment)}
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Paper>
                                    ))}
                                    {selectedAppointment && (
                                        <Userappointmentdetails
                                            open={drawerOpen}
                                            onClose={handleCloseDrawer}
                                            selectedAppointment={selectedAppointment}
                                        />
                                    )}
                                </div>
                            </ul>
                        )}

                        {activeComponent === 'Confirmed' && (
                            <ul>
                                <div className='d-flex flex-row flex-wrap gap-4'>
                                    {filteredAppointments('CONFIRMED').map((appointment, index) => (
                                        <Paper elevation={3} style={{ width: "450px" }} key={index} className={styles.paper}>
                                            <div className='d-flex justify-content-around align-items-center'>
                                                <div>
                                                    <p className={styles.firstName}>{appointment.salon}</p>
                                                    <p className={styles.startTime}>{appointment.serviceStartTime}</p>
                                                    <p className={styles.startTime}>{appointment.serviceType}</p>
                                                    <p className={styles.date}>{formatDate(appointment.date)}</p>
                                                    <p className={styles.startTime}>{appointment.appointmentId}</p>
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <p className={styles.pendingStatus}>{appointment.status}</p>
                                                    <Link
                                                        className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
                                                        onClick={() => handleOpenDrawer(appointment)}
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Paper>
                                    ))}
                                    {selectedAppointment && (
                                        <Userappointmentdetails
                                            open={drawerOpen}
                                            onClose={handleCloseDrawer}
                                            selectedAppointment={selectedAppointment}
                                        />
                                    )}
                                </div>
                            </ul>
                        )}

                        {activeComponent === 'Cancelled' && (
                            <ul>
                                <div className='d-flex flex-row flex-wrap gap-4'>
                                    {filteredAppointments('CANCELLED').map((appointment, index) => (
                                        <Paper elevation={3} style={{ width: "450px" }} key={index} className={styles.paper}>
                                            <div className='d-flex justify-content-around align-items-center'>
                                                <div>
                                                    <p className={styles.firstName}>{appointment.salon}</p>
                                                    <p className={styles.startTime}>{appointment.serviceStartTime}</p>
                                                    <p className={styles.startTime}>{appointment.serviceType}</p>
                                                    <p className={styles.date}>{formatDate(appointment.date)}</p>
                                                    <p className={styles.startTime}>{appointment.appointmentId}</p>
                                                    
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <p className={styles.pendingStatus}>{appointment.status}</p>
                                                    <p className={styles.startTime}>Cancelled by {appointment.cancelledBy}</p>
                                                    <p className={styles.startTime}>Reason {appointment.cancelReason}</p>
                                                    <Link
                                                        className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
                                                        onClick={() => handleOpenDrawer(appointment)}
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Paper>
                                    ))}
                                    {selectedAppointment && (
                                        <Userappointmentdetails
                                            open={drawerOpen}
                                            onClose={handleCloseDrawer}
                                            selectedAppointment={selectedAppointment}
                                        />
                                    )}
                                </div>
                            </ul>
                        )}

                        {activeComponent === 'Completed' && (
                            <ul>
                                <div className='d-flex flex-row flex-wrap gap-4'>
                                    {filteredAppointments('COMPLETED').map((appointment, index) => (
                                        <Paper elevation={3} style={{ width: "450px" }} key={index} className={styles.paper}>
                                            <div className='d-flex justify-content-around align-items-center'>
                                                <div>
                                                    <p className={styles.firstName}>{appointment.salon}</p>
                                                    <p className={styles.startTime}>{appointment.serviceStartTime}</p>
                                                    <p className={styles.startTime}>{appointment.serviceType}</p>
                                                    <p className={styles.date}>{formatDate(appointment.serviceDate)}</p>
                                                    
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <p className={styles.pendingStatus}>{appointment.status}</p>
                                                    <p className={styles.startTime}>{appointment.appointmentId}</p>
                                                    <Link
                                                        className={`link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer ${styles.link}`}
                                                        onClick={() => handleOpenDrawer(appointment)}
                                                    >
                                                        View Details
                                                    </Link>
                                                    <div className='d-flex justify-content-center align-items-center flex-row gap-1 mt-2 cursor-pointer' onClick={() => { handleDownloadInvoice(), fetchInvoice(appointment) }}>
                                                        <Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover cursor-pointer" style={{ fontSize: "13px" }}>Download Invoice</Link>
                                                        <MdOutlineFileDownload className="fs-5 " />
                                                    </div>
                                                </div>
                                            </div>
                                        </Paper>
                                    ))}
                                    {selectedAppointment && (
                                        <Userappointmentdetails
                                            open={drawerOpen}
                                            onClose={handleCloseDrawer}
                                            selectedAppointment={selectedAppointment}
                                        />
                                    )}
                                </div>
                            </ul>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Userappointment;
