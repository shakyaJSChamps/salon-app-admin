import { Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../Appointments/Appointments.module.css"
import Invoice from '../../../common-component/invoice/Invoice';
import { MdOutlineFileDownload } from 'react-icons/md';


function Completed({ appointmentData }) {
    const completedAppointments = appointmentData ? appointmentData.filter(data => data.status === "COMPLETED") : [];
    console.log("Completed", completedAppointments);

    const invoiceData = {
        image: null, // You can use a different image URL if you want
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

                        <div>
                            <p>{data.user.firstName}</p>
                            <p>{data.serviceStartTime}</p>
                            <p>{data.startTime}</p>
                            <p>{data.date}</p>
                        </div>

                        <div className='d-flex flex-column justify-content-start align-items-start'>
                                <p>{data.status}</p>
                            <div className='d-flex gap-1 justify-content-center align-items-center gap-2'>
                                <Invoice invoiceData={invoiceData}
                                    buttonName="Salon Invoice"
                                />
                                <MdOutlineFileDownload className="fs-5 cursor-pointer" />
                            </div>
                            <br/>
                            <div className='d-flex gap-1 justify-content-center align-items-center gap-2'>
                                <Invoice invoiceData={invoiceData}
                                    buttonName="User Invoice"
                                />
                                <MdOutlineFileDownload className="fs-5 cursor-pointer" />
                            </div>
                        </div>

                    </div>
                </Paper>
            ))}
        </div>
    )
}

export default Completed
