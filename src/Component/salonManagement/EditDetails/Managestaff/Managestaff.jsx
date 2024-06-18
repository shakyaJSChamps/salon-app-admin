import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Grid } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import { salonStaff } from "../../../../api/account.api";

function Managestaff(id) {


    const getStaffDetails = async (id) => {
        try {
            const response = await salonStaff(id);
            console.log("All SalonStaff Data -> ", response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStaffDetails();
    }, [id]);

    return (
        <div>
            <div className="d-flex justify-content-start align-items-center">
                <h4>
                    Staff Details
                </h4>
            </div>
            <Formik
                initialValues={
                    {
                        phoneNumber: "9569722050",
                        firstName: "Raj",
                        middleName: "Kumar",
                        lastName: "Shakya",
                        dob: "02/05/2000",
                        gender: "Male",
                        email: "shakyaraj8869@gmail.com",
                        panCardImageUrl: "",
                        aadharFrontImageUrl: "",
                        aadharBackImageUrl: "",
                    }
                }
            >
                <Form id="salesDetails">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InputText
                                label="Salon Name"
                                name="salonName"
                                type="text"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Middle Name"
                                name="middleName"
                                type="text"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="LastName"
                                name="lastName"
                                type="text"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Email"
                                name="email"
                                type="email"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Phone Number"
                                name="phoneNumber"
                                type="text"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="DOB"
                                name="dob"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Gender"
                                as="select"
                                name="gender"
                                className="input"
                                type="text"
                                disabled
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </InputText>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className="d-flex flex-column">
                                <label style={{ fontWeight: 500 }}>Pancard</label>
                                <img
                                    src=""
                                    style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                    alt="Pancard"
                                />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className="d-flex flex-column">
                                <label style={{ fontWeight: 500 }}>Aadhar Front</label>
                                <img
                                    src=""
                                    style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                    alt="Aadhar Front"
                                />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className="d-flex flex-column">
                                <label style={{ fontWeight: 500 }}>Aadhar Back</label>
                                <img
                                    src=""
                                    style={{ height: '150px', width: '150px', marginBottom: '10px' }}
                                    alt="Aadhar Back"
                                />
                            </div>
                        </Grid>

                    </Grid>
                </Form>
            </Formik >
        </div>
    );
}

export default Managestaff;
