import React from 'react'
import { Field, Formik, Form, ErrorMessage } from "formik"
import styles from "../Bankdetails/Bankdetails.module.css";
import { GrFormUpload } from "react-icons/gr";



function BankDetails() {
    return (
        <div>
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
                    <div className={`${styles.gap} d-flex`}>
                        <label className={styles.lab}> Account Number</label><br />
                        <Field
                            type='text'
                            placeholder='85651248769654'
                            name='accNum'
                            className={`${styles.inputs} rounded px-1`}
                        /><br />

                        {/* <ErrorMessage name="accNum" className={styles.formError} component="div" /> */}

                        <label className={styles.lab}> Account Holder Name</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='accName'
                            className={`${styles.inputs} rounded px-1`}
                        />
                        <br />

                        {/* <ErrorMessage name="accName" className={styles.formError} component="div" /> */}
                    </div>

                    <div className={`${styles.gap} d-flex mt-3`}>
                        <label className={styles.lab}> Bank Name</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='bankName'
                            className={`${styles.inputs} rounded px-1`}
                        /><br />

                        {/* <ErrorMessage name="bankName" className={styles.formError} component="div" /> */}

                        <label className={styles.labs}> IFSC Code</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='ifscCode'
                            className={`${styles.inputs} rounded px-1`}
                        /><br />
                        {/* <ErrorMessage name="ifscCode" className={styles.formError} component="div" /> */}
                    </div>

                    <div className={`${styles.gap} d-flex justify-content-start align-items-center mt-3 mb-3`}>
                        <label className={styles.lab}>
                            Passbook/Cancel cheque
                        </label><br />
                        <button
                            className={`${styles.Btn} align-items-center-start`}
                            // onClick={handleUploadIconClick}
                            type="button"
                        >
                            <input
                                type="file"
                                name="passbook"
                                // ref={fileInputRef}
                                style={{ display: "none" }}
                            // onChange={handleFileChange}
                            />
                            <br />
                            <GrFormUpload className={styles.uploadIcon} />
                            Upload
                        </button>
                    </div>

                </Form>
            </Formik>
        </div >
    )
}

export default BankDetails
