import { Paper } from "@mui/material";
import { MdOutlineContentPaste } from "react-icons/md";
import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import FileUploader from "../file-uploder/FileUploder";
import { addServiceType } from "../../api/account.api";
import Notify from "../../utils/notify";

const AddServiceType = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        name: name,
        description: description,
      };
      // Call your addServiceType API function
      const response = await addServiceType(requestData);
      // Show success message
      Notify.success(response.data.message);
      props.setServiceAdded(true);

      // Optionally, you can clear the input fields after successful save
      setName("");
      setDescription("");
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    }
  };

  return (
    <Paper className="add-service-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className="ps-1 fw-bold mb-0">Add Service Type</p>
      </div>
      <hr />
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSave}
      >
        <div className="d-flex flex-column align-items-start mb-1">
          <label className="fw-bold">Name</label>
          <input
            placeholder="Hair"
            className="form-control input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column align-items-start mb-2">
          <label className="fw-bold">Description</label>
          <textarea
            className="form-control input"
            rows="6"
            cols="25"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <FileUploader />

        <div className="d-flex justify-content-center">
          <button type="submit" className="add-service-btn mt-2">
            Save
          </button>
        </div>
      </form>
    </Paper>
  );
};

export default AddServiceType;
