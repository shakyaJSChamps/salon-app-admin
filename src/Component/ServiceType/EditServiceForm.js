import React, { useState } from "react";
import { putServiceType } from "../../api/account.api";
import Notify from "../../utils/notify";

const EditServiceForm = ({ rowData }) => {
  const [name, setName] = useState(rowData?.name || "");
  const [description, setDescription] = useState(rowData?.description || "");

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      console.log("Calling API with parameters:", rowData?.id, { name, description });
      const response = await putServiceType(null,rowData?.id);
      console.log("API response:", response);
      // Notify user of successful update
      Notify.success("Service type updated successfully.");
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    }
  };
  

  return (
    <form className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-start mb-1">
        <label className="fw-bold">Name</label>
        <input
          className="form-control input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="d-flex flex-column align-items-start mt-3 mb-2">
        <label className="fw-bold">Description</label>
        <textarea
          className="form-control input"
          rows="6"
          cols="25"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="d-flex justify-content-center">
        {/* Call handleSave function when the button is clicked */}
        <button className="button mt-5" onClick={handleSave}>
          Update
        </button>
      </div>
    </form>
  );
};

export default EditServiceForm;
