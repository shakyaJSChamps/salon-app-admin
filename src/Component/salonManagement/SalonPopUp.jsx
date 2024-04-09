import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
// import { Modal, Backdrop, Fade } from "@material-ui";
import salonImagePopup from "./salonImagePopup";



const SalonPopUp = ({ rowData }) => {
    const { email, mainGateImageUrl, id, name, gstNumber, homeService, latitude, longitude, range, companyName,
        address, city, pincode, serviceType, state, gallaryImages, distance, bannerImages } = rowData
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // if (!rowData || !rowData.profileImageUrl) {
    //     return <div>Loading...</div>;
    // }

    const handleOpen = (imageUrl) => {
        setSelectedImage(imageUrl);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Row>
            <Col sm={6} className="pl-10">
                <div className=" mt-2 row d-flex  justify-content-between align-items-evenly ">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Name </p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{name}</p>
                    </div>
                </div>

                <div className=" row d-flex  justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Company Name</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{companyName}</p>
                    </div>
                </div>

                <div className=" row d-flex  justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Gst Number </p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{gstNumber}</p>
                    </div>
                </div>

                <div className=" row d-flex  justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Id </p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{id}</p>
                    </div>
                </div>


                <div className=" row d-flex  justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Email id </p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{email}</p>
                    </div>
                </div>

                <div className=" row d-flex  justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">City</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2"> {city} </p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Address</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{address}</p>
                    </div>
                </div>


                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Pincode</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="ps-2">{pincode}</p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Service Type</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2 ">{serviceType}</p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">State</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2">
                            {state}
                        </p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Latitude</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2">
                            {latitude}
                        </p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Longitude</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2">
                            {longitude}
                        </p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Distance</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2">
                            {distance}
                        </p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Home Service</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2">
                            {homeService.toString()}
                        </p>
                    </div>
                </div>

                <div className="row d-flex justify-content-between align-items-evenly">
                    <div className="col-6 d-flex justify-content-between">
                        <p className="small fw-bold">Range</p>
                        <span>:</span>
                    </div>
                    <div className="col-6">
                        <p className="data-detail ps-2">
                            {range}
                        </p>
                    </div>
                </div>
            </Col>

            <Col sm={6}>

                <p className="small fw-bold">MainGate Image</p>
                <div className="d-flex flex-wrap">

                    {isValidImageUrl(mainGateImageUrl) &&
                        isValidImageUrl(mainGateImageUrl) ? (
                        <img
                            className="ml-2"
                            src={mainGateImageUrl}
                            alt="Profile"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "5px",
                                borderColor: "#7f8080",
                            }}
                        />
                    ) : (
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
                    )}
                </div>
                <hr />

                <p className="small fw-bold mt-2">Gallery Images</p>
                {/* <div className="d-flex flex-wrap ">
                    {gallaryImages.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Image ${index}`}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "5px",
                                borderColor: "#7f8080",
                                margin: "5px"
                            }}
                        />
                    ))}
                </div> */}
                <div>
                    <div className="d-flex flex-wrap ">
                        {gallaryImages.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Image ${index}`}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "5px",
                                    borderColor: "#7f8080",
                                    margin: "5px",
                                    cursor: "pointer" // Add cursor pointer to indicate clickable
                                }}
                                onClick={() => handleOpen(imageUrl)}
                            />
                        ))}
                    </div>
                    <salonImagePopup open={open} onClose={handleClose}>
                        {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "70%", maxHeight: "60%" }} />}
                    </salonImagePopup>
                </div>
                <hr />

                <p className="small fw-bold  mt-2">Banner Images</p>
                <div className="d-flex flex-wrap">
                    {bannerImages.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Image ${index}`}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "5px",
                                borderColor: "#7f8080",
                                margin: "5px"
                            }}
                        />
                    ))}
                </div>
            </Col>

        </Row>
    );
};


export default SalonPopUp;


