import { ErrorMessage, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import InputText from "../common-component/Inputtext/InputText";
import { Checkbox, FormControlLabel } from "@mui/material";
import { subAdminSchema } from "../../utils/schema";
import { getFeatures, getRoles, createSubAdmin, putSubAdmin } from "../../api/account.api";
import Notify from "../../utils/notify";

const AddSubAdminForm = ({ rowData, fetchData, page, perPage, searchText, onClose }) => {
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  const [role, setRole] = useState([]);
  const [feature, setFeature] = useState([]);
  const [roleSelected, setRoleSelected] = useState(false);

  const initialValues = {
    firstName: rowData?.firstName || "",
    phoneNumber: rowData?.phoneNumber || "",
    email: rowData?.email || "",
    password: rowData?.password || "",
    roleName: rowData?.roleName || "",
    countryCode: rowData?.countryCode || "",
    roleId: rowData?.roleId || "",
    features: rowData?.features || [],
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRole(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await getFeatures();
      setFeature(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  useEffect(() => {
    if (rowData && role.length > 0) {
      const selectedRole = role.find((r) => r.roleName === rowData.roleName);
      if (selectedRole) {
        setRoleSelected(true);
        const selectedFeatures = selectedRole.features.map((f) => f.featureKey);
        initialValues.features = selectedFeatures;
      }
    }
  }, [role, rowData]);

  const handleSubmit = async (values, { resetForm }) => {
    const selectedRole = role.find((r) => r.roleName === values.roleName);
    const dataToSend = {
      firstName: values.firstName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      roleName: values.roleName,
      countryCode: values.countryCode,
      roleId: selectedRole ? selectedRole.roleId : "",
    };

    try {
      let response;
      if (rowData) {
        const updatedData = {
          firstName: values.firstName,
          phoneNumber: values.phoneNumber,
          roleName: values.roleName,
          countryCode: values.countryCode,
          roleId: selectedRole ? selectedRole.roleId : "",
        };
        response = await putSubAdmin(updatedData, rowData?.id);
        fetchData(page, perPage, searchText);
      } else {
        response = await createSubAdmin(dataToSend);
      }
      Notify.success(response.data.message);
      resetForm();
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <>
      <p className="ps-3 fw-bold mb-2">Add Sub Admin</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={subAdminSchema}
        enableReinitialize
      >
        {({ setFieldValue, values }) => {
          useEffect(() => {
            if (rowData && role.length > 0) {
              const selectedRole = role.find((r) => r.roleName === rowData.roleName);
              if (selectedRole) {
                const selectedFeatures = selectedRole.features.map((f) => f.featureKey);
                setFieldValue("features", selectedFeatures);
              }
            }
          }, [role, rowData, setFieldValue]);

          return (
            <Form autoComplete="off">
              <div className="d-flex flex-column mb-2 ps-3">
                <InputText name="firstName" label="Name" type="text" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>

              <div className="d-flex flex-column mb-2 ps-3">
                <InputText name="countryCode" label="Country Code" type="text" />
                <ErrorMessage name="countryCode" component="div" className="text-danger" />
              </div>

              <div className="d-flex flex-column mb-2 ps-3">
                <InputText name="phoneNumber" label="Mobile Number" type="tel" />
                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
              </div>

              {!rowData && (
                <>
                  <div className="d-flex flex-column mb-2 ps-3">
                    <InputText name="email" label="Email Id" type="email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="d-flex flex-column mb-2 ps-3">
                    <InputText
                      name="password"
                      label="Password"
                      type="text"
                      disabled={passwordGenerated}
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="autoGenerate"
                          checked={passwordGenerated}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setPasswordGenerated(isChecked);
                            if (isChecked) {
                              setFieldValue("password", generatePassword());
                            } else {
                              setFieldValue("password", rowData?.password || "");
                            }
                          }}
                        />
                      }
                      label="Auto Generate"
                    />
                  </div>
                </>
              )}

              <div className="d-flex flex-column mb-2 ps-3">
                <label style={{ fontWeight: "500" }}>Role</label>
                <select
                  name="roleName"
                  value={values.roleName}
                  onChange={(e) => {
                    const selectedRole = role.find((r) => r.roleName === e.target.value);
                    const selectedFeatures = selectedRole ? selectedRole.features.map((f) => f.featureKey) : [];
                    setRoleSelected(!!selectedRole);
                    setFieldValue("roleName", e.target.value);
                    setFieldValue("features", selectedFeatures);
                  }}
                  className="Form-control input"
                  style={{outline: "none"}}
                >
                  <option value="" label="Select role" />
                  {role.map((data, index) => (
                    <option key={index} value={data.roleName}>
                      {data.roleName}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="roleName" component="div" className="text-danger" />
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
                              if (!roleSelected) {
                                const newFeatures = e.target.checked
                                  ? [...values.features, featureData.featureKey]
                                  : values.features.filter((key) => key !== featureData.featureKey);
                                setFieldValue("features", newFeatures);
                              }
                            }}
                            disabled={roleSelected}
                            sx={{
                              color: 'blue',
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
                >
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddSubAdminForm;
