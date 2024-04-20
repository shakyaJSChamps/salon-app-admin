import React from 'react';
import { Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Services/Services.module.css';
import InputText from '../../common-component/Inputtext/InputText';

function Services({ service }) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Services</h4>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    <button type="submit" className={styles.btn}>
                        Edit
                    </button>
                    <button type="submit" className={styles.btn}>
                        Save
                    </button>
                </div>
            </div>
            {service.map((services, index) => (
                <Formik key={index}>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <InputText
                                    label="CategoryId"
                                    name="categoryId"
                                    type="text"
                                    value={services.categoryId}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <InputText
                                    label="Duration"
                                    name="duration"
                                    type="text"
                                    value={services.serviceDuration}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <InputText
                                    label="Service Name"
                                    name="serviceName"
                                    type="text"
                                    value={services.serviceName}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <InputText
                                    label="Price"
                                    name="price"
                                    type="text"
                                    value={services.servicePrice}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <div>
                                    <label className={`${styles.label}`}>
                                        Service Type
                                    </label><br />
                                    <Field
                                        as="select"
                                        name="serviceType"
                                        className={`${styles.inputSalon} px-2 form-control input`}
                                        // disabled={!isEditing}

                                    >
                                        <option value="">{services.type}</option>
                                        <option value="uttar-pradesh">Male</option>
                                        <option value="madhya-pradesh">Female</option>
                                        <option value="andra-pradesh">Both</option>
                                    </Field><br />

                                    {/* <ErrorMessage name="state" className={styles.formError} component="div" /> */}
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            ))}
        </>
    );
}

export default Services;

