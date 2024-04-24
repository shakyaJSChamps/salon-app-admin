import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import styles from '../Services/Services.module.css';
import InputText from '../../common-component/Inputtext/InputText';
import { updateSalonService } from '../../../../src/api/account.api';
import Notify from "../../../utils/notify";

function Services({ service, salonDetail }) {
    const [editMode, setEditMode] = useState(false);
    const [selectedService, setSelectedService] = useState(null);


    // Set default selected service when component mounts
    useEffect(() => {
        if (service.length > 0) {
            setSelectedService(service[0]);
        }
    }, [service]);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleServiceChange = (event) => {
        const selectedServiceName = event.target.value;
        const foundService = service.find(serv => serv.serviceName === selectedServiceName);
        setSelectedService(foundService);
    };

    const editDetails = async (values, { setSubmitting }) => {
        try {
            const response = await updateSalonService(values, salonDetail.id, selectedService.id);
            console.log("serviceDetails ::>", response);
            Notify.success(response.data.message);
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error("API error:", error);
            Notify.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Services</h4>

                <div className="d-flex justify-content-start align-items-center mb-3">
                    {!editMode && (
                        <button type="button" className={styles.btn} onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                    {editMode && (
                        <button type="submit" className={styles.btn} form="serviceDetailsForm">
                            Save
                        </button>
                    )}
                </div>
            </div>
            <Formik initialValues=
                {
                    {
                        serviceName: selectedService ? selectedService.serviceName : '',
                        duration: selectedService ? selectedService.serviceDuration : '',
                        price: selectedService ? selectedService.servicePrice : '',
                        serviceType: selectedService ? selectedService.type : '',
                        categoryId: selectedService ? selectedService.categoryId : ''                }
                }
                onSubmit={editDetails}
                enableReinitialize
            >
                {({ handleChange, values, isSubmitting }) => (
                <Form Form id="serviceDetailsForm">
                    <Grid container spacing={2} className='mb-3'>
                        <Grid item xs={3}>
                            <label className={styles.bold}>Category Value</label>
                            <Field
                                as="select"
                                name="serviceName"
                                className={`${styles.inputSalon} px-2 form-control input`}
                                disabled={!editMode}
                                onChange={handleServiceChange}
                            >
                                <>
                                    {service.map((service, index) => (
                                        <option key={index} value={service.serviceName}>
                                            {service.serviceName}
                                        </option>
                                    ))}
                                </>

                            </Field>
                        </Grid>

                        <Grid item xs={3}>
                            <InputText
                                label="Duration"
                                name="duration"
                                type="text"
                                disabled={!editMode}
                                onChange={handleChange}
                                value={values.duration}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputText
                                label="Price"
                                name="price"
                                type="text"
                                disabled={!editMode}
                                onChange={handleChange}
                                value={values.price}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputText
                                label="Service Type"
                                name="serviceType"
                                type="text"
                                disabled={!editMode}
                                onChange={handleChange}
                                value={values.serviceType}
                            />
                        </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
        </>
    );
}

export default Services;
