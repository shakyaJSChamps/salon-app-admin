import React from "react";
import AccountSetting from "../Component/setting/AccountSetting";
import { Col, Container, Row } from "react-bootstrap";

const Settings = () => {
  return (
    <Container>
      <Row>
        <Col className="mt-3">
          <AccountSetting />
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
