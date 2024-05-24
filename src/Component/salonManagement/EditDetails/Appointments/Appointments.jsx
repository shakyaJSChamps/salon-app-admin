import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Completed from './Completed';
import Pending from './Pending';
import Cancelled from './Cancelled';
// import Todays from './Todays';
import styles from './Appointments.module.css';
import { __endpoint_getSalonAppointments } from '../../../../constants/endpoints';

function Appointments({ salonDetail }) {
    console.log("salon ID", salonDetail.id)

    const [activeComponent, setActiveComponent] = useState('Completed');
    const [appointmentData, setAppointmentData] = useState()
    console.log("Appointment", appointmentData)

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Pending':
                return <Pending appointmentData={appointmentData}/>;
            case 'Cancelled':
                return <Cancelled appointmentData={appointmentData}/>;
            case 'Completed':
                return <Completed appointmentData={appointmentData}/>;
            default:
                return <Completed appointmentData={appointmentData}/>;
        }
    }

    const getButtonClass = (component) => {
        return activeComponent === component ? `${styles.button} ${styles.active}` : styles.button;
    }

    useEffect(() => {
        const getAppointments = async (id) => {
            try {
                const appointments = await __endpoint_getSalonAppointments(id);
                setAppointmentData(appointments?.data?.data)
                console.log("Salon Appointments", appointments);
            } catch (error) {
                console.error('Error fetching salon details:', error);
            }
        };

        if (salonDetail?.id) {
            getAppointments(salonDetail.id);
        } else {
            console.error('Salon ID is not defined');
        }
    }, [salonDetail?.id]);



    return (
        <div>
            <h5>Appointments</h5>

            <div className='d-flex justify-content-evenly align-items-center mb-3'>
                <button className={getButtonClass('Pending')} onClick={() => setActiveComponent('Pending')}>Pending</button>
                <button className={getButtonClass('Cancelled')} onClick={() => setActiveComponent('Cancelled')}>Cancelled</button>
                <button className={getButtonClass('Completed')} onClick={() => setActiveComponent('Completed')}>Completed</button>
                {/* <button className={getButtonClass('Todays')} onClick={() => setActiveComponent('Todays')}>Todays</button> */}
            </div>
            <div className='d-flex flex-column gap-4 mb-4'>
                <Row>
                    <Col md={12}>
                        {renderComponent()}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Appointments;
