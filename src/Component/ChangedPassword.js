import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dlogo from '../assets/image/d-logo.png';
import vector from '../assets/image/Vector.png'

function ChangedPassword() {
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
            <h3 className='new-password-para'>Your New Password is Successfully Changed.</h3>
            <div className='changed-circle'>
                <img className='vector-img' src= {vector} type='vector.png' />
            </div>
            <button className=" Forget_btn continue-btn" type="button">
            <Link className='continue-link link-style continue-btn' to='/admin/login'>CONTINUE</Link>
            </button>
    </>
  )
}

export default ChangedPassword;
