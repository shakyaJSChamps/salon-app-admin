import React from "react";
import { MdOutlineContactMail } from "react-icons/md";
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Paper } from "@mui/material";
import InputText from "../common-component/Inputtext/InputText";
import { Form, Formik } from "formik";
import { addAdsType } from "../../api/account.api";
import SalesImageUploader from "../common-component/Salesimageuploader/SalesImageUploader";
import { handleOnFileSelect } from "../common-component/Imageuploader/ImageUploader";
import Notify from "../../utils/notify";

const NewADS = ({ selectedRow }) => {
  console.log("row Data ::>", selectedRow);

  const handleSubmit = async (values) => {
    console.log("Form Submission::", values);
    try {

      const formattedValues = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
        active: true
      };

      const response = await addAdsType(formattedValues);
      console.log("Add Advertisement Response:", response);
      Notify.success(response.data.message);
    } catch (error) {
      Notify.error(error.message);
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
          active: true
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, setFieldValue }) => (
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

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText name="city" label="City" type="text" value={values.city} />

            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText
                name="startDate"
                label="Start Date"
                type="date"
                placeholder="07/07/43"
                onChange={handleChange}
                value={values.startDate}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText name="endDate" label="End Date" type="date" onChange={handleChange} value={values.endDate} />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-1 position-relative">
              {/* <InputText
                name="mediaUrl"
                label="Advertisement Image"
                type="file"
                onChange={handleChange}
              />
              <div className="d-flex align-items-center-end mb-2">
                <FileUploadOutlinedIcon className="upload-icon" />
              </div> */}
              <SalesImageUploader name="mediaUrl" buttonName="Add" label="Advertisement Image" onFileSelect={(e) => handleOnFileSelect(e, "mediaUrl", setFieldValue)} />
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
