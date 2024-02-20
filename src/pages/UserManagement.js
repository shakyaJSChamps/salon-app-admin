import React, { useEffect, useState } from "react";
import Table from "../Component/Table";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, selectUserData } from "../features/userInfoSlice";
import { selectSearchTerm } from "../features/countriesInfo"; 
import DummyProfile from "../assets/image/dummy-profile.jpg";
const UserManagement = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const searchText = useSelector(selectSearchTerm); 

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (rowData) => {
    setShowEditPopup(false);
    setSelectedRow(null);
  };

  const handleRowClick = (row) => {
    setShowEditPopup(true);
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
      minWidth: "250px",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}  className="d-flex ">
          <div>
            <img
              src={row.profileImageUrl ? row.profileImageUrl : DummyProfile }
              alt="Profile"
              style={{ width: 35, height: 35, borderRadius: "50%" }}
            />
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
      name: "Location",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {row.address}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Appointment",
      cell: (row) => (
        <div>
          <span
            className={`appointment ${
              row.name ? "appointment-completed" : "appointment-canceled"
            }`}
          >
            Completed
          </span>
          <br />
          <span
            className={`appointment ${
              row.name ? "appointment-canceled" : "appointment-canceled"
            }`}
          >
            Canceled
          </span>
        </div>
      ),
    },
    {
      name: "Joined On",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)}>
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      ),
      sortable: true,
    }
  ];

  return (
    <Table
      icon={<AiOutlineUser />}
      title={"User Management"}
      countries={filteredUserData}
      columns={columns}
      handleRowClick={handleRowClick}
      showEditPopup={showEditPopup}
      setShowEditPopup={setShowEditPopup}
      handleEdit={handleEdit}
      selectedRow={selectedRow}
    />
  );
};

export default UserManagement;
