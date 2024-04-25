import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import styles from './SaleService.module.css';
import InputText from '../../common-component/Inputtext/InputText';
import Notify from "../../../utils/notify";

function SalesService({ saleService }) {
    const [editMode, setEditMode] = useState(false);
    const [selectedSaleService, setSelectedSaleService] = useState(null);

    // Set default selected sale service when component mounts
    useEffect(() => {
        if (saleService.length > 0) {
            setSelectedSaleService(saleService[0]);
        }
    }, [saleService]);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaleServiceChange = (event) => {
        const selectedSaleServiceName = event.target.value;
        const foundSaleService = saleService.find(serv => serv.serviceName === selectedSaleServiceName);
        setSelectedSaleService(foundSaleService);
    };

    const editSaleService = (values, { setSubmitting }) => {
        // Update the selectedSaleService with the new values (for example, in state)
        setSelectedSaleService(values);
        Notify.success("Sale service details updated successfully");
        setEditMode(false); // Exit edit mode
        setSubmitting(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Sale Services</h4>
            </div>
            <Formik initialValues=
                {
                    {
                        serviceName: selectedSaleService ? selectedSaleService.serviceName : '',
                        duration: selectedSaleService ? selectedSaleService.serviceDuration : '',
                        price: selectedSaleService ? selectedSaleService.servicePrice : '',
                        serviceType: selectedSaleService ? selectedSaleService.type : '',
                        categoryId: selectedSaleService ? selectedSaleService.categoryId : ''                
                    }
                }
                onSubmit={editSaleService}
                enableReinitialize
            >
                {({ handleChange, values, isSubmitting }) => (
                <Form Form id="saleServiceDetailsForm">
                    <Grid container spacing={2} className='mb-3'>
                        <Grid item xs={3}>
                            <label className={styles.bold}>Category Value</label>
                            <Field
                                as="select"
                                name="serviceName"
                                className={`${styles.inputSalon} px-2 form-control input`}
                                disabled={!editMode}
                                onChange={handleSaleServiceChange}
                            >
                                <>
                                    {saleService.map((service, index) => (
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

export default SalesService;
