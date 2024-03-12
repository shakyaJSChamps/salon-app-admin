import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setData, selectUserData } from "../features/userInfoSlice";
import { selectSearchTerm } from "../features/countriesInfo";
import Profile from "../assets/image/dummy-profile.jpg";
import { isValidImageUrl } from "../constants";
import MyVerticallyCenteredModal from "../Component/modal/ModalPop";
import Notify from "../utils/notify";
import { getUser } from "../api/account.api";
import DataTable from "react-data-table-component";
import CustomTitle from "../Component/CustomTitle";

const UserManagement = () => {
  const title = "User Management";
  const icon = <AiOutlineUser />;
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const searchText = useSelector(selectSearchTerm);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (rowData) => {
    // handle edit logic
  };

  const handleRowClick = (row) => {
    setModalShow(true);
    setSelectedRow(row);
  };

  const handlePageChange = page => {
    getUsers(page);
  };

  // const handlePerPageChange = (newPerPage, page) => {
  //   setPerPage(newPerPage);
  //   setCurrentPage(page);
  //   // getUsers(page, newPerPage);
  // };

  const getUsers = async (page) => {
    try {
      const response = await getUser(`/consumers?page=${page}&per_page=${perPage}&delay=1`);
      console.log("API Response:", response);
      const userData = response.data.data.items;
      dispatch(setData(userData));
      setTotalRows(response.data.data.total);
      return userData;
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  // useEffect(() => {
  //   // if (perPage && currentPage) {
  //     getUsers(currentPage, perPage);
  //   // }
  // }, [searchText]);

  const filteredUserData = userData.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );
  // const paginatedUserData = filteredUserData.slice(0, perPage);
  
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div onClick={() => handleRowClick(row)} className="d-flex ">
          <div className="d-flex justify-content-center align-items-center">
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

  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        color: "#6F6B7D",
        fontFamily: "Poppins",
      },
    },
  };

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
      <div className="mt-5 main-table rounded ">
        <DataTable
          title={<CustomTitle icon={icon} title={title} />}
          columns={columns}
          data={filteredUserData}
          pagination
          paginationPerPage={perPage}
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          // onChangeRowsPerPage={handlePerPageChange}
          fixedHeader
          fixedHeaderScrollHeight="450px"
          highlightOnHover
          handleRowClick={handleRowClick}
          handleEdit={handleEdit}
          selectedRow={selectedRow}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default UserManagement;
