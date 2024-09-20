import React, { useState } from "react";
import { Paper } from "@mui/material";
import ellips from "../../assets/image/ellipse.webp";
import { Formik, Form, ErrorMessage } from "formik";
import { AccountSettingSchema } from "../../utils/schema";
import AccountDropDown from "./SettingDropDown";
import InputText from "../common-component/Inputtext/InputText";
import { IoIosSettings } from "react-icons/io";

const AccountSetting = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { label: "Account Setting", value: "" },
    // { label: "CMS Setting", value: "option1", route: "/setting/cms-setting" },
  ];

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };

  return (
    <Paper className="add-service-paper px-3 h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <IoIosSettings className="fs-3"/>
        <AccountDropDown
          options={options}
          selectedValue={selectedValue}
          handleChange={handleChange}
          className="fw-bold"
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
            <div className=" d-flex justify-content-center alig-items-center mx-auto  mb-2 w-50 flex-column mt-3 ">
            <InputText
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
            <div className="form-group  mx-auto mb-2 w-50">
              <InputText
              label= "Update Email"
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
            <div className="form-group mx-auto mb-2  w-50">
              <InputText
              label= "Password"
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
              <InputText
              label= "Confirm Password"
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
