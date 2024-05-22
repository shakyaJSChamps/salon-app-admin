import { Paper } from '@mui/material';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import dummuImage from "../../../../assets/image/hair.png";

function Appointments() {
    return (
        <div>
            <h5>Appointmemts</h5>
            <div className='d-flex flex-column gap-4 mb-4'>
                <Row>
                    <Col md={12}>
                        <h6>Completed Appointments</h6>
                        <Paper elevation={3} style={{ width: "455px" }}>
                            <div className='d-flex justify-content-center align-items-center gap-5'>
                                <div>
                                    <img src={dummuImage} style={{ height: "79px" }}></img>
                                </div>

                                <div>
                                    <p>Pawan Kumar</p>
                                    <p>12:00 Pm Male</p>
                                    <p>2024/05/10</p>
                                </div>

                                <div className='d-flex flex-column gap-1'>
                                    <p>Completed</p>
                                    <Link>View Details</Link>
                                </div>
                            </div>
                        </Paper>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <h6>Pending Appointments</h6>
                        <Paper elevation={3} style={{ width: "455px" }}>
                            <div className='d-flex justify-content-center align-items-center gap-5'>
                                <div>
                                    <img src={dummuImage} style={{ height: "79px" }}></img>
                                </div>

                                <div>
                                    <p>Pawan Kumar</p>
                                    <p>12:00 Pm Male</p>
                                    <p>2024/05/10</p>
                                </div>

                                <div className='d-flex flex-column gap-1'>
                                    <p>Completed</p>
                                    <Link>View Details</Link>
                                </div>
                            </div>
                        </Paper>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <h6>Cancelled Appointments</h6>
                        <Paper elevation={3} style={{ width: "455px" }}>
                            <div className='d-flex justify-content-center align-items-center gap-5'>
                                <div>
                                    <img src={dummuImage} style={{ height: "79px" }}></img>
                                </div>

                                <div>
                                    <p>Pawan Kumar</p>
                                    <p>12:00 Pm Male</p>
                                    <p>2024/05/10</p>
                                </div>

                                <div className='d-flex flex-column gap-1'>
                                    <p>Cancelled</p>
                                    <Link>View Details</Link>
                                </div>
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default Appointments


// import { Row, Col } from "react-bootstrap";
// import styles from "../upcomingappointment/UpComing.module.css";
// import { useEffect, useState } from "react";
// import Session from "../../../service/session";
// import { cancelledAppointments } from "../../../api/appointments.api";
// import Notify from "../../../utils/notify";
// import { Link } from "react-router-dom";
// import Popup from "../appointmentdetails/Popup";
// const Ongoing = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

//   const [pending, setPending] = useState([]);
//   const salonId = Session.get("salonId");
//   useEffect(() => {
//     const appointments = async () => {
//       try {
//         const response = await cancelledAppointments(salonId);
//         const pending = response.data;
//         console.log("cancelled completed::>", pending);
//         setPending(pending);
//       } catch (error) {
//         Notify.error(error.message);
//       }
//     };
//     appointments();
//   }, [salonId]);

//   const handleViewDetails = (appointmentId) => {
//     setSelectedAppointmentId(appointmentId);
//     console.log("ara id", appointmentId);
//     setShowPopup(true);
//   };

//   return (
//     <>
//       <Row>
//         {pending?.map((appointment, index) => (
//           <Col md={4} sm={6} xs={6} key={index}>
//             <Row className="mb-2">
//               <div className={styles.userInfo}>
//                 <Col md={4}>
//                   <div>
//                     <img
//                       src={appointment.user.profileImageUrl}
//                       className={styles.userImage}
//                       alt="User"
//                     />
//                   </div>
//                 </Col>
//                 <Col md={4}>
//                   <p className={styles.user}>
//                     <span className={styles.userName}>
//                       {${appointment.user.firstName} ${appointment.user.lastName}}{" "}
//                     </span>
//                     <br />
//                     <span>{appointment.service}</span>
//                     <br />
//                     <span>
//                       {appointment.startTime}{" "}
//                       <span className={styles.gender}>
//                         {appointment.serviceType}
//                       </span>
//                     </span>

//                     <br />
//                     <span>{appointment.location}</span>
//                     <span className={styles.locationDistance}>
//                       {appointment.date}
//                     </span>
//                   </p>
//                   {/* <button className={styles.accept}>Accept</button> */}
//                 </Col>
//                 <Col md={4}>
//                   <p className={styles.status}>
//                     {appointment.status}
//                     <br />
//                     <Link onClick={() => handleViewDetails(appointment.id)}>
//                       View Details
//                     </Link>
//                   </p>
//                   {/* <button className={styles.decline}>Decline</button> */}
//                 </Col>
//               </div>
//             </Row>
//           </Col>
//         ))}
//       </Row>
//       {showPopup && (
//         <Popup
//           data={selectedAppointmentId}
//           show={showPopup}
//           onHide={() => setShowPopup(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Ongoing;
