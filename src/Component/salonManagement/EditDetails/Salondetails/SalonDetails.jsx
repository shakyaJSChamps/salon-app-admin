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

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const editDetails = async (values) => {
        try {
            const response = await updateSalonDetails(values, salonDetail.id);
            // console.log("salonDetails ::>", response);
            Notify.success(response.data.message);
            setIsEditing(false);
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        }
    };
    const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
    ];

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
                {({ handleChange, values }) => (
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
                                    <InputText
                                        label="Service Type"
                                        as="select"
                                        name="serviceType"
                                        type="text"
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={values.serviceType}
                                        className="input"
                                        style={{ outline: "none" }}
                                    >
                                        <option value="">{values.serviceType}</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="both">Both</option>
                                    </InputText><br />
                                    <ErrorMessage name="serviceType" component="div" className={styles.error} />

                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <InputText
                                    label="State"
                                    as="select"
                                    name="state"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.state}
                                    className="input"
                                    style={{ outline: "none" }}
                                >
                                    {indianStates.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </InputText><br />
                                <ErrorMessage name="state" component="div" className="error" />
                            </Grid>
                        </Grid>
                    </Form >
                )}
            </Formik >
        </>
    )
}

export default SalonDetails


