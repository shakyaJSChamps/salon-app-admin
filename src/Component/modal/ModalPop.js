import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from '../ServiceType/EditServiceForm';
import styles from "./Modal.module.css";
import { Modal } from "react-bootstrap";
import UserPopUp from "../userManagement/UserPopUp";

function MyVerticallyCenteredModal({ show, onHide, rowData, showForm }) { 
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
    >
         {showForm === "service" && ( 
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className={styles.title}>
            <MdOutlineContentPaste /> Edit Service Type
          </Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        {showForm === "service" && <EditServiceForm rowData={rowData} />}
        {showForm === "user" && <UserPopUp rowData={rowData}/>}
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;