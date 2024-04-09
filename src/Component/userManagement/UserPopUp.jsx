// import { useEffect, useState } from "react";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { updateUser } from "../../api/account.api";

const UserPopUp = ({ show, handleClose, handleEdit, rowData }) => {
  const { firstName, middleName, lastName, email, phoneNumber, profileImageUrl, createdAt, cancelled, completed, address, scheduled, id, active,userType } = rowData;
  // const [editedData, setEditedData] = useState({ ...rowData });
  // const [isBlocked, setIsBlocked] = useState(false);


  const handleToggleBlock = async () => {
    try {
      const data = {
        field: "active",
        value: !active
      }
      const update = await updateUser(data, id);
      console.log(update);
    }
    catch (error) {
      console.log("Error", error)
    }
  };

  // useEffect(() => {
  //   if (rowData) {
  //     setEditedData({ ...rowData });
  //     setIsBlocked(rowData.isBlocked || false);
  //   }
  // }, [rowData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleToggleBlock = () => {
  //   setIsBlocked((!isBlocked));
  // };


  // const handleSubmit = () => {
  //   handleEdit(editedData);
  //   handleClose();
  // };

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

      <div className=" mt-2 row d-flex  justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">First Name </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{firstName}</p>
        </div>
      </div>

      <div className="row d-flex  justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Middle Name </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{middleName}</p>
        </div>
      </div>

      <div className=" row d-flex  justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4" >Last Name </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{lastName}</p>
        </div>
      </div>

      <div className=" row d-flex  justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Id </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{id}</p>
        </div>
      </div>


      <div className=" row d-flex  justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Email id </p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{email}</p>
        </div>
      </div>

      <div className=" row d-flex  justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Mobile Number</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2"> {phoneNumber} </p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Address</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{address}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Pending Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">{scheduled}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Total Completed Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2 ">{completed}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Total Canceled Appointments</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="data-detail ps-2">
            {cancelled}
          </p>
        </div>
      </div>

      <div className="row d-flex justify-content-between align-items-evenly">
      <div className="col-6 d-flex justify-content-end">
        <p className="small fw-bold mx-4">User Type</p>
        <span>:</span>
      </div>
      <div className="col-6">
        <p className="data-detail ps-2">
          {userType}
        </p>
      </div>
    </div >

      <div className="row d-flex justify-content-between align-items-evenly">
        <div className="col-6 d-flex justify-content-end">
          <p className="small fw-bold mx-4">Joining Date</p>
          <span>:</span>
        </div>
        <div className="col-6">
          <p className="ps-2">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button onClick={handleToggleBlock} className="button">
          {active ? "Block" : "Unblock"}
          {/* {isBlocked ? "Unblock" : "Block"} */}
        </button>
      </div>
      </>
  
  );
};

export default UserPopUp;


