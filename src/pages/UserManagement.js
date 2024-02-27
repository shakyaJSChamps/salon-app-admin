import React, { useEffect, useState } from "react";
import Table from "../Component/Table";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, selectUserData } from "../features/userInfoSlice";
import { selectSearchTerm } from "../features/countriesInfo";
import Profile from "../assets/image/dummy-profile.jpg";
import { isValidImageUrl } from "../constants";
import MyVerticallyCenteredModal from "../Component/modal/ModalPop";
// import PopUp from "../assets/image/dummy-profile.jpg";
import UserPopUp from "../Component/userManagement/UserPopUp";

const UserManagement = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const searchText = useSelector(selectSearchTerm);

  // const [showEditPopup, setShowEditPopup] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (rowData) => {
    // handle edit logic
  };

  const handleRowClick = (row) => {
    setModalShow(true);
    setSelectedRow(row);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const filteredUserData = userData.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="d-flex ">
          <div>
            {isValidImageUrl(row.profileImageUrl) &&
            isValidImageUrl(row.profileImageUrl) ? (
              <img
                src={row.profileImageUrl}
                alt="Profile"
                style={{ width: 35, height: 35, borderRadius: "50%" }}
              />
            ) : (
              <img
                src={Profile}
                alt="Profile"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div>
            <div className="ps-2">{`${row.firstName} ${row.lastName}`}</div>
            <div className="ps-2">{row.email}</div>
          </div>
        </div>
      ),
    },

    {
      name: "Active",
      cell: (row) => (
        <span
          className={`rounded-pill ${
            row.active ? "active-pill" : "blocked-pill"
          }`}
        >
          {row.active ? "Active" : "Blocked"}
        </span>
      ),
    },

    {
      name: "Mobile Num",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.phoneNumber}</div>
      ),
      sortable: true,
    },
    {
      name: "City",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>{row.address}</div>
      ),
      sortable: true,
    },
    // {
    //   name: "Appointment",
    //   cell: (row) => (
    //     <div>
    //       <span
    //         className={`appointment ${
    //           row.name ? "appointment-completed" : "appointment-canceled"
    //         }`}
    //       >
    //         Completed
    //       </span>
    //       <br />
    //       <span
    //         className={`appointment ${
    //           row.name ? "appointment-canceled" : "appointment-canceled"
    //         }`}
    //       >
    //         Canceled
    //       </span>
    //     </div>
    //   ),
    // },
    {
      name: "Joined On",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <>
    {modalShow && selectedRow && (
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        rowData={selectedRow}
        showForm={"user"}
      />
    )}
    <Table
      icon={<AiOutlineUser />}
      title={"User Management"}
      countries={filteredUserData}
      columns={columns}
      handleRowClick={handleRowClick}
      handleEdit={handleEdit}
      selectedRow={selectedRow}
    />
  </>
  );
};

export default UserManagement;
