import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from '../ServiceType/EditServiceForm';
import styles from "./Modal.module.css";
import PopUp from '../PopUp';

function MyVerticallyCenteredModal({ show, onHide, rowData }) {
  const editServiceFormData = rowData.editServiceFormData; // Assuming editServiceFormData is the data for EditServiceForm
  const popUpData = rowData.popUpData; // Assuming popUpData is the data for PopUp

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
        <EditServiceForm data={editServiceFormData} />
        <PopUp data={popUpData} />
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;


