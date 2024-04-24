import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "../Salondetails/Salondetails.module.css";
import { Grid } from '@mui/material';
import InputText from '../../../common-component/Inputtext/InputText';
import { updateSalonDetails } from '../../../../api/account.api';
import Notify from "../../../../utils/notify";


function SalonDetails({ salonDetail }) {
    const [isEditing, setIsEditing] = useState(false);
    // console.log("SalonDetails  ", salonDetail)


    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const response = await updateSalonDetails(values, salonDetail.id);
            console.log("salonDetails ::>", response);
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
                    salonName: salonDetail.name || '',
                    email: salonDetail.email || '',
                    gstNumber: salonDetail.gstNumber || '',
                    address: salonDetail.address || '',
                    salonStatePincode: salonDetail.pincode || '',
                    state: salonDetail.state || '',
                    services: salonDetail.serviceType || ''
                }}
                onSubmit={editDetails}
                enableReinitialize // This enables reinitialization when props change
            >
                {({ handleChange, values, isSubmitting }) => (
                    <Form id="salonDetailsForm">
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <InputText
                                    label="Salon Name"
                                    name="salonName"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.salonName}
                                />
                            </Grid>

                            <Grid item xs={3}>

                                <InputText
                                    label="Email ID"
                                    name="email"
                                    type="email"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.email}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <InputText
                                    label="Gst Number"
                                    name="gstNumber"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.gstNumber}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <InputText
                                    label="Address"
                                    name="address"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.address}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <InputText
                                    label="Pincode"
                                    name="salonStatePincode"
                                    type="text"
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    value={values.salonStatePincode}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <label className={`${styles.label}`}>
                                        Service Type
                                    </label><br />
                                    <Field
                                        as="select"
                                        name="services"
                                        className={`${styles.inputService} px-2 form-control input`}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={values.services}
                                    >
                                        <option value="">{values.services}</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="both">Both</option>
                                    </Field><br />
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <label className={`${styles.label}`}>
                                        State
                                    </label><br />
                                    <Field
                                        as="select"
                                        name="state"
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


