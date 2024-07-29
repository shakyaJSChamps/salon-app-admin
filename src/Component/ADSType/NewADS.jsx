import React, { useEffect, useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";
import { Paper } from "@mui/material";
import InputText from "../common-component/Inputtext/InputText";
import { Form, Formik, ErrorMessage } from "formik";
import { addAdsType, putAdsType } from "../../api/account.api";
import Notify from "../../utils/notify";
import { newADSSchema } from "../../utils/schema";
import ImageUpdate from "../common-component/Imageupdate/ImageUpdate";
import { formatInputDate } from "../common-component/Formatdate/Formatdate";
import { format, parse } from "date-fns";

const NewADS = ({ selectedRow, onAddAd, onUpdateAd, onClearSelectedRow, allowEdit }) => {
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

  // Utility function to validate date
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Utility function to format date to dd-MM-yyyy
  const formatToDDMMYYYY = (date) => {
    if (!isValidDate(date)) return '';
    return format(date, 'dd-MM-yyyy');
  };

  useEffect(() => {
    if (selectedRow) {
      setInitialValues({
        name: selectedRow.name || "",
        mediaUrl: selectedRow.mediaUrl || "",
        redirectLink: selectedRow.redirectLink || "",
        city: selectedRow.city || "",
        startDate: selectedRow.startDate
          ? formatInputDate(selectedRow.startDate)
          : "",
        endDate: selectedRow.endDate
          ? formatInputDate(selectedRow.endDate)
          : "",
        active: selectedRow.active || true,
      });
    } else {
      setInitialValues({
        name: "",
        mediaUrl: "",
        redirectLink: "",
        city: "",
        startDate: "",
        endDate: "",
        active: true,
      });
    }
  }, [selectedRow]);

  const handleSubmit = async (values, { resetForm }) => {
    // Convert dates to the format expected by the API
    const convertToAPIFormat = (date) => {
      if (!date) return '';
      const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
      return isValidDate(parsedDate) ? formatToDDMMYYYY(parsedDate) : '';
    };
    try {
      const formattedValues = {
        ...values,
        startDate: convertToAPIFormat(values.startDate),
        endDate: convertToAPIFormat(values.endDate),
        active: true,
      };

      let response;
      if (selectedRow) {
        response = await putAdsType(formattedValues, selectedRow.id);
        onUpdateAd(response.data.data);
      } else {
        response = await addAdsType(formattedValues);
        console.log("Advertisement", response);
        onAddAd(response.data.data);
      }
      Notify.success(response.data.message);
      resetForm();
      setUploaderKey(Date.now());
      onClearSelectedRow();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const clearForm = () => {
    setInitialValues({
      name: "",
      mediaUrl: "",
      redirectLink: "",
      city: "",
      startDate: "",
      endDate: "",
      active: true,
    });
    onClearSelectedRow();
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Paper className="ads-add-paper px-3 h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContactMail />
        <p className="ps-1 fw-bold mb-0">
          {selectedRow ? "Edit" : "Add"} Advertisement
        </p>
        {selectedRow && (
          <BiPlusCircle
            onClick={clearForm}
            className="cursor-pointer ms-auto"
          />
        )}
      </div>
      <hr />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={newADSSchema}
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
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
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
              <ErrorMessage
                name="city"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText
                name="startDate"
                label="Start Date"
                type="date"
                placeholder="07/07/43"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("endDate", "");
                }}
                value={values.startDate}
                min={currentDate}
              />
              <ErrorMessage
                name="startDate"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start mb-2">
              <InputText
                name="endDate"
                label="End Date"
                type="date"
                onChange={handleChange}
                value={values.endDate}
                min={values.startDate || currentDate}
              />
              <ErrorMessage
                name="endDate"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="d-flex flex-column align-items-center-start">
              <label className="fw-bold">Advertisement Image</label>
              {values.mediaUrl && (
                <div className="d-flex justify-content-center align-items-center">
                  <img src={values.mediaUrl} alt="Advertisement" className=" mb-2" style={{ height: "150px", width: "300px" }} />
                </div>
              )}
              <ImageUpdate
                name="mediaUrl"
                buttonName={selectedRow ? "Update Image" : "Add Image"}
                inputClassName="form-control input"
                onImageUpload={(url) => {
                  setFieldValue("mediaUrl", url);
                }}
                mediaUrl={values.mediaUrl}
                allowEdit={allowEdit}
              />
              <ErrorMessage
                name="mediaUrl"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="d-flex justify-content-center ">
              <button type="submit" className="submit-ads-btn mt-4 mb-4">
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
