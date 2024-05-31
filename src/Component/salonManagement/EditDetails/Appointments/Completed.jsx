import { Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../Appointments/Appointments.module.css"


function Completed({ appointmentData }) {
    const completedAppointments = appointmentData ? appointmentData.filter(data => data.status === "COMPLETED") : [];
    console.log("Completed", completedAppointments);

    return (
        <div className='d-flex flex-row flex-wrap gap-4'>
            {completedAppointments.map((data, index) => (
                <Paper elevation={3} style={{ width: "455px" }} key={index} className={styles.paper}>
                    <div className='d-flex justify-content-center align-items-center gap-5'>
                        <div>
                            <img src={data?.user?.profileImageUrl} style={{ height: "79px" }}></img>
                        </div>

                        <div>
                            <p>{data.user.firstName}</p>
                            <p>{data.serviceStartTime}</p>
                            <p>{data.startTime}</p>
                            <p>{data.date}</p>
                        </div>

                        <div className='d-flex flex-column gap-1'>
                            <p>{data.status}</p>
                            {/* <Link to={`/appointment/${data.id}`}>View Details</Link> */}
                        </div>
                    </div>
                </Paper>
            ))}
        </div>
    )
}

export default Completed
