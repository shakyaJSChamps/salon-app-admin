import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './Appointments.module.css';

function Appointments({ activeComponent, setActiveComponent, renderComponent }) {
    const getButtonClass = (component) => {
        return activeComponent === component ? `${styles.button} ${styles.active}` : styles.button;
    };

    return (
        <div>
            <h5>Appointments</h5>
            <div className='d-flex justify-content-evenly align-items-center mb-3'>
                <button className={getButtonClass('Pending')} onClick={() => setActiveComponent('Pending')}>Upcoming</button>
                <button className={getButtonClass('Cancelled')} onClick={() => setActiveComponent('Cancelled')}>Cancelled</button>
                <button className={getButtonClass('Completed')} onClick={() => setActiveComponent('Completed')}>Completed</button>
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
