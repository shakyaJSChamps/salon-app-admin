import React from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from "../ServiceType/EditServiceForm";
import UserDetails from "../userManagement/UserDetails";
import styles from "./Modal.module.css";
import SalonImgPopup from "../salonManagement/SalonImgPopup";

function MyVerticallyCenteredModal({ show, onHide, rowData, showForm }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={styles.customModal}
      >
      {showForm === "service" && (
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={styles.title}

          >
            <MdOutlineContentPaste /> Edit Service Type
          </Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        {showForm === "service" && <EditServiceForm rowData={rowData} onHide={onHide} />}
        {showForm === "user" && <UserDetails rowData={rowData}/>}
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;

