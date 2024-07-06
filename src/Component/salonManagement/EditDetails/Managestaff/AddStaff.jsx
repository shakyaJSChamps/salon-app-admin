import React, { useState } from 'react';
import { Modal, Grid, Button, Paper } from '@mui/material';
import { ErrorMessage, Formik, Form } from 'formik';
import InputText from '../../../common-component/Inputtext/InputText';
import ImageUpdate from '../../../common-component/Imageupdate/ImageUpdate';
import styles from "./Managestaff.module.css";
import { addStaff } from '../../../../api/account.api';
import { salonStaffSchema } from '../../../../utils/schema';
import Notify from "../../../../utils/notify";

function AddStaff({ isOpen, onClose, id, fetchStaffList }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        countryCode: "91",
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        profileImageUrl: '',
        aadharFrontUrl: '',
        aadharBackUrl: '',
        specialization: '',
        role: '',
    });

    const handleImageUpload = (field, imagePath, setFieldValue) => {
        setFormData({ ...formData, [field]: imagePath });
        setFieldValue(field, imagePath);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await addStaff(id, values);
            console.log("response", response);
            resetForm();
            fetchStaffList();
            onClose();
            setFormData({
                ...formData,
                profileImageUrl: '',
                aadharFrontUrl: '',
                aadharBackUrl: '',
            });
            Notify.success(response.data.message);
        } catch (error) {
            Notify.error(error.message);
        }
    };

    const getMinDOBDate = () => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()).toISOString().split("T")[0];
    };

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Paper style={{ backgroundColor: 'white', padding: '20px', width: '800px', margin: 'auto', marginTop: '100px', maxHeight: '80vh', overflow: 'auto' }}>
                    <p className='fw-bold fs-5'>Add Satff</p>
                    <Formik
                        initialValues={formData}
                        validationSchema={salonStaffSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, setFieldValue }) => (
                            <Form id="addstaff">
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <InputText
                                            label="First Name"
                                            name="firstName"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.firstName}
                                        />
                                        <ErrorMessage name="firstName" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Last Name"
                                            name="lastName"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.lastName}
                                        />
                                        <ErrorMessage name="lastName" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        <ErrorMessage name="email" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Phone Number"
                                            name="phoneNumber"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.phoneNumber}
                                            maxLength={10}
                                        />
                                        <ErrorMessage name="phoneNumber" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            type="date"
                                            onChange={handleChange}
                                            value={values.dateOfBirth}
                                            max={getMinDOBDate()}
                                        />
                                        <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Gender"
                                            as="select"
                                            name="gender"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.gender}
                                            className="input"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </InputText>
                                        <ErrorMessage name="gender" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Specialization"
                                            name="specialization"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.specialization}
                                        />
                                        <ErrorMessage name="specialization" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputText
                                            label="Role"
                                            as="select"
                                            name="role"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.role}
                                            className="input"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="Staff">Staff</option>
                                            <option value="Manager">Manager</option>
                                        </InputText>
                                        <ErrorMessage name="role" component="div" className={styles.error} />
                                    </Grid>

                                    <Grid container spacing={2} className="px-3 mt-1">

                                        <Grid item xs={4}>
                                            <div className="d-flex flex-column">
                                                <label style={{ fontWeight: 500 }}>Profile Image</label>
                                                <div className='text-center'>
                                                    {values.profileImageUrl ?
                                                        <img
                                                            src={values.profileImageUrl}
                                                            style={{ height: '100px', width: '100px', marginBottom: '10px' }}
                                                            alt="Profile Image"
                                                        /> : null}
                                                </div>

                                                <ImageUpdate
                                                    name="profileImageUrl"
                                                    buttonName="Update"
                                                    inputClassName="form-control input"
                                                    onImageUpload={(imagePath) => handleImageUpload("profileImageUrl", imagePath, setFieldValue)}
                                                    allowEdit={true}
                                                />
                                            </div>
                                            <ErrorMessage name="profileImageUrl" component="div" className={styles.error} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <div className="d-flex flex-column">
                                                <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                                <div className='text-center'>
                                                    {
                                                        values.aadharFrontUrl ? <img
                                                            src={values.aadharFrontUrl}
                                                            style={{ height: '100px', width: '100px', marginBottom: '10px' }}
                                                            alt="Aadhar Front"
                                                        /> : null
                                                    }

                                                </div>

                                                <ImageUpdate
                                                    name="aadharFrontUrl"
                                                    buttonName="Update"
                                                    inputClassName="form-control input"
                                                    onImageUpload={(imagePath) => handleImageUpload("aadharFrontUrl", imagePath, setFieldValue)}
                                                    allowEdit={true}
                                                />
                                            </div>
                                            <ErrorMessage name="aadharFrontUrl" component="div" className={styles.error} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <div className="d-flex flex-column">
                                                <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                                <div className='text-center'>
                                                    {
                                                        values.aadharBackUrl ? <img
                                                            src={values.aadharBackUrl}
                                                            style={{ height: '100px', width: '100px', marginBottom: '10px' }}
                                                            alt="Aadhar Back"
                                                        /> : null
                                                    }

                                                </div>

                                                <ImageUpdate
                                                    name="aadharBackUrl"
                                                    buttonName="Update"
                                                    inputClassName="form-control input"
                                                    onImageUpload={(imagePath) => handleImageUpload("aadharBackUrl", imagePath, setFieldValue)}
                                                    allowEdit={true}
                                                />
                                            </div>
                                            <ErrorMessage name="aadharBackUrl" component="div" className={styles.error} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <div className='text-end'>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '20px' }}
                                    >
                                        Add
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Modal>
        </>

    );
}

export default AddStaff;
