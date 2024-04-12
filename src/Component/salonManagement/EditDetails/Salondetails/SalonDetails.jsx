import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Salondetails/Salondetails.module.css";


function SalonDetails() {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Salon Details</h4>

                <div className='d-flex justify-content-start align-items-center mb-3'>
                    <button type='submit' className={styles.btn}>Edit</button>
                    <button type='submit' className={styles.btn}>Save</button>
                </div>
            </div>
            <Formik
            // onSubmit={onSubmit}
            >
                <Form>
                    <div className={`${styles.mainDiv} d-flex justify-content-start align-items-center ml-4`}>
                        <label className={styles.label}> Salon Name</label><br />
                        <Field
                            type='textarea'
                            placeholder='Jhon'
                            name='salonName'
                            className={`${styles.input} px-1 rounded`}
                        /><br />

                        {/* <ErrorMessage name="salonName" className={styles.formError} component="div" /> */}

                        <label className={`${styles.label}`}> Email Id</label><br />
                        <Field
                            type='email'
                            placeholder='Jhon'
                            name='email'
                            className={`${styles.input} px-1 rounded`}
                        /><br />

                        {/* <ErrorMessage name="email" className={styles.formError} component="div" /> */}

                        <label className={`${styles.label} mt-2`}> Gst Number</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='gstNumber'
                            className={`${styles.input} px-1 rounded`}
                        /><br />

                        {/* <ErrorMessage name="gstNumber" className={styles.formError} component="div" /> */}
                    </div>


                    <div className={`${styles.mainDiv} d-flex justify-content-start align-items-center mt-3`}>
                        <label className={`${styles.label}`}>
                            Salon State
                        </label><br />
                        <Field
                            as="select"
                            name="state"
                            className={`${styles.input} px-1 rounded`}
                        >
                            <option value="">select</option>
                            <option value="uttar-pradesh">Uttar-Pradesh</option>
                            <option value="madhya-pradesh">Madhya-Pradesh</option>
                            <option value="andra-pradesh">Andra-Pradesh</option>
                        </Field><br />

                        {/* <ErrorMessage name="state" className={styles.formError} component="div" /> */}


                        <div className={`${styles.gap} d-flex`}>
                            <label className={`${styles.labels}`}>
                                Service For
                            </label><br />
                            <Field
                                as="select"
                                name="services"
                                className={`${styles.input} px-1 rounded`}
                            >
                                <option value="">select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Field><br />

                            {/* <ErrorMessage name="services" className={styles.formError} component="div" /> */}
                        </div>

                        <label className={`${styles.address}`}> Address</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='address'
                            className={`${styles.input} px-1 rounded`}
                        /><br />

                        {/* <ErrorMessage name="address" className={styles.formError} component="div" /> */}

                    </div>


                    <div className={`${styles.mainDiv} d-flex justify-content-start mt-3 mb-3`}>
                        <label className={`${styles.label}`}> Salon State pincode</label><br />
                        <Field
                            type='text'
                            placeholder='209625'
                            name='salonStatePinCode'
                            className={`${styles.input} px-1 rounded`}
                        /><br />

                        {/* <ErrorMessage name="salonStatePinCode" className={styles.formError} component="div" /> */}
                    </div>
                </Form>
            </Formik >
        </>
    )
}

export default SalonDetails


