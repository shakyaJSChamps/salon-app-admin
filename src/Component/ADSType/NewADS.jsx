import React, { useEffect, useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { Paper } from "@mui/material";
import InputText from "../common-component/Inputtext/InputText";
import { Form, Formik } from "formik";
import { addAdsType, putAdsType } from "../../api/account.api";
import SalesImageUploader from "../common-component/Salesimageuploader/SalesImageUploader";
import { handleOnFileSelect } from "../common-component/Imageuploader/ImageUploader";
import Notify from "../../utils/notify";

const NewADS = ({ selectedRow, onAddAd, onUpdateAd }) => {
  const [uploaderKey, setUploaderKey] = useState(Date.now());
  const [initialValues, setInitialValues] = useState({
    name: "",
    mediaUrl: "",
    redirectLink: "",
    city: "",
    startDate: "",
    endDate: "",
    active: true,
  });

  useEffect(() => {
    if (selectedRow) {
      setInitialValues({
        name: selectedRow.name || "",
        mediaUrl: selectedRow.mediaUrl || "",
        redirectLink: selectedRow.redirectLink || "",
        city: selectedRow.city || "",
        startDate: selectedRow.startDate
          ? new Date(selectedRow.startDate).toISOString().split("T")[0]
          : "",
        endDate: selectedRow.endDate
          ? new Date(selectedRow.endDate).toISOString().split("T")[0]
          : "",
        active: selectedRow.active || true,
      });
    }
  }, [selectedRow]);

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form Submission::", values);
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate
          ? new Date(values.startDate).toISOString()
          : null,
        endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
        active: true,
      };

      let response;
      if (selectedRow) {
        response = await putAdsType(formattedValues, selectedRow.id);
        onUpdateAd(response.data); // Update the parent state with the updated ad
      } else {
        response = await addAdsType(formattedValues);
        onAddAd(response.data); // Add the new ad to the parent state
      }
      console.log("Add/Update Advertisement Response:", response);
      Notify.success(response.data.message);
      resetForm();
      setUploaderKey(Date.now()); // Update the key to reset the uploader
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <Paper className="ads-add-paper px-3 h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContactMail />
        <p className="ps-1 fw-bold mb-0">{selectedRow ? "Edit" : "Add"} Advertisement</p>
      </div>
      <hr />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className="d-flex flex-column">
            <div className="d-flex flex-column mb-2">
              <InputText
                name="name"
                label="Advertisement Name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText
                name="city"
                label="City"
                type="text"
                value={values.city}
                onChange={handleChange}
              />
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
              <InputText
                name="endDate"
                label="End Date"
                type="date"
                onChange={handleChange}
                value={values.endDate}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-1 position-relative">
              <SalesImageUploader
                key={uploaderKey} // Add the key prop to reset the uploader
                name="mediaUrl"
                buttonName={selectedRow ? "Update Image" : "Add Image"}
                label="Advertisement Image"
                onFileSelect={(e) =>
                  handleOnFileSelect(e, "mediaUrl", setFieldValue)
                }
              />
            </div>

            <div className="d-flex justify-content-center pb-1">
              <button type="submit" className="submit-ads-btn mt-2">
                {selectedRow ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default NewADS;
