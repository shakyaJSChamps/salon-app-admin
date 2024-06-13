import React, { useState, useEffect } from "react";
import styles from "../updateSalesDetails/Updatesalesdetails.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import Notify from "../../../utils/notify.js";
import InputText from "../../common-component/Inputtext/InputText.jsx";
import { updateSaleDetails, salesDetail } from "../../../api/account.api.js";
import { salesDetailsSchema } from "../../../utils/schema.js";
import ImageUpdate from "../../common-component/Imageupdate/ImageUpdate.jsx";
import Salessalon from "../salesSalon/Salessalon.jsx";

function UpdateSalesDetails({ payload, id }) {
    const [isEditing, setIsEditing] = useState(false);
    const [saleDetails, setSaleDetails] = useState({});
    const [previewImages, setPreviewImages] = useState({
        bankdocumentImageUrl: null,
        panCardImageUrl: null,
        aadharFrontImageUrl: null,
        aadharBackImageUrl: null,
        profileImageUrl: null,
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        const fetchSalesDetail = async () => {
            try {
                const data = await salesDetail(payload, id);
                console.log("Single sale data-->", data);
                setSaleDetails(data?.data?.data || {});
            } catch (error) {
                console.error('Error fetching salon details:', error);
            }
        };
        fetchSalesDetail();
    }, [id]);

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const response = await updateSaleDetails(values, saleDetails.userId);
            console.log("updateSaleDetails ->", response);
            Notify.success(response.data.message);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageUpload = (field, imagePath) => {
        setSaleDetails((prevState) => ({
            ...prevState,
            [field]: imagePath,
        }));
        setPreviewImages((prevState) => ({
            ...prevState,
            [field]: imagePath,
        }));
    };

    return (
        <>
        <div className={styles.mainDiv}>
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Sales Details</h4>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    {!isEditing && (
                        <button type="button" onClick={handleEditClick} className={styles.button}>
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button type="submit" form="salesDetails" className={styles.button}>
                            Save
                        </button>
                    )}
                </div>
            </div>
            <Formik
                initialValues={{
                    phoneNumber: saleDetails.phoneNumber || "",
                    countryCode: saleDetails.countryCode || "",
                    firstName: saleDetails.firstName || "",
                    middleName: saleDetails.middleName || "",
                    lastName: saleDetails.lastName || "",
                    dob: saleDetails.dob || "",
                    gender: saleDetails.gender || "",
                    email: saleDetails.email || "",
                    accountNumber: saleDetails.accountNumber || "",
                    accountHolderName: saleDetails.accountHolderName || "",
                    bankName: saleDetails.bankName || "",
                    ifscCode: saleDetails.ifscCode || "",
                    address: saleDetails.address || "",
                    bankdocumentImageUrl: saleDetails.bankdocumentImageUrl || "",
                    panCardImageUrl: saleDetails.panCardImageUrl || "",
                    aadharFrontImageUrl: saleDetails.aadharFrontImageUrl || "",
                    aadharBackImageUrl: saleDetails.aadharBackImageUrl || "",
                    profileImageUrl: saleDetails.profileImageUrl || "",
                    upiID: saleDetails.upiID || " ",
                }}
                onSubmit={editDetails}
                validationSchema={salesDetailsSchema}
                enableReinitialize
            >
                {({ setFieldValue, handleChange, values, isSubmitting }) => (
                    <Form id="salesDetails">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <InputText
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.firstName}
                                />
                                <ErrorMessage name="firstName" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Middle Name"
                                    name="middleName"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.middleName}
                                />
                                <ErrorMessage name="middleName" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.lastName}
                                />
                                <ErrorMessage name="lastName" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Email"
                                    name="email"
                                    type="email"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Phone Number"
                                    name="phoneNumber"
                                    type="text"
                                    disabled
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                />
                                <ErrorMessage name="phoneNumber" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Country Code"
                                    name="countryCode"
                                    type="text"
                                    disabled
                                    onChange={handleChange}
                                    value={values.countryCode}
                                />
                                <ErrorMessage name="countryCode" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="DOB"
                                    name="dob"
                                    type="date"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.dob}
                                    max={new Date().toISOString().split("T")[0]}
                                />
                                <ErrorMessage name="dob" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <div>
                                    <InputText
                                        label="Gender"
                                        as="select"
                                        name="gender"
                                        className="input"
                                        type="text"
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={values.gender}
                                    >
                                        <option value="">select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Both</option>
                                    </InputText>
                                    <br />
                                    <ErrorMessage name="gender" component="div" className={styles.error} />
                                </div>
                            </Grid>
                        </Grid>
                        <hr />

                        <h4 className="color-primary">Bank Details</h4>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <InputText
                                    label="Account Number"
                                    name="accountNumber"
                                    disabled={!isEditing}
                                    type="text"
                                    onChange={handleChange}
                                    value={values.accountNumber}
                                />
                                <ErrorMessage name="accountNumber" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Account Holder Name"
                                    name="accountHolderName"
                                    disabled={!isEditing}
                                    type="text"
                                    onChange={handleChange}
                                    value={values.accountHolderName}
                                />
                                <ErrorMessage name="accountHolderName" component="div" className={styles.error} />
                            </Grid>
                            <Grid item xs={4}>
                                <InputText
                                    label="Bank Name"
                                    name="bankName"
                                    disabled={!isEditing}
                                    type="text"
                                    onChange={handleChange}
                                    value={values.bankName}
                                />
                                <ErrorMessage name="bankName" component="div" className={styles.error} />
                            </Grid>
                            <Grid item xs={4}>
                                <InputText
                                    label="IFSC Code"
                                    name="ifscCode"
                                    disabled={!isEditing}
                                    type="text"
                                    onChange={handleChange}
                                    value={values.ifscCode}
                                />
                                <ErrorMessage name="ifscCode" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="UPI Id"
                                    name="upiID"
                                    disabled={!isEditing}
                                    type="text"
                                    onChange={handleChange}
                                    value={values.upiID}
                                />
                                <ErrorMessage name="upiID" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Address"
                                    name="address"
                                    disabled={!isEditing}
                                    type="text"
                                    onChange={handleChange}
                                    value={values.address}
                                />
                                <ErrorMessage name="address" component="div" className={styles.error} />
                            </Grid>
                        </Grid>

                        <hr />

                        <h4>Personal Attachments</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <div className='d-flex flex-column'>
                                    <label style={{ fontWeight: 500 }}>CancelCheque/Passbook</label>
                                    <img src={previewImages.bankdocumentImageUrl || values.bankdocumentImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                    {isEditing && (
                                        <ImageUpdate
                                            name="bankdocumentImageUrl"
                                            buttonName="Update"
                                            inputClassName="form-control input"
                                            onImageUpload={(imagePath) => {
                                                console.log("Bank Document Image Path:", imagePath);
                                                handleImageUpload("bankdocumentImageUrl", imagePath);
                                            }}
                                        />
                                    )}
                                </div>
                                <ErrorMessage name="bankdocumentImageUrl" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <div className='d-flex flex-column'>
                                    <label style={{ fontWeight: 500 }}>Pancard</label>
                                    <img src={previewImages.panCardImageUrl || values.panCardImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                    {isEditing && (
                                        <ImageUpdate
                                            name="panCardImageUrl"
                                            buttonName="Update"
                                            inputClassName="form-control input"
                                            onImageUpload={(imagePath) => handleImageUpload("panCardImageUrl", imagePath)}
                                        />
                                    )}
                                </div>
                                <ErrorMessage name="panCardImageUrl" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <div className='d-flex flex-column'>
                                    <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                    <img src={previewImages.aadharFrontImageUrl || values.aadharFrontImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                    {isEditing && (
                                        <ImageUpdate
                                            name="aadharFrontImageUrl"
                                            buttonName="Update"
                                            inputClassName="form-control input"
                                            onImageUpload={(imagePath) => handleImageUpload("aadharFrontImageUrl", imagePath)}
                                        />
                                    )}
                                </div>
                                <ErrorMessage name="aadharFrontImageUrl" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <div className='d-flex flex-column'>
                                    <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                    <img src={previewImages.aadharBackImageUrl || values.aadharBackImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                    {isEditing && (
                                        <ImageUpdate
                                            name="aadharBackImageUrl"
                                            buttonName="Update"
                                            inputClassName="form-control input"
                                            onImageUpload={(imagePath) => handleImageUpload("aadharBackImageUrl", imagePath)}
                                        />
                                    )}
                                </div>
                                <ErrorMessage name="aadharBackImageUrl" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <div className='d-flex flex-column'>
                                    <label style={{ fontWeight: 500 }}>Profile Image</label>
                                    <img src={previewImages.profileImageUrl || values.profileImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                    {isEditing && (
                                        <ImageUpdate
                                            name="profileImageUrl"
                                            buttonName="Update"
                                            inputClassName="form-control input"
                                            onImageUpload={(imagePath) => handleImageUpload("profileImageUrl", imagePath)}
                                        />
                                    )}
                                </div>
                                <ErrorMessage name="profileImageUrl" component="div" className={styles.error} />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>

        <div>
            <Salessalon id={id}/>
        </div>
        </>
        
    );
}

export default UpdateSalesDetails;
