import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Grid, FormControl, Select, MenuItem } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import { salonStaff, updateSalonStaff } from "../../../../api/account.api";
import styles from "./Managestaff.module.css";
import ImageUpdate from "../../../common-component/Imageupdate/ImageUpdate";
import Notify from "../../../../utils/notify.js";

function Managestaff({ id }) {
    const [staffList, setStaffList] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStaffList = async () => {
            try {
                const response = await salonStaff(id);
                setStaffList(response?.data?.data || []);
                setIsLoading(false);

                if (response?.data?.data.length > 0) {
                    setSelectedStaffId(response.data.data[0].id);
                }
            } catch (error) {
                console.error("Error fetching staff list:", error);
                setIsLoading(false);
            }
        };
        fetchStaffList();
    }, [id]);

    useEffect(() => {
        if (selectedStaffId !== null) {
            const staffMember = staffList.find(staff => staff.id === selectedStaffId);
            setSelectedStaff(staffMember || null);
        } else {
            setSelectedStaff(null);
        }
    }, [selectedStaffId, staffList]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChangeSelect = (event) => {
        const staffId = event.target.value;
        setSelectedStaffId(staffId);
        const selected = staffList.find(staff => staff.id === staffId);
        setSelectedStaff(selected || null);
    };

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const response = await updateSalonStaff(id, selectedStaffId, values);
            console.log("updateSalonStaff ->", response);
            setIsEditing(false);
            Notify.success(response.data.message);
        } catch (error) {
            Notify.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageUpload = (field, imagePath, setFieldValue) => {
        setFieldValue(field, imagePath);
    };

    return (
        <div className="mb-3">
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Staff Details</h4>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    {!isEditing && selectedStaffId !== null && (
                        <button type="button" onClick={handleEditClick} className={styles.button}>
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button type="submit" form="staffDetailsForm" className={styles.button}>
                            Save
                        </button>
                    )}
                </div>
            </div>

            <label className={`${styles.label} mb-2`}>Select Staff</label>
            <Select
                value={selectedStaffId || ""}
                onChange={handleChangeSelect}
                className="form-control input mb-3"
            >
                {staffList.map(staff => (
                    <MenuItem key={staff.id} value={staff.id} className={styles.size}>
                        {staff.firstName}
                    </MenuItem>
                ))}
            </Select>

            {isLoading ? (
                <p>Loading...</p>
            ) : selectedStaff ? (
                <Formik
                    initialValues={{
                        firstName: selectedStaff.firstName || "",
                        lastName: selectedStaff.lastName || "",
                        email: selectedStaff.email || "",
                        phoneNumber: selectedStaff.phoneNumber || "",
                        dataOfBirth: selectedStaff.dataOfBirth || "",
                        gender: selectedStaff.gender || "",
                        profileImageUrl: selectedStaff.profileImageUrl || "",
                        aadharFrontUrl: selectedStaff.aadharFrontUrl || "",
                        aadharBackUrl: selectedStaff.aadharBackUrl || "",
                        specialization: selectedStaff.specialization || "",
                        role: selectedStaff.role || ""
                    }}
                    enableReinitialize  // Enable reinitialization when initialValues change
                    onSubmit={editDetails}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form id="staffDetailsForm">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <InputText
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.firstName}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.lastName}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.email}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Date of Birth"
                                        name="dataOfBirth"
                                        type="date"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.dataOfBirth}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Gender"
                                        name="gender"
                                        type="text"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.gender}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Specialization"
                                        name="specialization"
                                        type="text"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.specialization}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputText
                                        label="Role"
                                        name="role"
                                        type="text"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        value={values.role}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Profile Image</label>
                                        <img
                                            src={values.profileImageUrl}
                                            style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                            alt="Profile Image"
                                        />
                                        {isEditing && (
                                            <ImageUpdate
                                                name="profileImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("profileImageUrl", imagePath, setFieldValue)}
                                                allowEdit={true}
                                            />
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                        <img
                                            src={values.aadharFrontUrl}
                                            style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                            alt="Aadhar Front"
                                        />
                                        {isEditing && (
                                            <ImageUpdate
                                                name="aadharFrontUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("aadharFrontUrl", imagePath, setFieldValue)}
                                                allowEdit={true}
                                            />
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                        <img
                                            src={values.aadharBackUrl}
                                            style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                            alt="Aadhar Back"
                                        />
                                        {isEditing && (
                                            <ImageUpdate
                                                name="aadharBackUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("aadharBackUrl", imagePath, setFieldValue)}
                                                allowEdit={true}
                                            />
                                        )}
                                    </div>
                                </Grid>
                            </Grid>

                        </Form>
                    )}
                </Formik>

            ) : (
                <p>No staff selected</p>
            )}
        </div>
    );
}

export default Managestaff;
