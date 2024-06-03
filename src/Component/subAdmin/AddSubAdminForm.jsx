import { ErrorMessage, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import InputText from "../common-component/Inputtext/InputText";
import { Checkbox, FormControlLabel } from "@mui/material";
import { subAdminSchema } from "../../utils/schema";
import { getFeatures, getRoles } from "../../api/account.api";

const AddSubAdminForm = () => {
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  const [role, setRole] = useState([]);
  const [feature, setFeature] = useState([]);
  const [roleSelected, setRoleSelected] = useState(false);

  console.log("features", feature);
  console.log("role", role)

  const initialValues = {
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    autoGenerate: false,
    role: "",
    features: [],
  };

  const roles = async () => {
    try {
      const response = await getRoles();
      setRole(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    roles();
  }, []);

  const features = async () => {
    try {
      const response = await getFeatures();
      setFeature(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    features();
  }, []);

  const handleSubmit = (values) => {
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
        {({ isSubmitting, setFieldValue, values }) => (
          <Form autoComplete="off">
            <div className="d-flex flex-column mb-2 ps-3">
              <InputText name="name" label="Name" type="text" />
              <ErrorMessage name="name" component="div" className="text-danger" />
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
              <InputText name="email" label="Email Id" type="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="d-flex flex-column mb-2 ps-3">
              <InputText
                name="password"
                label="Password"
                type="password"
                disabled={passwordGenerated}
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
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

            <div className="d-flex flex-column mb-2 ps-3">
              <label  style={{fontWeight: "500"}}>Role</label>
              <select
                name="role"
                value={values.role}
                onChange={(e) => {
                  const selectedRole = role.find(r => r.roleName === e.target.value);
                  const selectedFeatures = selectedRole ? selectedRole.features.map(f => f.featureKey) : [];
                  setRoleSelected(!!selectedRole); // Set roleSelected to true if a role is selected
                  setFieldValue("role", e.target.value);
                  setFieldValue("features", selectedFeatures);
                }}
                className="form-control input"
              >
                <option value="" label="Select role" />
                {role.map((data, index) => (
                  <option key={index} value={data.roleName}>
                    {data.roleName}
                  </option>
                ))}
              </select>
              <ErrorMessage name="role" component="div" className="text-danger" />
            </div>

            <label className="mt-3 ps-3 fw-bold">Access Module</label>
            <div className="container">
              <div className="row">
                {feature.map((featureData, index) => (
                  <div className="col-md-6" key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.features.includes(featureData.featureKey)}
                          onChange={(e) => {
                            if (!roleSelected) { // Prevent modification if a role is selected
                              const newFeatures = e.target.checked
                                ? [...values.features, featureData.featureKey]
                                : values.features.filter(key => key !== featureData.featureKey);
                              setFieldValue("features", newFeatures);
                            }
                          }}
                          disabled={roleSelected} // Disable if a role is selected
                          sx={{
                            color: values.features.includes(featureData.featureKey) ? 'blue' : 'default',
                            '&.Mui-checked': {
                              color: 'blue',
                            },
                          }}
                        />
                      }
                      label={featureData.featuresName}
                    />
                  </div>
                ))}
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
