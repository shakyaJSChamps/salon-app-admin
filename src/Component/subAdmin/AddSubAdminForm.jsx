import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import InputText from "../common-component/Inputtext/InputText";
import { Checkbox, FormControlLabel } from "@mui/material";
import { subAdminSchema } from "../../utils/schema";

const AddSubAdminForm = () => {

    const [passwordGenerated, setPasswordGenerated] = useState(false);

  const initialValues = {
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    autoGenerate: false,
  };

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log("Form submitted with values:", values);
  };

  return (
    <>
      <p className="ps-3 fw-bold mb-2">Add Sub Admin</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={subAdminSchema}
      >
        {({ isSubmitting, setFieldValue  }) => (
          <Form autoComplete="off">
            <div className="d-flex flex-column mb-2 ps-3">
              {/* <input type="text" name="fake-name" style={{ display: 'none' }} autoComplete="new-name" /> */}
             <InputText name="name" label="Name" type="text" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex flex-column mb-2 ps-3">
              <InputText name="mobileNumber" label="Mobile Number" type="tel" />
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex flex-column mb-2 ps-3">
              <InputText
                name="email"
                label="Email Id"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex flex-column mb-2 ps-3">
              <InputText
                name="password"
                label="Password"
                type="password"
                disabled={passwordGenerated}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="autoGenerate"
                    checked={passwordGenerated}
                    onChange={(e) => {
                      setPasswordGenerated(e.target.checked);
                      setFieldValue(
                        "password",
                        e.target.checked ? "auto-generated-password" : ""
                      );
                    }}
                  />
                }
                label="Auto Generate"
              />
            </div>
            <label className="mt-3 ps-3 fw-bold">Access Module</label>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="user-management" />}
                    label="User Management"
                  />
                </div>
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="salon-management" />}
                    label="Salon Management"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="coupon-management" />}
                    label="Coupon Management"
                  />
                </div>
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="service-type" />}
                    label="Service Type"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="sales-person" />}
                    label="Sales Person"
                  />
                </div>
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="advertisement" />}
                    label="Advertisement"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormControlLabel
                    control={<Checkbox id="setting" />}
                    label="Setting"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="add-sub-admin mt-1"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddSubAdminForm;
