import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import styles from '../Services/Services.module.css';
import InputText from '../../common-component/Inputtext/InputText';

function Services({ service }) {
    const [editMode, setEditMode] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Set default selected service when component mounts
    useEffect(() => {
        if (service.length > 0) {
            setSelectedService(service[0]);
        }
    }, [service]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        // Logic to save changes
    };

    const handleServiceChange = (event) => {
        const selectedServiceName = event.target.value;
        const foundService = service.find(serv => serv.serviceName === selectedServiceName);
        setSelectedService(foundService);
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
                        <button type="button" className={styles.btn} onClick={handleSaveClick}>
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
                        serviceType: selectedService ? selectedService.type : ''
                    }
                }
            >
                <Form>
                    <Grid container spacing={2} className='mb-2'>
                        <Grid item xs={3}>
                            <label className={styles.bold}>Category Value</label>
                            <Field
                                as="select"
                                name="serviceName"
                                className={`${styles.inputSalon} px-2 form-control input`}
                                disabled={!editMode}
                                onChange={handleServiceChange}
                                value={selectedService ? selectedService.serviceName : ''}
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
                                value={selectedService ? selectedService.serviceDuration : ''}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputText
                                label="Price"
                                name="price"
                                type="text"
                                value={selectedService ? selectedService.servicePrice : ''}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputText
                                label="Service Type"
                                name="serviceType"
                                type="text"
                                value={selectedService ? selectedService.type : ''}
                                disabled={!editMode}
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </>
    );
}

export default Services;
