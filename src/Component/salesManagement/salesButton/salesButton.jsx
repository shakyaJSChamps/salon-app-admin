import React from "react";
import styles from "./SalesButton.module.css";

const SalesButton = ({ isEditing, handleAddClick, handleSaveClick }) => {


  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      {!isEditing ? (
        <button
          type="button"
          className={styles.btn}
          onClick={handleSaveClick} // Handle saving
        >
          Add
        </button>
      ) : isEditing (
        <button
          type="submit"
          className={styles.btn}
          form="salesDetailsForm"
          onClick={handleEditClick} // Handle editing
        >
          Save
        </button>
      )}
    </div>
  );
};

export default SalesButton;
