import React from 'react'
import Dlogo from "../assets/image/d-logo.png";
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function NewPassword() {
    return (
        <>
            <Container className="p-0">
                <Row className=" m-0 p-0">
                    <Col sm={8} className="pt-0 ">
                        <img className='d-logo' src={Dlogo} type="d-logo.png" />
                    </Col>
                    <Col sm={4} className="p-0 d-flex justify-content-center align-itemscenter">
                        <h6 className="sign-account back-sign">
                            <Link to='/admin/login' className='link-style'>Back to Sign In</Link>
                        </h6>
                    </Col>
                    <Col className="p-0">
                        <h2 className='for-password'>New Password</h2>
                    </Col>
                </Row>
            </Container>
            <h3 className='new-password-para'>Set up the New Password for your Account.</h3>
            <form className="form">
                <label className="text Forget_text">
                    Enter new password
                    <br />
                    <input
                        className="input"
                        type='password'
                        placeholder="8 symbls at least"
                    />
                    <br /><br />
                </label>
                <label className="text Forget_text">
                    Confirm password
                    <br />
                    <input
                        className="input"
                        type='password'
                        placeholder="8 symbls at least"
                    />
                </label>
            </form>
            <button className=" Forget_btn" type="button">
                <Link className='continue-link link-style' to='/admin/changed-password'>UPDATE PASSWORD</Link>
            </button>
        </>
    )
}

export default NewPassword
