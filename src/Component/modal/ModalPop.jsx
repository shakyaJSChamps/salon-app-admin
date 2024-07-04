import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineContentPaste } from "react-icons/md";
import EditServiceForm from "../ServiceType/EditServiceForm";
import SalesCreate from "../salesManagement/Salescreate/SalesCreate";
import AddSubAdminForm from "../subAdmin/AddSubAdminForm";
import styles from "./Modal.module.css";

function MyVerticallyCenteredModal({ show, onHide, rowData, showForm, setUpdatedRowData, fetchData, page, perPage, searchText, allowEdit: allowEditProp }) {
  const [allowEdit, setAllowEdit] = useState(allowEditProp);

  useEffect(() => {
    setAllowEdit(allowEditProp);
  }, [allowEditProp]);

  console.log(allowEdit);

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
        {showForm === "sales" && (
          <SalesCreate
            rowData={rowData}
            onHide={onHide}
            allowEdit={allowEdit}
          />
        )}
        {showForm === "subAdmin" && (
          <AddSubAdminForm
            rowData={rowData}
            fetchData={fetchData}
            page={page}
            perPage={perPage}
            searchText={searchText}
            onClose={onHide}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
