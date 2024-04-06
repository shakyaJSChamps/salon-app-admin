import { useEffect, useState } from "react";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { updateUser } from "../../api/account.api";



const UserPopUp = ({ show, handleClose, handleEdit, rowData }) => {
  let { firstName, middleName, lastName, email, phoneNumber, profileImageUrl, createdAt, cancelled, completed, address } = rowData;
  const [editedData, setEditedData] = useState({ ...rowData });
  const [isBlocked, setIsBlocked] = useState(false);


  // const handleToggleBlock = async (id) => {
  //   try {
  //     const updateData = {
  //       field: "Block",
  //       value: !isBlocked
  //   }
  //     const updatedUser = await updateUser(updateData, id)
  //     setIsBlocked(!isBlocked);
  //     onUpdateSuccess(); // Call the callback function to notify parent component
  //   } catch (error) {
  //     console.error("Error toggling block:", error);
  //   }
  // };

  
  if (typeof lastName === "undefined") {
    lastName = " ";
  }
  if (typeof middleName === "undefined") {
    middleName = " ";
  }

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
    setIsBlocked((!isBlocked));
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
        {isValidImageUrl(profileImageUrl) &&
          isValidImageUrl(profileImageUrl) ? (
          <img
            src={profileImageUrl}
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
      <h4 className="text-center mt-2">{`${firstName} ${middleName} ${lastName}`}</h4>
      <div className=" row d-flex  justify-content-between align-items-evenly mb-2">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Email id </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{email}</p>
        </div>
      </div>

      <div className=" row d-flex  justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Mobile Number</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2"> {phoneNumber} </p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">City</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{address}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Total Completed Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2 ">{completed}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly mb-2 ">
        <div className="col-6 d-flex justify-content-between">
          <p className="small fw-bold">Total Canceled Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2">
            {cancelled}
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
            {new Date(createdAt).toLocaleDateString()}
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


