import React, { useState } from "react";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { updateUser } from "../../api/account.api";
import Notify from "../../utils/notify";
import Loader from "../Loader";

const UserDetails = ({ rowData, setUpdatedRowData }) => {
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
    <>
      <div className="d-flex justify-content-center align-items-center">
        {isValidImageUrl(rowData.profileImageUrl) ? (
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

      <div className="row d-flex justify-content-between align-items-evenly mb-2 mt-1">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Name</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">
            {`${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`}
          </p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Email id</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{rowData.email}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Mobile Number</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{rowData.phoneNumber}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">
            <select
              value={selectedLandmark}
              onChange={handleLandmarkChange}
              className="form-select"
              style={{ height: "40px", width: "149px" }}
            >
              <option value="">Select Landmark</option>
              {addresses.map((address, index) => (
                <option key={index} value={address.landmark}>
                  {address.landmark}
                </option>
              ))}
            </select>

          </p>
          <span>:</span>
        </div>
        <div className="col-6">
          {addressDetails}
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Gender</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{rowData.gender}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Total Completed Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2">{rowData.completed}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Total Canceled Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2">{rowData.cancelled}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Scheduled Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2">{rowData.scheduled}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Joining Date</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">
            {new Date(rowData.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          onClick={handleToggleBlock}
          className="button"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : active ? "Block" : "Unblock"}
        </button>
      </div>
    </>
  );
};

export default UserDetails;
