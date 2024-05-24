import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Services/Services.module.css';
import InputText from '../../common-component/Inputtext/InputText';
import { getServiceType, updateSalonService } from '../../../../src/api/account.api';
import Notify from "../../../utils/notify";
import AddService from './Addservice/AddService.jsx';
import { Accessible as AccessibleIcon } from '@mui/icons-material';
import { serviceDetailsSchema } from '../../../utils/schema.js';



function Services({ service, salonDetail }) {
    const [isEditing, setIsEditing] = useState(false);
    const [services, setServices] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getServiceTypes = async () => {
            try {
                const response = await getServiceType();
                const responseData = response.data.data;
                setServices(responseData);
            } catch (error) {
                Notify.error(error.message);
            }
        }
        getServiceTypes()
    }, []);

    const editDetails = async (values, index) => {
        try {
            const response = await updateSalonService(values[index], salonDetail.id, values[index].id);
            Notify.success(response.data.message); // Display success notification
        } catch (error) {
            Notify.error(error.message); // Handle API errors
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const addNewService = (newService) => {
        setServices((prevServices) => [...prevServices, newService]);
    };

   

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className={styles.color}>Services</h4>
                <div className="d-flex justify-content-start align-items-center mb-3 gap-1">
                    {!isEditing && (
                        <button type="button" className={styles.btn} onClick={handleEditClick}>
                            Edit
                        </button>
                    )}

                    <button type="button" className={styles.btn} onClick={handleOpen}>
                        Add
                    </button>
                </div>
            </div>

            <AddService open={open} handleClose={handleClose} services={services} salonDetail={salonDetail} addNewService={addNewService}/>

            <Formik
                initialValues={{
                    services: service.map((serviceItem) => ({
                        id: serviceItem.id,
                        categoryId: serviceItem.categoryId || '',
                        serviceName: serviceItem.serviceName || '',
                        serviceDuration: serviceItem.serviceDuration || '',
                        servicePrice: serviceItem.servicePrice || '',
                        type: serviceItem.type || ''
                    }))
                }}
                validationSchema={serviceDetailsSchema}
                enableReinitialize
                onSubmit={() => { }}
            >
                {({ handleChange, values }) => (
                    <Form id="service" >
                        {values.services.map((serviceItem, index) => (
                            <Grid container spacing={2} className='mb-3' key={index}>
                                <Grid item xs={2}>
                                    <InputText
                                        as="select"
                                        label="Category"
                                        className=" input"
                                        name={`services[${index}].categoryId`}
                                        type="text"
                                        disabled={!isEditing}
                                        style={{outline: "none"}}
                                        onChange={(e) => handleChange({
                                            target: {
                                                name: `services[${index}].categoryId`,
                                                value: parseInt(e.target.value) // Convert to number
                                            }
                                        })}
                                        value={serviceItem.categoryId}
                                    >
                                        {services.map((category, idx) => (
                                            <option key={idx} value={parseInt(category.id)}> {/* Convert to number */}
                                                {category.name}
                                            </option>
                                        ))}
                                    </InputText>

                                </Grid>
                                <Grid item xs={2}>
                                    <InputText
                                        label="Service name"
                                        type="text"
                                        name={`services[${index}].serviceName`}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={serviceItem.serviceName}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <InputText
                                        as="select"
                                        label="Service Type"
                                        name={`services[${index}].type`}
                                        type="text"
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={serviceItem.type}
                                        className="input"
                                        style={{outline: "none"}}
                                       
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Both">Both</option>
                                    </InputText>
                                    <ErrorMessage name={`services[${index}].type`} component="div" className={styles.error} />
                                </Grid>
                                
                                <Grid item xs={2}>
                                    <InputText
                                        label="Duration"
                                        type="number"
                                        name={`services[${index}].serviceDuration`}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={serviceItem.serviceDuration}
                                    />
                                    <ErrorMessage name={`services[${index}].serviceDuration`} component="div" className={styles.error} />
                                </Grid>
                                <Grid item xs={2}>
                                    <InputText
                                        label="Price"
                                        type="number"
                                        name={`services[${index}].servicePrice`}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        value={serviceItem.servicePrice}
                                    />
                                    <ErrorMessage name={`services[${index}].servicePrice`} component="div" className={styles.error} />
                                </Grid>
                               
                                {isEditing && (
                                    <Grid item xs={2}>
                                        <button type="button" onClick={() => { editDetails(values.services, index); setIsEditing(false) }} className={styles.btn} style={{ marginTop: '32px' }}>
                                            Save
                                        </button>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Services;

