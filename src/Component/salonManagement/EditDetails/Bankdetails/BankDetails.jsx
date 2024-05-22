import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from "formik";
import styles from "../Bankdetails/Bankdetails.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import { updateBankDetails } from '../../../../api/account.api';
import Notify from "../../../../utils/notify";
import { bankDetailsSchema } from "../../../../utils/schema";
import ImageUpdate from '../../../common-component/Imageupdate/ImageUpdate';

function BankDetails({ bankDetails }) {
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState(bankDetails.documentImageUrl || '');

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const editDetails = async (values) => {
        try {
            const response = await updateBankDetails(values, bankDetails.salonId);
            console.log("bankDetails ->", response);
            Notify.success(response.data.message);
            setIsEditing(false);
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        }
    };

    const handleImageUpload = (url, setFieldValue) => {
        setFieldValue('documentImageUrl', url);
        setImagePreview(url);
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className={styles.color}>Bank Details</h4>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    {!isEditing && (
                        <button type="button" className={styles.btn} onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button type="submit" form="bankDetailsForm" className={styles.btn}>
                            Save
                        </button>
                    )}
                </div>
            </div>
            <Formik
                initialValues={{
                    accountNumber: bankDetails.accountNumber || '',
                    accountHolderName: bankDetails.accountHolderName || '',
                    bankName: bankDetails.bankName || '',
                    ifscCode: bankDetails.ifscCode || '',
                    documentImageUrl: bankDetails.documentImageUrl || '',
                }}
                validationSchema={bankDetailsSchema}
                onSubmit={editDetails}
                enableReinitialize
            >
                {({ handleChange, values, setFieldValue }) => (
                    <Form id="bankDetailsForm">
                        <Grid container spacing={2} className='mb-3'>
                            <Grid item xs={6}>
                                <InputText
                                    label="Account Number"
                                    name="accountNumber"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.accountNumber}
                                />
                                <ErrorMessage name="accountNumber" component="div" className={styles.error} />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    label="Account Holder Name"
                                    name="accountHolderName"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.accountHolderName}
                                />
                                <ErrorMessage name="accountHolderName" component="div" className={styles.error} />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    label="Bank Name"
                                    name="bankName"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.bankName}
                                />
                                <ErrorMessage name="bankName" component="div" className={styles.error} />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    label="IFSC Code"
                                    name="ifscCode"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.ifscCode}
                                />
                                <ErrorMessage name="ifscCode" component="div" className={styles.error} />
                            </Grid>
                            <Grid item xs={6}>
                                <div className='d-flex flex-column'>
                                    <label style={{ fontWeight: 500 }}>Cancelcheque/Passbook</label>
                                    {imagePreview ?
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ height: '150px', width: '150px', marginTop: '10px' }}
                                        />
                                        : <img
                                            src={values.documentImageUrl}
                                            alt="No image"
                                            style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                        />}

                                    {isEditing && <ImageUpdate
                                        name="documentImageUrl"
                                        buttonName="Update"
                                        inputClassName="form-control input mt-2"
                                        onImageUpload={(url) => handleImageUpload(url, setFieldValue)}
                                    />}
                                    {/* {isEditing ? (
                                        <>
                                            <ImageUpdate
                                                name="documentImageUrl"
                                                buttonName="Update"
                                                inputClassName="form-control input"
                                                onImageUpload={(url) => handleImageUpload(url, setFieldValue)}
                                            />
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    style={{ height: '150px', width: '150px', marginTop: '10px' }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <img
                                            src={values.documentImageUrl}
                                            alt="No image"
                                            style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                        />
                                    )} */}
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default BankDetails;
