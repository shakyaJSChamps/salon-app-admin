import React from 'react'
import Dlogo from "../assets/image/d-logo.png";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

function ForgetPassword() {
    return (
        <>
            <Container className="p-0">
                <Row className=" m-0 p-0">
                    <Col sm={8} className="pt-0 ">
                        <img className='forget_logo' src={Dlogo} type="logo.png" />
                    </Col>
                    <Col sm={4} className="p-0 d-flex justify-content-center align-itemscenter">
                        <h6 className="sign-account back-sign">
                            <Link to='/user/login' className='link-style'>Back to Sign In</Link>
                        </h6>
                    </Col>
                    <Col className="p-0">
                        <h1 className='for_password'>Forgot <br />
                            Password</h1>
                    </Col>
                </Row>
            </Container>
            <form className="form">
                <label className="text Forget_text">
                    Enter your registered email address for the <br />
                    verification to get the 4 digits code.
                    <br />
                    <input
                        className="input"
                        placeholder="EMAIL ADDRESS"
                    />
                </label>
            </form>
            <button className="button Forget_btn" type="button">
                CONTINUE
            </button>
        </>
    );
}

export default ForgetPassword
