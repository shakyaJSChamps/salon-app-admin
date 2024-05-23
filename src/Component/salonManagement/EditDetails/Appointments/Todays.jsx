import { Paper } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dummuImage from "../../../../assets/image/hair.png";

function Todays({appointmentData}) {
    return (

        <div>
            <Row>
                <Col md={12}>
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
                                <p>Todays</p>
                                <Link>
                                    View Details</Link>
                            </div>
                        </div>
                    </Paper>
                </Col>
            </Row>
        </div>
    )
}

export default Todays
