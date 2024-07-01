import React, { useState, useEffect } from 'react';
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { getUserData, updateUser, getUserAppointments } from "../../api/account.api";
import Notify from "../../utils/notify";
import Loader from "../Loader";
import InputText from '../common-component/Inputtext/InputText';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { IoIosArrowDropleftCircle } from "react-icons/io";

function Userdata({ rowData, setUpdatedRowData, handleBack }) {
    const [active, setActive] = useState(rowData.active);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLandmark, setSelectedLandmark] = useState("");
    const [userData, setUserData] = useState({});
    const [appointments, setAppointments] = useState({});
    console.log("Appointments", appointments)

    const getData = async () => {
        try {
            const response = await getUserData(rowData.id);
            setUserData(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [rowData.id])


    const getAppointments = async () => {
        try {
            const response = await getUserAppointments(rowData.id);
            setAppointments(response?.data?.data || {});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, [rowData.id])

    const handleToggleBlock = async () => {
        setIsLoading(true);
        const payload = {
            field: "active",
            value: active ? "false" : "true",
        };
        try {
            const response = await updateUser(payload, rowData.id);
            Notify.success(response.data.message);
            setIsLoading(false);
            setActive((prevActive) => !prevActive);
            setUpdatedRowData(true);
        } catch (error) {
            Notify.error(error.message);
            setIsLoading(false);
        }
    };

    const handleLandmarkChange = (event) => {
        setSelectedLandmark(event.target.value);
    };

    // Render address details based on selected landmark
    let addressDetails = "";
    if (userData && userData.addresses) {
        const selectedAddress = userData.addresses.find((address) => address.landmark === selectedLandmark);
        if (selectedAddress) {
            addressDetails = `${selectedAddress.houseNo}, ${selectedAddress.streetAddress}, ${selectedAddress.city}, ${selectedAddress.state}`;
        }
    }

    return (
        <div className='bg-white p-3' style={{ border: '3px solid #eae4e4', borderRadius: '5px' }}>
            <IoIosArrowDropleftCircle onClick={handleBack} className='cursor-pointer mb-2 fs-4 mr-1' />
            <div>
                <div className='d-flex justify-content-between'>
                    <h4>User Details</h4>
                    <button
                        onClick={handleToggleBlock}
                        className="button"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader /> : active ? "Block" : "Unblock"}
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                {isValidImageUrl(userData?.profileImageUrl) ? (
                    <Zoom>
                        <img
                            src={userData.profileImageUrl}
                            alt="Profile"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "5px",
                                borderColor: "#7f8080",
                            }}
                        />
                    </Zoom>
                ) : (
                    <Zoom>
                        <img
                            src={Profile}
                            alt="Profile"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "5px",
                                borderColor: "#7f8080",
                            }}
                        />
                    </Zoom>
                )}
            </div>

            <Formik initialValues={{}}>
                <Form>
                    <Grid container spacing={2} className='mt-1'>
                        <Grid item xs={4}>
                            <InputText
                                label="Name"
                                name="name"
                                type="text"
                                value={`${userData?.firstName} ${userData?.middleName} ${userData?.lastName}`}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Email"
                                name="email"
                                type="email"
                                value={userData?.email}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Mobile Number"
                                name="phoneNumber"
                                type="text"
                                value={userData?.phoneNumber}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Gender"
                                name="gender"
                                type="text"
                                value={userData?.gender}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Joining Date"
                                name="createdAt"
                                type="text"
                                value={new Date(userData?.createdAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                disabled
                            />
                        </Grid>


                        {userData.addresses &&
                            <Grid item xs={4}>
                                <InputText
                                    label="Name"
                                    as="select"
                                    value={selectedLandmark}
                                    onChange={handleLandmarkChange}
                                    className="Form-control input"
                                    style={{ outline: "none" }}
                                >
                                    <option value="">Select Name</option>
                                    {userData.addresses.map((address, index) => (
                                        <option key={index} value={address.landmark}>
                                            {address.landmark}
                                        </option>
                                    ))}
                                </InputText>
                            </Grid>
                        }


                        <Grid item xs={4}>
                            <InputText
                                label="Address"
                                name="address"
                                type="text"
                                value={userData.addresses ? addressDetails : userData.address}
                                disabled
                                className="form-control input"
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <hr />
        </div>
    );
}

export default Userdata;
