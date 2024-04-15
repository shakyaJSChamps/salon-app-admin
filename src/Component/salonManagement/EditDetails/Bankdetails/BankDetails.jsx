import React from 'react'
import { Field, Formik, Form, ErrorMessage } from "formik"
import styles from "../Bankdetails/Bankdetails.module.css";
import { GrFormUpload } from "react-icons/gr";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import FileUploader from '../../../common-component/Fileuploader/FileUploader';



function BankDetails() {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className={styles.color}>Bank Details</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type='submit' className={styles.btn}>Edit</button>
                    <button type='submit' className={styles.btn}>Save</button>
                </div>
            </div>
            <Formik
            // onSubmit={onSubmit}
            >

                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InputText label="Account Number" name="accountNumber" />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Account Holder Name" name="accountHolderName" />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText label="Bank Name" name="bankName" />
                        </Grid>

                        <Grid item xs={4}>
                        <InputText label="IfSC Code" name="ifscCode"/>
                        </Grid>

                        <Grid item xs={4}>
                       <FileUploader label="Cancel cheque/Passbook" name="passBook"/>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </>
    )
}

export default BankDetails
