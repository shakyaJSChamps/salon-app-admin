import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Grid, FormControl, Select, MenuItem, FormControlLabel } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import { deleteStaff, salonStaff, updateSalonStaff } from "../../../../api/account.api";
import styles from "./Managestaff.module.css";
import ImageUpdate from "../../../common-component/Imageupdate/ImageUpdate";
import Notify from "../../../../utils/notify.js";
import { salonStaffSchema } from "../../../../utils/schema.js";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Swal from "sweetalert2";
import AddStaff from "./AddStaff.jsx";
import { formatDisplayDate, formatInputDate } from "../../../common-component/Formatdate/Formatdate.jsx";

function Managestaff({ id }) {
    const [staffList, setStaffList] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

    const handleAddStaffClick = () => {
        setIsAddStaffModalOpen(true);
    };

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

    useEffect(() => {
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
            fetchStaffList();
            setIsEditing(false);
            Notify.success(response.data.message);
        } catch (error) {
            Notify.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const removeStaff = async () => {
        try {
            const result = await Swal.fire({
                title: "Warning",
                text: "Are you sure you want to delete this Staff ?",
                icon: "warning",
                width: "30%",
                showCancelButton: true,
                confirmButtonColor: " black",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete",
                customClass: "custom-swal",
            });

            if (result.isConfirmed) {
                await deleteStaff(id, selectedStaffId);
                fetchStaffList();
                Notify.success(" Staff removed Successfully");
            }
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const handleImageUpload = (field, imagePath, setFieldValue) => {
        setFieldValue(field, imagePath);
    };

    const getMinDOBDate = () => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()).toISOString().split("T")[0];
    };

    return (
        <div className="mb-3">
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Staff Details</h4>
            </div>
            {staffList.length === 0 ? (null) :
                (<div className="d-flex justify-content-between align-items-center">
                    <FormControl sx={{ minWidth: 323 }} >
                        <label className={`${styles.label} mb-1`}>Select Staff</label>
                        <Select
                            value={selectedStaffId || ""}
                            onChange={handleChangeSelect}
                            className={`form-control input mb-3 ${styles.dropdown}`}
                        >
                            {staffList.map(staff => (
                                <MenuItem key={staff.id} value={staff.id} className={styles.size}>
                                    {staff.firstName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className="d-flex justify-content-start align-items-center mb-3">
                        <div className="d-flex gap-2">
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
                            <button type="button" onClick={handleAddStaffClick} className={styles.button}>
                                Add
                            </button>

                            <button type="button" onClick={removeStaff} className={styles.button}>
                                Delete
                            </button>

                        </div>
                        <AddStaff isOpen={isAddStaffModalOpen} onClose={() => setIsAddStaffModalOpen(false)} allowEdit={true} id={id} fetchStaffList={fetchStaffList} />

                    </div>
                </div>)
            }

            {
                isLoading ? (
                    <p>Loading...</p>
                ) : selectedStaff ? (
                    <Formik
                        initialValues={{
                            firstName: selectedStaff.firstName || "",
                            lastName: selectedStaff.lastName || "",
                            email: selectedStaff.email || "",
                            phoneNumber: selectedStaff.phoneNumber || "",
                            dateOfBirth: selectedStaff.dateOfBirth || "",
                            gender: selectedStaff.gender || "",
                            profileImageUrl: selectedStaff.profileImageUrl || "",
                            aadharFrontUrl: selectedStaff.aadharFrontUrl || "",
                            aadharBackUrl: selectedStaff.aadharBackUrl || "",
                            specialization: selectedStaff.specialization || "",
                            role: selectedStaff.role || ""
                        }}
                        enableReinitialize
                        onSubmit={editDetails}
                        validationSchema={salonStaffSchema}
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
                                        <ErrorMessage name="firstName" component="div" className={styles.error} />
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
                                        <ErrorMessage name="lastName" component="div" className={styles.error} />

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
                                        <ErrorMessage name="email" component="div" className={styles.error} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <InputText
                                            label="Phone Number"
                                            name="phoneNumber"
                                            type="text"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            value={values.phoneNumber}
                                            maxLength={10}
                                        />
                                        <ErrorMessage name="phoneNumber" component="div" className={styles.error} />
                                    </Grid>

                                    {isEditing ? (<Grid item xs={4}>
                                        <InputText
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            type="date"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            value={formatInputDate(values.dateOfBirth)}
                                            max={getMinDOBDate()}
                                        />
                                        <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
                                    </Grid>) : (<Grid item xs={4}>
                                        <InputText
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            type="text"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            value={formatDisplayDate(values.dateOfBirth)}
                                            max={getMinDOBDate()}
                                        />
                                        <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
                                    </Grid>)}

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Gender"
                                            as="select"
                                            name="gender"
                                            type="text"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            value={values.gender}
                                            className="input"
                                        >


                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </InputText>

                                        <ErrorMessage name="gender" component="div" className={styles.error} />
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
                                        <ErrorMessage name="specialization" component="div" className={styles.error} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <InputText
                                            label="Role"
                                            as="select"
                                            name="role"
                                            type="text"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            value={values.role}
                                            className="input"
                                        >
                                            <option value="Staff">Staff</option>
                                            <option value="Manager">Manager</option>
                                        </InputText>
                                        <ErrorMessage name="role" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid container spacing={2} className="px-3 mt-1">
                                        <Grid item xs={4}>
                                            <div className="d-flex flex-column">
                                                <label style={{ fontWeight: 500 }}>Profile Image</label>
                                                <Zoom>
                                                    <img
                                                        src={values.profileImageUrl}
                                                        style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                        alt="Profile Image"
                                                    />
                                                </Zoom>

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
                                            <ErrorMessage name="profileImageUrl" component="div" className={styles.error} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className="d-flex flex-column">
                                                <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                                <Zoom>
                                                    <img
                                                        src={values.aadharFrontUrl}
                                                        style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                        alt="Aadhar Front"
                                                    />
                                                </Zoom>

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
                                            <ErrorMessage name="aadharFrontUrl" component="div" className={styles.error} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className="d-flex flex-column">
                                                <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                                <Zoom> <img
                                                    src={values.aadharBackUrl}
                                                    style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                    alt="Aadhar Back"
                                                /></Zoom>
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
                                            <ErrorMessage name="aadharBackUrl" component="div" className={styles.error} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Form>
                        )}
                    </Formik>

                ) : (

                    <div className="text-end ">
                        <button type="button" onClick={handleAddStaffClick} className={`${styles.button}`}>
                            Add
                        </button>
                        <AddStaff isOpen={isAddStaffModalOpen} onClose={() => setIsAddStaffModalOpen(false)} allowEdit={true} id={id} fetchStaffList={fetchStaffList} />
                    </div>


                )
            }
        </div >
    );
}

export default Managestaff;
