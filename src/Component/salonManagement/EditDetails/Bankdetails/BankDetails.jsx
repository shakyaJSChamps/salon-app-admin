import React from 'react';
import { Formik, Form, ErrorMessage } from "formik";
import styles from "../Bankdetails/Bankdetails.module.css";
import { useState } from 'react';
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import { updateBankDetails } from '../../../../api/account.api';
import Notify from "../../../../utils/notify";
import {bankDetailsSchema} from "../../../../utils/schema";


function BankDetails({ bankDetails }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    console.log(bankDetails.salonId)

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const response = await updateBankDetails(values, bankDetails.salonId);
            console.log("bankDetails ->", response);
            Notify.success(response.data.message);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        } finally {
            setSubmitting(false);
        }
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
                }}
                validationSchema={bankDetailsSchema}
                onSubmit={editDetails}
                enableReinitialize
            >
                {({ handleChange, values, isSubmitting }) => (
                    <Form id="bankDetailsForm">
                        <Grid container spacing={2} className='mb-3'>
                            <Grid item xs={4}>
                                <InputText
                                    label="Account Number"
                                    name="accountNumber"
                                    disabled={!isEditing}
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
                                    onChange={handleChange}
                                    value={values.ifscCode}
                                />
                                <ErrorMessage name="ifscCode" component="div" className={styles.error} />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default BankDetails;

