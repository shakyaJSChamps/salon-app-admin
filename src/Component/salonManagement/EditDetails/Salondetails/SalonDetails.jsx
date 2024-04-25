import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Salondetails/Salondetails.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import { updateSalonDetails } from '../../../../api/account.api';
import Notify from "../../../../utils/notify";
import { salonDetailsSchema } from "../../../../utils/schema";



function SalonDetails({ salonDetail }) {
    const [isEditing, setIsEditing] = useState(false);
    // console.log("SalonDetails  ", salonDetail.id)

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const response = await updateSalonDetails(values, salonDetail.id);
            // console.log("salonDetails ::>", response);
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
                <h4>Salon Details</h4>

                <div className="d-flex justify-content-start align-items-center mb-3">
                    {!isEditing && (
                        <button type="button" className={styles.btn} onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button type="submit" className={styles.btn} form="salonDetailsForm">
                            Save
                        </button>
                    )}
                </div>
            </div>

            <Formik
                initialValues={{
                    companyName: salonDetail.companyName || '',
                    email: salonDetail.email || '',
                    gstNumber: salonDetail.gstNumber || '',
                    address: salonDetail.address || '',
                    pincode: salonDetail.pincode || '',
                    state: salonDetail.state || '',
                    serviceType: salonDetail.serviceType || '',
                    name: salonDetail.name || '',
                    city: salonDetail.city || ''
                }}
                validationSchema={salonDetailsSchema}
                onSubmit={editDetails}
                enableReinitialize // This enables reinitialization when props change
            >
                {({ handleChange, values, isSubmitting }) => (
                    <Form id="salonDetailsForm">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <InputText
                                    label="Company Name"
                                    name="companyName"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.companyName}
                                />
                                <ErrorMessage name="companyName" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Name"
                                    name="name"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.name}
                                />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="City"
                                    name="city"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.city}
                                />
                                <ErrorMessage name="city" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Email ID"
                                    name="email"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Gst Number"
                                    name="gstNumber"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.gstNumber}
                                />
                                <ErrorMessage name="gstNumber" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Address"
                                    name="address"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.address}
                                />
                                <ErrorMessage name="address" component="div" className={styles.error} />
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="Pincode"
                                    name="pincode"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.pincode}
                                />
                                <ErrorMessage name="pincode" component="div" className={styles.error} />

                            </Grid>

                            <Grid item xs={4}>
                                <div>
                                    <label className={`${styles.label}`}>
                                        Service Type
                                    </label><br />
                                    <Field
                                        as="select"
                                        name="serviceType"
                                        type="text"
                                        className={`${styles.inputService} px-2 form-control input`}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={values.serviceType}
                                    >
                                        <option value="">{values.serviceType}</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="both">Both</option>
                                    </Field><br />
                                    <ErrorMessage name="serviceType" component="div" className={styles.error} />

                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div>
                                    <label className={`${styles.label}`}>
                                        State
                                    </label><br />
                                    <Field
                                        as="select"
                                        name="state"
                                        type="text"
                                        className={`${styles.inputSalon} px-2 form-control input`}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={values.state}

                                    >
                                        <option value="">{values.state}</option>
                                        <option value="uttar-pradesh">Uttar-Pradesh</option>
                                        <option value="madhya-pradesh">Madhya-Pradesh</option>
                                        <option value="andra-pradesh">Andra-Pradesh</option>
                                    </Field><br />
                                    <ErrorMessage name="state" component="div" className="error" />

                                </div>
                            </Grid>
                        </Grid>
                    </Form >
                )}
            </Formik >
        </>
    )
}

export default SalonDetails


