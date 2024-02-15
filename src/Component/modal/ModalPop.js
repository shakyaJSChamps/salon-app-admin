import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from '../ServiceType/EditServiceForm';
import styles from "./Modal.module.css";

function MyVerticallyCenteredModal({ show, onHide, rowData }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={styles.title}>
          <MdOutlineContentPaste /> Edit Service Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditServiceForm rowData={rowData} />
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
