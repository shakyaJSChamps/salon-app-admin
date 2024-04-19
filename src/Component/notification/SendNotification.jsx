import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SendNotificationFirst from './SendNotificationFirst'
import SendNotificationSecond from './SendNotificationSecond'

const SendNotification = () => {
  return (
    <Container >
        <Row>
            <Col  md={4}>
                <SendNotificationFirst />
            </Col>
            <Col  md={8}>
              <SendNotificationSecond />
            </Col>
        </Row>
    </Container>
  )
}

export default SendNotification