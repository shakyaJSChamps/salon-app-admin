import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import { salonOwner, updateSalonOwner } from "../../../../api/account.api";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from "../Salondetails/Salondetails.module.css";
import ImageUpdate from "../../../common-component/Imageupdate/ImageUpdate";
import Notify from "../../../../utils/notify";
import { salonOwnerDetailsSchema } from "../../../../utils/schema";
import { formatDisplayDate, formatInputDate } from "../../../common-component/Formatdate/Formatdate";

function Salonownerdetails({ id, allowEdit }) {
    const [salonOwnerData, setSalonOwnerData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const getSalonOwner = async () => {
        try {
            const response = await salonOwner(id);
            setSalonOwnerData(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateOwner = async (values) => {
        try {
            const { phoneNumber, ...updatedValues } = values;
            const response = await updateSalonOwner(id, updatedValues);
            setIsEditing(false);
            Notify.success(response.data.message);
        } catch (error) {
        }
    }

    useEffect(() => {
        getSalonOwner();
    }, [id]);

    const handleImageUpload = (field, imagePath, setFieldValue) => {
        setFieldValue(field, imagePath);
    };

    const getMinDOBDate = () => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()).toISOString().split("T")[0];
    };

    return (
        <div>
            <style>
                {`
                    .custom-zoom-overlay .react-medium-image-zoom__overlay {
                        background-color: transparent !important;
                    }
                `}
            </style>
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Salon Owner Details</h4>
                <div>
                    {
                        allowEdit ? (
                            <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
                                <div>
                                    {!isEditing && (
                                        <button type="button" className={styles.btn} onClick={handleEditClick}>
                                            Edit
                                        </button>
                                    )}
                                    {isEditing && (
                                        <button type="submit" className={styles.btn} form="salonOwnerDetailsForm">
                                            Save
                                        </button>
                                    )}
                                </div>

                                <button type="button" className={styles.btn}>
                                    Restore
                                </button>

                            </div>
                        ) : (
                            null
                        )
                    }
                </div>
            </div>
            {salonOwnerData && (
                <Formik
                    initialValues={{
                        phoneNumber: salonOwnerData.phoneNumber || "",
                        firstName: salonOwnerData.firstName || "",
                        middleName: salonOwnerData.middleName || "",
                        lastName: salonOwnerData.lastName || "",
                        dateOfBirth: salonOwnerData.dateOfBirth || "",
                        gender: salonOwnerData.gender || "",
                        email: salonOwnerData.email || "",
                        panCardImgUrl: salonOwnerData.panCardImgUrl || "",
                        aadharFrontUrl: salonOwnerData.aadharFrontUrl || "",
                        aadharBackUrl: salonOwnerData.aadharBackUrl || "",
                        profileImageUrl: salonOwnerData.profileImageUrl || "",
                    }}
                    onSubmit={updateOwner}
                    validationSchema={salonOwnerDetailsSchema}
                    enableReinitialize
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form id="salonOwnerDetailsForm">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <InputText
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <ErrorMessage name="firstName" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Middle Name(Optional)"
                                        name="middleName"
                                        type="text"
                                        value={values.middleName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <ErrorMessage name="middleName" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Last Name(Optional)"
                                        name="lastName"
                                        type="text"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <ErrorMessage name="lastName" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <ErrorMessage name="email" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Grid>

                                {isEditing ? (<Grid item xs={4}>
                                    <InputText
                                        label="DOB"
                                        name="dateOfBirth"
                                        type="date"
                                        value={formatInputDate(values.dateOfBirth)}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        max={getMinDOBDate()}
                                    />
                                    <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
                                </Grid>) : (<Grid item xs={4}>
                                    <InputText
                                        label="DOB"
                                        name="dateOfBirth"
                                        type="text"
                                        value={formatDisplayDate(values.dateOfBirth)}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        max={getMinDOBDate()}
                                    />
                                    <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
                                </Grid>)}

                                <Grid item xs={4}>
                                    <InputText
                                        label="Gender"
                                        as="select"
                                        name="gender"
                                        className="input mb-2"
                                        type="text"
                                        value={values.gender}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </InputText>
                                    <ErrorMessage name="gender" component="div" className={styles.error} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>PanCard</label>
                                        <Zoom className="custom-zoom-overlay">
                                            <img
                                                src={values.panCardImgUrl}
                                                style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                alt="PanCard"
                                            />
                                        </Zoom>

                                        {isEditing && (
                                            <ImageUpdate
                                                name="panCardImgUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("panCardImgUrl", imagePath, setFieldValue)}
                                                allowEdit={true}
                                            />
                                        )}
                                    </div>
                                    <ErrorMessage name="panCardImgUrl" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={3}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                        <Zoom className="custom-zoom-overlay">
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

                                <Grid item xs={3}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                        <Zoom className="custom-zoom-overlay">
                                            <img
                                                src={values.aadharBackUrl}
                                                style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                alt="Aadhar Back"
                                            />
                                        </Zoom>

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

                                <Grid item xs={3} className="mb-3">
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Profile Image</label>
                                        <Zoom className="custom-zoom-overlay">
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
                            </Grid>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}

export default Salonownerdetails;
