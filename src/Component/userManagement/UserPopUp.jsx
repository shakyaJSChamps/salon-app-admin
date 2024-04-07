import { useEffect, useState } from "react";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";

const UserPopUp = ({ show, handleClose, handleEdit, rowData }) => {
  const [editedData, setEditedData] = useState({ ...rowData });
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (rowData) {
      setEditedData({ ...rowData });
      setIsBlocked(rowData.isBlocked || false);
    }
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggleBlock = () => {
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);
  };

  const handleSubmit = () => {
    handleEdit(editedData);
    handleClose();
  };

  if (!rowData || !rowData.profileImageUrl) {
    return <div>Loading...</div>;
  }

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
        <button onClick={handleToggleBlock} className="button">
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </>
  );
};

export default UserPopUp;
