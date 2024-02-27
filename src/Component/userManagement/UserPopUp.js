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
            style={{ width: 100, height: 100,  borderRadius:"5px", borderColor:"#7f8080"}}
          />
        ) : (
          <img
            src={Profile}
            alt="Profile"
            style={{ width: 100, height: 100,  borderRadius:"5px", borderColor:"#7f8080" }}
          />
        )}
      </div>
      <h4 className="text-center mt-2">{`${rowData.firstName} ${rowData.lastName}`}</h4>
      <div className="d-flex align-items-evenly mb-2">
        <p className="small fw-bold">Email id :</p>
        <p className="ps-2">{rowData.email}</p>
      </div>

      <div className="d-flex align-items-evenly mb-2 ">
        <p className="small fw-bold">Mobile Number :</p>
        <p className="ps-2"> {rowData.phoneNumber} </p>
      </div>

      <div className="d-flex align-items-evenly mb-2 ">
        <p className="small fw-bold">Address :</p>
        <p className="ps-2">{rowData.address}</p>
      </div>

      <div className="d-flex align-items-evenly mb-2 ">
        <p className="small fw-bold">
          Total <br /> Completed Appointments:
        </p>
        {/* <p className="data-detail">{editedData.totalCompletedAppointments}</p> */}
        <p className="data-detail ps-2 pt-3"> 7777777</p>
      </div>

      <div className="d-flex align-items-evenly mb-2 ">
        <p className="small fw-bold">
          Total
          <br /> Canceled Appointments:
        </p>
        <p className="data-detail ps-2">
          {editedData.totalCanceledAppointments}
        </p>
      </div>

      <div className="d-flex align-items-evenly mb-2 ">
        <p className="small fw-bold">Joining Date:</p>
        <p className="ps-2">
          {new Date(rowData.createdAt).toLocaleDateString()}
        </p>
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
