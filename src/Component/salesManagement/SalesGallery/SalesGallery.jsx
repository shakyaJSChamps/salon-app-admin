import React from "react";
import FileUploader from "./../../file-uploder/FileUploder";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./SalesGallery.module.css";

function SalesGallery() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="ps-2">Bank Documents</h5>
          </div>
          <div className={styles.customDropzone}>
            <FileUploader />
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="ps-2">Pan Card</h5>
          </div>
          <div className="fileupload ">
            <FileUploader className={StyleSheet._customDropzone_8j3hy_1} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="ps-2 mt-3">Adhar Card Front</h5>
          </div>
          <div className="fileupload h-20">
            <FileUploader className={StyleSheet._customDropzone_8j3hy_1} />
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="ps-2 mt-3">Adhar Card Back</h5>
          </div>
          <div className="fileupload h-20">
            <FileUploader className={StyleSheet._customDropzone_8j3hy_1} />
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="mt-3 text-center">Profile </h5>
        </div>

        <FileUploader />
      </Row>
    </Container>
  );
}
export default SalesGallery;
