import React, { useState, useEffect } from "react";
import { MdOutlineContentPaste } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";
import { Paper } from "@mui/material";
import Notify from "../../utils/notify";
import FileUploader from "../file-uploder/FileUploder";
import { addServiceType, putServiceType } from "../../api/account.api";

const AddServiceType = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (props.isEditMode) {
      setIsEditMode(true);
      setName(props.selectedRowData.name);
      setDescription(props.selectedRowData.description);
    } else {
      setIsEditMode(false);
      setName("");
      setDescription("");
    }
  }, [props.isEditMode, props.selectedRowData]);

  const clearForm = () => {
    setName("");
    setDescription("");
  };

  const addService = async (event) => {
    event.preventDefault();
    console.log("Add service ::>");
    try {
      const requestData = {
        name: name,
        description: description,
      };
      const response = await addServiceType(requestData);
      Notify.success(response.data.message);
      props.setServiceAdded(true);

      // Clear the form
      clearForm();
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    }
  };

  const editService = async (event) => {
    event.preventDefault();
    console.log("edit service ::>");
    try {
      const requestData = {
        name: name,
        description: description,
        active: true,
      };
      const response = await putServiceType(
        requestData,
        props.selectedRowData.id
      );
      console.log("Response ::>", response);
      Notify.success(response.data.message);
      props.setServiceAdded(true);
      // Clear the form
      clearForm();
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    }
  };

  return (
    <Paper className="add-service-paper px-3 pb-3 rounded h-100" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className="ps-1 fw-bold mb-0">
          {isEditMode ? "Edit" : "Add"} Service Type
        </p>
        {isEditMode && (
          <BiPlusCircle
            onClick={() => {
              setIsEditMode(false);
              clearForm();
            }}
            className="cursor-pointer ms-auto"
          />
        )}
      </div>
      <hr />
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={isEditMode ? editService : addService}
      >
        <div className="d-flex flex-column align-items-start mb-4">
          <label className="fw-bold pt-2">Name</label>
          <input
            className="form-control input mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* <div className="d-flex flex-column align-items-start mb-2">
          <label className="fw-bold">Description</label>
          <textarea
            className="form-control input"
            rows="3"
            cols="25"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div> */}
        <FileUploader />

        <div className="d-flex justify-content-center pt-4">
          <button
            type="submit"
            className={`add-service-btn mt-2 ${
              name.length < 2 && description?.length < 2 ? "disable" : ""
            }`}
            disabled={name.length < 2 && description?.length < 2}
          >
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Paper>
  );
};

export default AddServiceType;
