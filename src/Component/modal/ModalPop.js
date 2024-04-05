import React from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from "../ServiceType/EditServiceForm";
import UserPopUp from "../userManagement/UserPopUp";
import styles from "./Modal.module.css";

function MyVerticallyCenteredModal({ show, onHide, rowData, showForm }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={showForm === "service" ? "sm" : "md"}
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
        {showForm === "user" && <UserPopUp rowData={rowData} />}
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
