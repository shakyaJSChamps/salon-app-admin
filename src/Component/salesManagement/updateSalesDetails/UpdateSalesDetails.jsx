import React, { useState, useEffect } from "react";
import styles from "../updateSalesDetails/Updatesalesdetails.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import Notify from "../../../utils/notify.js";
import InputText from "../../common-component/Inputtext/InputText.jsx";
import { updateSaleDetails, salesDetail, restoreSales, salesStatus } from "../../../api/account.api.js";
import { salesDetailsSchema } from "../../../utils/schema.js";
import ImageUpdate from "../../common-component/Imageupdate/ImageUpdate.jsx";
import Salessalon from "../salesSalon/Salessalon.jsx";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { JoinedDate } from "../../common-component/Formatdate/Joinedondate.jsx";
import { formatDisplayDate, formatInputDate } from "../../common-component/Formatdate/Formatdate.jsx";
import { format } from 'date-fns';

function UpdateSalesDetails({ payload, id, allowEdit, handleBack }) {
    const [isEditing, setIsEditing] = useState(false);
    const [saleDetails, setSaleDetails] = useState({});
    const [previewImages, setPreviewImages] = useState({
        bankdocumentImageUrl: null,
        panCardImageUrl: null,
        aadharFrontImageUrl: null,
        aadharBackImageUrl: null,
        profileImageUrl: null,
    });

    console.log("Sales Details", saleDetails);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const fetchSalesDetail = async () => {
        try {
            const data = await salesDetail(payload, id);
            setSaleDetails(data?.data?.data || {});
        } catch (error) {
            console.error('Error fetching salon details:', error);
        }
    };

    useEffect(() => {
        fetchSalesDetail();
    }, [id]);


    const updateSalesStatus = async () => {
        const payload = {
            field: "active",
            value: saleDetails.active ? "false" : "true",
        };
        try {
            const response = await salesStatus(saleDetails.userId, payload);
            if (response.status === 200) {
                Notify.success(response.data.message);
                fetchSalesDetail();
            } else {
                console.error('Failed to update status', response);
            }
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const formattedValues = {
                ...values,
                dob: formatPayloadDate(values.dob)
            };
            // console.log("Payload being sent:", formattedValues);
            const response = await updateSaleDetails(formattedValues, saleDetails.userId);
            // console.log("API Response:", response);
            // fetchSalesDetail();
            Notify.success(response.data.message);
            setIsEditing(false);
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

    const handlerestore = async () => {
        try {
            const response = await restoreSales(saleDetails.userId);
            fetchSalesDetail();
            Notify.success(response.data.message);
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const getMinDOBDate = () => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()).toISOString().split("T")[0];
    };

    const formatPayloadDate = (date) => {
        return format(new Date(date), 'dd-MM-yyyy');
    };

    return (
        <>
            <div className={styles.mainDiv}>
                <IoIosArrowDropleftCircle onClick={handleBack} className='cursor-pointer fs-4' />
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex justify-content-start align-items-center gap-1">
                        <h4>Sales Details</h4>
                    </div>

                    <div className="d-flex justify-content-start align-items-center mb-3 gap-2">
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

                        {saleDetails.DeletedAt !== null ?
                            <button
                                onClick={handlerestore}
                                className={styles.button}
                            >
                                Restore
                            </button> : null}

                        {saleDetails.DeletedAt === null ?
                            <button
                                onClick={updateSalesStatus}
                                className={`${styles.button} ${saleDetails.active ? styles.active : styles.inactive}`}
                            >
                                {saleDetails.active ? 'Block' : 'Unblock'}
                            </button> : null}

                    </div>


                </div>
                <Formik
                    initialValues={{
                        phoneNumber: saleDetails.phoneNumber || "",
                        countryCode: saleDetails.countryCode || "",
                        firstName: saleDetails.firstName || "",
                        middleName: saleDetails.middleName || "",
                        lastName: saleDetails.lastName || "",
                        dob: saleDetails.dob ? formatInputDate(saleDetails.dob) : "",
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
                                        maxLength={10}
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

                                {isEditing ? (
                                    <Grid item xs={4}>
                                        <InputText
                                            label="DOB"
                                            name="dob"
                                            type="date"
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            value={values.dob}
                                            max={getMinDOBDate()}
                                        />
                                        <ErrorMessage name="dob" component="div" className={styles.error} />
                                    </Grid>
                                ) : (
                                    <Grid item xs={4}>
                                        <InputText
                                            label="DOB"
                                            name="dob"
                                            type="text"
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            value={formatDisplayDate(values.dob)}
                                            max={getMinDOBDate()}
                                        />
                                        <ErrorMessage name="dob" component="div" className={styles.error} />
                                    </Grid>
                                )}



                                {saleDetails.DeletedAt !== null &&
                                    <Grid item xs={4}>
                                        <InputText
                                            label="Deleted At"
                                            name="deletedAt"
                                            type="text"
                                            disabled
                                            value={JoinedDate(saleDetails.DeletedAt)}
                                        />
                                    </Grid>
                                }

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
                                        <Zoom>
                                            <img src={previewImages.bankdocumentImageUrl || values.bankdocumentImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                        </Zoom>
                                        {isEditing && (
                                            <ImageUpdate
                                                name="bankdocumentImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => {
                                                    console.log("Bank Document Image Path:", imagePath);
                                                    handleImageUpload("bankdocumentImageUrl", imagePath);
                                                }}
                                                allowEdit={allowEdit}
                                            />
                                        )}
                                    </div>
                                    <ErrorMessage name="bankdocumentImageUrl" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <div className='d-flex flex-column'>
                                        <label style={{ fontWeight: 500 }}>Pancard</label>
                                        <Zoom>
                                            <img src={previewImages.panCardImageUrl || values.panCardImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                        </Zoom>
                                        {isEditing && (
                                            <ImageUpdate
                                                name="panCardImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("panCardImageUrl", imagePath)}
                                                allowEdit={allowEdit}
                                            />
                                        )}
                                    </div>
                                    <ErrorMessage name="panCardImageUrl" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <div className='d-flex flex-column'>
                                        <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                        <Zoom>
                                            <img src={previewImages.aadharFrontImageUrl || values.aadharFrontImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                        </Zoom>
                                        {isEditing && (
                                            <ImageUpdate
                                                name="aadharFrontImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("aadharFrontImageUrl", imagePath)}
                                                allowEdit={allowEdit}
                                            />
                                        )}
                                    </div>
                                    <ErrorMessage name="aadharFrontImageUrl" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <div className='d-flex flex-column'>
                                        <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                        <Zoom>
                                            <img src={previewImages.aadharBackImageUrl || values.aadharBackImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                        </Zoom>
                                        {isEditing && (
                                            <ImageUpdate
                                                name="aadharBackImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("aadharBackImageUrl", imagePath)}
                                                allowEdit={allowEdit}
                                            />
                                        )}
                                    </div>
                                    <ErrorMessage name="aadharBackImageUrl" component="div" className={styles.error} />
                                </Grid>

                                <Grid item xs={4}>
                                    <div className='d-flex flex-column'>
                                        <label style={{ fontWeight: 500 }}>Profile Image</label>
                                        <Zoom>
                                            <img src={previewImages.profileImageUrl || values.profileImageUrl} alt="No image" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />
                                        </Zoom>
                                        {isEditing && (
                                            <ImageUpdate
                                                name="profileImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(imagePath) => handleImageUpload("profileImageUrl", imagePath)}
                                                allowEdit={allowEdit}
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
                <Salessalon id={id} />
            </div>
        </>

    );
}

export default UpdateSalesDetails;
