import React, { useState } from "react";
import { Paper } from "@mui/material";
import { MdSettingsSuggest } from "react-icons/md";
import ellips from "../../assets/image/ellipse.webp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AccountSettingSchema } from "../../utils/schema";
import AccountDropDown from "./SettingDropDown";

const AccountSetting = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { label: "Account Setting", value: "" },
    { label: "CMS Setting", value: "option1", route: "/setting/cms-setting" },
  ];

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };

  return (
    <Paper className="add-service-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdSettingsSuggest />
        <AccountDropDown
          options={options}
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </div>
      <hr />
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={AccountSettingSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form values:", values);
          // Your form submission logic here
          setSubmitting(false);
        }}
      >
        {({ touched, errors }) => (
          <Form className="d-flex justify-content-center alig-items-center mx-auto w-50 flex-column">
            <div className="account-form d-flex justify-content-center alig-items-center">
              <img src={ellips} alt="ellips-img" />
            </div>
            <div className=" d-flex justify-content-center alig-items-center mx-auto  w-50 flex-column mt-3">
            <Field
                type="text"
                name="username"
                placeholder="Enter username"
                className={`form-control input ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group  mx-auto  w-50">
              <label htmlFor="email" className="fw-bold ps-3 mt-3">
                Update Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                autoComplete="off"
                className={`form-control input ${
                  touched.email && errors.email ? "is-invalid" : " "
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group mx-auto  w-50">
              <label htmlFor="password" className="mt-3 ">
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className={`form-control input ${
                  touched.password && errors.password ? "is-invalid" : " "
                }`}
              />
              <ErrorMessage
                component="div"
                name="password"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group mb-3 mx-auto  w-50">
              <label htmlFor="confirmPassword" className="fw-bold ps-3 mt-3">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={`form-control input ${
                  touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button type="submit" className="button mb-3 mx-auto">
              Update
            </button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AccountSetting;
