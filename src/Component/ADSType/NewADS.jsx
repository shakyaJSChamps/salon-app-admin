import React from "react";
import { MdOutlineContactMail } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Paper } from "@mui/material";
import InputText from "../common-component/Inputtext/InputText";
import { Form, Formik } from "formik";
import { addAdsType } from "../../api/account.api";

const NewADS = ({ selectedRow }) => {
  console.log("row Data ::>", selectedRow);

  const handleSubmit = async (values) => {
    console.log("Form Submission::", values);
    try {
      const response = await addAdsType(values);
      console.log("Add Advertisement Response:", response);
    } catch (error) {
      console.error("Error adding advertisement:", error);
    }
  };

  return (
    <Paper className="ads-add-paper px-3  h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContactMail />
        <p className=" ps-1 fw-bold  mb-0">Add New Advertisement</p>
      </div>
      <hr />
      <Formik
        initialValues={{
          name: "",
          mediaUrl: "",
          redirectLink: "",
          city: "",
          startDate: "",
          endDate: "",
          active: true,
        }}
        onSubmit={handleSubmit}
      >
        {({handleChange, values }) => (
          <Form className="d-flex flex-column">
            <div className="d-flex flex-column  mb-2">
              <InputText
                name="name"
                label="Advertisement Name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-1 position-relative">
              <InputText
                name="mediaUrl"
                label="Advertisement Image"
                type="file"
              />
              <div className="d-flex align-items-center-end mb-2">
                <FileUploadOutlinedIcon className="upload-icon" />
              </div>
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText name="city" label="City" type="text" />
              onChange={handleChange}
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText
                name="startDate"
                label="Start Date"
                type="date"
                placeholder="07/07/43"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText name="endDate" label="End Date" type="date"  onChange={handleChange} />
            </div>

            <div className="d-flex justify-content-center pb-1">
              <button type="submit" className="submit-ads-btn mt-2">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default NewADS;
