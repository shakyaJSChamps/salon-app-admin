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

// import { Modal } from "react-bootstrap";
// import styles from "./Modal.module.css";
// import UserPopUp from "../userManagement/UserPopUp";

// function MyVerticallyCenteredModal({ show, onHide, rowData }) {
//   let { firstName,middleName,LastName, email, phoneNumber, createdAt, address } = rowData;
//   if (typeof LastName === "undefined") {
//     LastName = " ";
//   } 
  

//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       // size={showForm === "service" ? "sm" : "md"}
//       size="md"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           User Details
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div>
//           <p><strong>Name:</strong> {firstName + middleName +LastName}</p>
//           <p><strong>Email:</strong> {email}</p>
//           <p><strong>Mobile Number:</strong> {phoneNumber}</p>
//           <p><strong>Joined Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>
//           <p><strong>City:</strong> {address}</p>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default MyVerticallyCenteredModal;

