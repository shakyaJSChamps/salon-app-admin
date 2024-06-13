// MyVerticallyCenteredModal.js
import React from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from "../ServiceType/EditServiceForm";
import UserDetails from "../userManagement/UserDetails";
import SalesCreate from "../salesManagement/Salescreate/SalesCreate";
import AddSubAdminForm from "../subAdmin/AddSubAdminForm"; 
import styles from "./Modal.module.css";

function MyVerticallyCenteredModal({
  show,
  onHide,
  rowData,
  showForm,
  setUpdatedRowData,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={
        showForm === "sales" ? `${styles.customModal} modal-xl` : styles.customModal
      }
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
        {showForm === "service" && (
          <EditServiceForm rowData={rowData} onHide={onHide} />
        )}
        {showForm === "user" && (
          <UserDetails rowData={rowData} setUpdatedRowData={setUpdatedRowData} />
        )}
        {showForm === "sales" && <SalesCreate onClose={onHide} />}
        {showForm === "subAdmin" && <AddSubAdminForm rowData={rowData}onClose={onHide} />}
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
