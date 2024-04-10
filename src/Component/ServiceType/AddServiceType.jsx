import React, { useState, useEffect } from "react";
import { MdOutlineContentPaste } from "react-icons/md";
import { Paper } from "@mui/material";
import Notify from "../../utils/notify";
import FileUploader from "../file-uploder/FileUploder";
import { addServiceType, putServiceType } from "../../api/account.api";

const AddServiceType = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [services, setServices] = useState([]); // Define the services state

  useEffect(() => {
    if (props.selectedRowData) {
      setName(props.selectedRowData.name || "");
      setDescription(props.selectedRowData.description || "");
      setIsEditMode(true);
    } else {
      setName("");
      setDescription("");
      setIsEditMode(false);
    }
  }, [props.selectedRowData]);

  useEffect(() => {
    localStorage.setItem("editedServiceData", JSON.stringify({ name, description }));
  }, [name, description]);

  useEffect(() => {
    const editedData = JSON.parse(localStorage.getItem("editedServiceData"));
    if (editedData) {
      setName(editedData.name);
      setDescription(editedData.description);
    }
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
  
    try {
      const requestData = {
        name: name,
        description: description,
      };
  
      let response;
  
      if (isEditMode) {
        response = await putServiceType(requestData, props.selectedRowData.id);
      } else {
        response = await addServiceType(requestData);
      }
  
      console.log("API response:", response);
  
      if (response && response.data && response.data.message) {
        Notify.success(response.data.message);
        props.setServiceAdded(true);
  
        // Update the services state immediately with the edited data
        if (isEditMode) {
          setServices(prevServices =>
            prevServices.map(service =>
              service.id === props.selectedRowData.id
                ? { ...service, name: name, description: description }
                : service
            )
          );
        } else {
          // If it's a new entry, append it to the existing services
          setServices(prevServices => [...prevServices, response.data.service]);
        }
  
        setName("");
        setDescription("");
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("API error:", error);
      Notify.error(error.message);
    }
  };
  

  return (
    <Paper className="add-service-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className="ps-1 fw-bold mb-0">{isEditMode ? 'Edit' : 'Add'} Service Type</p>
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
            {isEditMode ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </Paper>
  );
};

export default AddServiceType;
