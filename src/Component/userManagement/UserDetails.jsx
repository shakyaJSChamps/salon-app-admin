import { useState } from "react";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { updateUser } from "../../api/account.api";
import Notify from "../../utils/notify";
import Loader from "../Loader";

const UserDetails = ({ rowData }) => {
  const [active, setActive] = useState(rowData.active);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggleBlock = async () => {
    setIsLoading(true); // Set isLoading to true before the API call
    const payload = {
      "field":"active",
      "value": active ? "false" : "true"
  }
    try {
      const response = await updateUser(payload, rowData.id);
      Notify.success(response.data.message);
      setActive(preValue => !preValue);
      setIsLoading(false);
    } catch (error) {
      Notify.error(error.message);
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        {isValidImageUrl(rowData.profileImageUrl) &&
        isValidImageUrl(rowData.profileImageUrl) ? (
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
      <h4 className="text-center mt-2">{`${rowData.firstName} ${rowData.lastName}`}</h4>
      <div className=" row d-flex  justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Email id </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{rowData.email}</p>
        </div>
      </div>

      <div className=" row d-flex  justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Mobile Number</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2"> {rowData.phoneNumber} </p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Address</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{rowData.address}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Total Completed Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2 "> 7777777</p>
          {/* <p className="data-detail">{editedData.totalCompletedAppointments}</p> */}
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Total Canceled Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2">
            {rowData.cancelled}
          </p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Joining Date</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">
            {new Date(rowData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center ">
        <button onClick={handleToggleBlock} className="button" disabled={isLoading}>
          {isLoading ? (
            <Loader />
          ) : (
            active ?  "Block" : "Unblock"
          )}
        </button>
      </div>
    </>
  );
};

export default UserDetails;
