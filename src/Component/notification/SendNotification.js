import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SendNotificationFirst from './SendNotificationFirst'
import SendNotificationSecond from './SendNotificationSecond'

const SendNotification = () => {
  return (
    <Container >
        <Row>
            <Col  md={4} className="mt-3">
                <SendNotificationFirst />
            </Col>
            <Col  md={8} className="mt-3">
              <SendNotificationSecond />
            </Col>
        </Row>
    </Container>
  )
}

export default SendNotification