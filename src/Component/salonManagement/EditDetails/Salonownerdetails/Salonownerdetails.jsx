import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import { salonOwner } from "../../../../api/account.api";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function Salonownerdetails({ id }) {
    const [salonOwnerData, setSalonOwnerData] = useState(null);
    console.log("Salon Owner", salonOwnerData);

    const getSalonOwner = async () => {
        try {
            const response = await salonOwner(id);
            setSalonOwnerData(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSalonOwner();
    }, [id]);

    return (
        <div>
            <div className="d-flex justify-content-start align-items-center">
                <h4>Salon Owner Details</h4>
            </div>
            {salonOwnerData && (
                <Formik
                    enableReinitialize
                    initialValues={{
                        phoneNumber: salonOwnerData.phoneNumber || "",
                        firstName: salonOwnerData.firstName || "",
                        middleName: salonOwnerData.middleName || "",
                        lastName: salonOwnerData.lastName || "",
                        dataOfBirth: salonOwnerData.dataOfBirth || "",
                        gender: salonOwnerData.gender || "",
                        email: salonOwnerData.email || "",
                        panCardImgUrl: salonOwnerData.panCardImgUrl || "",
                        aadharFrontUrl: salonOwnerData.aadharFrontUrl || "",
                        aadharBackUrl: salonOwnerData.aadharBackUrl || "",
                        profileImageUrl: salonOwnerData.profileImageUrl || "",
                    }}
                >
                    {({ values }) => (
                        <Form id="salesDetails">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <InputText
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                        value={values.firstName}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Middle Name"
                                        name="middleName"
                                        type="text"
                                        value={values.middleName}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                        value={values.lastName}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        value={values.phoneNumber}
                                        disabled
                                        maxLength={10}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="DOB"
                                        name="dataOfBirth"
                                        type="text"
                                        value={values.dataOfBirth}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputText
                                        label="Gender"
                                        as="select"
                                        name="gender"
                                        className="input mb-2"
                                        type="text"
                                        value={values.gender}
                                        disabled
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </InputText>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Pancard</label>
                                        <Zoom>
                                            <img
                                                src={values.panCardImgUrl}
                                                style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                alt="Pancard"
                                            />
                                        </Zoom>

                                    </div>
                                </Grid>

                                <Grid item xs={3}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                        <Zoom>
                                            <img
                                                src={values.aadharFrontUrl}
                                                style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                alt="Aadhar Front"
                                            />
                                        </Zoom>

                                    </div>
                                </Grid>

                                <Grid item xs={3}>
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                        <Zoom>
                                            <img
                                                src={values.aadharBackUrl}
                                                style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                alt="Aadhar Back"
                                            />
                                        </Zoom>

                                    </div>
                                </Grid>

                                <Grid item xs={3} className="mb-3">
                                    <div className="d-flex flex-column">
                                        <label style={{ fontWeight: 500 }}>Profile Image</label>
                                        <Zoom>
                                            <img
                                                src={values.profileImageUrl}
                                                style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                                alt="Aadhar Back"
                                            />
                                        </Zoom>

                                    </div>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}

export default Salonownerdetails;
