import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";



const SalonPopUp = ({ rowData }) => {
    const { email, mainGateImageUrl, id, name, gstNumber, companyName, address, city, pincode, serviceType, state } = rowData;

    // if (!rowData || !rowData.profileImageUrl) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                {isValidImageUrl(mainGateImageUrl) &&
                    isValidImageUrl(mainGateImageUrl) ? (
                    <img
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
        </>
    );
};

export default SalonPopUp;


