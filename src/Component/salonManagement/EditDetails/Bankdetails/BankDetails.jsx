import React from 'react'
import { Formik, Form, ErrorMessage } from "formik"
import styles from "../Bankdetails/Bankdetails.module.css";
import { useState } from 'react'
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import FileUploader from '../../../common-component/Fileuploader/FileUploader';



function BankDetails({ bankDetails }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
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
                        <button type="button" className={styles.btn} onClick={handleSaveClick}>
                            Save
                        </button>
                    )}
                </div>
            </div>
            <Formik>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InputText label="Account Number" name="accountNumber" value={bankDetails.accountNumber} disabled={!isEditing} />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Account Holder Name" name="accountHolderName" value={bankDetails.accountHolderName} disabled={!isEditing} />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Bank Name" name="bankName" value={bankDetails.bankName} disabled={!isEditing} />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="IfSC Code" name="ifscCode" value={bankDetails.ifscCode} disabled={!isEditing} />
                        </Grid>

                        <Grid item xs={4}>
                            <FileUploader label="Cancel cheque/Passbook" name="passBook" disabled={!isEditing}/>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </>
    )
}

export default BankDetails
