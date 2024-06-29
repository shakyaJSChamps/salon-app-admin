import React, { useState } from 'react'
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { updateUser } from "../../api/account.api";
import Notify from "../../utils/notify";
import Loader from "../Loader";
import InputText from '../common-component/Inputtext/InputText';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Appointments from '../salonManagement/EditDetails/Appointments/Appointments';


function Userdata({ rowData, setUpdatedRowData, handleBack }) {
    const [active, setActive] = useState(rowData.active);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLandmark, setSelectedLandmark] = useState("");

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

    // Assuming rowData.addresses is an array of objects with 'landmark' and 'address' fields
    const addresses = rowData.addresses || [];

    // Filter addresses based on selected landmark
    const selectedAddress = addresses.find((address) => address.landmark === selectedLandmark);

    // Extract address details
    const addressDetails = selectedAddress
        ? ` ${selectedAddress.streetAddress}, ${selectedAddress.city}, ${selectedAddress.state}`
        : "";
    return (
        <div className='bg-white  p-3 ' style={{ border: '3px solid #eae4e4', borderRadius: '5px' }}>
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
                {isValidImageUrl(rowData.profileImageUrl) ? (
                    <Zoom>
                        <img
                            src={rowData.profileImageUrl}
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

            <Formik>
                <Form>
                    <Grid container spacing={2} className='mt-1'>
                        <Grid item xs={4}>
                            <InputText
                                label="Name"
                                name="name"
                                type="text"
                                value={`${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Email"
                                name="email"
                                type="email"
                                value={rowData.email}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Mobile Number"
                                name="phoneNumber"
                                type="text"
                                value={rowData.phoneNumber}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Gender"
                                name="gender"
                                type="text"
                                value={rowData.gender}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputText
                                label="Joining Date"
                                name="createdAt"
                                type="text"
                                value={new Date(rowData.createdAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                disabled
                            />
                        </Grid>

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
                                {addresses.map((address, index) => (
                                    <option key={index} value={address.landmark}>
                                        {address.landmark}
                                    </option>
                                ))}
                            </InputText>
                        </Grid>


                        <Grid item xs={4}>

                            <InputText
                                label="Address"
                                name="address"
                                type="text"
                                value={addressDetails}
                                disabled
                                className="form-control input"
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <hr />

            <Appointments />
        </div >
    )
}

export default Userdata
