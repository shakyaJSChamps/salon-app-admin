import React, { useState, useEffect } from "react";
import { putServiceType } from "../../api/account.api";
import Notify from "../../utils/notify";
import FileUploader from "../file-uploder/FileUploder";

const EditServiceForm = ({ rowData, onHide }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (rowData) {
      setName(rowData.name || "");
      setDescription(rowData.description || "");
    }
  }, [rowData]);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {
        name: name,
        description: description
      };

      console.log("Calling API with parameters:", rowData?.id, updatedData);
      const response = await putServiceType(updatedData, rowData?.id);
      console.log("API response:", response);

      // Show success message with updated data
      Notify.success(`Service type updated successfully: ${updatedData.name}, ${updatedData.description}`);

      // After successful update, close the modal
      onHide(); // Hide the modal after saving
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSave(event);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form
      className="d-flex flex-column align-items-center"
      onSubmit={handleSubmit}
    >
      <div className="d-flex flex-column align-items-start mb-1">
        <label className="fw-bold">Name</label>
        <input
          className="form-control input"
          value={name}
          onChange={handleChangeName}
        />
      </div>

      <div className="d-flex flex-column align-items-start mt-3 mb-2">
        <label className="fw-bold">Description</label>
        <textarea
          className="form-control input"
          rows="4"
          cols="25"
          value={description}
          onChange={handleChangeDescription}
        ></textarea>
      </div>
      <FileUploader />
      <div className="d-flex justify-content-center">
        {/* Use type="submit" to submit the form */}
        <button type="submit" className="button mt-4">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditServiceForm;
