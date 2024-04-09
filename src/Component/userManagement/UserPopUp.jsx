import { useEffect, useState } from "react";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { updateUser } from "../../api/account.api";
import Notify from "../../utils/notify";
import Loader from "../Loader";

const UserPopUp = ({ show, handleClose, handleEdit, rowData }) => {
  const [editedData, setEditedData] = useState({ ...rowData });
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (rowData) {
      setEditedData({ ...rowData });
      setIsBlocked(rowData.isBlocked || false);
    }
  }, [rowData]);
  
  const handleToggleBlock = async () => {
    setIsLoading(true); // Set isLoading to true before the API call
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);
    const field = "active";
    const value = isBlocked ? "false" : "true"; 
    console.log("Field:", field, "Value:", value);
    console.log("RowData ID:", rowData.id); 
    
    // Log the API call
    console.log("Calling updateUser API...");
    
    try {
      const response = await updateUser(field, value, rowData.id);
      console.log("updateUser API response:", response);
  
      // Notify user based on block status
      if (isBlocked) {
        Notify.success("User unblocked successfully");
      } else {
        Notify.success("User blocked successfully");
      }
    } catch (error) {
      Notify.error(error.message);
    } finally {
      setIsLoading(false); // Set isLoading back to false after the API call
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
            {editedData.totalCanceledAppointments}
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
            isBlocked ? "Unblock" : "Block"
          )}
        </button>
      </div>
    </>
  );
};

export default UserPopUp;
