import React from "react";
import { MdOutlineContactMail } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Paper } from "@mui/material";
import InputText from "../common-component/Inputtext/InputText";
import { Form, Formik } from "formik";
const NewADS = () => {
  return (
    <Paper className="ads-add-paper px-3  h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContactMail />
        <p className=" ps-1 fw-bold  mb-0">Add New Advertisement</p>
      </div>
      <hr />
      <Formik>
        <Form className="d-flex flex-column">
          <div className="d-flex flex-column  mb-2">
            <InputText label="Advertisement Name" type="text" />
          </div>

          <div className="d-flex flex-column align-items-center-start mb-1 position-relative">
            <InputText label="Advertisement Image" type="file" />
            <div className="d-flex align-items-center-end mb-2">
              <FileUploadOutlinedIcon className="upload-icon" />
            </div>
          </div>

          <div className="d-flex flex-column align-items-center-start mb-2">
            <InputText label= "Advertisement Video" type="file" />
            <div className="d-flex align-items-center-end">
              <FileUploadOutlinedIcon className="upload-icon" />
            </div>
          </div>

          <div className="d-flex flex-column align-items-center-start mb-2">
            <InputText label="City" type="text" />
          </div>

          <div className="d-flex flex-column align-items-center-start mb-2">
            <InputText label="Start Date" type="date" placeholder="07/07/43" />
          </div>

          <div className="d-flex flex-column align-items-center-start mb-2">
            <InputText label="End Date" type="date" />
          </div>

          <div className="d-flex justify-content-center pb-1">
            <button className="submit-ads-btn mt-2">Submit</button>
          </div>
        </Form>
      </Formik>
    </Paper>
  );
};

export default NewADS;
