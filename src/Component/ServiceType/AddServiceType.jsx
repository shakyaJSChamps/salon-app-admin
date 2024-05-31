import React, { useState, useEffect } from "react";
import { MdOutlineContentPaste } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";
import { Paper } from "@mui/material";
import { Form, Formik, ErrorMessage } from "formik";
import Notify from "../../utils/notify";
import InputText from "../common-component/Inputtext/InputText";
import { addServiceType, putServiceType } from "../../api/account.api";
import ImageUpdate from "../common-component/Imageupdate/ImageUpdate";
import { addServiceTypeSchema } from "../../utils/schema";

const AddServiceType = (props) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    imageUrl: "",
    active: true,
  });

  useEffect(() => {
    if (props.isEditMode && props.selectedRowData) {
      setInitialValues({
        name: props.selectedRowData.name || "",
        imageUrl: props.selectedRowData.imageUrl || "",
        active: props.selectedRowData.active || true,
      });
    } else {
      setInitialValues({
        name: "",
        imageUrl: "",
        active: true,
      });
    }
  }, [props.isEditMode, props.selectedRowData]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = { ...values };

      let response;
      if (props.isEditMode && props.selectedRowData) {
        response = await putServiceType(formattedValues, props.selectedRowData.id);
        props.setServiceAdded(response.data.data);
      } else {
        response = await addServiceType(formattedValues);
        props.setServiceAdded(response.data.data);
      }
      Notify.success(response.data.message);
      resetForm(); // Reset the form after successful submission
      setInitialValues({
        name: "",
        imageUrl: "",
        active: true,
      });
      // Reset to Add mode after update
      if (props.isEditMode) {
        props.setIsEditMode(false);
      }
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const buttonStyle = {
    padding: props.isEditMode ? '1.5px 10px' : '3px 20px',
    backgroundColor: '#000',
    border: '2px solid #909090',
    borderRadius: '12px',
    marginTop: props.isEditMode ? '21px' : '10px',
    fontSize: '11px',
    height: props.isEditMode ? '48px' : '300px',
    width: props.isEditMode ? '290px' : '295px'
  };

  return (
    <Paper className="add-service-paper px-3 h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className="ps-1 fw-bold mb-0">
          {props.isEditMode ? "Edit" : "Add"} Service Type
        </p>
        {props.isEditMode && (
          <BiPlusCircle
            className="cursor-pointer ms-auto"
            onClick={() => props.setIsEditMode(false)}
          />
        )}
      </div>
      <hr />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addServiceTypeSchema}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className="d-flex flex-column">
            <div className="d-flex flex-column mb-2">
              <InputText
                name="name"
                label="Service Name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>

            <div className="d-flex flex-column align-items-center mb-2">
              <label style={{ fontWeight: 500 }}>Service Image</label>
              {values.imageUrl ? (
                <img src={values.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              ) : (
                <ImageUpdate
                  name="imageUrl"
                  buttonName="Add Image"
                  inputClassName="form-control input"
                  buttonStyle={buttonStyle}
                  onImageUpload={(url) => {
                    setFieldValue("imageUrl", url);
                  }}
                />
              )}
              {props.isEditMode && values.imageUrl && (
                <ImageUpdate
                  name="imageUrl"
                  buttonName="Update Image"
                  inputClassName="form-control input"
                  buttonStyle={buttonStyle}
                  onImageUpload={(url) => {
                    setFieldValue("imageUrl", url);
                  }}
                />
              )}
              <ErrorMessage name="imageUrl" component="div" style={{ color: 'red' }} />
            </div>

            <div className="d-flex justify-content-center pb-1">
              <button type="submit" className="add-service-btn mt-2">
                {props.isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AddServiceType;
