import React from "react";
import { MdOutlineContactMail } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Paper } from "@mui/material";
const NewADS = () => {
  return (
    <Paper className="ads-add-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContactMail />
        <p className=" ps-1 fw-bold  mb-0">Add New Advertisement</p>
      </div>
      <hr />
      <form className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center-start mb-1">
          <label className="fw-bold">Advertisement Name</label>
          <input className="form-control input " type="text"/>
        </div>

        <div className="d-flex flex-column align-items-center-start mb-1 position-relative">
          <label className="fw-bold">Advertisement Image</label>

          <input className="form-control input "  />
          <div className="d-flex align-items-center-end">
            <FileUploadOutlinedIcon className="upload-icon" />
          </div>
        </div>

        <div className="d-flex flex-column align-items-center-start mb-1">
          <label className="fw-bold">Advertisement Video</label>
          <input className="form-control input " type="video" />
          <div className="d-flex align-items-center-end">
            <FileUploadOutlinedIcon className="upload-icon" />
          </div>
        </div>

        <div className="d-flex flex-column align-items-center-start mb-1">
          <label className="fw-bold">City</label>
          <input className="form-control input " type="text" />
        </div>

        <div className="d-flex flex-column align-items-center-start mb-1">
          <label className="fw-bold">Start Date</label>
          <input placeholder="07/07/43" className="form-control input " type="text"/>
        </div>

        <div className="d-flex flex-column align-items-center-start mb-1">
          <label className="fw-bold">End Date</label>
          <input className="form-control input " type="text"/>
        </div>

        <div className="d-flex justify-content-center">
          <button className="submit-ads-btn mt-2">Submit</button>
        </div>
      </form>
    </Paper>
  );
};

export default NewADS;
